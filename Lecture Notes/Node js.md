1. `npm init` node package manage initialize a new node applicaion
- This should walk you through how to create a new application
- index.js and server.js are the 2 common entry points

2. Packages used to turn node js into a server include:
- express(most common): `npm install express`
    - After installing you will see a node modules file
- cors
- uuid: Used to generate unique identifiers
- bcrypt
- sqlite3

3. To import libraris and basic setup of server.js
```(js)
    const express = require("express")
    const cors = require("cors")
    const HTTP_PORT  =8000 

    var app = express()
    app.use(cors())
    app.use(express.json())


    app.listen(HTTP_PORT,() => {
        console.log('app listening on',HTTP_PORT)
    })
```

4. Routes: CRUD functions, route to naked domain to test and confirm messages are being sent. You use a fetch() to send data to these routes.
```
app.get('/',(req,res,next) => {
    res.status(200).json({message:"I am alive"})
})
```

5. 