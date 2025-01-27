import winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
    transports: [
        new winston.transports.Console()
    ]
});
