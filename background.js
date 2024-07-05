chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let url = tabs[0].url;
      fetch(`http://localhost:5000/download?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Download Status',
            message: data.error ? `Error: ${data.error}` : `File downloaded successfully: ${data.file}`
          });
        })
        .catch(error => {
          console.error('Fetch error:', error);
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Download Status',
            message: `Error: ${error.message}`
          });
        });
    });
  });
  