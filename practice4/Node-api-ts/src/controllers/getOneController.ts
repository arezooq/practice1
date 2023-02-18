import { Router, Request, Response } from "express";
import db from '../models';
import Controller from "controller.interface";




class GetOneController implements Controller{
    private Book = db.books
    public path = '/:id'
    public router = Router()


    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}`,
            this.create
        )
    }

    private create = async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
                let id = req.params.id
                let book = await this.Book.findOne({ where: { id: id}})
            
                res.status(200).send(book)
    }
}


export default GetOneController

