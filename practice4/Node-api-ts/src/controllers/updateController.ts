import { Router, Request, Response } from "express";
import db from '../models';
import Controller from "controller.interface";




class updateController implements Controller{
    private Book = db.books
    public path = '/:id'
    public router = Router()


    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.put(
            `${this.path}`,
            this.create
        )
    }

    private create = async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {
                let id = req.params.id
            
                const book = await this.Book.update(req.body, { where: { id: id }})
            
                res.status(200).send(book)
    }
}


export default updateController

