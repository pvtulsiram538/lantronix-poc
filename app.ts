import * as express from 'express';
import { Router } from 'express';
import { Application } from 'express';
import * as  helmet from 'helmet';
import logger from "./utils/logger";
import { applyRoutes } from './routes/applyRoutes';




const app: Application = express();
const router: Router = express.Router();

// mount json from the parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//to disable 'X-Powered-By: Express' header to avoid disclosure the app engine */
app.use(helmet());


app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-type, Accept');
    return next();
});


app.use('/', applyRoutes(router));

function erroHandler(err: any, req: Request, res: Response, next: express.NextFunction): void {
    logger.error(`error Handler  catched  `, JSON.stringify(err));
    next(err);
}

export { app };



