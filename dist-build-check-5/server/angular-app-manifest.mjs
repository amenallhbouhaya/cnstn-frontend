
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 1,
    "route": "/admin"
  },
  {
    "renderMode": 1,
    "route": "/admin/salles"
  },
  {
    "renderMode": 1,
    "route": "/admin/equipements"
  },
  {
    "renderMode": 1,
    "route": "/admin/users"
  },
  {
    "renderMode": 1,
    "route": "/admin/evenements"
  },
  {
    "renderMode": 1,
    "route": "/admin/services"
  },
  {
    "renderMode": 1,
    "route": "/employe"
  },
  {
    "renderMode": 1,
    "route": "/employe/documents"
  },
  {
    "renderMode": 1,
    "route": "/employe/compte"
  },
  {
    "renderMode": 1,
    "route": "/employe/evenements"
  },
  {
    "renderMode": 1,
    "route": "/employe/evenements/new"
  },
  {
    "renderMode": 1,
    "route": "/employe/interventions"
  },
  {
    "renderMode": 1,
    "route": "/employe/interventions/new"
  },
  {
    "renderMode": 2,
    "redirectTo": "/responsable-salle/evenements",
    "route": "/responsable-salle"
  },
  {
    "renderMode": 2,
    "route": "/responsable-salle/evenements"
  },
  {
    "renderMode": 2,
    "route": "/responsable-salle/evenements/new"
  },
  {
    "renderMode": 2,
    "route": "/responsable-salle/salles"
  },
  {
    "renderMode": 2,
    "route": "/responsable-salle/agenda"
  },
  {
    "renderMode": 2,
    "redirectTo": "/responsable-securite/evenements",
    "route": "/responsable-securite"
  },
  {
    "renderMode": 2,
    "route": "/responsable-securite/evenements"
  },
  {
    "renderMode": 2,
    "route": "/responsable-securite/evenements/new"
  },
  {
    "renderMode": 2,
    "redirectTo": "/directeur-dsn/evenements",
    "route": "/directeur-dsn"
  },
  {
    "renderMode": 2,
    "route": "/directeur-dsn/evenements"
  },
  {
    "renderMode": 2,
    "route": "/directeur-dsn/evenements/new"
  },
  {
    "renderMode": 2,
    "route": "/directeur-dsn/documents/new"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1219, hash: '5f15f38c6588e39c894478af672c35a024c78c68551360636204f516d3be23fc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 951, hash: '4604975654cc33c0450a3eb6196962101eb1e2a13e8847aeddd10da5c26613d8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 5849, hash: '7c5c14b2af6f85b476d5cbbacc0514cce1a1c1fad242cc9993e5940e6e191fcb', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'responsable-salle/agenda/index.html': {size: 3996, hash: '47dbaf87acce2af1d444f6f405161045fd02072549416982eece32604fc2cd06', text: () => import('./assets-chunks/responsable-salle_agenda_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 6876, hash: '3ee229b368fb781310be2921bed66a7b58c881e56f71c2d60d30283c463a13f8', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/index.html': {size: 11247, hash: '01250415f7637b0dc2445204f62ed9e4c5575ad56505c8aa1a7127992762c4c1', text: () => import('./assets-chunks/responsable-securite_evenements_index_html.mjs').then(m => m.default)},
    'directeur-dsn/documents/new/index.html': {size: 6537, hash: 'b90eaa5cb567df12720a1d069a5109354f6469c63b10c4539c9bf867a708efea', text: () => import('./assets-chunks/directeur-dsn_documents_new_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/new/index.html': {size: 12963, hash: '5119a7545aad1a52f90ca146bccfadd4baca5aea1aa894d6e82056b094c9e0ef', text: () => import('./assets-chunks/responsable-securite_evenements_new_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/new/index.html': {size: 13057, hash: '96005fb6ffb9dc9b16494952176e5ae8b88bf4c7ccbcc64d5d7f8cd629338b8a', text: () => import('./assets-chunks/directeur-dsn_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/new/index.html': {size: 13209, hash: '0f00eeee47faba8d0eaeddcd595edd7f9994bde4556d69b642f1dbb8f43d9f5e', text: () => import('./assets-chunks/responsable-salle_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/salles/index.html': {size: 6175, hash: '5db7a4d50e8761fe0f327ae8aaa21ede85035f78e726e3540a46236948ba7fc3', text: () => import('./assets-chunks/responsable-salle_salles_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/index.html': {size: 11328, hash: '285feed487ba7e11f7bbc5682fc20f1e52ffb15d9fee010943705fc2e4545aac', text: () => import('./assets-chunks/directeur-dsn_evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/index.html': {size: 11493, hash: 'ffaabf7a89735bb5a3e7694111cc36b4235466f862439e9de5772d3c4eddb3c7', text: () => import('./assets-chunks/responsable-salle_evenements_index_html.mjs').then(m => m.default)},
    'styles-VMY3PE2B.css': {size: 13078, hash: 'l/QyXsTzA1c', text: () => import('./assets-chunks/styles-VMY3PE2B_css.mjs').then(m => m.default)}
  },
};
