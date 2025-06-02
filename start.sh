#!/bin/bash

# Start the Flask backend
echo "Starting Flask backend..."
cd backend
python -m venv venv 2>/dev/null || echo "Virtual environment already exists"
source venv/bin/activate
pip install -r requirements.txt
python app.py &
BACKEND_PID=$!
cd ..

# Start the frontend
echo "Starting React frontend..."
npm run dev &
FRONTEND_PID=$!

# Function to handle cleanup on exit
cleanup() {
  echo "Shutting down services..."
  kill $BACKEND_PID $FRONTEND_PID
  exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

echo "Both services are running. Press Ctrl+C to stop."
echo "Backend running at http://localhost:5000"
echo "Frontend running at http://localhost:3000"

# Keep script running
wait
