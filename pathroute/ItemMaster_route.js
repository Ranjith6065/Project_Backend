const express = require('express');
const pathRoute = require('../ItemRoute');


const router = express.Router();

router.get('/getitems', pathRoute.GetAll);
router.get('/getbyitems', pathRoute.GetByid);
router.get('/getbyitemsdet', pathRoute.GetByDetid);
router.get('/GetExportbyID', pathRoute.GetExportbyID);
router.post('/insertitems', pathRoute.Insertitem);
router.post('/Updateitem', pathRoute.Updateitem);
router.post('/Voiditems', pathRoute.Delete);
router.post('/setReport', pathRoute.setReport)
router.get('/GetReport', pathRoute.GetView);

module.exports = router;