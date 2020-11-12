const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
const cors = require("cors");
const monngoose = require ("mongoose")
const { contactsRouter } = require("./contacts.router");


exports.CrudServer = class {
  async start() {
    this.initServer();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  async initDatabase() {
    try {
      await monngoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      console.log("success")
    }
    catch (err) { console.log(err);  process.exit(1);}

  }
  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
    this.app.use(cors());
  }

  initRoutes() {
    this.app.use("/contacts", contactsRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      return res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const PORT = 3000;
    this.app.listen(PORT, () => {
      console.log("Server started listenning on PORT", PORT);
    });
  }
};
