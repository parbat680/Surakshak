require('dotenv/config')
const express = require("express");
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const ConnectionDB = require("./database");
const multer = require('./Middlewares/multer')
app.use(express.json());
ConnectionDB();
// const chatBot = require('./WhatsappBot/messages')
//Comments
app.use(cors())
app.use("/api/image", multer.router)
app.use('/api/v1/senior', require("./Routes/seniorCitizens"))
// app.use('/api/v1/blockchain' , require('./Routes/blockchain'))
app.use('/api/v1/volunteer', require('./Routes/volunteer'))
app.use('/api/v1/meds', require('./Routes/medicine'))
app.use('/api/v1/hospital', require('./Routes/hospitals'))
app.use('/api/v1/ngo', require('./Routes/ngo'))
app.use('/api/v1/event', require('./Routes/events'))
app.use('/api/v1/sos', require('./Routes/sos'))



app.listen(port, () => console.log(`Server up and running...at ${port}`))