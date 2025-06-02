#!/bin/bash

# Ensure virtual environment exists
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Creating one..."
    python3 -m venv venv
    source venv/bin/activate
    echo "Installing required packages..."
    pip install flask flask-cors transformers torch
    echo "Installed required packages."
else
    source venv/bin/activate
    # Make sure required packages are installed
    if ! pip show transformers > /dev/null 2>&1; then
        echo "Installing transformers and torch..."
        pip install transformers torch
    fi
    if ! pip show flask > /dev/null 2>&1; then
        echo "Installing Flask and Flask-CORS..."
        pip install flask flask-cors
    fi
fi

# Run the interview analyzer Flask app
python interview_analyzer.py
