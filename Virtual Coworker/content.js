chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getEmailContent") {
    sendResponse({ content: document.body.innerHTML });
  }
});