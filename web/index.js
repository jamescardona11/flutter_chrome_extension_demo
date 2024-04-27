
async function getPageUrl() {
  console.log("getPageUrl -- web/index.js");
  const tabs = await chrome.tabs.query({ 'active': true });
  console.log("Return from chrome.tabs.query", tabs[0].url);
  return tabs[0].url;
}

async function getSelectedText() {
  console.log("selectedText -- web/index.js");

  const promise = new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({ type: "selectedText" }, function (response) {
      resolve(response);
    });

  })

  const selection = await promise;
  if (selection) {
    return selection[0].result ?? '';
  }
  return '';
}

// const w = await chrome.windows.getCurrent()
//   const tabs = await chrome.tabs.query({ active: true, windowId: w.id });
//   chrome.tabs.sendMessage(tabs[0].id, { "type": "selectedText" }, function (response) {
//     resolve(response);
//   });
