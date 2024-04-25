const Sequelize = require('sequelize');
const tedious = require('tedious');


  
  module.exports = new Sequelize('TraningDatabase', 'sa', 'ranjith6065', {
    host: 'localhost',
    dialect: 'mssql',
    port: 1433,
    dialectModule: tedious,
    pool: {
        max: 50,
        min: 0,
        acquire: 1200000,
        idle: 1000000
    },
    dialectOptions: {
        instanceName: 'MSSQLSERVER',
        options: {
            encrypt: false,
            enableArithAbort: false,
            requestTimeout: 300000,
            statement_timeout: 1000,
            idle_in_transaction_session_timeout: 5000
        }
    },
    timezone: '+05:30'
});