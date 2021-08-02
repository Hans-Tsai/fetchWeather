const https = require('https');
const querystring = require('querystring');

// GET parameters
const parameters = {
	locationName: ['臺北,新屋,板橋'],
  elementName: ['TEMP', 'HUMD', 'Weather'],
  parameterName: 'CITY',
	sort: 'stationId',
}

// GET parameters as query string : "?id=123&type=post"
const get_request_args = querystring.stringify(parameters);

const options = {
  hostname: 'opendata.cwb.gov.tw',
  port: 443,
  path: '/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-9E9FDB52-39FB-43B2-AEAF-9518B5B0C20C' + get_request_args,
  method: 'GET',  // 完成一個 GET 請求
  headers : {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()