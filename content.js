chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
      code: 'document.getElementById("description").value = "Hello World";'
  });
});
