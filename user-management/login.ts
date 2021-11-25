import { dbClient } from "../database";
import { COLLECTTIONS } from "../utils/config";
import { MongoServerError } from "mongodb";
import logger from "../utils/logger";

class Login {
    private collection: any;
    private tokens: any;

    /**
     * login user
     */
    public invoke = async (data: any) => {
        try {
            this.collection = dbClient.db.collection(COLLECTTIONS.users);
            let user = await this.collection.findOne({ 'username': data.username });

            if (!user) {
                return {
                    statusCode: 404,
                    satus: 'failure',
                    message: 'user not found'
                }
            } else {
                if (user.password === data.password) {
                    this.tokens = dbClient.db.collection(COLLECTTIONS.tokens);

                    let { token = "" } = await this.tokens.findOne({ uid: user._id.toString() })

                    if (!token) {
                        throw new Error("Cannot fetch the token");
                    }
                    return {

                        status: "success",
                        statusCode: 200,
                        token: token,
                        user

                    }
                } else {
                    return {
                        status: 'failure',
                        message: 'wrong password',
                        statusCode: 401
                    }
                }
            }




        } catch (error) {

            if (error instanceof MongoServerError) {
                logger.error(`Error worth logging: ${error}`); // special case for some reason
                throw new Error('failed to insert the data');
            }

            throw error;

        }

    }
}

export const login: Login = new Login();