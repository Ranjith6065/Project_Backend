const express = require('express');
const config = require('../dbconfig');
const sql = require('mssql');
const {
    _uommaster,
} = require('../Model/UOMMasterModel');

const Sequelize = require('sequelize');
const {
    QueryTypes
} = require('sequelize');
const Op = Sequelize.Op;

// get all UOM
module.exports.Getall = async function (req, res) {
    // let param = req.query;
    try {
        let resp = await _uommaster.findAll();
        res.send({
            Boolval: true,
            returnerror: "",
            data: resp
        });
    }
    catch (err){
        res.send({
            Boolval: false,
            message: err.message
        })
    }
}

module.exports.Insertuom = async function (req, res) {
    let data = req.body;
    let length = 0;
    try {
        let response = await _uommaster.findAll({
            where: {
                [Op.or]: {
                    UOMCode: data.UOMCode
                }
            }
        });
        length = response.length;
        if (length > 0) {
            res.send({
                Boolval: false,
                returnerror: "UOM Code  already exists"
            });
        } else {
            let resp = await _uommaster.create(data, {
                fields: ['UOMCode', 'UOMDesc', 'uommeasurement','Void', 'createdBy','createdAt']
            });
            res.send({
                Boolval: true,
                returnerror: ""
            })
        }
    } 
    catch (err) {
        res.send({
            Boolval: false,
            returnerror: err.message
        });
    }
}

