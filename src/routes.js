import Oficinas from './views/oficinas';
import PlanVuelo from './views/planvuelo';
import Usuarios from './views/usuarios';
import System from './views/system';

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
]

export default routes;
