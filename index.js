const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded());
app.use(express.json())

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'

}))


app.post('/send-email', async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7a8206e6a259d5",
      pass: "2b800b9cdc926a"
    }
  });

  const mailOptions = {
    from: "azeemsaifi38180@gmail.com",
    to: "azeemsaifi38180@gmail.com",
    subject: "Someone Contact your site",
    html: "<p>Name: " + req.body.name + "</p> Email: " + req.body.email + "<p> Phone Number: " + req.body.number +
      "<p> Message: " + req.body.message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        res.status(400).json({message:error});
    } else {
        res.status(200).json({message:"Message Successfully Sended"})
    }
})
});



app.listen(port, () => {
  console.log('Server is running');
});

