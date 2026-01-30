import os

# Define the structure: folder -> list of (file, content)
folders = {
    "DataEngineering": [
        ("README.md", "# DataEngineering\n\nPut your ETL/data pipeline code here.\n"),
        ("main.py", "# Entry point for DataEngineering\n\ndef main():\n    print('DataEngineering pipeline start')\n\nif __name__ == '__main__':\n    main()\n"),
    ],
    "DataScience": [
        ("README.md", "# DataScience\n\nNotebooks, experiments, and ML models go here.\n"),
        ("main.ipynb", "{\n \"cells\": [\n  {\n   \"cell_type\": \"markdown\",\n   \"metadata\": {},\n   \"source\": [\n    \"# DataScience Notebook\\n\",\n    \"Start your analysis here.\"\n   ]\n  }\n ],\n \"metadata\": {},\n \"nbformat\": 4,\n \"nbformat_minor\": 2\n}\n"),
    ],
    "FrontEnd": [
        ("README.md", "# FrontEnd\n\nPut your front-end code here (e.g., React, Vue).\n"),
        ("index.html", "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>FrontEnd</title>\n</head>\n<body>\n  <h1>Welcome to the FrontEnd</h1>\n</body>\n</html>\n"),
    ],
    "BackEnd": [
        ("README.md", "# BackEnd\n\nAPI and server code goes here.\n"),
        ("app.py", "# Entry point for BackEnd\n\nfrom flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return 'Hello from BackEnd!'\n\nif __name__ == '__main__':\n    app.run(debug=True)\n"),
        ("requirements.txt", "flask==2.3.3\n"),
    ],
}

def create_scaffold():
    for folder, files in folders.items():
        os.makedirs(folder, exist_ok=True)
        for fname, content in files:
            fpath = os.path.join(folder, fname)
            if not os.path.exists(fpath):
                with open(fpath, "w", encoding="utf-8") as f:
                    f.write(content)
    print("Scaffold created successfully.")

if __name__ == "__main__":
    create_scaffold()