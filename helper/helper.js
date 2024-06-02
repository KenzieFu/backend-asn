const { Storage }  = require("@google-cloud/storage");
const { bucketName,projectId}  = require("../static");
// const name = require("./lidm-423502-1b14a7634db6.json")
const keyFilename ="./lidm-423502-1b14a7634db6.json"
const path = require("path");
const { nanoid } = require("nanoid");



exports.uploadFILE = (file,path) => new Promise(async (resolve, reject) => {

  const reandom = nanoid()+path.extname(file.originalname);
  const storage = new Storage({ projectId, keyFilename: keyFilename });
  
  const { buffer } = file;

  
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(`${path}/${reandom}`);
 
  console.log(`File upload START: `, new Date());
  blob.save(
  
    buffer,
    {
      cacheControl:"Cache-Control:public,max-age=3600"
    },

  
    (err) => {
      if (err) {
        console.log(err);
        resolve("");
      }
    }
  );
  resolve(`${path}/${reandom}`);
});

exports.uploadFile = (file, pathName) =>
  new Promise(async (resolve, reject) => {

    let dateString = new Date().toISOString();

      dateString=dateString.replaceAll(":","-");

    const storage = new Storage({ projectId, keyFilename: keyFilename });
    
    const { buffer, mimetype,originalname,fieldname } = file;
    const extFile = path.extname(originalname);
    const newDest = `${pathName}/${fieldname.trim()}-${dateString}${extFile}`
    
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(newDest);
   
    console.log(`File upload START: `, new Date());
    blob.save(
    
      buffer,
      {
        cacheControl:"Cache-Control:public,max-age=3600"
      },

    
      (err) => {
        if (err) {
          console.log(err);
          reject("false");
        }
      }
    );
    resolve(`${newDest}`);
  });
