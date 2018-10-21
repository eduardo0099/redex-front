import Roles from './Roles';

export default Routes = [
    {
        path:'/system',
        access:[Roles.EMPLEADO]
    }
]