import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Router } from 'express';
import { Application } from 'express';
import {helmet} from 'helmet';
import {applyRoutes} from './routes/applyRoutes';



const app: Application = express();
const router: Router

// mount json from the parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//to disable 'X-Powered-By: Express' header to avoid disclosure the app engine */
app.use(helmet());


app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-type, Accept');
    return next();
});
app.use('/',applyRoutes(router));
