import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DayCellMountArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { EmployeEvenementApi, SalleMini, EquipAvailability, EquipMini } from '../../../core/services/employe-evenement-api';
import { TypeEvenement } from '../../../core/models/type-evenement';
import { AuthService } from '../../../core/services/auth';

import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-employe-evenement-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FullCalendarModule],
  templateUrl: './employe-evenement-new.html',
  styleUrl: './employe-evenement-new.scss'
})
export class EmployeEvenementNewComponent {
  private api = inject(EmployeEvenementApi);
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  private router = inject(Router);
  private auth = inject(AuthService);

  salles: SalleMini[] = [];
  equipements: EquipAvailability[] = [];
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

  private normalizeRole(value: string | null | undefined): string {
    return String(value ?? '').replace(/\s+/g, '').toLowerCase();
  }

  get backLink(): string {
    const role = this.normalizeRole(this.auth.role);
    if (role === 'responsablesalle') return '/responsable-salle/mes-evenements';
    if (role === 'responsablesecurite') return '/responsable-securite/mes-evenements';
    if (role === 'directeurdsn') return '/directeur-dsn/mes-evenements';
    return '/employe/evenements';
  }

  get backLabel(): string {
    return 'Mes événements';
  }

  loading = false;
  errorMsg = '';
  msg = '';
  equipementWarnMsg = '';

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

  ngOnInit() {
    if (!this.isBrowser) return;

    this.minDate = this.toDateInput(this.addDays(new Date(), 1));
    const rangeStart = this.minDate;
    const nextMonthStart = this.firstDayOfNextMonth(new Date());

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      initialDate: this.toDateInput(nextMonthStart),
      height: 'auto',
      fixedWeekCount: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      validRange: {
        start: rangeStart
      },
      dateClick: (arg) => this.onDateClick(arg),
      dayCellDidMount: (arg) => this.decorateDayCell(arg)
    };

    this.form.controls.typeEvenement.valueChanges.subscribe((value) => {
      this.applyTypeRules(value as TypeEvenement | null);
      this.refreshAvailability();
    });

    this.form.controls.startTime.valueChanges.subscribe(() => this.refreshAvailability());
    this.form.controls.endTime.valueChanges.subscribe(() => this.refreshAvailability());

    this.applyTypeRules(TypeEvenement.Presentiel);
  }

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

  closeEditor() {
    this.isEditorOpen = false;
    this.selectedDate = '';
  }

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

  private isSelectableDate(date: Date): boolean {
    const value = this.toDateInput(date);
    return value >= this.minDate;
  }

  private firstDayOfNextMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }

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

  get showSalleField(): boolean {
    const type = this.form.controls.typeEvenement.value as TypeEvenement | null;
    return type === TypeEvenement.Presentiel || type === TypeEvenement.En_Line_Presentiel;
  }

  get showOnlineLinkField(): boolean {
    const type = this.form.controls.typeEvenement.value as TypeEvenement | null;
    return type === TypeEvenement.En_Line_Presentiel;
  }

  get showEquipementsField(): boolean {
    const type = this.form.controls.typeEvenement.value as TypeEvenement | null;
    return type === TypeEvenement.Presentiel || type === TypeEvenement.En_Line_Presentiel;
  }

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

  private normalizeEquipements(raw: unknown): EquipAvailability[] {
    return this.toList<Record<string, unknown>>(raw, 'equipements')
      .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
      .map((item) => {
        const id = Number(item['id']);
        const etat = String(item['etat'] ?? '').trim();
        const reservable = Boolean(item['reservable']);
        const typeEquipement = String(item['typeEquipement'] ?? '').trim();
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

  private addDays(date: Date, days: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  private toDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private computeDateTime(timeValue: string | null): Date | null {
    if (!this.selectedDate || !timeValue) return null;
    return new Date(`${this.selectedDate}T${timeValue}:00`);
  }

  toggleEquip(equipement: EquipAvailability, checked: boolean) {
    if (!equipement.available) {
      this.equipementWarnMsg = `L'équipement ${equipement.typeEquipement} est déjà réservé sur ce créneau.`;
      this.selectedEquipIds.delete(equipement.id);
      return;
    }

    this.equipementWarnMsg = '';
    if (checked) this.selectedEquipIds.add(equipement.id);
    else this.selectedEquipIds.delete(equipement.id);
  }

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
      salleId: this.showSalleField ? (v.salleId ?? null) : null,
      equipementIds: this.showEquipementsField ? Array.from(this.selectedEquipIds) : []
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