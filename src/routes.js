import Oficinas from './views/oficinas';
import PlanVuelo from './views/planvuelo';
import Usuarios from './views/usuarios';
import System from './views/system';

const routes = {
  Oficinas: {
   path: '/oficinas',
   component: Oficinas
  },
  PlanVuelo: {
   path: '/planvuelo',
   component: PlanVuelo
  },
  Usuarios: {
   path: '/usuarios',
   component: Usuarios
  },
  Usuarios: {
   path: '/system',
   component: System
  },
}

export default routes;
