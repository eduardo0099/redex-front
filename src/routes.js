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
import Perfil from './views/perfil';
import Simulator from './views/ffsimulator';

const RolesEnum = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  JEFE_OFICINA: 'JEFE_OFICINA',
  GERENTE_GENERAL: 'GERENTE_GENERAL',
  EMPLEADO: 'EMPLEADO'
}

const routes = [
  {
    path: '/perfil',
    component: Perfil,
    name: 'Perfil',
  },
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
  },
  {
    path: '/paises',
    component: Paises,
    name: 'Países'
   },
  {
   path: '/oficinas',
   component: Oficinas,
   name: 'Oficinas',
   roles:[RolesEnum.ADMINISTRADOR,RolesEnum.GERENTE_GENERAL]
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
    name: 'PaquetesNuevo',
    hidden : true,
    roles:[RolesEnum.EMPLEADO,RolesEnum.ADMINISTRADOR]
   },
   {
    path: '/roles',
    component: Roles,
    name: 'Roles',
    roles:[RolesEnum.ADMINISTRADOR]
   },
  {
    path: '/system',
    component: System,
    name: 'Pruebas',
    hidden : true,
    roles:[RolesEnum.ADMINISTRADOR]
   },
   {
     path:'/simulator2',
     component: Simulator,
     hidden: true,
     name: 'FFSimulator',
   }
   
]

export default routes;
