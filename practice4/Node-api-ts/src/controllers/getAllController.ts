import { Router, Request, Response } from "express";
import Controller from "controller.interface";
import db from '../models';




class GetAllController implements  Controller{
    private Book = db.books
    public path = '/allBooks'
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
            let books = await this.Book.findAll({})
            res.status(200).send(books)
        
    }
}


export default GetAllController

