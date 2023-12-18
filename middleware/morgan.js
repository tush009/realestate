import pkg from 'jsonwebtoken'
import morgan from 'morgan'

const { verify } = pkg

const getUserId = (req) => {
  if (!req) return 'no request object provided'
  const token = req.headers['authorization']?.split(' ')[1]
  console.log('🚀 ~ file: morgan.js:9 ~ getUserId ~ token:', token)
  if (!token) {
    return 'no token included in request'
  }
  try {
    const user = verify(token, process.env.APP_SECRET_KEY)
    return user.userid
  } catch (err) {
    return 'token was invalid'
  }
}

const cleanedBody = (body) => {
  if ('password' in body) {
    body.password = '*****'
  }
  return body
}

export const morganMiddleware = morgan(function (tokens, req, res) {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number.parseFloat(tokens.status(req, res)),
    content_length: tokens.res(req, res, 'content-length'),
    response_time: Number.parseFloat(tokens['response-time'](req, res)),
    userId: getUserId(req),
    request_body: cleanedBody(req.body),
  })
})
