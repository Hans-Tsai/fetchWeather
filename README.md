拓連 Noodoe 作業
---

### 目前我們backend 科技或技術有
- GraphQL, NestJS,GraphQL, NestJS, MySQL, Redis, Kafka, AWS service(ex: lambda)

### 以下是作業內容
請使用任何一種backend 套件(node.js尤佳) ,建立一個backend service, 並且符合底下這幾個需求
- 每一個小時,此server 去中央氣象局開放資料平臺抓取臺北市,新北市,桃園市即時天氣資訊, 並且存到DB
  + [中央氣象局開放資料平台](https://opendata.cwb.gov.tw/index)
    * 可透過 FB 帳號登入
- 提供一個API, 讓合法使用者可以查詢這三個城市的天氣資訊, 此天氣資訊直接從DB 讀取
  + 合法的使用者目前定義是擁有 API key 的使用者.

### 備註
- [中央氣象局氣象資料開放平臺 – Open API 資料擷取使用說明](https://opendata.cwb.gov.tw/opendatadoc/CWB_Opendata_API_V1.2.pdf)
  + dataid(資料項編號): **O-A0003-001**
  + Authorization(Open API 授權金鑰): **CWB-9E9FDB52-39FB-43B2-AEAF-9518B5B0C20C**
  + locationName: 臺北,新屋,板橋
  + sort: stationId
  + Weather: 天氣描述(雲量 + 天氣現象)
  + elementName: TEMP,HUMD,Weather
  + parameterName: CITY
  + 統整: `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-9E9FDB52-39FB-43B2-AEAF-9518B5B0C20C&locationName=臺北,新屋,板橋&sort=stationId&elementName=TEMP,HUMD,Weather&parameterName=CITY`
- [局屬氣象站資料集說明檔](https://opendata.cwb.gov.tw/opendatadoc/DIV2/A0003-001.pdf)--- 即時天氣資訊(約每 10 分鐘更新一次)
  + 局屬氣象站的地名通常都是某個城市名稱(例如，臺北、臺中、臺南、花蓮)
- 部署到 AWS Lambda Function 可參考[使用 ES6+ 語法 Node.js 於 AWS Lambda](https://www.coryma.me/2019/06/19/%E4%BD%BF%E7%94%A8-es6-%E8%AA%9E%E6%B3%95-node-js-%E6%96%BC-aws-lambda/)

### 範例資料集
- ```json
  {
    "success": "true",
    "result": {
        "resource_id": "O-A0003-001",
        "fields": [
            {
                "id": "lat",
                "type": "Double"
            },
            {
                "id": "lon",
                "type": "Double"
            },
            {
                "id": "locationName",
                "type": "String"
            },
            {
                "id": "stationId",
                "type": "String"
            },
            {
                "id": "obsTime",
                "type": "Timestamp"
            },
            {
                "id": "elementName",
                "type": "String"
            },
            {
                "id": "elementValue",
                "type": "String"
            },
            {
                "id": "parameterName",
                "type": "String"
            },
            {
                "id": "parameterValue",
                "type": "String"
            }
        ]
    },
    "records": {
        "location": [
            {
                "lat": "25.039410",
                "lon": "121.506676",
                "locationName": "臺北",
                "stationId": "466920",
                "time": {
                    "obsTime": "2021-08-02 16:10:00"
                },
                "weatherElement": [
                    {
                        "elementName": "TEMP",
                        "elementValue": "28.40"
                    },
                    {
                        "elementName": "HUMD",
                        "elementValue": "0.83"
                    },
                    {
                        "elementName": "Weather",
                        "elementValue": "陰"
                    }
                ],
                "parameter": [
                    {
                        "parameterName": "CITY",
                        "parameterValue": "臺北市"
                    }
                ]
            },
            {
                "lat": "25.008503",
                "lon": "121.039267",
                "locationName": "新屋",
                "stationId": "467050",
                "time": {
                    "obsTime": "2021-08-02 16:10:00"
                },
                "weatherElement": [
                    {
                        "elementName": "TEMP",
                        "elementValue": "28.10"
                    },
                    {
                        "elementName": "HUMD",
                        "elementValue": "0.80"
                    },
                    {
                        "elementName": "Weather",
                        "elementValue": "陰"
                    }
                ],
                "parameter": [
                    {
                        "parameterName": "CITY",
                        "parameterValue": "桃園市"
                    }
                ]
            },
            {
                "lat": "24.999447",
                "lon": "121.433812",
                "locationName": "板橋",
                "stationId": "466880",
                "time": {
                    "obsTime": "2021-08-02 16:10:00"
                },
                "weatherElement": [
                    {
                        "elementName": "TEMP",
                        "elementValue": "28.20"
                    },
                    {
                        "elementName": "HUMD",
                        "elementValue": "0.82"
                    },
                    {
                        "elementName": "Weather",
                        "elementValue": "陰有雷"
                    }
                ],
                "parameter": [
                    {
                        "parameterName": "CITY",
                        "parameterValue": "新北市"
                    }
                ]
            }
        ]
    }
  }
  ```