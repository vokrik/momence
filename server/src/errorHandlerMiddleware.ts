import {ExternalResourceUnavailableError} from "./exchangeRates";
import {NextFunction, Request, Response} from "express";

export default function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ExternalResourceUnavailableError) {
        return res.status(503).send({message: "Service temporarily unavailable"});
    }

    res.status(500).send({message: "Something went wrong"});
}