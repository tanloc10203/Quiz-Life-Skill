"use strict";

const { networkInterfaces } = require("os");

class NetworkHelper {
  static getLanHost = () => {
    const nets = networkInterfaces();

    const results = Object.create(null);

    for (const name of Object.keys(nets)) {
      // @ts-ignore
      for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
        if (net.family === familyV4Value && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }

    return results?.WiFi ? results?.WiFi[0] : null;
  };

  static mobileURL = (path) => {
    const host = this.getLanHost();
    return `exp://${host}:${env.MOBILE_PORT}/--/${path}`;
  };

  static serverUrlIP = (path) => {
    const host = this.getLanHost();
    return `http://${host}:${process.env.PORT}/${path}`;
  };
}

module.exports = NetworkHelper;
