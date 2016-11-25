module.exports = function (sequelize, DataTypes) { 

   return sequelize.define("myTable",   {  //create the first table
        name: {     //define a column
            type: DataTypes.STRING,  //define a data type of column
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        person: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
};