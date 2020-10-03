const express = require("express")
const hospital = require("../models/hospital")
const router = express.Router()
const Venti = require("../models/ventilator")
const Hospi = require("../models/hospital")

router.get('/', async(req,res) => {
    try{
           const hps = await Hospi.find()
           res.json(hps)
    }catch(err){
        res.send('Error ' + err)
    }
})
router.get('/:id',async(req,res)=>{
    try{
        var id = req.params.id;
        Hospi.findOne({'name':id},(err,h)=>{
            if(err){
                res.send(err)
            }
            console.log(h)
            res.send(h);
        })
    }
    catch(err){
        res.send(err);
    }
})

router.post('/',async(req,res)=>{
    const nhop = new hospital({
        name : req.body.name,
        location : req.body.location,
        ventcount : req.body.ventcount,
    })
    try{
        console.log(nhop)
        const h1 = await nhop.save()
        res.json(h1)
    }
    catch(err){
        res.send("Error : "+ err)
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const hdel = await Hospi.remove({"name":req.params.id})
        res.send(hdel);
    }
    catch(err){
        res.send("Error 989 "+err);
    }
})

router.get('/status/:id',async(req,res)=>{
    try{
        console.log("yo")
        const hps = await Venti.find({"vstat":req.params.id})
        res.json(hps)
 }catch(err){
     res.send('Error ' + err)
 }
})

module.exports = router 