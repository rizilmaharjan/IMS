import { Request, Response, NextFunction } from "express";

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware Error handling");
    const errStatus = res.statusCode || 500; // Use res.statusCode
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    });
};
