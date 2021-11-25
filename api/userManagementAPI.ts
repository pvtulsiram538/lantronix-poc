import { Request, Response } from 'express';
import { saveUser } from "../user-management/register";
import { login } from "../user-management/login";

class UserManagement {
    public register = async (req: Request, res: Response) => {
        try {

            if (!req.body?.username || !req.body?.password || !req.body?.email) {
                res.status(422).send({
                    status: 'failure',
                    message: 'mandatory fields are missing'
                });
                return;
            }

            let result = await saveUser.invoke(req.body);
            res.status(result.statusCode).send(result);
            return;

        } catch (E: any) {
            res.status(500).send(`${E.message}`);
            return;

        }

    }

    /**
     * login user
     */
    public login = async (req: Request, res: Response) => {
        try {

            if (!req.body?.username || !req.body?.password) {
                res.status(422).send({
                    status: 'failure',
                    message: 'mandatory fields are missing'
                });
                return;
            }

            let result = await login.invoke(req.body);
            res.status(result.statusCode).send(result);
            return;

        } catch (E: any) {
            res.status(500).send(`${E.message}`);
            return;

        }

    }

}

export const userManagement: UserManagement = new UserManagement();