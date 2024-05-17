const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/database");

//Controller
const courseController = require("./controllers/courseController");
const tryoutController = require("./controllers/tryoutController")

//Route
const authRoute = require("./routes/autRoute");
const fetchRoute = require("./routes/fetchRoute")
const crudRoute = require("./routes/crudRoute")

const multer = require("multer");
const Tryout = require("./models/tryout");
const TryoutScore = require("./models/tryoutScore");
const SKDAnalysis = require("./models/skd_analysis");
const TryoutToken = require("./models/tryoutToken");

const app = express();
const storage = multer.memoryStorage()

const uploadMulter= multer({storage:storage})
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/",(req,res,next)=>{
  res.status(200).json({
    message:"success"
  })
})


// Auth Route
app.use(authRoute)
//Fetch Route
app.use(fetchRoute)

//Crud Route
app.use(crudRoute);

app.use((error, req, res, next) => {

  const status = error.statusCode || 500;
  const message = error.message;
  console.log(message);
  console.log(error)
  res.status(status).json({ message: message ?? error?.errors[0]?.message });
});

//create course
app.post("/courses",uploadMulter.single("course_image"),courseController.createCourse);
// assign course content
app.put("/courses/content/:course_id",uploadMulter.single("course_file"),courseController.assignCourseContent);

//create tryout
app.post("/tryouts",uploadMulter.single("tryout_file"),tryoutController.createTryout);



sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has established successfully");
    app.listen(8080, () => {
    
      console.log("backend-asn listen to 8080");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Cant connect to web server");
  });
