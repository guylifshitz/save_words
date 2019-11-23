/*  TODO:
 *          - Handle looking up definition of a word inside the popup.
 *              In this case, an option is to replace the original word, and definitions, but keep the example.
 *              This is good for the case when a word is a flexion (variation) or a lemme (root word).
 *              Ex: dopée ->     Participe passé féminin singulier de doper.
 *          - Select automatically the definitons on click.
 *          - Show Part of Speech categories
 *          - Show gender on nouns
 *          - Make css prettier
 *          - Make code prettier
 *          - Add source site as parameter
 *          - Make text fields larger so can read.
 *          - Filter the example sentence to only 1 sentence, not full paragaraph.
 */

var word = window.getSelection();
var sentence = window.getSelection()["anchorNode"]["data"];
var definition = "[DEFINITON]";

// Build basic popup div
var popup = document.createElement("div");
popup.classList = ["french_word_popup"];
var popup_title = document.createElement("div");
popup.appendChild(popup_title);
document.body.appendChild(popup);

form_html = `<form id="sendWord_form">
  <div id=sendWord_form_cancel>Cancel</div>
  <br>
  Word:
  <br>
  <input type="text" name="word" value="${word}" id="save_form_word">
  <input type="button" id="save_form_search" value="Get definition">  
  <br>
  Example:
  <br>
  <textarea name="example" id="save_form_example">${sentence}</textarea>
  <br><br>
  Definiton:
  <br>
  <textarea name="definition" value="ENTER HERE" id="save_form_definition"></textarea>
  <br><br>
  <div id="save_word_definitions">...</div>
  <br><br>
  <input type="submit" value="Submit">
</form> 
`;

popup_title.innerHTML = form_html;

// API: Get word definitions
function get_definition(search_word) {
  var api_word_definition_request = new XMLHttpRequest();
  api_word_definition_request.open(
    "GET",
    `http://guylifshitz.com:8000/api/words/?q=${search_word}`,
    true
  );
  api_word_definition_request.onload = function() {
    var data = JSON.parse(this.response);
    var definition_html = "<ol>";
    if (
      api_word_definition_request.status >= 200 &&
      api_word_definition_request.status < 400
    ) {
      data["results"].forEach(result => {
        result["poses"].forEach(part_of_speech => {
          part_of_speech["definitions"].forEach(definition => {
            var definition_text = definition["definition_txt"];
            definition_html = definition_html + `<li>${definition_text}</li>`;
          });
        });
      });
      document.querySelector(
        "#save_word_definitions"
      ).innerHTML = definition_html;
    } else {
      console.log("ERROR");
    }
    definition_html = definition_html + "</ul>";
  };
  api_word_definition_request.send();
}

get_definition(word);

// INPUT: Send (save to google form, if fail show alert, hide popup)
function clean_word(phrase)
{
  var clean = phrase.replace(/\%/g, '')
  return clean;
}
document
  .querySelector("#sendWord_form")
  .addEventListener("submit", function(e) {
    e.preventDefault();

    var definition = document.getElementById("save_form_definition").value;
    definition = clean_word(definition);

    var example_sentence = document.getElementById("save_form_example").value;
    example_sentence = clean_word(example_sentence);

    var word_txt = document.getElementById("save_form_word").value;

    var url = `https://docs.google.com/forms/d/e/1FAIpQLSdrJIcpHubmuG_RVvaePXaY--V2S52McKI6me5BrAOaqMU7TA/formResponse?entry.318015364=${word_txt}&entry.1975522348=&entry.1571542855=&entry.1852938782=${definition}&entry.376664097=${example_sentence}&entry.695391719=&submit=Submit`;
    console.log(url);

    function reqListener() {
      console.log(this.responseText);
      document.body.removeChild(popup);
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.onload = function() {
      console.log(oReq);
      if (oReq.status >= 200 && oReq.status < 400) {
        if (oReq.responseText.includes("Your response has been recorded")) {
        } else {
          alert(
            `Failed to save word. See log for url that caused problem.\n\nword:\n${word_txt}\n\ndefinition:\n${definition}\n\nsentence:\n${sentence}\n\nURL:\n${url}`
          );
        }
      } else {
        alert(
          `Failed to save word. See log for url that caused problem.\n\nword:\n${word_txt}\n\ndefinition:\n${definition}\n\nsentence:\n${sentence}\n\nURL:\n${url}`
        );
      }
    };
    oReq.send();
  });

// INPUT: Cancel
document
  .querySelector("#sendWord_form_cancel")
  .addEventListener("click", function(e) {
    document.body.removeChild(popup);
  });

// INPUT get a new definiton.
document.querySelector("#save_form_search").addEventListener(
  "click",
  function() {
    get_definition(document.getElementById("save_form_word").value);
  },
  false
);
