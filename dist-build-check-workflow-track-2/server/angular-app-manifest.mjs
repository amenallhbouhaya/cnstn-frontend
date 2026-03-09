
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
    "route": "/responsable-salle/mes-evenements"
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
    "route": "/responsable-securite/mes-evenements"
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
    "route": "/directeur-dsn/mes-evenements"
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
    'index.csr.html': {size: 1219, hash: '5175b7a9e94910d44aa0ed602dbfd47295aa34c595d9fc3dd7d7ad8890f10153', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 951, hash: 'f58f36fc4f970d3b2afffd14f1df177b1e4364bbd43b97f45cef2cb8f9edc304', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 5849, hash: '719d64a21b319a1d90054649ef8ba0788eeb6ab75f725aaadebed08664cd73e6', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 6876, hash: 'ed5d817e70fc3acfe575336d80c1160340acf14dc7efe1109939a2fa90053b3e', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'responsable-salle/agenda/index.html': {size: 4139, hash: '4d1af4b20f8bdee77aa46700926365a8b7d50d657741f227e3525e625c8f5b97', text: () => import('./assets-chunks/responsable-salle_agenda_index_html.mjs').then(m => m.default)},
    'responsable-salle/salles/index.html': {size: 6318, hash: 'ce2987039d01f2a09c3a9069c1531c176f1bd3437128860e1debca9cfd940b1a', text: () => import('./assets-chunks/responsable-salle_salles_index_html.mjs').then(m => m.default)},
    'directeur-dsn/mes-evenements/index.html': {size: 13043, hash: 'ef50c1f27b92073653812417abf85a12a32a69e9859c17fe92fb106ac9130f2f', text: () => import('./assets-chunks/directeur-dsn_mes-evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/new/index.html': {size: 13352, hash: '5a492a5a3849564c22ca0b0dccada447437476ac7543e476587fe9b44793ee04', text: () => import('./assets-chunks/responsable-salle_evenements_new_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/new/index.html': {size: 13192, hash: '2b92be54e7eebfe3af21b2f47ac08049b2db35ecdff6e9dd83b2a3dac304432e', text: () => import('./assets-chunks/directeur-dsn_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/mes-evenements/index.html': {size: 13203, hash: '5a8d53d7747983f825aabc73eea713fe881dc3a91958c704264792fa854df462', text: () => import('./assets-chunks/responsable-salle_mes-evenements_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/index.html': {size: 11396, hash: '94cbaeb342ab35514abaef1f773999415495cdaf68a3584e62c9e360fcd75931', text: () => import('./assets-chunks/responsable-securite_evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/index.html': {size: 11636, hash: '1ffe3947bdae7c2561dcac53e66d1d0a9e2d1a0e36e469e4670e6f5cd4108197', text: () => import('./assets-chunks/responsable-salle_evenements_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/index.html': {size: 11463, hash: 'df1b2922aceb387911111c3dcb9dec9fba864c2358ac368f6225ce2880312c3d', text: () => import('./assets-chunks/directeur-dsn_evenements_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/new/index.html': {size: 13112, hash: '25e2bf5da1741fa50e6f36627d6bf69e82d91f64333bf8db091a0380950b7040', text: () => import('./assets-chunks/responsable-securite_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-securite/mes-evenements/index.html': {size: 12963, hash: '242a09819fb1bfe6277ef513485e9f72779c1ce91d8adbf316d29b7cc3b97194', text: () => import('./assets-chunks/responsable-securite_mes-evenements_index_html.mjs').then(m => m.default)},
    'directeur-dsn/documents/new/index.html': {size: 6672, hash: '4caebf8072f289b026bb6051b71a5cdc0803b270521a80505dbfcb9ba29069fc', text: () => import('./assets-chunks/directeur-dsn_documents_new_index_html.mjs').then(m => m.default)},
    'styles-TOIIHPFL.css': {size: 13538, hash: '+T3mXIHJqCc', text: () => import('./assets-chunks/styles-TOIIHPFL_css.mjs').then(m => m.default)}
  },
};
