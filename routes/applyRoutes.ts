import {Router} from 'express';
import {applyRegistration} from './userManagementRoute';



export const applyRoutes = (router: Router) => {
    applyRegistration(router);
    
    return router;
};