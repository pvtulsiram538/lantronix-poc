import { createLogger, format, transports } from "winston";

let initiateLogger = createLogger({
    transports: [
        new transports.File({
            filename: `logs/server-${new Date().toDateString()}.log`,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
            )
        }),
    ]


})

export default initiateLogger;