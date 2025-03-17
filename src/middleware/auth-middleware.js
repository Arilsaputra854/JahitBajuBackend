import { prismaClient } from "../application/database.js"

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            errors: true,
            message: "Unauthorized",
        }).end();
    }

    const token = authHeader.split(" ")[1];

    const user = await prismaClient.user.findFirst({
        where: { token: token }
    });

    if (!user) {
        return res.status(401).json({
            errors: true,
            message: "Unauthorized",
        }).end();
    }

    req.user = user;
    next();
};
