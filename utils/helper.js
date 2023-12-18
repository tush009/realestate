export const successResponse = (res, statuscode = 200, message = 'Success!', data = null) => {
  res.status(statuscode).header('Content-Type', 'application/json').header('Access-Control-Allow-Origin', '*').json({
    success: true,
    message,
    data,
  })
}

export const errorResponse = (res, statuscode = 500, message = 'Internal Server Error', error = null) => {
  res.status(statuscode).header('Content-Type', 'application/json').header('Access-Control-Allow-Origin', '*').json({
    success: false,
    message,
    error,
  })
}
