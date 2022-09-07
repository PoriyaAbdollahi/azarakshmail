const express = require("express");

const nodemailer = require("nodemailer");



const app = express()
app.use(express.static("public"));
app.use(express.json()) // to accept JSON data

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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


const PORT =  5000

app.listen(5000, console.log(`server started on PORT ${PORT}`))
