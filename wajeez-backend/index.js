const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require('cors')
const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
}))

app.use("/", express.static("public"));
app.use(fileUpload());
app.post("/extract-text", (req, res) => {
    console.log('receievd a pdf')
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        res.send(result.text);
    });
    console.log('pdf converted')

});

app.listen(3000)
console.log('server listening on port ', 3000)
