
const soapController = require( "./soapController")

module.exports = (app) => {

    app.use("/api/soap", soapController)
}
