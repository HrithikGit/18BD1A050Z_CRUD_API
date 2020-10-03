const express = require("express")
const router = express.Router()
const Venti = require("../models/ventilator")

router.get('/', async(req,res) => {
    try{
           const vs = await Venti.find();
           res.json(vs)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id',async(req,res)=>{
    try{
        var id = req.params.id;
        Venti.findOne({'vid':id},(err,h)=>{
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

router.get('/status/:id',async(req,res)=>{
    try{
        console.log("yo")
        const hps = await Venti.find({"vstat":req.params.id})
        res.json(hps)
 }catch(err){
     res.send('Error ' + err)
 }
})

router.get('/hospitals/:id',async(req,res)=>{
    try{
        console.log("yo")
        const hps = await Venti.find({"vid":req.params.id})
        res.json(hps)
 }catch(err){
     res.send('Error ' + err)
 }
})



router.post('/',async(req,res)=>{
    const nhop = new Venti({
        name : req.body.name,
        vid : req.body.vid,
        vstat : req.body.status
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

router.patch('/:id',async(req,res)=>{
    try{
        const hup= await Hospi.find({"vid":req.params.id})
        hup.vstat = req.body.status;
        const check = await hup.save();
        res.json(check);
    }
    catch(err){
        res.send(err);
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const vdel = await Venti.remove({"vid":req.params.id})
        res.send(vdel);
    }
    catch(err){
        res.send("Error 989 "+err);
    }
})


module.exports = router 