
// const soap = require('soap');
const Result = require("../utils/result")
const { dataToJson } = require("../utils/helpers")
var builder = require('xmlbuilder');
const axios = require('axios');
const uuidv4 = require('uuid').v4
const convert = require('xml-js');

exports.searchRegistryItem = async (query) => {

    let result = new Result()

    let fullName = query.fullname ?? ""
    let page = query.page ?? 0
    let birthDate = query.birthdate

    page = Number(page)
    let [surname, name, pathname] = fullName.split(" ")

    let body = builder.create('soap:Envelope', { encoding: 'utf-8' })
        .att('xmlns:ser', 'http://esb.kmiac.ru/amd/service/')
        .att('xmlns:soap', 'http://www.w3.org/2003/05/soap-envelope')
        .ele('soap:Header')
        .ele('MessageID', uuidv4())
        .att('xmlns', 'http://www.w3.org/2005/08/addressing').up()
        .ele('To', 'http://esb.kmiac.ru/amd/service/')
        .att('xmlns', 'http://www.w3.org/2005/08/addressing').up()
        .ele('ReplyTo')
        .att('xmlns', 'http://www.w3.org/2005/08/addressing')
        .ele('Address', 'http://esb.kmiac.ru/amd/service').up().up()
        .ele('ser:transportHeader')
        .ele('ser:clientEntityId', query.clientEntityId).up()
        .ele('ser:trialMode')
        .ele('ser:option', 'not_check_clientEntityId').up().up()
        .ele('ser:organization')
        .ele('ser:OID', '1.2.643.5.1.13').up().up().up().up()
        .ele('soap:Body')
        .ele('ser:searchRegistryItemRequest')
        .ele('ser:source', 'amd').up()
    // .end({pretty: true})
    const withName = name ? body.ele('ser:name', name ?? "1 ").up() : body
    const withBirthDate = birthDate ? body.ele('ser:birthDate', birthDate).up() : body
    const xml = withBirthDate.ele('ser:page', page - 1).up()
        .end({ pretty: true })

    const url = 'http://esb.kmiac.ru/amd/service/?wsdl'
    const headers = { headers: { 'Content-Type': 'text/xml' } }

    let { data } = await axios.post(url, xml, headers)

    let xmlData = convert.xml2js(data, { compact: true, spaces: 2 });

    let method = xmlData["soap:Envelope"]["soap:Body"]["searchRegistryItemResponse"]


    let matches = method["matches"]
    let status = method["status"]

    if (status._text != "success") {
        let error = getError(method["errors"])
        return result.setErrorAndStatus(503, error)
    }

    let items = matches.item ? matches.item.map(i => {
        return {
            amdId: i.id.amdId._text,
            localUid: i.localUid._text,
            registrationDate: i.registrationDate._text
        }
    }) : []
    let pageInfo = {
        itemsPerPage: matches.page.itemsPerPage._text,
        hasNext: matches.page.hasNext._text,
    }

    result.setPagination(page, pageInfo.itemsPerPage)
    result.setResult(items)

    return result

}

exports.getContent = async (query) => {

    let result = new Result()

    let xml = builder.create('soap:Envelope', { encoding: 'utf-8' })
        .att('xmlns:ser', 'http://esb.kmiac.ru/amd/service/')
        .att('xmlns:soap', 'http://www.w3.org/2003/05/soap-envelope')
        .ele('soap:Header')
        .ele('MessageID', uuidv4())
        .att('xmlns', 'http://www.w3.org/2005/08/addressing').up()
        .ele('To', 'http://esb.kmiac.ru/amd/service/')
        .att('xmlns', 'http://www.w3.org/2005/08/addressing').up()
        .ele('ReplyTo')
        .att('xmlns', 'http://www.w3.org/2005/08/addressing')
        .ele('Address', 'http://esb.kmiac.ru/amd/service').up().up()
        .ele('ser:transportHeader')
        .ele('ser:clientEntityId', query.clientEntityId).up()
        .ele('ser:trialMode')
        .ele('ser:option', 'not_check_clientEntityId').up().up()
        .ele('ser:organization')
        .ele('ser:OID', '1.2.643.5.1.13').up().up().up().up()
        .ele('soap:Body')
        .ele('ser:getContentRequest')
        .ele('ser:amdId', query.amdId ?? '1').up()
        .end({ pretty: true })

    const url = 'http://esb.kmiac.ru/amd/service/?wsdl'
    const headers = { headers: { 'Content-Type': 'text/xml' } }

    let { data } = await axios.post(url, xml, headers)

    let xmlData = convert.xml2js(data, { compact: true, spaces: 2 });

    let method = xmlData["soap:Envelope"]["soap:Body"]["getContentResponse"]

    let documentFile = method["documentFile"]
    let status = method["status"]

    if (status._text != "success") {
        let error = getError(method["errors"])
        return result.setErrorAndStatus(503, error)
    }

    let fileData = documentFile.file.data._text

    // require("fs").writeFile("out.pdf", fileData, 'base64', function(err) {
    //     console.log(err);
    // });
    
    result.setResult({"data": fileData})

    return result

}

function getError(xmlError) {
    let error = ""
    if (xmlError.item.code)
        error = xmlError.item.code._text + ": " + xmlError.item.message._text
    else {
        xmlError.item.forEach(element => {
            error += element.code._text + ": " + element.message._text + ";"
        });
    }
    return error
}