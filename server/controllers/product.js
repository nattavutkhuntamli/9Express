
const Products = require('../models/product')

exports.getallProduct = async(req,res) => {
    try {
        const products = await Products.find({}).exec()
        if(products.length == 0){
            return res.status(404).json({msg:"ไม่พบข้อมูลสินค้าในระบบ"})
        }
        return res.status(200).json({msg:"สำเร็จ", products , total:products.length})
    } catch (error) {
        console.log(error)
    }
}

exports. getProduct = async(req, res) => {
    try {
        const id = req.params.id
        const products = await Products.findById(id).exec()
        if(!products){
            return res.status(404).json({msg:`Not Found!!!`})
        }
        return res.status(200).json({msg:'success',response:{products}})
    } catch (error) {
        console.log(error)
    }
}

exports.createProduct = async(req,res) => {
    try {
        const isProductNameValid = await Products.findOne({ name: req.body.name }).exec();

        if (isProductNameValid) {
          return res.status(409).json({ msg: "มีสินค้านี้อยู่ในฐานข้อมูลแล้ว" });
        }
        
        const createProducts = await Products.create(req.body);
        return res.status(201).json({ msg: "เพิ่มข้อมูลสำเร็จ", response: createProducts });
    } catch (error) {
        console.log(error)
    }
}

exports.updateProduct = async(req,res) => {
    try {
        const id = req.params.id
        const isProductValid = await Products.findOne({ _id: id }).exec();

        if(!isProductValid){
            return res.status(404).json({msg:"ไม่พบรหัสสินค้าที่ต้องการอัพเดท"})
        }

        const updateProduct = await Products.findOneAndUpdate({_id:id}, req.body , { new: true }).exec()
        if(updateProduct){
            return res.status(200).json({msg:'อัพเดทรายการสำเร็จ', body:req.body})
        }else{
            return res.status(404).json({msg:"อัพเดทรายการไม่สำเร็จ"})
        }
    } catch (error) {
        console.log(error)
    }
}
exports.deleteProduct = async(req,res) => {
    try {
        const id = req.params.id
        const isProductValid = await Products.findOne({ _id: id }).exec();
        
        if(!isProductValid){
            return res.status(404).json({msg:"ไม่พบรหัสสินค้าที่ต้องการลบ"})
        }

        const removeProduct = await Products.findOneAndDelete({_id:id}).exec()
        if(removeProduct){
            return res.status(200).json({msg:'ลบการสำเร็จ', body:id})
        }else{
            return res.status(404).json({msg:"ลบการไม่สำเร็จ"})
        }
    } catch (error) {
        console.log(error)
    }
}