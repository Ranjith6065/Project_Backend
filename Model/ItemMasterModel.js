const Sequelize = require('sequelize');
const config = require('../database');

const _Itemmaster = config.define('ItemMaster', {
    ItemDescription: Sequelize.STRING(50),
    UOM: Sequelize.STRING(50),
    TaxPercentage: Sequelize.DECIMAL(18,2),
    ItemRate: Sequelize.INTEGER,
    OpenItem: Sequelize.STRING(1),
    DateOfCreation: Sequelize.DATEONLY,
    Void: Sequelize.STRING(1),
    createdBy: Sequelize.STRING(40),
    createdAt: Sequelize.DATE,
    updatedBy: Sequelize.STRING(40),
    updatedAt: Sequelize.DATE,
    voidedBy: Sequelize.STRING(40),
    voidedAt: Sequelize.DATE,
}, {
    tableName: 'ItemMaster'
});

const _ItemmasterRateDet = config.define('ItemRateDetMaster', {
    ItemDescription: Sequelize.STRING(50),
    UOM: Sequelize.STRING(50),
    RPOSCode: Sequelize.STRING(50),
    Rate: Sequelize.INTEGER,
    TaxPercentage: Sequelize.DECIMAL(18,2),
    Void: Sequelize.STRING(1),
    createdBy: Sequelize.STRING(40),
    createdAt: Sequelize.DATE,
    updatedBy: Sequelize.STRING(40),
    updatedAt: Sequelize.DATE,
    voidedBy: Sequelize.STRING(40),
    voidedAt: Sequelize.DATE,
}, {
    tableName: 'ItemRateDetMaster'
});

const _ItemmasterReport = config.define('ItemMasterReport', {
    ItemDescription: Sequelize.STRING,
    FromDate: Sequelize.DATEONLY,
    ToDate: Sequelize.DATEONLY,
    Void: Sequelize.STRING(1),
    createdBy: Sequelize.STRING(40),
    createdAt: Sequelize.DATE,
}, {
    tableName: 'ItemMasterReport'
});

_Itemmaster.sync({
    // force: config.forcetable,
    // alter: config.forcetable,
})

_ItemmasterRateDet.sync({
    // force: config.forcetable,
    // alter: config.forcetable,
})

_ItemmasterReport.sync({
    force: config.forcetable,
    alter: config.forcetable,
})

module.exports = {
    _Itemmaster,
    _ItemmasterRateDet,
    _ItemmasterReport
}
