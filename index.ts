var cluster = require('cluster');
var isMaster = cluster.isMaster;
import { cpus } from 'os';
import { app } from './app';
import logger from "./utils/logger";
import config from "./utils/config";
import { dbClient } from "./database";





/**
 * Stores workers
 * @type {Set}
 */
const workers: Set<any> = new Set();


if (isMaster) {
    startWorker();

} else {

    /**
     * START the DB server
     */
    dbClient.init();
    app.listen(config.SERVER_PORT, () => {

        logger.info(`Magic happens on port `, config.SERVER_PORT);
        console.log(`Magic happens on port `, config.SERVER_PORT);
    })
}

function startWorker() {
    const nofWorkers: Number = cpus().length;
    logger.info(`Master cluster setting up workers`, nofWorkers);

    for (let i = 0; i < nofWorkers; i++) {
        const newWorker: any = cluster.fork();
        const { process: { pid } } = newWorker;
        workers.add(process.pid);

    }
    cluster.on('online', (worker: any) => {
        logger.info(`worker  ${worker.process.pid} is online`);
    });

    cluster.on('exit', (deadworker: any, code: any, signal: any) => {

        if (code !== 0 && !deadworker.exitedAfterDisConnect) {
            logger.error(`worked killed---`, deadworker.process.pid);
            delete workers[deadworker.process.pid];
            let worker = cluster.fork();
            logger.info(`starting new worker `, worker.process.pid);

        } else {
            logger.info(`worker killed forcefully`);
        }

    });
}


process.on('uncaughtException', (reason) => {
    logger.error(`uncaught exception due to `, JSON.stringify(reason));
    /**
     * shutting down the master process
     */
    process.exit(1);

});

process.on('unhandledRejection', (reason) => {
    logger.error('unhandledRejections   ', JSON.stringify(reason));

});


