const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/database");
const WebSocket = require("ws");

// Import routes
const authRoute = require("./routes/autRoute");
const fetchRoute = require("./routes/fetchRoute");
const crudRoute = require("./routes/crudRoute");

// Import controllers
const courseController = require("./controllers/courseController");
const tryoutController = require("./controllers/tryoutController");
const transController = require("./controllers/transaction");
const accountController = require("./controllers/accountController");
const latsolController = require("./controllers/latsolController");

// Model imports
const Account = require("./models/account");
const Category = require("./models/category");
const ClearedCourse = require("./models/clearedCourse");
const Course = require("./models/course");
const SKDAnalysis = require("./models/skd_analysis");
const SubCategory = require("./models/subCategory");
const Tryout = require("./models/tryout");
const TTBundle = require("./models/tryoutBundle_tryout");
const TryoutScore = require("./models/tryoutScore");
const TryoutBundle = require("./models/tryout_bundle");
const UserTryout = require("./models/userTryout");
const UserTransaction = require("./models/transaction");
const Notifikasi = require("./models/notifikasi");
const {updateAccValidator} = require("./validator/rules")
const multer = require("multer");
const { registerValidator } = require("./validator/rules");
const TryoutToken = require("./models/tryoutToken");
const { Transaction } = require("@sequelize/core");
const auth = require("./middleware/auth");
const admin = require("./middleware/admin");
const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp","application/json"];
const cors = require("cors");
const LATSOL = require("./models/latsol");
const HistoryLat = require("./models/historylatsol");
const app = express();
const storage = multer.memoryStorage();

const uploadMulter = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }
    cb(null, true);
  },
});

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions))
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

// Routes
app.use(authRoute);


app.use(fetchRoute);
app.use(crudRoute);

// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  console.log(message);
  console.log(error);
  res.status(status).json({ message: message ?? error?.errors[0]?.message });
});

// WebSocket server
const wss = new WebSocket.Server({port:8081});

app.set("wss", wss);

wss.on("connection", (ws) => {
  console.log("WebSocket connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    ws.send("Message received by WebSocket server");
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});


// Middleware to handle WebSocket upgrade requests
app.use((req, res, next) => {
  if (req.headers.upgrade === 'websocket') {
    // Upgrade the connection to WebSocket
    wss.handleUpgrade(req, req.socket, req.head, (ws) => {
      wss.emit('connection', ws, req); 
    });
  } else {
    next();
  }
});

// Additional routes
app.post(
  "/courses",
  admin,
  uploadMulter.single("course_image"),
  courseController.createCourse,
);
app.put(
  "/courses/content/:course_id",
  admin,
  uploadMulter.single("course_file"),
  courseController.assignCourseContent
);
app.put(
  "/accounts/:account_id",
  auth,
  uploadMulter.single("avatar"), 
  updateAccValidator,
  accountController.updateAccount
);
app.post(
  "/tryouts",
  admin,
  uploadMulter.single("tryout_file"),
  tryoutController.createTryout
);
app.post(
  "/tryouts/transaction/:account_id",
  auth,
  uploadMulter.single("bukti_transaksi"),
  transController.buyTryout
);

//create new Latsol
app.post(
  "/latsol",
  
  uploadMulter.fields([
    {name:"lat_thumb",maxCount:1},
    {name:"lat_file",maxCount:1}
  ]),
  latsolController.createLatsol
)

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has established successfully");

    app.listen(8080, () => {
      //Relationship between category and sub category
      Category.hasMany(SubCategory, { foreignKey: "category_id" });
      SubCategory.belongsTo(Category, { foreignKey: "category_id" });

      //Relationship between course and subcategory
      Course.belongsTo(Category, { foreignKey: "category_id" });
      Category.hasMany(Course, { foreignKey: "category_id" });

      //Relationship Tryout vs TryoutScore
      Tryout.hasMany(TryoutScore, { foreignKey: "tryout_id" });
      TryoutScore.belongsTo(Tryout, { foreignKey: "tryout_id" });

      //relationshop TryoutScore vs Account
      TryoutScore.belongsTo(Account, { foreignKey: "account_id" });
      Account.hasMany(TryoutScore, { foreignKey: "account_id" });

      //RelationShip Transaction vs Tryout
      UserTryout.belongsTo(Tryout, { foreignKey: "tryout_id" });
      Tryout.hasMany(UserTryout, { foreignKey: "tryout_id" });

      //Relationship Transaction vs Account
      UserTryout.belongsTo(Account, { foreignKey: "account_id" });
      Account.hasMany(UserTryout, { foreignKey: "account_id" });

      //Relationship CompleteCourse v Account
      ClearedCourse.belongsTo(Account, { foreignKey: "account_id" });
      Account.hasMany(ClearedCourse, { foreignKey: "account_id" });

      //Relationship CompleteCourse v Course
      ClearedCourse.belongsTo(Course, { foreignKey: "course_id" });
      Course.hasMany(ClearedCourse, { foreignKey: "course_id" });

      //SKD analysis
      SKDAnalysis.belongsTo(SubCategory, { foreignKey: "subCategory_id" });
      SubCategory.hasMany(SKDAnalysis, { foreignKey: "subCategory_id" });

      //SKD anlaysis
      SKDAnalysis.belongsTo(Tryout, { foreignKey: "tryout_id" });

      //tryoutBundle and Tryout
      TryoutBundle.belongsToMany(Tryout, { through: "tryoutBundle_tryout" });

      LATSOL.belongsTo(Category,{foreignKey:"category_id"});
      HistoryLat.belongsTo(Account,{foreignKey:"account_id"});
      HistoryLat.belongsTo(LATSOL,{foreignKey:"latsol_id"})
      // UserTransaction.sync({force:true})
      // Notifikasi.sync({force:true})
      // Account.sync({force:true})
      //  Course.sync({force:true})
      // ClearedCourse.sync({force:true})
      // Tryout.sync({force:true})
      // TryoutBundle.sync({force:true})
      // TTBundle.sync({force:true})
      // TryoutToken.sync({force:true})
      // TryoutScore.sync({force:true})
      // Notifikasi.sync({force:true})
      // SKDAnalysis.sync({force:true})
      // UserTryout.sync({force:true})
      // UserTransaction.sync({force:true})

      // LATSOL.sync({force:true})
      // HistoryLat.sync({force:true})


      console.log("backend-asn listening on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Can't connect to the web server");
  });
