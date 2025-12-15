// environment variables set up
require("dotenv").config();

// setting up port for backend
const PORT = process.env.PORT;

// router setup
const express = require('express');

// importing connecion service of mongoDB
const connect_database = require('./database/mongo');

// express app setup 
const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(express.text({ type: 'text/*', limit: '2mb' }));

// cors
const cors = require('cors');
app.use(cors({
    origin: '*',           // allow all origins
    methods: '*',          // allow all HTTP methods
    allowedHeaders: '*',   // allow all headers
    exposedHeaders: '*',   // expose all headers
    credentials: true      // allow cookies/auth headers if needed
}));

// start the server
let server_status;
const start_server = async () => {
    const connecion_status = await connect_database();

    if (connecion_status.exit_code === 0) {
        server_status = {
            database_connection : "active",
            server_health : "healthy",
            error: "no errors"
        };
    }
    else {
        server_status = {
            database_connection : "inactive",
            server_health : "healthy",
            error: "database connection could not be establshed"
        };
    }

    app.listen(PORT, () => {
        console.log(`server started at port: ${PORT}`);
    });
}
start_server();

// test the server status
app.get('/', async (req, res) => {
    return res.json({ server_status });
});