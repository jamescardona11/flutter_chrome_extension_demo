
function sendMessage(message) {
  chrome.windows.getCurrent(w => {
    chrome.tabs.query({ active: true, windowId: w.id }, tabs => {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, { "type": "notifications", "data": message });
    });
  });
}

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {
    console.log('Updated to URL:', tab.url)
  }
)

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("message listerner -- background.js");
  console.log("message:", message);

  if (message.type === "counter") {
    sendMessage(message.data);
  } else if (message.type === "selectedText") {
    const promise = new Promise(function (resolve, reject) {
      chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        const tabId = tabs[0].id;
        const text = await chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: () => getSelection().toString()
        });
        resolve(text);
      });
    })

    promise.then((response) => {
      sendResponse(response);
    });
    return true;
  }
});

