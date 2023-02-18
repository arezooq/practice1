import express,{ Application } from 'express'
import cors from 'cors'
import Controller from 'controller.interface';


class App {
    public express: Application
    public port: number

    constructor(controllers: Controller[], port: number){
        this.express = express()
        this.port = port || 5000

        this.initialiseMiddleware()
        this.initialiseControllers(controllers)

    }

    private initialiseMiddleware(): void{
        this.express.use(cors())
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true}))   
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api/books', controller.router)
        })
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }
}

export default App
