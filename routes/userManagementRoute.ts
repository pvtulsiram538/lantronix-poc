import {Router} from 'express' ;
import { userManagement } from '../api/userManagementAPI';

export const applyRegistration = (router:Router) :void => {

router.post('/user/register',userManagement.invoke);
}
