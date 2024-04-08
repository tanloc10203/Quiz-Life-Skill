"use strict";

const mongoose = require("mongoose");

const connectString = process.env.MONGO_CONNECTION;

// Singleton pattern
class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    // dev
    // mongoose.set("debug", true);
    // mongoose.set("debug", { color: true });

    mongoose
      .connect(connectString)
      .then((_) => {
        console.log(`Connected Mongodb Success `);
      })
      .catch((err) => console.log(`Error Connect!`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
