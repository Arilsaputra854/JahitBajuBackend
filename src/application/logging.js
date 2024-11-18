import winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.prettyPrint(), // Membuat JSON lebih rapi
        winston.format.colorize({ all: true }) // Menambahkan warna pada output
    ),
    transports: [
        new winston.transports.Console()
    ]
});
