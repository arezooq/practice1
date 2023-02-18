
import dbConfig from '../Config/dbConfig'
import { Sequelize, DataTypes, Dialect, OperatorsAliases } from 'sequelize'
import bookModel from './bookModel'

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect as Dialect,
        operatorsAliases: false as unknown as OperatorsAliases,
         
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err =>{
    console.log('Error'+err)
})

const db: any ={}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.books = bookModel(sequelize, DataTypes)


db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



export default db 

