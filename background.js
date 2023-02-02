// Handles the message from the content script and stores the tables in chrome.storage
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    chrome.storage.local.set({ tables: request.tables });
    // if (request.type === "message") {
    //   console.log(request.data+"from backgroundjs"); // logs "Hello from popup"
    // }
    chrome.storage.local.set({ currentURI: request.currentURI });
  });
// chrome.action.onClicked.addListener(
//   function (tab) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       script: { file: 'extractor.js' },
//     });
//   }

// );
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['extractor.js']
  });

  chrome.windows.create({
    url: "popup.html",
    type: "popup",
    width: 500,
    height: 500
  });
});