import Oficinas from './views/oficinas';
import PlanVuelo from './views/planvuelo';
import Usuarios from './views/usuarios';

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
}

export default routes;
