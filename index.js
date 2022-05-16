const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const fs = require("fs");
const sgMail = require("@sendgrid/mail");
const setApiKey = () => sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const shortid = require("shortid");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${shortid.generate()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: multerStorage });

// POST REQUEST
app.post("/send", upload.array("fileInput"), async (req, res) => {
  // Send Mail Function
  const sendMail = () => {
    return new Promise(async (resolve, reject) => {
      const files = req.files;
      const { email, content, subject, cc, bcc } = req.body;

      const emails = email.map((email) => email);

      console.log(emailArray);
      // Loop through files to return some fields
      const attachments = files.map((file) => {
        const pathToAttachment = file.path;
        const attachment = fs.readFileSync(pathToAttachment).toString("base64");
        return {
          filename: file.originalname,
          disposition: "attachment",
          type: file.mimetype,
          content: attachment,
        };
      });

      const output = `
        <div style="font-family: 'Segoe UI'">
        ${content}
        </div>
      `;

      try {
        setApiKey();
        const msg = {
          to: emails,
          from: "oabdulazeez70@gmail.com", // Use the email address or domain you verified above
          cc: `${cc}`,
          bcc: `${bcc}`,
          subject: `${subject}`,
          html: output,
          attachments: attachments,
        };
        const result = await sgMail.send(msg);
        resolve(result);
        console.log("Message sent!");
      } catch (err) {
        console.log("Error in sendEmail: ", err.response.body);
        reject(err.response.body);
      }
    });
  };
  try {
    await sendMail();
    res.json({
      message: "Message Sent!",
    });
    // res.render('/');
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

// Setting PORT from config
const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
