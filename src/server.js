const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const { contactsRouter } = require("./contacts.router");

exports.CrudServer = class {
  start() {
    this.initServer();
    // this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
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
