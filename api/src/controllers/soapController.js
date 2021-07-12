
const express = require('express')
const service = require("../services/soapService")

const router = express.Router()

router.get("/searchRegistryItem", async (req, res, next) => {
  try {
    console.log(req.query);
    let result = await service.searchRegistryItem(req.query)

    return res.status(result.status).send(result)

  } catch (error) {
    next(error)
  }
})

router.get("/getContent", async (req, res, next) => {
  try {
    console.log(req.query);
    let result = await service.getContent(req.query)

    return res.status(result.status).send(result)

  } catch (error) {
    next(error)
  }
})


module.exports = router