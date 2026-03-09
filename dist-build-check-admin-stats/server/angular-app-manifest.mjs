
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
    'index.csr.html': {size: 1219, hash: '79a9ad81693b2bdae0674826b742be442aedfcb386fca86979222f2b442d0105', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 951, hash: 'de5cecbd519db39c2345b0aab19ba5ed11d1b0a0113db5bd07cfabeed8c9a727', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 5849, hash: 'cf72196e2727ac264d9a10c6f8f1985e94e319c9c2a48a9dc28c1e166ca3e75a', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'responsable-salle/agenda/index.html': {size: 3996, hash: '1e2829da2f9c96fd911ca98e602259c324c1018ed0787ceffce1e434c6f4817c', text: () => import('./assets-chunks/responsable-salle_agenda_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/index.html': {size: 11247, hash: 'a61ba5581503c63cbd1a56e75b09787ccff5a6e9d8a0bb4a66fdb47926bda60f', text: () => import('./assets-chunks/responsable-securite_evenements_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 6876, hash: 'd90c5809447326e50fd48b3a01c1bee9545ea859bec8582bebeab3aebf276ad2', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/new/index.html': {size: 13209, hash: 'd30f365590aa2a1f18110e686b77a2d4b948c21bfee7172d51145d5b896a1439', text: () => import('./assets-chunks/responsable-salle_evenements_new_index_html.mjs').then(m => m.default)},
    'directeur-dsn/documents/new/index.html': {size: 6537, hash: '5d9b2a382ea58c4ad280b9f1c2b5124422078745286675c166863eaa49185792', text: () => import('./assets-chunks/directeur-dsn_documents_new_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/new/index.html': {size: 12963, hash: '4bb094e92573da77d860f8ed05169d54bdb1d5b5c3f689fea435a2c2ab3b1236', text: () => import('./assets-chunks/responsable-securite_evenements_new_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/new/index.html': {size: 13057, hash: 'cbe8b6f496fd2614b71138bc1b8c5993d241968b010771ccb702952a5a605259', text: () => import('./assets-chunks/directeur-dsn_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/index.html': {size: 11493, hash: 'c16fe816e036023c266970b28b2ab2cff1e356fa9a5c3a678e962c8ee8a09512', text: () => import('./assets-chunks/responsable-salle_evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/salles/index.html': {size: 6175, hash: '4098732660cb9125274509d4ebe05a948ee15f55cf5e3c3b5281cf22405a4347', text: () => import('./assets-chunks/responsable-salle_salles_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/index.html': {size: 11328, hash: '2b63f792708f3adf40ff379c1a3d1550f928a02021acfbe0de838e1f1b800e99', text: () => import('./assets-chunks/directeur-dsn_evenements_index_html.mjs').then(m => m.default)},
    'styles-TOIIHPFL.css': {size: 13538, hash: '+T3mXIHJqCc', text: () => import('./assets-chunks/styles-TOIIHPFL_css.mjs').then(m => m.default)}
  },
};
