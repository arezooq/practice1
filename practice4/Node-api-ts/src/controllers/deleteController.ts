import { Router, Request, Response } from "express";
import Controller from "controller.interface";
import db from '../models';


class deleteController implements Controller{
    private Book = db.books
    public path = '/:id'
    public router = Router()


    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.delete(
            `${this.path}`,
            this.create
        )
    }

    private create = async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
                let id = req.params.id
                await this.Book.destroy({ where: { id: id}})
            
                res.status(200).send('book is deleted!')
    }
}


export default deleteController

