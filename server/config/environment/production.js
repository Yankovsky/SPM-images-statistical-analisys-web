'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.IP ||
            undefined,

  // Server port
  port:     80,

  // MongoDB connection options
  mongo: {
    uri:    'mongodb://localhost/spm'
  }
};