const errorHandler = (error, req, res, next) => {
    if (error.response)
      res.status(error.response.status).send(error.response.data);
    else if (error.request)
      res.status(504).send("Third Party Service Gateway Timeout");
    else res.status(500).send("SERVER ERROR");
};
  
module.exports = errorHandler;
  