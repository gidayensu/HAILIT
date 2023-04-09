const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet');
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config();
const PORT = process.env['PORT']||5000;
const SESSION_SECRET = process.env['SESSION_SECRET']
const cors = require('cors')

const app = new express();
app.use(cors())
app.use(helmet());
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

const v1CarDriverRoutes = require('./src/v1/routes/carDriver.routes')
const v1CustomerRoutes = require('./src/v1/routes/customer.routes')
const v1MotorRiderRoutes = require('./src/v1/routes/motorRider.routes')
const v1OrderRoutes = require('./src/v1/routes/order.routes')
const v1UserRoutes = require('./src/v1/routes/user.routes')
const v1VehicleRoutes = require('./src/v1/routes/vehicle.routes')

app.use('/api/v1/carDriver', v1CarDriverRoutes.router)
app.use('/api/v1/customer', v1CustomerRoutes.router)
app.use('/api/v1/motorRider', v1MotorRiderRoutes.router)
app.use('/api/v1/order', v1OrderRoutes.router)
app.use('/api/v1/user', v1UserRoutes.router)
app.use('/api/v1/vehicle', v1VehicleRoutes.router)

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})