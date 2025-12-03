const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')


// ================= DEMO ======================
// API สำหรับ Get ข้อมูล
// router.get('/',verifyToken,requireRole(ฝ่ายบุคลากร),async (req,res) => {
//     try{
//         const [rows] = await db.query(``)
//         res.json(rows)
//     }catch(err){
//         console.error('Error Get',err)
//         res.status(500).json({message:'Error Get'})
//     }
// })
// ================= DEMO ======================

// API สำหรับ Get ข้อมูล
router.get('/',verifyToken,requireRole(ฝ่ายบุคลากร),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_indicate,tb_topic where tb_topic.id_topic=tb_indicate.id_topic order by id_topic desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ Get ข้อมูล
router.get('/all',verifyToken,requireRole(ฝ่ายบุคลากร),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_indicate order by id_topic desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ Get ข้อมูล Params
router.get('/:id_indicate',verifyToken,requireRole(ฝ่ายบุคลากร),async (req,res) => {
    try{
        const {id_indicate} = req.params
        const [rows] = await db.query(`select * from tb_indicate where id_indicate='${id_indicate}'`)
        if(rows.length === 0) return res.status(403).json({message:'ไม่พบข้อมูลจากไอดีนี้'})
            
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

module.exports = router