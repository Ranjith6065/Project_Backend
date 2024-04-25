var db = require('../NodeJs/database');
const sql = require('mssql');
const express = require('express');
const {
    _ItemmasterRateDet, _Itemmaster, _ItemmasterReport
} = require('../NodeJs/Model/ItemMasterModel');

const Sequelize = require('sequelize');
const {
    QueryTypes
} = require('sequelize');
const Op = Sequelize.Op;




module.exports.GetAll = async function (req, res) {
    try {
        let resp = await _Itemmaster.findAll({
            order: [
                ['createdAt', 'DESC']
            ],});
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


module.exports.GetByid = async function (req, res) {
    let param = req.query;
    try {
        let resp = await _Itemmaster.findAll({
            where: {
                ItemDescription: param.ItemDescription,
            }
        });
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

module.exports.GetByDetid = async function (req, res) {
    let param = req.query;
    console.log('P:',param)
    try {
        let resp = await _ItemmasterRateDet.findAll({
            where: {
                ItemDescription: param.ItemDescription,
            }
        });
        console.log("res:",resp);
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

module.exports.GetExportbyID = async function (req, res) {
    let param = req.query;
    let resp;
    let resp2;
    try {
        if(param.ItemDescription == '0'){
            resp = await _Itemmaster.findAll({});
            resp2 = await _ItemmasterRateDet.findAll({});
        } else {
            resp = await _Itemmaster.findAll({
                where: {
                    ItemDescription: param.ItemDescription,
                }
            });
            resp2 = await _ItemmasterRateDet.findAll({
                where: {
                    ItemDescription: param.ItemDescription,
                }
            });
        }
        res.send({
            Boolval: true,
            returnerror: "",
            HDR: resp,
            DET: resp2
        });
    }
    catch (err){
        res.send({
            Boolval: false,
            message: err.message
        })
    }
}

module.exports.Insertitem = async function (req, res) {
    let data = req.body;
    let length = 0;
    try {
        let response = await _Itemmaster.findAll({
            where: {
                [Op.or]: {
                    ItemDescription: data.ItemDescription
                }
            }
        });
        length = response.length;
        if (length > 0) {
            res.send({
                Boolval: false,
                returnerror: "Item Description already exists"
            });
        } else {

            let resp = await _Itemmaster.create(data, {
                fields: ['ItemDescription', 'UOM', 'TaxPercentage','ItemRate','OpenItem','DateOfCreation','Void', 'createdBy','createdAt']
            });
            let respdet = await _ItemmasterRateDet.bulkCreate(data.POSItemGrid, {
                fields: ['ItemDescription', 'RPOSCode', 'Rate', 'TaxPercentage','Void', 'createdBy','createdAt']
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
module.exports.Updateitem = async function (req, res) {
    let data = req.body;
    let length = 0;
    try {
        let response = await _Itemmaster.findAll({
            where: {
                [Op.or]: {
                    ItemDescription: data.ItemDescription
                }
            }
        });
        length = response.length;
        if (length == 0) {
            res.send({
                Boolval: false,
                returnerror: "Please refresh and Insert data again."
            });
        } else {
            let response = await _ItemmasterRateDet.destroy({
                where: {
                    // [Op.or]: {
                    //     ItemDescription: data.ItemDescription
                    // }
                    ItemDescription: data.ItemDescription
                }
            });
            let resp = await _Itemmaster.update(data, {
                where: {
                    ItemDescription: data.ItemDescription
                }
            });
            let respdet = await _ItemmasterRateDet.bulkCreate(data.POSItemGrid, {
                fields: ['ItemDescription', 'RPOSCode', 'Rate', 'TaxPercentage','Void', 'createdBy','createdAt','updatedBy','updatedAt']
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


module.exports.Delete = async function (req, res) {
    let entity = req.body;
 
    try {
        let resp = await _Itemmaster.update({
            Void: entity.Void,
            voidedBy: entity.voidedBy,
            voidedAt: new Date()
        }, {
            where: {
                ItemDescription: entity.ItemDescription
            }
        });
        let resp2 = await _ItemmasterRateDet.update({
            Void: entity.Void,
            voidedBy: entity.voidedBy,
            voidedAt: new Date()
        }, {
            where: {
                ItemDescription: entity.ItemDescription
            }
        });
        res.send({
            Boolval: true,
            returnerror: ""
        })
    }
    catch (err) {
        res.send({
            Boolval: false,
            returnerror: err.message
        });
    }
}


module.exports.setReport = async function (req, res) {
    let data = req.body;
    console.log("data1:",data);
    let entity = [];
    try {
        for (let i=0; i< data.ItemDetails.length; i++){
            if (data.ItemDetails[i].isChecked == true){
                console.log("in:");
                let obj = {
                ItemDescription: data.ItemDetails[i].ItemDescription,
                FromDate: data.FromDate,
                ToDate: data.ToDate,
                createdBy: data.createdBy
            }
            console.log("in1:");
            entity.push(obj);
        }
    }
            let dltres = await _ItemmasterReport.destroy({
                where: {}
            });
            console.log("data:",entity);
            let respdet = await _ItemmasterReport.bulkCreate(entity);
            res.send({
                Boolval: true,
                returnerror: ""
            })
    } 
    catch (err) {
        res.send({
            Boolval: false,
            returnerror: err.message
        });
    }
}

module.exports.GetView = async function (req, res) {
    let param = req.query;
    console.log("P:",param);
    try {
        let qry = '';
        qry = "exec Proc_GetItemmasterReport '" + param.Type + "','" + param.FromDate + "','" + param.ToDate + "';"
        let response = await db.query(qry);
        response = response[0];
        res.send(response);
    }
    catch (err){
        res.send( err.message );
    }
}



// module.exports.GetView = async function (req, res) {
//     let param = req.query;
//     console.log("P:",param);
//     try {
//         let qry = '';
//         qry = "exec Proc_GetItemmasterReport '" + "param.Type" + "','" +"2022-07-01"+ "','" + "2022-08-03" + "';"
//         let response = await db.query(qry);
//         response = response[0];
//         res.send(response[0]);
//     }
//     catch (err){
//         res.send(err.message);
//     }
// }

// async function Voiditem(item) {
//     try {
//         let pool = await sql.connect(config);
//         let voidItem = await pool.request()
//             .input('ItemId', sql.Int, item.ItemId)
//             .input('ItemDescription', sql.NVarChar, item.ItemDescription)
//             .input('Void', sql.NVarChar, item.Void)
//             .input('voidedBy', sql.NVarChar, item.voidedBy)

//             .execute('DeleteItemMaster');
//             console.log('re:',voidItem);
//         return 'true';
//     }
//     catch (err) {
//         console.log(err);
//         return err
//     }

// }
