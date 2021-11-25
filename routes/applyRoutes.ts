import {Router} from 'express';
import {userManagement} from './userManagementRoute';



export const applyRoutes = (router: Router) => {
    userManagement(router);
    
    return router;
};