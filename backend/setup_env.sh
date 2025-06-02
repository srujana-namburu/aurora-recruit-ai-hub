#!/bin/bash

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
echo "Installing required packages..."
pip install -r requirements.txt

echo "Setup complete! You can now run the interview analyzer with ./run_interview_analyzer.sh"
