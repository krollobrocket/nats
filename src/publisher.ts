export const app = require('express')()
const nats = require('nats')
const PUB_PORT = process.env.PUB_PORT || 3002
const NATS_HOST = process.env.NATS_HOST || 'localhost'
const NATS_PORT = process.env.NATS_PORT || 4222

const init = (async () => {
    const nc = await nats.connect({
        servers: `${NATS_HOST}:${NATS_PORT}`,
        debug: true,
    })

    app.get('/publish/:message', (req: any, res: any) => {
        const message = req.params.message;
        const subject = 'mySubject'
        nc.publish(subject, message)
        res.send(`Message published: ${message}.`)
    })

    app.listen(PUB_PORT, () => {
        console.log(`Publisher service is running on ${PUB_PORT}`)
    })
})()
