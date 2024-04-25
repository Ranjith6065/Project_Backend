// var Db  = require('./ItemRoute');
// var Order = require('./ItemMasterModel');
// const dboperations = require('./ItemRoute');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
const UomMaster = require('../NodeJs/Route/UOMMasterRoute');
const PosMaster = require('../NodeJs/Route/POSMasterRoute');
const ItemMaster = require('../NodeJs/ItemRoute');


//Uom Master
router.get('/GetUOMAll', UomMaster.Getall);
router.post('/Insertuom', UomMaster.Insertuom);

//Pos Master
router.get('/GetPosAll', PosMaster.Getall);
router.post('/InsertPOS', PosMaster.InsertPOS);

//Item Master

app.use('/api/ItemMaster', require('../NodeJs/pathroute/ItemMaster_route'));


// router.route('/getitems').get((request,response)=>{
//     dboperations.GetAll().then(result => {
//        response.json(result[0]);
//     })

// })

// router.route('/getbyitems/:id').get((request,response)=>{
//     dboperations.GetByid(request.params.id).then(result => {
//        response.json(result[0]);
//     })

// })
// router.route('/getbyitemsdet/:id').get((request,response)=>{
//     dboperations.GetByDetid(request.params.id).then(result => {
//        response.json(result[0]);
//     })

// })

// router.route('/insertitems').post((request,response)=>{

//     let entity = {...request.body}
// console.log("res:",entity);
//     dboperations.Insertitem(entity).then(async result1 => {
//        await dboperations.InsertPOSitemDet(entity.POSItemGrid,entity.ItemDescription).then(result => {
//            response.status(201).json(result);
//         })
//     })

// })


// router.route('/Voiditems').post((request,response)=>{

//     let order = {...request.body}

//     dboperations.Voiditem(order).then(result => {
//        response.status(201).json(result);
//     })

// })




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);


module.exports = router;

