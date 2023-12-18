import pkg from 'jsonwebtoken'
const { verify } = pkg
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(403).json({ error: 'A token is required for authentication' })
  }
  try {
    const decoded = verify(token, process.env.APP_SECRET_KEY)
    req.user = decoded
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' })
  }
  return next()
}
