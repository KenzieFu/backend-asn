const {body, check} = require("express-validator");

exports.registerValidator = [

  body('name', "Nama tidak boleh kosong").not().isEmpty(),
  body('email',"Email tidak boleh kosong").not().isEmpty(),
  body('email',"Email tidak valid").isEmail(),
  body('password',"Password masih kosong").not().isEmpty(),
  body('password',"Password minimal memiliki 8 karakter").isLength({min:8}),
  body('password',"Password minimal memiliki 8 karakter").custom((value)=>{
    if (!/[A-Z]/.test(value)) {
      throw new Error('Password harus setidaknya memiliki satu huruf kapital');
    }
    return true;
  }),

  
]

exports.loginValidator = [
  body('email',"Email tidak boleh kosong").not().isEmpty(),
  body('email',"Email tidak valid").isEmail(),
  body('password',"Password masih kosong").not().isEmpty(),
]