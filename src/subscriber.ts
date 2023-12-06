export const app = require('express')()
const nats = require('nats')
const SUB_PORT = process.env.SUB_PORT || 3001
const NATS_HOST = process.env.NATS_HOST || 'localhost'
const NATS_PORT = process.env.NATS_PORT || 4222
const subject = 'mySubject'

const init = (async () => {
    const nc = await nats.connect({
        servers: `${NATS_HOST}:${NATS_PORT}`,
        debug: true,
    })

    nc.subscribe(subject, (message: string) => {
        console.log(`Received message: ${message}`)
    })

    app.listen(SUB_PORT, () => {
        console.log(`Subscriber service is running on ${SUB_PORT}`)
    })
})()