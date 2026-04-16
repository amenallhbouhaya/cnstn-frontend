import { Routes } from '@angular/router';

import { PublicHomeComponent } from './features/public/public-home/public-home';

import { AdminHomeComponent } from './features/admin/admin-home/admin-home';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout';
import { AdminSallesComponent } from './features/admin/admin-salles/admin-salles';
import { AdminUsersComponent } from './features/admin/admin-users/admin-users';
import { AdminEquipementsComponent } from './features/admin/admin-equipements/admin-equipements';
import { AdminEvenementsComponent } from './features/admin/admin-evenements/admin-evenements';
import { AdminServicesComponent } from './features/admin/admin-services/admin-services';
import { AdminStockPanneComponent } from './features/admin/admin-stock-panne/admin-stock-panne';
import { AdminPostsComponent } from './features/admin/admin-posts/admin-posts';

import { EmployeHomeComponent } from './features/employe/employe-home/employe-home';
import { EmployeLayoutComponent } from './features/employe/employe-layout/employe-layout';
import { EmployeCompteComponent } from './features/employe/employe-compte/employe-compte';
import { EmployeEvenementNewComponent } from './features/employe/employe-evenement-new/employe-evenement-new';
import { EmployeMesEvenementsComponent } from './features/employe/employe-mes-evenements/employe-mes-evenements';
import { EmployeDocumentsComponent } from './features/employe/employe-documents/employe-documents';
import { EmployeInterventionsComponent } from './features/employe/employe-interventions/employe-interventions';
import { EmployeInterventionNewComponent } from './features/employe/employe-intervention-new/employe-intervention-new';
import { NotificationsPageComponent } from './features/notifications/notifications-page';
import { InvitationViewComponent } from './features/invitation/invitation-view';

import { DsnEvenementsPendingComponent } from './features/directeur-dsn/dsn-evenements-pending/dsn-evenements-pending';
import { DsnDocumentNewComponent } from './features/directeur-dsn/dsn-document-new/dsn-document-new';
import { DsnLayoutComponent } from './features/directeur-dsn/dsn-layout/dsn-layout';

import { RsecEvenementsPendingComponent } from './features/responsable-securite/rsec-evenements-pending/rsec-evenements-pending';
import { RsecLayoutComponent } from './features/responsable-securite/rsec-layout/rsec-layout';
import { RsecInvitationCheckComponent } from './features/responsable-securite/rsec-invitation-check/rsec-invitation-check';

