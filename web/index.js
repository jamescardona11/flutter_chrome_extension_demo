
async function getPageUrl() {
  console.log("getPageUrl -- web/index.js");
  const tabs = await chrome.tabs.query({ 'active': true });
  console.log("Return from chrome.tabs.query", tabs[0].url);
  return tabs[0].url;
}

