#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { app } from '../server';
import http from 'http';

//  var debug = require('debug')('task-unify:server');
 
 /**
  * Get port from environment and store in Express.
  */
 
 var port:any = normalizePort(process.env.PORT || '3000');
 app.set('port', port);
 
 /**
  * Create HTTP server.
  */
 
 var server:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(app);
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val:any):number|boolean {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error:any):void {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   var bind:string = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening():void {
   var addr:any = server.address();
   var bind:string = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   console.log('Listening on ' + bind);
 }
 