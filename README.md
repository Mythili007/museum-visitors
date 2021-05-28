# Museum Visitors
    This project is aimed to fetch the highest and lowest visited museums information by contacting LA city API.

    API used from LA city: https://data.lacity.org/resource/trxm-jn3c.json

# Folder structure

    .
    ├── rest                    # Rest layer where apis are written
    │   ├── museumVisitors.rest.js    # APIs
    ├── services                # Service layer which handles business logic
    │   ├── MuseumVisitors.js  # Service file
    ├── test.http               # Apis are tested using vscode extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
    └── README.md               # Full documentation about the project


## Run the service
    node index.js

# REST API

## Fetch highest and lowest visited by date (in milliseconds)

### Request

`GET /api/visitors`

    curl -i -H 'Accept: application/json' {{url}}/api/visitors?date=1404198000000

### Response (1540ms) - Response time including the LA city api hit
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 143
    ETag: W/"8f-yxNbUVBkKEL1A2vVUHjExbFNsIA"
    Date: Fri, 28 May 2021 13:58:55 GMT
    Connection: close

    {
        "month": "Jul",
        "year": 2014,
        "highest": {
            "museum": "avila_adobe",
            "visitors": 32378
        },
        "lowest": {
            "museum": "hellman_quon",
            "visitors": 120
        },
        "total": 60535
    }


## Museum with HIGHEST visitor count is ignored

### Request

`GET /api/visitors?date=1404198000000&ignored=avila_adobe`

    curl -i -H 'Accept: application/json' {{url}}/api/visitors?date=1404198000000&ignored=avila_adobe

### Response (1159ms) - Response time including the LA city api hit

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 220
    ETag: W/"dc-jIQGN4rbQQi0icVaQa+vEXRBXfw"
    Date: Fri, 28 May 2021 14:04:12 GMT
    Connection: close

    {
        "month": "Jul",
        "year": 2014,
        "highest": {
            "museum": "america_tropical_interpretive_center",
            "visitors": 13490
        },
        "lowest": {
            "museum": "hellman_quon",
            "visitors": 120
        },
        "total": 28157,
        "ignored": {
            "museum": "avila_adobe",
            "visitors": 32378
        }
    }


## Museum with LOWEST visitor count is ignored

### Request

`GET /api/visitors?date=1404198000000&ignored=hellman_quon`

    curl -i -H 'Accept: application/json' {{url}}/api/visitors?date=1404198000000&ignored=hellman_quon

### Response (1497ms) - Response time including the LA city api hit

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 206
    ETag: W/"ce-qbrq5ta/oOAM6lHud4TEDUQ47Tg"
    Date: Fri, 28 May 2021 14:05:42 GMT
    Connection: close

    {
        "month": "Jul",
        "year": 2014,
        "highest": {
            "museum": "avila_adobe",
            "visitors": 32378
        },
        "lowest": {
            "museum": "chinese_american_museum",
            "visitors": 2239
        },
        "total": 60415,
        "ignored": {
            "museum": "hellman_quon",
            "visitors": 120
        }
    }


## Ignored museum is neither the LOWEST nor the HIGHEST

### Request

`GET /api/visitors?date=1404198000000&ignored=visitor_center_avila_adobe`

    curl -i -H 'Accept: application/json' {{url}}/api/visitors?date=1404198000000&ignored=visitor_center_avila_adobe

### Response (2171ms) - Response time including the LA city api hit

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 209
    ETag: W/"d1-MlREZgJ3ZnAIlEHldsm6Fj/Bzk4"
    Date: Fri, 28 May 2021 14:07:27 GMT
    Connection: close

    {
        "month": "Jul",
        "year": 2014,
        "highest": {
            "museum": "avila_adobe",
            "visitors": 32378
        },
        "lowest": {
            "museum": "hellman_quon",
            "visitors": 120
        },
        "total": 57008,
        "ignored": {
            "museum": "visitor_center_avila_adobe",
            "visitors": 3527
        }
    }