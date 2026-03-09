
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
    "route": "/admin/compte"
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
    "route": "/employe/notifications"
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
    "route": "/responsable-salle/notifications"
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
    "route": "/responsable-salle/compte"
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
    "route": "/responsable-securite/notifications"
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
    "route": "/responsable-securite/compte"
  },
  {
    "renderMode": 2,
    "route": "/chef-hierarchique"
  },
  {
    "renderMode": 2,
    "route": "/chef-hierarchique/comptes-en-attente"
  },
  {
    "renderMode": 2,
    "route": "/chef-hierarchique/notifications"
  },
  {
    "renderMode": 2,
    "route": "/chef-hierarchique/compte"
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
    "route": "/directeur-dsn/notifications"
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
    "route": "/directeur-dsn/compte"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1226, hash: '55068f6b2d4671375a664b1fafb74f23636b65ab591d8c5ee68a6afb9cf8d661', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 958, hash: '1be7f086c22a019b3eedf78d305cf649bc532136ca17b7e9c77dfc2a69be5f0a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 5856, hash: 'ea6bae55e7b9ba395cfe6a7b1a87b004b59b92733b66e94df01eea70195ec3a8', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/new/index.html': {size: 23121, hash: 'a7472f5bf037b043074dc8a487027682bfe98c4b6cb1de9289c31ed09c795b9c', text: () => import('./assets-chunks/responsable-salle_evenements_new_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 6890, hash: '9e8dd9b1515f9c354259166fe17c89046106391df19f17bb76014d34460d7526', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'chef-hierarchique/index.html': {size: 14995, hash: 'b5e7b3fa9f5069cec41e8e3a178ef0b6a1d57f5a1934a4d92e8c1c7c73c57be3', text: () => import('./assets-chunks/chef-hierarchique_index_html.mjs').then(m => m.default)},
    'responsable-securite/notifications/index.html': {size: 20296, hash: 'a281eacaf30701ea84558e969eed14e3b4f6a7bd5b8e60ea9c9001120659ea2d', text: () => import('./assets-chunks/responsable-securite_notifications_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/new/index.html': {size: 21374, hash: 'c835a7acdcf79df3a526df3f8839d89303ae4e8c21d921ca1d16474968bdbfd0', text: () => import('./assets-chunks/responsable-securite_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/salles/index.html': {size: 19803, hash: 'a19af07ab39c87a36ed9cb8abe094fc5d373d674b680fef1d17486ea4a4db36f', text: () => import('./assets-chunks/responsable-salle_salles_index_html.mjs').then(m => m.default)},
    'chef-hierarchique/notifications/index.html': {size: 19519, hash: '9a195663714f067a9016638cc1d65d1e0a6ee238df92a0340c192d4b199554a8', text: () => import('./assets-chunks/chef-hierarchique_notifications_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/index.html': {size: 23313, hash: 'fc1fa757ecedaa0c23cfde33412c243c9b89ef65497f38cbf634c57cddcbb60f', text: () => import('./assets-chunks/directeur-dsn_evenements_index_html.mjs').then(m => m.default)},
    'directeur-dsn/mes-evenements/index.html': {size: 22089, hash: '67cfedbd058c05cf10ce969162d818e94a604ed447136a10fe4f65ae047c003d', text: () => import('./assets-chunks/directeur-dsn_mes-evenements_index_html.mjs').then(m => m.default)},
    'directeur-dsn/documents/new/index.html': {size: 15666, hash: '9a695887deab03981bce557c31c1c52b1306cbdb3dc91b806248a5d21c87dad3', text: () => import('./assets-chunks/directeur-dsn_documents_new_index_html.mjs').then(m => m.default)},
    'responsable-salle/evenements/index.html': {size: 24465, hash: 'd9b4cb58611369cedea8a672d0392739ba34f2a169c45530fe495a105beb7214', text: () => import('./assets-chunks/responsable-salle_evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/mes-evenements/index.html': {size: 23228, hash: '0694850e1629b49478128dfad49ca315fec394da9e2d4a0e8a7b1b44540b7cee', text: () => import('./assets-chunks/responsable-salle_mes-evenements_index_html.mjs').then(m => m.default)},
    'responsable-salle/compte/index.html': {size: 27761, hash: 'ab27b9e61ca8c698b7eb4ccb7724616673465cf59e81c906c5dae2a174b290de', text: () => import('./assets-chunks/responsable-salle_compte_index_html.mjs').then(m => m.default)},
    'directeur-dsn/notifications/index.html': {size: 20904, hash: '6c71381380e08a786085d2905241ecafacb3261cc08b626399850afc38926088', text: () => import('./assets-chunks/directeur-dsn_notifications_index_html.mjs').then(m => m.default)},
    'responsable-securite/evenements/index.html': {size: 22718, hash: '2062b0c162ed417e604118b677aace90d8971010e60690cee66309ce0dcad190', text: () => import('./assets-chunks/responsable-securite_evenements_index_html.mjs').then(m => m.default)},
    'directeur-dsn/compte/index.html': {size: 26622, hash: '4a779a98e558e1c2c52fc9d1ab187ace48d753f3e939c8eefc7f54a36d612d31', text: () => import('./assets-chunks/directeur-dsn_compte_index_html.mjs').then(m => m.default)},
    'chef-hierarchique/comptes-en-attente/index.html': {size: 13800, hash: 'ca4667fdf7aa57f189faee35b99cfb0d912d584c80954f6f04b3b6d5e06dfc4d', text: () => import('./assets-chunks/chef-hierarchique_comptes-en-attente_index_html.mjs').then(m => m.default)},
    'responsable-salle/agenda/index.html': {size: 13863, hash: 'c0a646c6ea41b4ad7e5f81bfeb565547618608b7bc42aee2bba480ffc5e68734', text: () => import('./assets-chunks/responsable-salle_agenda_index_html.mjs').then(m => m.default)},
    'directeur-dsn/evenements/new/index.html': {size: 21982, hash: '291a89289538c7b8222c07b689fa17072ba07baf85b6a4c8d683fceb6e3bb191', text: () => import('./assets-chunks/directeur-dsn_evenements_new_index_html.mjs').then(m => m.default)},
    'responsable-securite/mes-evenements/index.html': {size: 21481, hash: '2a578bb34dab9977a8ac64001a9aa73cf4948a31de0803cd3c17a60038694701', text: () => import('./assets-chunks/responsable-securite_mes-evenements_index_html.mjs').then(m => m.default)},
    'responsable-securite/compte/index.html': {size: 26014, hash: '965f4a1113059a8ae5d18aa3a0d593805aef2b07d7699274fce220623021f24e', text: () => import('./assets-chunks/responsable-securite_compte_index_html.mjs').then(m => m.default)},
    'responsable-salle/notifications/index.html': {size: 22043, hash: 'fa3fa0f710c765412ffb06d1195ecd419cee53a7912179c1e2bbd004b72b06b1', text: () => import('./assets-chunks/responsable-salle_notifications_index_html.mjs').then(m => m.default)},
    'chef-hierarchique/compte/index.html': {size: 25237, hash: '3e6161fb6e907bf64b5cf10fd7c566703368c25be15ed3a05909af2f2a185b1c', text: () => import('./assets-chunks/chef-hierarchique_compte_index_html.mjs').then(m => m.default)},
    'styles-TOIIHPFL.css': {size: 13538, hash: '+T3mXIHJqCc', text: () => import('./assets-chunks/styles-TOIIHPFL_css.mjs').then(m => m.default)}
  },
};
