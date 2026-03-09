
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
    'index.csr.html': {size: 1219, hash: '43b99f4a37a3baef2c75c057679e71a5cdb2261812b17755ad13f40f29e46fd9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 951, hash: '4980776d9ec7bf4199ef5330665a76852e4be4f5bb54abb34620aaf8d5ee9798', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'register/index.html': {size: 6876, hash: 'b770f2e6bfc9d11e0ec38d77b50de3a92a49d31bf2e6ed59c1cf98a509cf6f6b', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 5849, hash: '201d3f804135ab19487eaf62feb71573b88a38a388244104c49b4989fdd8346a', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/index.html': {size: 11247, hash: '3c8e67ec31051ca5b1564db67263dedef05b6e78bf4294388cc3d1e994ce198f', text: () => import('./assets-chunks/responsable-securite_evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/agenda/index.html': {size: 3996, hash: '834c410f3a6369c6cbb997e4a066a4e4f0660c540a6e79102be78fef7f345956', text: () => import('./assets-chunks/responsable-salle_agenda_index_html.mjs').then(m => m.default)},
    'directeur-dsn/documents/new/index.html': {size: 6537, hash: 'c9413bff3584f816ad76b6fb7712ea0f13c72ae07ea7c90c08694301d8b4a669', text: () => import('./assets-chunks/directeur-dsn_documents_new_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/new/index.html': {size: 12963, hash: '3b611db4adb9c6877a4a3a649a1b57166ca890c31f620aa3621a4c39318689ef', text: () => import('./assets-chunks/responsable-securite_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/salles/index.html': {size: 6175, hash: 'd8e4b23ad1e9d0f662d70ea9b60a21575ba01458d27732453345f4bcc65815af', text: () => import('./assets-chunks/responsable-salle_salles_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/new/index.html': {size: 13209, hash: 'accc803e5979f553969db933c35344a743af71858f33362a28f50988f5f06978', text: () => import('./assets-chunks/responsable-salle_evenements_new_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/new/index.html': {size: 13057, hash: '16d6723c4273acd9130ce97d3c21249c88514d793577e40d0e726f305ee5aec0', text: () => import('./assets-chunks/directeur-dsn_evenements_new_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/index.html': {size: 11328, hash: '236d5d5f89493033b8193f0e48e03b256d0ece1d10424ef7b3c5146a155e03ed', text: () => import('./assets-chunks/directeur-dsn_evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/index.html': {size: 11493, hash: 'e4cdb5925761fac1eb2ac10a408a0855146a98a41945bad87c3c6d0ddc7729d1', text: () => import('./assets-chunks/responsable-salle_evenements_index_html.mjs').then(m => m.default)},
    'styles-VMY3PE2B.css': {size: 13078, hash: 'l/QyXsTzA1c', text: () => import('./assets-chunks/styles-VMY3PE2B_css.mjs').then(m => m.default)}
  },
};
