import { MongoClient } from 'mongodb'
import config from "../utils/config";
import logger from "../utils/logger";

const url = `mongodb://${config.DB_URL}:${config.DB_PORT}`;
const client = new MongoClient(url);
const dbName = config.DB_NAME;

class DBClient {
    public db: any;

    public init = async () => {
        try {
            await client.connect();
            logger.info(`MONGODB connected successfully with port ${config.DB_PORT}`);
            console.info(`MONGODB connected successfully with port ${config.DB_PORT}`);
            console.log(process.pid);

            this.db = client.db(dbName);

        } catch (E) {
            logger.error(`MONGODB  connection failed  due to  ${E.meesage}`);
            console.error(`MONGODB  connection failed  due to  ${E.meesage}`);
            process.exit(1);

        }

    }

}

export const dbClient: DBClient = new DBClient();
