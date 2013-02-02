var onFor = {};

chrome.browserAction.onClicked.addListener(function(tab) {
  if (onFor[tab.id] === undefined) onFor[tab.id] = false

  var on = onFor[tab.id] = !onFor[tab.id];

  if (!on) {
    chrome.browserAction.setBadgeText({ text: "off" });
    chrome.tabs.executeScript(null, { code: "document.getElementsByTagName('html')[0].removeAttribute('contenteditable');" });
  } else if (on) {
    chrome.browserAction.setBadgeText({ text: "on" });
    chrome.tabs.executeScript(null, { code: "document.getElementsByTagName('html')[0].setAttribute('contenteditable', true);" });
  }
});

chrome.tabs.onActiveChanged.addListener(function (tabId, activeInfo) {
  chrome.tabs.get(tabId, function (tab) {
    var on = onFor[tabId];
    if (!on) {
      chrome.browserAction.setBadgeText({ text: "off" });
    } else if (on) {
      chrome.browserAction.setBadgeText({ text: "on" });
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo && changeInfo.status === "loading") {
    onFor[tab.id] = false;
    chrome.browserAction.setBadgeText({ text: "off" });
  }
});