document.getElementById('download').addEventListener('click', function() {
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('message').textContent = '';

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        fetch(`http://localhost:5000/download?url=${encodeURIComponent(url)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('spinner').style.display = 'none';
                if (data.error) {
                    document.getElementById('message').textContent = `Error: ${data.error}`;
                } else {
                    document.getElementById('message').textContent = `File downloaded successfully: ${data.file}`;
                }
            })
            .catch(error => {
                document.getElementById('spinner').style.display = 'none';
                document.getElementById('message').textContent = `Error: ${error.message}`;
            });
    });
});
