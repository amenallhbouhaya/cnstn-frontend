import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'invitation/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'employe/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'responsable-salle/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'responsable-securite/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'directeur-dsn/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'chef-hierarchique/**',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
