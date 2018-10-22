import Roles from './Roles';
let Routes = [
    {
        path:'/system',
        access:[Roles.EMPLEADO,Roles.ADMIN]
    },
    {
        path:'/oficinas',
        access:[Roles.EMPLEADO,Roles.ADMIN]
    },

]
export default Routes;
