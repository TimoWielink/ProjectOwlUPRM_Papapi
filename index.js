
'use strict'

const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
const port = 1883
const wsPort = 8888

server.listen(port, function () {
  console.log('server listening on port', port)
})

ws.createServer({
  server: httpServer
}, aedes.handle)

httpServer.listen(wsPort, function () {
  console.log('websocket server listening on port', wsPort)
})

aedes.on('clientError', function (client, err) {
  console.log('client error', client.id, err.message, err.stack)
})

aedes.on('connectionError', function (client, err) {
  console.log('client error', client, err.message, err.stack)
})

aedes.on('publish', function (packet, client) {
  if (client) {
    console.log('message from client', client.id)
  }
})



  // fired when a message is published
  aedes.on('publish', async function (packet, client) {
    console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)
    console.log(packet.payload.toString())
  })



    // fired when a client disconnects
  aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
  })

aedes.on('subscribe', function (subscriptions, client) {
  if (client) {
    console.log('subscribe from client', subscriptions, client.id)
  }
})

  aedes.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
  })
