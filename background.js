chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let url = tabs[0].url;
      fetch(`http://localhost:5000/download?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert("File download initiated!");
        });
    });
  });
  