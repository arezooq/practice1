import { Router, Request, Response } from "express";
import db from '../models';
import Controller from "controller.interface";




class PostController implements Controller {
    private Book = db.books
    public path = '/addBook'
    public router = Router()


    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            this.create
        )
    }

    private create = async (
        req: Request,
        res: Response
    ): Promise<Response | void> => {

            let info = {
                title: req.body.title,
                price: req.body.price,
                subtitle: req.body.subtitle,
                author: req.body.author,
                published: req.body.published,
                publisher: req.body.publisher,
                pages: req.body.pages,
                description: req.body.description,
        
            }
        
            const post = await this.Book.create(info)
            res.status(200).send(post)
            console.log(post)
        
    }
}


export default PostController

