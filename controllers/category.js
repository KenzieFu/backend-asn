const { where } = require("@sequelize/core");
const Category =  require("../models/category")


//Get All Category
exports.getCategories = async(req,res,next)=>{
  try{
    const categories = await Category.findAll();
    res.status(200).json({
      data:categories
    })
  }catch(err){
    next(err);
  }
}

//Get Category
exports.getCategory = async(req,res,next)=>{
  const { category_id} = req.params;
  try{
    const category = await Category.findOne({
      where:{
        category_id:category_id
      }
    });
    if(!category){
      const error = new Error("Not Found");
      error.statusCode = 404;
      error.message = "Kategori tidak ditemukan";
      return next(error);
    }
    res.status(200).json({
      data:category
    })
  }catch(err){
    next(err);
  }
}

//Create Category
exports.createCategory = async(req,res,next)=>{
  const{category_name,category_alias} = req.body
  try{
    const category = await Category.create({category_name:category_name,category_alias:category_alias});
    res.status(200).json({
      message:"Berhasil menambahkan kategori"
    })
  }
  catch(err){
    next(err);
  }
  
}

//Update Category
exports.updateCategory = async (req,res,next)=>{
  const {category_id} = req.params;
  const { category_name,category_alias} = req.body
  try{
    const updatedCate = await Category.update({category_name,category_alias},{
      where:{
        category_id:category_id
      }
    });

    res.status(200).json({
      message:"Berhasil engubah kategori"
    })

  }catch(err){
    next(err);
  }
}

//DeleteCategory
exports.deleteCategory = async(req,res,next)=>{
  try{
    const {category_id} = req.params;
    const deletedCategory = await Category.destroy({
      where:{
        category_id:category_id
      }
    });
    res.status(200).json({
      message:"Berhasil menghapus kategori"
    })
  }catch(err){

  }
}