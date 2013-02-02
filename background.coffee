onFor = {}

chrome.browserAction.onClicked.addListener (tab) ->
  onFor[tab.id] = false  if onFor[tab.id] is `undefined`
  on_ = onFor[tab.id] = not onFor[tab.id]
  unless on_
    chrome.browserAction.setBadgeText text: "off"
    chrome.tabs.executeScript null,
      code: "document.getElementsByTagName('html')[0].removeAttribute('contenteditable');"

  else if on_
    chrome.browserAction.setBadgeText text: "on"
    chrome.tabs.executeScript null,
      code: "document.getElementsByTagName('html')[0].setAttribute('contenteditable', true);"

chrome.tabs.onActiveChanged.addListener (tabId, activeInfo) ->
  chrome.tabs.get tabId, (tab) ->
    on_ = onFor[tabId]
    unless on_
      chrome.browserAction.setBadgeText text: "off"
    else chrome.browserAction.setBadgeText text: "on"  if on_

chrome.tabs.onUpdated.addListener (tabId, changeInfo, tab) ->
  if changeInfo and changeInfo.status is "loading"
    onFor[tab.id] = false
    chrome.browserAction.setBadgeText text: "off"
