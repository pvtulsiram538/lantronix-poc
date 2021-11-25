import { Request, Response } from 'express';

class UserManagement {
    public invoke = async(req:Request,res:Response) => {
        try  {
            res.status(200).send("success");
            return;

        } catch(E:Error) {
            res.status(500).send("Something went wrong and the error is",E.message);
            return;

        }

    }

}

export const userManagement : UserManagement = new UserManagement();