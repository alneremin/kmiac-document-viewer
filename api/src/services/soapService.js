
const soap = require('soap');
const Result = require("../utils/result")
const { dataToJson } = require("../utils/helpers")

const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');

exports.getDocuments = async (query) => {


    // const file = fs.createWriteStream("wsdl.wsdl");
    // const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
    // response.pipe(file);
    // });

    let result = new Result()

    // var url = 'http://esb.kmiac.ru/amd/service/?wsdl';
    var url = "http://www.learnwebservices.com/services/hello?WSDL";
    var args = {

        HelloRequest: {
            Name: query.name
        }
        // body: {
        //     amdId: "123"
        //     // validateSNILSRequest: {
        //     //     messageId: "1",
        //     //     patient: {
        //     //         surname: "Ерёмин",
        //     //         name: "Александр",
        //     //         patrName: "Николаевич",
        //     //         birthDate: "2000-03-25",
        //     //         gender: "male",
        //     //         snils: "16401075323"
        //     //     }
        //     // }
        // },
        // header: {
        //     transportHeader: {
        //         clientEntityId: "123",
        //         trial_mode: "not_check_clientEntityId",
        //         organization: "000",
        //         clientVersion: "0",
        //         schemaVersion: ""
        //     }
        // }
        
        };

    // soap.createClient(url, async function(err, client) {
    //     await client.SayHello(args, function(err, res) {
    //         result.setResult(res)
    //         console.log(res, err);
    //     });
    // });

    var client = await soap.createClientAsync(url)

    const res = await client.SayHelloAsync(args)
    
    // .then((client) => {
    //     return client.SayHello(args);
    //   }).then((err, res) => {
    //     console.log(res);
    //   })
    // )
    return result.setResult(res[0])
}