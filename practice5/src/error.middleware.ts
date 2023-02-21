import { Request, Response, NextFunction } from "express";
import HttpException from "./utils/http.exception";

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
):void {
        const status = error.status || 404
        const message = error.message || 'Not Found!'
    
        res.status(status).send({
            status,
            message
        })

}

export default errorMiddleware

