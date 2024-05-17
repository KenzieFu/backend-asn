const { where } = require("@sequelize/core");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");



//Mengambil semua SubKategori 
exports.getSubCategories = async(req,res,next)=>{

  try{
    const subCategories = await SubCategory.findAll();
    res.status(200).json({
      data:subCategories
    });

  }catch(err){
    next(err);
  }
}

//Mengambil SubKategori 
exports.getSubCategory = async(req,res,next)=>{
  const {subCategory_id} = req.params;
  try{
    const subCategory = await SubCategory.findOne({
      where:{
        subCategory_id:subCategory_id
      }
    });
    if(!subCategory){
      const error = new Error("Not Found");
      error.statusCode = 400;
      error.message = "Sub Kategori tidak ditemukan!"
      return next(error);
    }
    res.status(200).json({
      data:subCategory
    })
  }catch(err){
    next(err);
  }
}

// Menambah Sub Kategori
exports.createSubcategory = async(req,res,next)=>{
  const { category_id,subCategory_name} = req.body;
  try{
    if(!subCategory_name){
      const error = new Error("Validation Error");
      error.statusCode =500;
      error.message = "Sub Kategori tidak boleh kosong!";
      return next(err);
    }
    const createSub = await SubCategory.create({category_id,subCategory_name});
    res.status(200).json({
      message:"Berhasil Menambahkan sub kategori"
    })
  }catch(err){
    next(err);
  }
}

//Mengupdaet SubKategori 
exports.updateSubCategory = async(req,res,next)=>{
  const { category_id,subCategory_name} = req.body;
  const {subCategory_id} = req.params;
  try{
    if(!subCategory_name){
      const error = new Error("Validation Error");
      error.statusCode =500;
      error.message = "Sub Kategori tidak boleh kosong!";
      return next(err);
    }
    const data = {
      category_id,subCategory_name
    }
    const updateSubCategory = await SubCategory.update(data,{
      where:{
        subCategory_id:subCategory_id
      }
    }) 
    res.status(200).json({
      message:"Berhasil mengubah sub kategori"
    })
  }catch(err){
    next(err);
  }
}

//Menghapus SubKategori 
exports.deleteSubCategory = async(req,res,next)=>{
  const {subCategory_id} = req.params;
  try{
    const deleteSubCategory = await SubCategory.destroy({
      where:{
        category_id:category_id
      }
    });
    res.status(200).json({
      message:"Berhasil menghapus sebuah Sub Kategori"
    })
  }catch(err){
    next(err);
  }
}