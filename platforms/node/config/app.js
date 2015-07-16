var Project = require('../../../package')

exports.project       = Project
exports.env           = process.env.NODE_ENV || 'development'
exports.isProduction  = exports.env === 'production'
exports.isDevelopment = !exports.isProduction
