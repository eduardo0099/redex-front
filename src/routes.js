import Oficinas from './views/oficinas';
import PlanVuelo from './views/planvuelo';
import Usuarios from './views/usuarios';
import System from './views/system';
import Personas from './views/personas';
import Dashboard from './views/dashboard';
import Simulacion from './views/simulacion';
import Paquetes from './views/paquetes';
import VuelosAgendados from './views/vuelosagendados';
import PaquetesNuevo from './views/paquetes/PaquetesNuevo';
import Roles from './views/roles';
import Paises from './views/paises';

const RolesEnum = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  JEFE_OFICINA: 'JEFE_OFICINA',
  GERENTE_GENERAL: 'GERENTE_GENERAL',
  EMPLEADO: 'EMPLEADO'
}

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    roles: [RolesEnum.ADMINISTRADOR]
  },
  {
    path: '/personas',
    component: Personas,
    name: 'Personas',
    roles: [RolesEnum.EMPLEADO]
  },
  {
    path: '/paises',
    component: Paises,
    name: 'Países'
   },
  {
   path: '/oficinas',
   component: Oficinas,
   name: 'Oficinas'
  },
  {
   path: '/planvuelo',
   component: PlanVuelo,
   name: 'Plan de vuelo',
   roles: [RolesEnum.ADMINISTRADOR, RolesEnum.GERENTE_GENERAL]
  },
  {
    path: '/vuelosagendados',
    component: VuelosAgendados,
    name: 'Vuelos agendados'
   },
  {
    path: '/simulacion',
    component: Simulacion,
    name: 'Simulación',
    roles: [RolesEnum.ADMINISTRADOR]
  },
  {
    path: '/usuarios',
    component: Usuarios,
    name: 'Usuarios',
    roles: [RolesEnum.ADMINISTRADOR]
  },
  {
    path: '/paquetes',
    component: Paquetes,
    name: 'Paquetes'
   },
   {
    path: '/paquetes/nuevo',
    component: PaquetesNuevo,
    name: 'PaquetesNuevo'
   },
   {
    path: '/roles',
    component: Roles,
    name: 'Roles'
   },
  {
    path: '/system',
    component: System,
    name: 'Pruebas'
   },
   
]

export default routes;
