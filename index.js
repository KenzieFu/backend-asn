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

const multer = require("multer");
const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const app = express();
const storage = multer.memoryStorage();

const uploadMulter = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error('file is not allowed'));
    }
    cb(null, true);
  }
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
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
const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
  console.log("WebSocket connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // Here you can handle the incoming WebSocket messages
    // For example, you can send a response back to the client
    ws.send("Message received by WebSocket server");
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// Additional routes
app.post("/courses", uploadMulter.single("course_image"), courseController.createCourse);
app.put("/courses/content/:course_id", uploadMulter.single("course_file"), courseController.assignCourseContent);
app.put("/accounts/:account_id", uploadMulter.single("avatar"), accountController.updateAccount);
app.post("/tryouts", uploadMulter.single("tryout_file"), tryoutController.createTryout);
app.post("/tryouts/transaction/:account_id", uploadMulter.single('bukti_transaksi'), transController.buyTryout);

sequelize.authenticate()
  .then(() => {
    console.log("Connection has established successfully");
    app.listen(8080, () => {
      console.log("backend-asn listening on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Can't connect to the web server");
  });