import { RsalleEvenementsPendingComponent } from './features/responsable-salle/rsalle-evenements-pending/rsalle-evenements-pending';
import { RsalleLayoutComponent } from './features/responsable-salle/rsalle-layout/rsalle-layout';
import { RsalleAgendaComponent } from './features/responsable-salle/rsalle-agenda/rsalle-agenda';
import { ChefLayoutComponent } from './features/chef-hierarchique/chef-layout/chef-layout';
import { ChefHomeComponent } from './features/chef-hierarchique/chef-home/chef-home';
import { ChefPendingUsersComponent } from './features/chef-hierarchique/chef-pending-users/chef-pending-users';
import { ChefInterventionsComponent } from './features/chef-hierarchique/chef-interventions/chef-interventions';
import { DsnInterventionsComponent } from './features/directeur-dsn/dsn-interventions/dsn-interventions';
import { DsnStockPanneComponent } from './features/directeur-dsn/dsn-stock-panne/dsn-stock-panne';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  { path: '', component: PublicHomeComponent },
  { path: 'invitation/:id', component: InvitationViewComponent, canActivate: [authGuard] },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Admin'] },
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'salles', component: AdminSallesComponent },
      { path: 'equipements', component: AdminEquipementsComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'evenements', component: AdminEvenementsComponent },
      { path: 'interventions/new', component: EmployeInterventionNewComponent },
      { path: 'interventions', component: DsnInterventionsComponent },
      { path: 'services', component: AdminServicesComponent },
      { path: 'posts', component: AdminPostsComponent },
      { path: 'stock-en-panne', component: AdminStockPanneComponent },
      { path: 'compte', component: EmployeCompteComponent }
    ]
  },

  {
    path: 'employe',
    component: EmployeLayoutComponent,
    canActivate: [authGuard, roleGuard],
    canActivateChild: [authGuard, roleGuard],
    data: { roles: ['Employe'] },
    children: [
      { path: '', component: EmployeHomeComponent },
      { path: 'documents', component: EmployeDocumentsComponent },
      { path: 'compte', component: EmployeCompteComponent },
      { path: 'notifications', component: NotificationsPageComponent },

      {
        path: 'evenements',
        children: [
          { path: '', component: EmployeMesEvenementsComponent },
          { path: 'new', component: EmployeEvenementNewComponent }
        ]
      },

      {
        path: 'interventions',
        children: [
          { path: '', component: EmployeInterventionsComponent },
          {
            path: 'new',
            component: EmployeInterventionNewComponent,
            data: {
              roles: [
                'Employe',
                'Admin',
                'ResponsableSalle',
                'ResponsableSecurite',
                'DirecteurDsn',
                'ChefHierarchique',
                'Chef-hierarchique',
                'chef-hierarchique'
              ]
            }
          }
        ]
      }
    ]
  },

  {
    path: 'responsable-salle',
    component: RsalleLayoutComponent,
    canActivate: [authGuard, roleGuard],
    canActivateChild: [authGuard, roleGuard],
    data: { roles: ['ResponsableSalle'] },
    children: [
      { path: '', redirectTo: 'evenements', pathMatch: 'full' },

      { path: 'mes-evenements', component: EmployeMesEvenementsComponent },
      { path: 'notifications', component: NotificationsPageComponent },

      {
        path: 'evenements',
        children: [
          { path: '', component: RsalleEvenementsPendingComponent },
          { path: 'new', component: EmployeEvenementNewComponent }
        ]
      },

      { path: 'interventions/new', component: EmployeInterventionNewComponent },

      { path: 'salles', component: AdminSallesComponent },
      { path: 'agenda', component: RsalleAgendaComponent },
      { path: 'compte', component: EmployeCompteComponent }
    ]
  },

  {
    path: 'responsable-securite',
    component: RsecLayoutComponent,
    canActivate: [authGuard, roleGuard],
    canActivateChild: [authGuard, roleGuard],
    data: { roles: ['ResponsableSecurite'] },
    children: [
      { path: '', redirectTo: 'evenements', pathMatch: 'full' },

      { path: 'mes-evenements', component: EmployeMesEvenementsComponent },
      { path: 'notifications', component: NotificationsPageComponent },

      {
        path: 'evenements',
        children: [
          { path: '', component: RsecEvenementsPendingComponent },
          { path: 'new', component: EmployeEvenementNewComponent }
        ]
      },
      { path: 'interventions/new', component: EmployeInterventionNewComponent },
      { path: 'convocations', component: RsecInvitationCheckComponent },
      { path: 'compte', component: EmployeCompteComponent }
    ]
  },

  {
    path: 'chef-hierarchique',
    component: ChefLayoutComponent,
    canActivate: [authGuard, roleGuard],
    canActivateChild: [authGuard, roleGuard],
    data: { roles: ['ChefHierarchique', 'Chef-hierarchique', 'chef-hierarchique'] },
    children: [
      { path: '', component: ChefHomeComponent },
      { path: 'comptes-en-attente', component: ChefPendingUsersComponent },
      { path: 'interventions', component: ChefInterventionsComponent },
      { path: 'notifications', component: NotificationsPageComponent },
      { path: 'evenements/new', component: EmployeEvenementNewComponent },
      { path: 'interventions/new', component: EmployeInterventionNewComponent },
      { path: 'compte', component: EmployeCompteComponent }
    ]
  },

  {
    path: 'directeur-dsn',
    component: DsnLayoutComponent,
    canActivate: [authGuard, roleGuard],
    canActivateChild: [authGuard, roleGuard],
    data: { roles: ['DirecteurDsn'] },
    children: [
      { path: '', redirectTo: 'evenements', pathMatch: 'full' },

      { path: 'mes-evenements', component: EmployeMesEvenementsComponent },
      { path: 'notifications', component: NotificationsPageComponent },

      {
        path: 'evenements',
        children: [
          { path: '', component: DsnEvenementsPendingComponent },
          { path: 'new', component: EmployeEvenementNewComponent }
        ]
      },
      { path: 'interventions/new', component: EmployeInterventionNewComponent },
      { path: 'stock-en-panne', component: DsnStockPanneComponent },
      { path: 'documents/new', component: DsnDocumentNewComponent },
      { path: 'compte', component: EmployeCompteComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];