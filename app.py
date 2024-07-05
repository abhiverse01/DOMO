from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def home():
    return "DOMO - Universal File Downloader API"

@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route('/download', methods=['GET'])
def download_file():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    # Extract the file name from the URL
    file_name = url.split("/")[-1]

    # Ensure the file name is safe
    file_name = file_name.replace("/", "_").replace("\\", "_")

    try:
        response = requests.get(url)
        response.raise_for_status()
        with open(file_name, 'wb') as file:
            file.write(response.content)
        return jsonify({"message": "File downloaded successfully", "file": file_name}), 200
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
