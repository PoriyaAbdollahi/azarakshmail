const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();


const app = express()
app.use(express.static("public"));
app.use(express.json()) // to accept JSON data

app.get("/", (req, res) => {
    res.send("API is running abc")
})


app.post("/", (req, res) => {
    // res.send("API is running abc")
    const transporter = nodemailer.createTransport({

            service:"outlook", // use SSL
        auth: {
            user: "azarakhshteam@outlook.com",
            pass: "Biaborotoazarakhsh2"
        }
    })


    const mailOptions = {
        from:"azarakhshteam@outlook.com",
        to:"poriyaa58@gmail.com",
        subject: "New Message from " + req.body.name + " with email :" + req.body.email,
        text:  "نام : " + req.body.name  +"\n"+"ایمیل :" + req.body.email + "\n" + req.body.text
    }

    transporter.sendMail(mailOptions, function (err, data) { 
        if (err) {
            console.log(err)
            res.send("Error")
        } else {
            res.send("Email sent")

        }
    })

})


const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`server started on PORT ${PORT}`))

module.exports = app;