console.log("DEBUG: Background");
browser.contextMenus.create({
  id: "log-selection",
  title: "Save '%s'",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  browser.tabs.insertCSS({
    file: "popup/popup.css"
  });
  chrome.tabs.executeScript(
    tab.id,
    {
      code:
        "var selected_text = '" +
        info.selectionText.replace(/\n/g, "\\n") +
        "';"
    },
    function() {
      chrome.tabs.executeScript(tab.id, { file: "popup/popup.js" });
    }
  );
});
