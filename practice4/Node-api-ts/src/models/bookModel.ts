// const { books } = require(".")

function bookModel(sequelize: any, DataTypes: any){

    const Book = sequelize.define("book", {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        subtitle:{
            type: DataTypes.STRING,
            allowNull: false
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false
        },
        published:{
            type: DataTypes.STRING,
            allowNull: false
        },
        publisher:{
            type: DataTypes.STRING,
            allowNull: false
        },
        pages:{
            type: DataTypes.INTEGER
        },
        description:{
            type: DataTypes.TEXT
        },
       
    })

    return Book
}

export default bookModel