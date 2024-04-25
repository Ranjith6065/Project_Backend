const Sequelize = require('sequelize');
const config = require('../database');

const _posmaster = config.define('PosMaster', {
    PosCode: Sequelize.STRING(30),
    Description: Sequelize.STRING(30),
    Void: Sequelize.STRING(30),
    createdBy: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedBy: Sequelize.STRING,
    updatedAt: Sequelize.DATE,
    voidedBy: Sequelize.STRING,
    voidedAt: Sequelize.DATE,
}, {
    tableName: 'PosMaster'
});

_posmaster.sync({
    force: config.forcetable,
    alter: config.forcetable,
})

module.exports = {
    _posmaster
}
