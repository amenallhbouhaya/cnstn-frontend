import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DayCellMountArg } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { EmployeEvenementApi, SalleMini, EquipAvailability, EquipMini } from '../../../core/services/employe-evenement-api';
import { Evenement } from '../../../core/models/evenement';
import { TypeEvenement } from '../../../core/models/type-evenement';
import { AuthService } from '../../../core/services/auth';
import { EquipementService } from '../../../core/services/equipement';
import { UsersDirectoryService } from '../../../core/services/users-directory';
import { UserDto } from '../../../core/models/user';

import { catchError, forkJoin, of } from 'rxjs';

interface ExternalPartnerDraft {
  nom: string;
  email: string;
}

@Component({
  selector: 'app-employe-evenement-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FullCalendarModule],
  templateUrl: './employe-evenement-new.html',
  styleUrl: './employe-evenement-new.css'
})
export class EmployeEvenementNewComponent {
  private api = inject(EmployeEvenementApi);
  private equipementApi = inject(EquipementService);
  private usersApi = inject(UsersDirectoryService);
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  private router = inject(Router);
  private auth = inject(AuthService);

  salles: SalleMini[] = [];
  equipements: EquipAvailability[] = [];
  private equipementNameById = new Map<number, string>();
  selectedEquipIds = new Set<number>();
  selectedDate = '';
  isEditorOpen = false;
  noSallesAvailable = false;
  minDate = '';
  calendarOptions: CalendarOptions = {};
  eventTypeOptions: Array<{ label: string; value: TypeEvenement }> = [
    { label: 'En ligne', value: TypeEvenement.En_Ligne },
    { label: 'Présentiel', value: TypeEvenement.Presentiel },
    { label: 'Hybride', value: TypeEvenement.En_Line_Presentiel }
  ];
  timeOptions: string[] = Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, '0')}:00`);

  // Handles the normalizeRole flow for the current screen.
  private normalizeRole(value: string | null | undefined): string {
    return String(value ?? '').replace(/\s+/g, '').toLowerCase();
  }

  // Handles the backLink flow for the current screen.
  get backLink(): string {
    const role = this.normalizeRole(this.auth.role);
    if (role === 'responsablesalle') return '/responsable-salle/mes-evenements';
    if (role === 'responsablesecurite') return '/responsable-securite/mes-evenements';
    if (role === 'directeurdsn') return '/directeur-dsn/mes-evenements';
    return '/employe/evenements';
  }

  // Handles the backLabel flow for the current screen.
  get backLabel(): string {
    return 'Mes événements';
  }

  loading = false;
  errorMsg = '';
  msg = '';
  equipementWarnMsg = '';

  users: UserDto[] = [];
  inviteAll = false;
  selectedUserIds = new Set<number>();
  externalPartners: ExternalPartnerDraft[] = [{ nom: '', email: '' }];

  form = this.fb.group({
    nom: [''],
    titre: ['', Validators.required],
    description: [''],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    typeEvenement: [TypeEvenement.Presentiel as any, Validators.required],
    salleId: [null as any],
    onlineLink: ['']
  });

  // Initializes the component and loads its first data.
  ngOnInit() {
    if (!this.isBrowser) return;

    this.minDate = this.toDateInput(this.addDays(new Date(), 1));
    const rangeStart = this.minDate;
    const nextMonthStart = this.firstDayOfNextMonth(new Date());

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      initialDate: this.toDateInput(nextMonthStart),
      locale: frLocale,
      firstDay: 1,
      height: 'auto',
      fixedWeekCount: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      buttonText: {
        today: "Aujourd'hui"
      },
      validRange: {
        start: rangeStart
      },
      dateClick: (arg) => this.onDateClick(arg),
      dayCellDidMount: (arg) => this.decorateDayCell(arg),
      eventContent: (arg) => {
        const title = arg.event.title ?? '';
        return { html: `<span class="event-badge">${title}</span>` };
      }
    };

    this.form.controls.typeEvenement.valueChanges.subscribe((value) => {
      this.applyTypeRules(value as TypeEvenement | null);
      this.refreshAvailability();
    });

    this.form.controls.startTime.valueChanges.subscribe(() => this.refreshAvailability());
    this.form.controls.endTime.valueChanges.subscribe(() => this.refreshAvailability());

    this.applyTypeRules(TypeEvenement.Presentiel);
    this.loadEquipementNames();
    this.loadUsers();
    this.loadCalendarEvents();
  }

  // Loads or refreshes the related data from the backend.
  private loadCalendarEvents() {
    this.api.allEvents().subscribe({
      next: (data) => {
        const now = new Date();
        const items = (data ?? []) as Evenement[];
        const future = items.filter((e) => {
          const end = e.dateFin ? new Date(e.dateFin) : null;
          return end ? end >= now : false;
        });

        this.calendarOptions = {
          ...this.calendarOptions,
          events: future.map((e) => ({
            title: e.titre,
            start: e.dateDebut,
            end: e.dateFin
          }))
        };
      },
      error: (err) => console.log(err)
    });
  }

  // Handles the related user interaction or event.
  onDateClick(arg: DateClickArg) {
    const clickedDate = arg.date;
    if (!this.isSelectableDate(clickedDate)) return;

    this.selectedDate = this.toDateInput(clickedDate);
    this.isEditorOpen = true;
    this.msg = '';
    this.errorMsg = '';
    this.equipementWarnMsg = '';
    this.salles = [];
    this.equipements = [];
    this.noSallesAvailable = false;
    this.selectedEquipIds.clear();
    this.inviteAll = false;
    this.selectedUserIds.clear();
    this.externalPartners = [{ nom: '', email: '' }];

    this.form.reset({
      nom: '',
      titre: '',
      description: '',
      startTime: '',
      endTime: '',
      typeEvenement: TypeEvenement.Presentiel,
      salleId: null,
      onlineLink: ''
    });

    this.applyTypeRules(TypeEvenement.Presentiel);
  }

  // Handles the closeEditor flow for the current screen.
  closeEditor() {
    this.isEditorOpen = false;
    this.selectedDate = '';
  }

  // Handles the decorateDayCell flow for the current screen.
  private decorateDayCell(arg: DayCellMountArg) {
    const isSelectable = this.isSelectableDate(arg.date);
    if (!isSelectable) return;

    arg.el.classList.add('selectable-day');

    const top = arg.el.querySelector('.fc-daygrid-day-top');
    if (!top) return;

    const plus = document.createElement('span');
    plus.className = 'day-plus';
    plus.textContent = '+';
    top.appendChild(plus);
  }

  // Handles the isSelectableDate flow for the current screen.
  private isSelectableDate(date: Date): boolean {
    const value = this.toDateInput(date);
    return value >= this.minDate;
  }

  // Handles the firstDayOfNextMonth flow for the current screen.
  private firstDayOfNextMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }

  // Handles the applyTypeRules flow for the current screen.
  private applyTypeRules(type: TypeEvenement | null) {
    const salleControl = this.form.controls.salleId;
    const onlineLinkControl = this.form.controls.onlineLink;

    salleControl.clearValidators();
    onlineLinkControl.clearValidators();

    if (type === TypeEvenement.Presentiel || type === TypeEvenement.En_Line_Presentiel) {
      salleControl.setValidators([Validators.required]);
    } else {
      salleControl.setValue(null);
    }

    if (type === TypeEvenement.En_Line_Presentiel) {
      onlineLinkControl.setValidators([Validators.required]);
    }

    salleControl.updateValueAndValidity({ emitEvent: false });
    onlineLinkControl.updateValueAndValidity({ emitEvent: false });

    if (type === TypeEvenement.En_Ligne) {
      this.salles = [];
      this.noSallesAvailable = false;
    }
  }

  // Handles the showSalleField flow for the current screen.
  get showSalleField(): boolean {
    const type = this.form.controls.typeEvenement.value as TypeEvenement | null;
    return type === TypeEvenement.Presentiel || type === TypeEvenement.En_Line_Presentiel;
  }

  // Handles the showOnlineLinkField flow for the current screen.
  get showOnlineLinkField(): boolean {
    const type = this.form.controls.typeEvenement.value as TypeEvenement | null;
    return type === TypeEvenement.En_Line_Presentiel;
  }

  // Handles the showEquipementsField flow for the current screen.
  get showEquipementsField(): boolean {
    const type = this.form.controls.typeEvenement.value as TypeEvenement | null;
    return type === TypeEvenement.Presentiel || type === TypeEvenement.En_Line_Presentiel;
  }

  // Handles the refreshAvailability flow for the current screen.
  private refreshAvailability() {
    const startDateTime = this.computeDateTime(this.form.controls.startTime.value);
    const endDateTime = this.computeDateTime(this.form.controls.endTime.value);
    const type = this.form.controls.typeEvenement.value as TypeEvenement | null;

    this.salles = [];
    this.equipements = [];
    this.noSallesAvailable = false;
    this.equipementWarnMsg = '';

    if (!this.selectedDate || !startDateTime || !endDateTime) return;
    if (endDateTime <= startDateTime) return;

    const startIso = startDateTime.toISOString();
    const endIso = endDateTime.toISOString();
    const equipements$ = this.api.availableEquipementsStatusApi(startIso, endIso)
      .pipe(
        catchError(() => this.api.availableEquipementsApi(startIso, endIso)
          .pipe(catchError(() => of([] as EquipMini[]))))
      );

    if (type === TypeEvenement.Presentiel || type === TypeEvenement.En_Line_Presentiel) {
      const salles$ = this.api.availableSallesApi(startIso, endIso)
        .pipe(catchError(() => of([] as SalleMini[])));

      forkJoin({ sallesData: salles$, eqData: equipements$ }).subscribe(({ sallesData, eqData }) => {
        this.salles = this.normalizeSalles(this.toList<unknown>(sallesData as unknown, 'salles'));
        this.noSallesAvailable = this.salles.length === 0;
        this.equipements = this.normalizeEquipements(eqData as unknown);
        this.selectedEquipIds = new Set(
          Array.from(this.selectedEquipIds).filter((id) => this.equipements.some((e) => e.id === id && e.available))
        );
      });
      return;
    }

    equipements$.subscribe((eqData) => {
      this.equipements = this.normalizeEquipements(eqData as unknown);
      this.selectedEquipIds = new Set(
        Array.from(this.selectedEquipIds).filter((id) => this.equipements.some((e) => e.id === id && e.available))
      );
    });
  }

  // Handles the normalizeEquipements flow for the current screen.
  private normalizeEquipements(raw: unknown): EquipAvailability[] {
    return this.toList<Record<string, unknown>>(raw, 'equipements')
      .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
      .map((item) => {
        const id = Number(item['id']);
        const etat = String(item['etat'] ?? '').trim();
        const reservable = Boolean(item['reservable']);
        const typeEquipement = this.pickEquipementLabel(item, id);
        const availableRaw = item['available'];
        const available = typeof availableRaw === 'boolean' ? availableRaw : true;

        return {
          id: Number.isFinite(id) ? id : 0,
          etat,
          reservable,
          typeEquipement,
          available
        } as EquipAvailability;
      })
      .filter((eq) => eq.id > 0);
  }

  // Handles the normalizeUsers flow for the current screen.
  private normalizeUsers(raw: unknown): UserDto[] {
    return this.toList<Record<string, unknown>>(raw, 'users')
      .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
      .map((item) => {
        const id = Number(item['id'] ?? item['userId'] ?? item['idUser']);
        const nom = String(item['nom'] ?? item['lastName'] ?? item['name'] ?? '').trim();
        const prenom = String(item['prenom'] ?? item['firstName'] ?? '').trim();
        const email = String(item['email'] ?? item['mail'] ?? '').trim();
        const roleRaw = item['role'] ?? item['roles'];
        const role = Array.isArray(roleRaw)
          ? roleRaw.map((r) => String(r ?? '').trim()).filter(Boolean).join(', ')
          : String(roleRaw ?? '').trim();
        const matricule = Number(item['matricule'] ?? item['cin'] ?? item['cinNumber']);
        const telephone = Number(item['telephone'] ?? item['tel'] ?? item['phone'] ?? item['mobile']);

        return {
          id: Number.isFinite(id) ? id : 0,
          nom,
          prenom,
          email,
          role,
          matricule: Number.isFinite(matricule) ? matricule : 0,
          telephone: Number.isFinite(telephone) ? telephone : 0
        } as UserDto;
      })
      .filter((u) => u.id > 0 && (u.nom || u.prenom || u.email));
  }

  // Returns the requested data or derived value.
  getEquipLabel(equipement: EquipAvailability): string {
    const mapped = this.equipementNameById.get(equipement.id);
    if (mapped) return mapped;

    const fallback = String(equipement.typeEquipement ?? '').trim();
    if (fallback) return fallback;

    return equipement.id ? `Equipement #${equipement.id}` : 'Equipement';
  }

  // Handles the pickEquipementLabel flow for the current screen.
  private pickEquipementLabel(item: Record<string, unknown>, id: number): string {
    const mapped = this.equipementNameById.get(id);
    if (mapped) return mapped;

    const candidates = [
      item['typeEquipement'],
      item['nom'],
      item['nomEquipement'],
      item['designation'],
      item['libelle'],
      item['type'],
      item['numeroSerie']
    ];

    for (const candidate of candidates) {
      const value = String(candidate ?? '').trim();
      if (value) return value;
    }

    return Number.isFinite(id) && id > 0 ? `Equipement #${id}` : 'Equipement';
  }

  // Loads or refreshes the related data from the backend.
  private loadEquipementNames() {
    this.equipementApi.getAll().subscribe({
      next: (items) => {
        const map = new Map<number, string>();
        for (const item of items ?? []) {
          const id = Number(item.id);
          if (!Number.isFinite(id) || id <= 0) continue;

          const label = String(item.nom ?? item.typeEquipement ?? item.numeroSerie ?? '').trim();
          if (label) map.set(id, label);
        }
        this.equipementNameById = map;
      },
      error: (err) => console.log(err)
    });
  }

  // Handles the toList flow for the current screen.
  private toList<T>(value: unknown, embeddedKey: string): T[] {
    if (Array.isArray(value)) return value as T[];
    if (!value || typeof value !== 'object') return [];

    const record = value as Record<string, unknown>;
    const direct = [record['content'], record['items'], record['data']];
    for (const candidate of direct) {
      if (Array.isArray(candidate)) return candidate as T[];
    }

    const embedded = record['_embedded'];
    if (embedded && typeof embedded === 'object') {
      const nested = (embedded as Record<string, unknown>)[embeddedKey];
      if (Array.isArray(nested)) return nested as T[];
    }

    for (const candidate of Object.values(record)) {
      if (Array.isArray(candidate)) return candidate as T[];
      if (candidate && typeof candidate === 'object') {
        const nestedObj = candidate as Record<string, unknown>;
        for (const nestedCandidate of Object.values(nestedObj)) {
          if (Array.isArray(nestedCandidate)) return nestedCandidate as T[];
        }
      }
    }

    return [];
  }

  // Handles the normalizeSalles flow for the current screen.
  private normalizeSalles(raw: unknown[]): SalleMini[] {
    return raw
      .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
      .map((item) => {
        const idRaw = item['id'] ?? item['idSalle'] ?? item['salleId'];
        const nomRaw = item['nom'] ?? item['nomSalle'] ?? item['name'];
        const capaciteRaw = item['capacite'] ?? item['capacity'];
        const descriptionRaw = item['description'];

        const id = Number(idRaw);
        const capacite = Number(capaciteRaw);
        const nom = String(nomRaw ?? '').trim();

        return {
          id: Number.isFinite(id) ? id : 0,
          nom,
          capacite: Number.isFinite(capacite) ? capacite : 0,
          description: typeof descriptionRaw === 'string' ? descriptionRaw : undefined
        };
      })
      .filter((salle) => salle.id > 0 && salle.nom.length > 0);
  }

  // Adds a new item after validating the input.
  private addDays(date: Date, days: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  // Handles the toDateInput flow for the current screen.
  private toDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Handles the computeDateTime flow for the current screen.
  private computeDateTime(timeValue: string | null): Date | null {
    if (!this.selectedDate || !timeValue) return null;
    return new Date(`${this.selectedDate}T${timeValue}:00`);
  }

  // Handles the toggleEquip flow for the current screen.
  toggleEquip(equipement: EquipAvailability, checked: boolean) {
    if (!equipement.available) {
      this.equipementWarnMsg = `L'équipement ${this.getEquipLabel(equipement)} est déjà réservé sur ce créneau.`;
      this.selectedEquipIds.delete(equipement.id);
      return;
    }

    this.equipementWarnMsg = '';
    if (checked) this.selectedEquipIds.add(equipement.id);
    else this.selectedEquipIds.delete(equipement.id);
  }

  // Loads the current user list and normalizes role values.
  loadUsers() {
    this.usersApi.getAll().subscribe({
      next: (data) => {
        this.users = this.normalizeUsers(data as unknown);
      },
      error: (err) => {
        console.log(err);
        this.users = [];
      }
    });
  }

  // Handles the filteredUsers flow for the current screen.
  get filteredUsers(): UserDto[] {
    return this.users ?? [];
  }

  // Handles the toggleInviteAll flow for the current screen.
  toggleInviteAll(checked: boolean) {
    this.inviteAll = checked;
    if (checked) this.selectedUserIds.clear();
  }

  // Handles the toggleUser flow for the current screen.
  toggleUser(id: number) {
    if (this.selectedUserIds.has(id)) this.selectedUserIds.delete(id);
    else this.selectedUserIds.add(id);
  }

  // Adds a new item after validating the input.
  addExternalPartner() {
    this.externalPartners = [...this.externalPartners, { nom: '', email: '' }];
  }

  // Handles the removeExternalPartner flow for the current screen.
  removeExternalPartner(index: number) {
    this.externalPartners = this.externalPartners.filter((_, i) => i !== index);
    if (this.externalPartners.length === 0) {
      this.externalPartners = [{ nom: '', email: '' }];
    }
  }

  private parseExternalPartners(): { ok: boolean; value: ExternalPartnerDraft[]; error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result: ExternalPartnerDraft[] = [];

    for (let i = 0; i < this.externalPartners.length; i++) {
      const row = this.externalPartners[i];
      const nom = (row?.nom ?? '').trim();
      const email = (row?.email ?? '').trim();
      const rowNumber = i + 1;

      if (!nom && !email) continue;
      if (!nom || !email) {
        return {
          ok: false,
          value: [],
          error: `Partenaire externe #${rowNumber}: nom et email sont obligatoires ensemble`
        };
      }
      if (!emailRegex.test(email)) {
        return {
          ok: false,
          value: [],
          error: `Partenaire externe #${rowNumber}: email invalide`
        };
      }

      result.push({ nom, email });
    }

    const deduped = Array.from(
      new Map(result.map((p) => [`${p.nom.toLowerCase()}|${p.email.toLowerCase()}`, p])).values()
    );

    return { ok: true, value: deduped };
  }

  // Validates the form and sends it to the backend.
  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';
    this.msg = '';

    const v = this.form.value as any;
    const startDateTime = this.computeDateTime(v.startTime ?? null);
    const endDateTime = this.computeDateTime(v.endTime ?? null);

    if (!startDateTime || !endDateTime || endDateTime <= startDateTime) {
      this.loading = false;
      this.errorMsg = 'Heure de fin doit être après heure de début';
      return;
    }

    const partenaires = this.parseExternalPartners();
    if (!partenaires.ok) {
      this.loading = false;
      this.errorMsg = partenaires.error ?? 'Données partenaires externes invalides';
      return;
    }

    let finalDescription = v.description ?? '';
    if (this.showOnlineLinkField && v.onlineLink) {
      finalDescription = `${finalDescription}\nLien: ${v.onlineLink}`.trim();
    }

    const payload = {
      nom: v.nom ?? '',
      titre: v.titre,
      description: finalDescription,
      dateDebut: startDateTime.getTime(),
      dateFin: endDateTime.getTime(),
      typeEvenement: v.typeEvenement,
      lienEnLigne: this.showOnlineLinkField ? (v.onlineLink ?? '') : '',
      salleId: this.showSalleField ? (v.salleId ?? null) : null,
      equipementIds: this.showEquipementsField ? Array.from(this.selectedEquipIds) : [],
      inviteAll: this.inviteAll,
      inviteUserIds: Array.from(this.selectedUserIds),
      partenairesExternes: partenaires.value
    };

    this.api.createEvenementFull(payload).subscribe({
      next: () => {
        this.loading = false;
        this.msg = 'Evenement créé avec succès';
        this.closeEditor();

        // ✅ Redirect حسب role باش ما يردّكش للـlogin
        const role = this.normalizeRole(this.auth.role);

        if (role === 'responsablesalle') this.router.navigate(['/responsable-salle/evenements']);
        else if (role === 'responsablesecurite') this.router.navigate(['/responsable-securite/evenements']);
        else if (role === 'directeurdsn') this.router.navigate(['/directeur-dsn/evenements']);
        else this.router.navigate(['/employe/evenements']);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.errorMsg = err?.error?.message ?? 'Erreur création evenement';
      }
    });
  }
}