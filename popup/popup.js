var word = window.getSelection();
var sentence = window.getSelection()["anchorNode"]["data"];

var popup = document.createElement("div");
popup.classList = ["french_word_popup"];
var popup_title = document.createElement("div");
popup.appendChild(popup_title);
document.body.appendChild(popup);

form_html = `<form id="sendWord_form">
  Word:<br>
  <input type="text" name="word" value="${word}">
  <br>
  Example:<br>
  <input type="text" name="example" value="${sentence}">
  <br><br>
  <input type="submit" value="Submit">
  <br><br>
  <div id=sendWord_form_cancel>Cancel</div>
</form> 
`;

popup_title.innerHTML = form_html;

document
  .querySelector("#sendWord_form_cancel")
  .addEventListener("click", function(e) {
    document.body.removeChild(popup);
  });

document
  .querySelector("#sendWord_form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    var url = `https://docs.google.com/forms/d/e/1FAIpQLSdrJIcpHubmuG_RVvaePXaY--V2S52McKI6me5BrAOaqMU7TA/formResponse?entry.318015364=${word}&entry.1975522348=Gender&entry.1571542855=Masc&entry.1852938782=${sentence}&entry.376664097=asd&entry.695391719=asdasd&submit=Submit`;

    function reqListener() {
      console.log(this.responseText);
      document.body.removeChild(popup);
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.send();
  });
