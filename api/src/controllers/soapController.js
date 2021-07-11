
const express = require('express')
const service = require("../services/soapService")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
      console.log(req.query);
      let result = await service.getDocuments(req.query)
      
      return res.status(result.status).send(result)
  
    } catch (error) {
      next(error)
    }
  })

  module.exports = router