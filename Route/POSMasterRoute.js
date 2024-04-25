const express = require('express');
const config = require('../dbconfig');
const sql = require('mssql');
const {
    _posmaster,
} = require('../Model/POSMasterModel');
const Sequelize = require('sequelize');
const {
    QueryTypes
} = require('sequelize');
const Op = Sequelize.Op;


// get all POS
module.exports.Getall = async function (req, res) {
    // let param = req.query;
    try {
        let resp = await _posmaster.findAll();
        res.send({
            Boolval: true,
            returnerror: "",
            data: resp
        });
    }
    catch (err){
        res.send({
            Boolval: false,
            returnerror: err.message
        })
    }
}

module.exports.InsertPOS = async function (req, res) {
    let data = req.body;
    let length = 0;
    try {
        let response = await _posmaster.findAll({
            where: {
                [Op.or]: {
                    PosCode: data.PosCode,
                    Description: data.Description
                }
            }
        });
        length = response.length;
        if (length > 0) {
            res.send({
                Boolval: false,
                returnerror: "POS Code or POS Description already exists"
            });
        } else {
            let resp = await _posmaster.create(data, {
                fields: ['PosCode', 'Description','Void', 'createdBy','createdAt']
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

