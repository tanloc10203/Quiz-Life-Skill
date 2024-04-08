"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5 * 1000;

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections :: ${numConnection}`);
};

const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    // Example maximum number of connections based on number osf cores
    const maxConnection = numCores * 5;

    console.log(`Active connections: ${numConnection}`);
    console.log(`Memory usage :: ${memoryUsage / 1024 / 1024} MB`);

    if (numConnection > maxConnection) {
      console.log(`Connection overload detected!`);

      // notify.send(...)
    }
  }, _SECONDS); // Monitor every 5 seconds
};

module.exports = {
  countConnect,
  checkOverLoad,
};
