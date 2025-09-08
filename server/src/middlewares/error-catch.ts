

import {Request, Response, NextFunction} from "express";


import { HttpStatus } from "../constants/http.status";
import { HttpError } from "../utils/error-catch.util";
import { HttpResponse } from "../constants/http.response";

export const errorHandler = (
    err: HttpError | Error,
    _req: Request,
    res: Response,
    /* eslint-disable-next-line */
    _next: NextFunction
) => {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = HttpResponse.SERVER_ERROR;

    if (err instanceof HttpError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        console.log("Unhandled", err);
    }

    res.status(statusCode).json({error: message});
};