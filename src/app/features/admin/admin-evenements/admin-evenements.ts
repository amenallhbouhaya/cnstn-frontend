import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { EvenementService } from '../../../core/services/evenement';
import { Evenement } from '../../../core/models/evenement';
import { TypeEvenement } from '../../../core/models/type-evenement';
import { AdminUsersService } from '../../../core/services/admin-users';
import { UserDto } from '../../../core/models/user';

@Component({
  selector: 'app-admin-evenements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-evenements.html',
  styleUrl: './admin-evenements.scss'
})
export class AdminEvenementsComponent {
  private api = inject(EvenementService);
  private fb = inject(FormBuilder);
  private usersApi = inject(AdminUsersService);

  items: Evenement[] = [];
  loading = false;
  errorMsg = '';
  editingId: number | null = null;

  users: UserDto[] = [];
  inviteAll = false;
  inviteSearch = '';
  selectedUserIds = new Set<number>();
  inviteError = '';
  inviteSuccess = '';
  inviteSending = false;

  typeValues = Object.values(TypeEvenement);

  form = this.fb.group({
    nom: [''],
    titre: ['', Validators.required],
    description: [''],
    dateDebut: ['', Validators.required], // datetime-local
    dateFin: ['', Validators.required],
    typeEvenement: [null as any, Validators.required],
  });

  ngOnInit() {
    this.load();
    this.loadUsers();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.api.getAll().subscribe({
      next: (data) => { this.items = data; this.loading = false; },
      error: (err) => { console.log(err); this.errorMsg = 'Erreur chargement événements'; this.loading = false; }
    });
  }

  newItem() {
    this.editingId = null;
    this.form.reset({ nom:'', titre:'', description:'', dateDebut:'', dateFin:'', typeEvenement: null });
    this.inviteAll = false;
    this.inviteSearch = '';
    this.selectedUserIds.clear();
    this.inviteError = '';
    this.inviteSuccess = '';
  }

  edit(e: Evenement) {
    this.editingId = e.id ?? null;
    const dd = e.dateDebut ? new Date(e.dateDebut).toISOString().slice(0,16) : '';
    const df = e.dateFin ? new Date(e.dateFin).toISOString().slice(0,16) : '';

    this.form.setValue({
      nom: e.nom ?? '',
      titre: e.titre,
      description: e.description ?? '',
      dateDebut: dd,
      dateFin: df,
      typeEvenement: e.typeEvenement ?? null
    });
  }

  submit() {
    if (this.form.invalid) return;
    const raw = this.form.value as any;

    const payload: Evenement = {
      nom: raw.nom ?? '',
      titre: raw.titre,
      description: raw.description ?? '',
      dateDebut: new Date(raw.dateDebut).toISOString(),
      dateFin: new Date(raw.dateFin).toISOString(),
      typeEvenement: raw.typeEvenement
    };

    if (this.editingId === null) {
      this.api.add(payload).subscribe({
        next: (created) => {
          if (created?.id) this.sendInvites(created.id);
          this.newItem();
          this.load();
        },
        error: (err) => { console.log(err); this.errorMsg = 'Erreur ajout événement'; }
      });
    } else {
      this.api.update(this.editingId, payload).subscribe({
        next: (updated) => {
          if (updated?.id) this.sendInvites(updated.id);
          this.editingId = null;
          this.load();
        },
        error: (err) => { console.log(err); this.errorMsg = 'Erreur modification événement'; }
      });
    }
  }

  remove(id?: number) {
    if (!id) return;
    this.api.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => { console.log(err); this.errorMsg = 'Erreur suppression événement'; }
    });
  }

  loadUsers() {
    this.usersApi.getAll().subscribe({
      next: (data) => { this.users = data ?? []; },
      error: (err) => { console.log(err); this.inviteError = 'Erreur chargement utilisateurs'; }
    });
  }

  get filteredUsers(): UserDto[] {
    const q = (this.inviteSearch || '').toLowerCase().trim();
    if (!q) return this.users ?? [];
    return (this.users ?? []).filter(u =>
      `${u.nom} ${u.prenom} ${u.email} ${u.role}`.toLowerCase().includes(q)
    );
  }

  toggleInviteAll(checked: boolean) {
    this.inviteAll = checked;
    if (checked) {
      this.selectedUserIds.clear();
    }
  }

  toggleUser(id: number) {
    if (this.selectedUserIds.has(id)) {
      this.selectedUserIds.delete(id);
    } else {
      this.selectedUserIds.add(id);
    }
  }

  private sendInvites(eventId: number) {
    const userIds = Array.from(this.selectedUserIds);
    if (!this.inviteAll && userIds.length === 0) return;

    this.inviteSending = true;
    this.inviteError = '';
    this.inviteSuccess = '';

    this.api.invite(eventId, { inviteAll: this.inviteAll, userIds }).subscribe({
      next: () => {
        this.inviteSending = false;
        this.inviteSuccess = 'Invitations envoyees';
      },
      error: (err) => {
        console.log(err);
        this.inviteSending = false;
        this.inviteError = 'Erreur envoi invitations';
      }
    });
  }
}