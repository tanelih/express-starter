import morgan  from 'morgan'
import express from 'express'

import { json }         from 'body-parser'
import { STATUS_CODES } from 'http'

/**
 * @external {Application} http://expressjs.com/4x/api.html#app
 */

/**
 * ExpressJS application configured and ready to listen for incoming connections
 * from the outside world. Woo.
 *
 * @type {Application}
 */
const app = express()

  .use(json())

  .use(morgan('dev'))

  .get('/:greeting/:name', (req, res) =>
    res.status(200).send(`${req.params.greeting}, ${req.params.name}!`))

  .use((err, req, res, next) => // eslint-disable-line no-unused-vars
    console.error(err)       || // eslint-disable-line no-console no-multi-spaces
    console.error(err.stack) || // eslint-disable-line no-console
    res
      .status(err.statusCode || 500)
      .send(STATUS_CODES[err.statusCode || 500]))

export default app
