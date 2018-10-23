import Oficinas from './views/oficinas';
import PlanVuelo from './views/planvuelo';
import Usuarios from './views/usuarios';
import System from './views/system';
import Personas from './views/personas';

const routes = [
  {
   path: '/oficinas',
   component: Oficinas
  },
  {
   path: '/planvuelo',
   component: PlanVuelo
  },
  {
   path: '/usuarios',
   component: Usuarios
  },
  {
   path: '/system',
   component: System
  },
  {
    path: '/Personas',
    component: Personas
  }
]

export default routes;
