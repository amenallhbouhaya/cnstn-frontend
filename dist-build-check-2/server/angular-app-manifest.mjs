
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
    'index.csr.html': {size: 1219, hash: '56e3c16cdc805a7de708b47b487dc9c3b97f358a5f0ff77b73eb420b65648520', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 951, hash: 'bceebd3732eadff580d2ca7c0d7b91be997797ef56db181e3242df92fd56114c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 5849, hash: '9732f340cc2e5d8995ec06c8d6ca28ebf01b7e280bb27e0c7c7bbbd77111f321', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 6876, hash: '90b0e9f3bd321a9a99444b3173a60164f4f4eff51cee44aca4a6516858866f56', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'responsable-salle/agenda/index.html': {size: 3663, hash: 'd4638cfed3ec0f5d080646025913197184e0b9942a60274fb5b8737f627499dd', text: () => import('./assets-chunks/responsable-salle_agenda_index_html.mjs').then(m => m.default)},
    'directeur-dsn/documents/new/index.html': {size: 6537, hash: 'e4e1a42699099d5cd3548c2e68f856ffb6e5b4993845169f3c0ffa2c40aaad79', text: () => import('./assets-chunks/directeur-dsn_documents_new_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/index.html': {size: 10122, hash: '9a7de49edb5e43d4806b555b8b9bfdc59f031fee24fdef5c4d261e3b369be3fd', text: () => import('./assets-chunks/responsable-securite_evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/new/index.html': {size: 13209, hash: '9cf023a7fefd6a9b99d48ecebfff4585f58893b6a44bec4a3eab6febaa1718c4', text: () => import('./assets-chunks/responsable-salle_evenements_new_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/new/index.html': {size: 13057, hash: '13f00e7d6a04a9848ae0f633e127c81fe9377d1edbe4c08be4cf9aebd6318cca', text: () => import('./assets-chunks/directeur-dsn_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/new/index.html': {size: 12963, hash: 'a88c60aee4f67eb1b7e1205f302347b47b782c2031f561395fc545446df126dc', text: () => import('./assets-chunks/responsable-securite_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/salles/index.html': {size: 6175, hash: 'e8199456c0fb5f76b0bc5c851f3a2bbd48fff5e9b4afa6ec331fdf6da3dc2354', text: () => import('./assets-chunks/responsable-salle_salles_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/index.html': {size: 10203, hash: 'f5690691eb07e1af0573861fce8e89752b60c1b1fe4964939f35291f7a957f32', text: () => import('./assets-chunks/directeur-dsn_evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/index.html': {size: 10368, hash: '3bebe3295affd5bd88554899143487e02d08a116e21d3f6add8ca397795b1fa7', text: () => import('./assets-chunks/responsable-salle_evenements_index_html.mjs').then(m => m.default)},
    'styles-VMY3PE2B.css': {size: 13078, hash: 'l/QyXsTzA1c', text: () => import('./assets-chunks/styles-VMY3PE2B_css.mjs').then(m => m.default)}
  },
};
