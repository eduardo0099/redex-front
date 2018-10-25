import Oficinas from './views/oficinas';
import PlanVuelo from './views/planvuelo';
import Usuarios from './views/usuarios';
import System from './views/system';
import Personas from './views/personas';
import Dashboard from './views/dashboard';
import Simulacion from './views/simulacion';
import Paquetes from './views/paquetes';
import PaquetesNuevo from './views/paquetes/PaquetesNuevo';

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard'
  },
  {
    path: '/personas',
    component: Personas,
    name: 'Personas'
  },
  {
   path: '/oficinas',
   component: Oficinas,
   name: 'Oficinas'
  },
  {
   path: '/planvuelo',
   component: PlanVuelo,
   name: 'Plan de vuelo'
  },
  {
    path: '/simulacion',
    component: Simulacion,
    name: 'Simulación'
  },
  {
    path: '/usuarios',
    component: Usuarios,
    name: 'Usuarios'
  },
  {
    path: '/paquetes',
    component: Paquetes,
    name: 'Paquetes'
   },
   {
    path: '/paquetes/Nuevo',
    component: PaquetesNuevo,
    name: 'PaquetesNuevo'
   },
  {
    path: '/system',
    component: System,
    name: 'Pruebas'
   },
   
]

export default routes;
