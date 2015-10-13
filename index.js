'use strict'

require('babel/register')
require('babel/polyfill')

var server  = require('src/server')
var service = server.listen(process.env.PORT || 8000, function(err) {
  console.log('Service started at port %s.', service.address().port)
})

process.once('uncaughtException',  gracefulExit)
process.once('unhandledRejection', gracefulExit)

/**
 * Exits the process "gracefully", meaning that we'll attempt to clean up after
 * ourselves by closing the server and hopefully any other resources we're
 * currently using.
 *
 * @param {Error?} err - Error, with which the process will exit with.
 */
function gracefulExit(err) {
  if(err) {
    console.error(
      'Process will now exit with the following error: %s.', err.toString())
  }
  return service.close(function(err) {
    if(err) {
      console.error('Failed to close the server: %s.', err.toString())
    }
    return process.exit(1)
  })
}
