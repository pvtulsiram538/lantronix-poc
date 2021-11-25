import { dbClient } from "../database";
import { COLLECTTIONS } from "../utils/config";
import { MongoServerError } from "mongodb";
import logger from "../utils/logger";
import { v4 as uuidv4 } from 'uuid';

class SaveUser {
    private collection: any;
    private tokens: any;

    /**
     * registe the new user
     */
    public invoke = async (user: any) => {
        try {

            this.collection = dbClient.db.collection(COLLECTTIONS.users);
            this.tokens = dbClient.db.collection(COLLECTTIONS.tokens);

            let uuid = uuidv4(); // generate an unique id for every user

            let usernameExists = await this.collection.findOne({ "username": user.username });

            if (usernameExists) {
                return {
                    statusCode: 400,
                    status: 'failure',
                    message: 'username already exists try different'
                }

            }

            let result = await this.collection.insertOne(user);

            if (result.acknowledged) {

                await this.tokens.insertOne({
                    token: uuid,
                    uid: result.insertedId.toString()
                })

                return {
                    statusCode: 200,
                    status: 'success',
                    message: "A verification mail has been sent to your registered mail"
                };

            } else {
                return {
                    statusCode: 400,
                    status: 'failure',
                    message: "Failed to insert the user"
                };

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

export const saveUser: SaveUser = new SaveUser();