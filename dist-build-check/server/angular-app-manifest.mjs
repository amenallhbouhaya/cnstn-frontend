
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
    'index.csr.html': {size: 1219, hash: '540e2516fa9243a1db6766d9a21fb7df46752aa84c446282a852aa88f91560a3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 951, hash: '63aac0572b9ae2482f8821cc84ec2c0fb94758a34871b7942c4687fd5715e1cc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 5849, hash: '9c7998c94478fc90ed6c35480e9a9b4b2ae808fc77981d800776e30338bf4db4', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 6876, hash: 'a524e8062d7b017d4dd106b767632aa42abda9b019feec77ae402ff74a7c7b14', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'responsable-salle/agenda/index.html': {size: 3663, hash: 'a17fc3ba012d6f3b33cda5ddd06e5ba1c617f1172025b5ae36c05826acc193f1', text: () => import('./assets-chunks/responsable-salle_agenda_index_html.mjs').then(m => m.default)},
    'directeur-dsn/documents/new/index.html': {size: 6537, hash: '091e53029265c227846d49feec32653d7d16c6f039a15af75e4adc78660a3824', text: () => import('./assets-chunks/directeur-dsn_documents_new_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/index.html': {size: 10063, hash: '40f4439fa053ebf9fa4c0c7a6a3938788136e7ca1d9fe90e7a1258ce772c2f7c', text: () => import('./assets-chunks/responsable-securite_evenements_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/new/index.html': {size: 12963, hash: 'a8cb9355d7a73fbef95df4f73a0e05209e85248e379d22543b380bb379eca65e', text: () => import('./assets-chunks/responsable-securite_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/new/index.html': {size: 13209, hash: '2155f10715ec5747d92a7fba7d609bd8e66c68e366902419d5c4ee5883c854f6', text: () => import('./assets-chunks/responsable-salle_evenements_new_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/new/index.html': {size: 13057, hash: 'c4cf16f0c1f2fe9b24fcc34be218762987a1af817c62c0fd6848ff7f3e4a8f1d', text: () => import('./assets-chunks/directeur-dsn_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/salles/index.html': {size: 6175, hash: 'bf6047773ca346b457bd35c97434b3f4314f787f971efdc0d45f58acece511a7', text: () => import('./assets-chunks/responsable-salle_salles_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/index.html': {size: 10309, hash: '0212b11b5fdc5acc852e4bdb88b6f23d31695575643c903f2223e3c3e90be2d7', text: () => import('./assets-chunks/responsable-salle_evenements_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/index.html': {size: 10203, hash: '040f1f2161eec53825afb9dd246062217c70a47f5b9fa546778952d022956e38', text: () => import('./assets-chunks/directeur-dsn_evenements_index_html.mjs').then(m => m.default)},
    'styles-VMY3PE2B.css': {size: 13078, hash: 'l/QyXsTzA1c', text: () => import('./assets-chunks/styles-VMY3PE2B_css.mjs').then(m => m.default)}
  },
};
