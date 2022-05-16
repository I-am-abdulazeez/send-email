window.onload = function () {
  console.log("I am ready");
  console.log(window.location.href);
  let url = new URL(window.location.href);
  let getToValue = url.searchParams.get("to");
  let getCcValue = url.searchParams.get("cc");
  let getSubjectValue = url.searchParams.get("subject");
  let getUserName = url.searchParams.get("UserName");

  if (getToValue != "") document.getElementById("email").value = getToValue;
  if (getCcValue != "") document.getElementById("cc").value = getCcValue;
  if (getSubjectValue != "")
    document.getElementById("subject").value = getSubjectValue;

  var getPreContent = document.getElementsByClassName("ql-editor")[0].innerHTML;
  if (getUserName != "")
    document.getElementsByClassName(
      "ql-editor"
    )[0].innerHTML = document
      .getElementsByClassName("ql-editor")[0]
      .innerHTML.replace("UserName", getUserName);
  else
    document.getElementsByClassName(
      "ql-editor"
    )[0].innerHTML = document
      .getElementsByClassName("ql-editor")[0]
      .innerHTML.replace("UserName", "");
  //console.log(document.getElementsByClassName("ql-editor")[0].innerHTML);
};

// Add fonts to whitelist, also add to HTML & CSS.
let Font = Quill.import("formats/font");
let FontList = ["segoe"];
// 'montserrat', 'poppins', 'raleway', 'arial',
Font.whitelist = FontList;
Quill.register(Font, true);

let quill = new Quill("#editor", {
  modules: {
    toolbar: "#toolbar",
  },
  theme: "snow",
  placeholder: "Compose an epic...",
});

const defaultValue = `<br><br><br><br>
                <p>
                  Thank you for your valued patronage.
                </p>
                <br>
                <p>
                  Please stay up to date with your Retirement Savings Account (RSA) and other useful information by visiting our website <a href="https://www.aiicopension.com">www.aiicopension.com</a>.
                </p>
                <br>
                <p>For any inquiries, please call us on Tel 0700-AIICOPFA or send an e-mail to 
                <a href="mailto:info@aiicopension.com">info@aiicopension.com</a></p>
                <br>
                <h4><strong><em>AIICO Pension….making smart choices for your future</em></strong></h4>
                <br>
                <h4><strong>Service Desk Team</strong></h4>
                <br>
                <strong>CSU TEAM</strong>
                <br>
                <br>
                <h4>AIICO PENSION MANAGERS LIMITED</h4>
                <h6>Plot 2 Oba Akran Avenue Ikeja , Lagos Nigeria</h6>
                <h6>Tel: 0700-AIICOPFA (0700-24426732) | email: <a href="mailto:info@aiicopension.com">info@aiicopension.com</a> |
                Web: <a href="https://www.aiicopension.com">www.aiicopension.com</a></h6>

`;
const delta = quill.clipboard.convert(defaultValue);

quill.setContents(delta, "silent");

quill.on("text-change", () => {
  const htmlFormat = quill.root.innerHTML;
  const content = (document.getElementById("content").value = htmlFormat);
  console.log(content);
});
