const Sequelize = require('sequelize');
const config = require('../database');

const _uommaster = config.define('UOMMaster', {
    UOMCode: Sequelize.STRING(30),
    UOMDesc: Sequelize.STRING(30),
    uommeasurement: Sequelize.STRING(30),
    ConversionFactor: Sequelize.DECIMAL(18, 2),
    Void: Sequelize.STRING(30),
    createdBy: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedBy: Sequelize.STRING,
    updatedAt: Sequelize.DATE,
    voidedBy: Sequelize.STRING,
    voidedAt: Sequelize.DATE,
}, {
    tableName: 'UOMMaster'
});

_uommaster.sync({
    force: config.forcetable,
    alter: config.forcetable,
})

module.exports = {
    _uommaster
}
