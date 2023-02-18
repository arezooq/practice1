import PostController from './controllers/postController'
import GetAllController from './controllers/getAllController'
import GetOneController from './controllers/getOneController'
import updateController from './controllers/updateController'
import deleteController from './controllers/deleteController'
import App from './app'


const app = new App([new PostController(), new GetAllController(), new GetOneController(), new updateController(), new deleteController() ], Number(process.env.PORT))


app.listen()
