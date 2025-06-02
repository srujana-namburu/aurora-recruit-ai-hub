# Interview AI Backend

This is a Flask backend for the Interview AI features that includes:

1. Resume Matcher - Uses the HuggingFace model "Shushant/ApplicantTrackingSystemBERT" to analyze resumes based on job descriptions
2. Interview Analyzer - Uses the HuggingFace model "t5-base" to analyze and summarize interview feedback

## Setup

1. Create a Python virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the Flask server:

```bash
python app.py
```

The server will run on http://localhost:5000

## API Endpoints

### POST /rank-resumes

Ranks resumes based on their similarity to a job description.

**Request:**
- Form data with:
  - `job_description`: Text of the job description
  - `resumes`: Multiple resume files (PDF or TXT)

**Response:**
```json
{
  "results": [
    {
      "filename": "resume1.pdf",
      "cosine_similarity": 0.8765
    },
    {
      "filename": "resume2.pdf",
      "cosine_similarity": 0.7654
    }
  ]
}
```

### POST /analyze

Analyzes and summarizes interview feedback text.

**Request:**
- JSON data with:
  - `text`: The interview feedback text to analyze

**Example Request:**
```json
{
  "text": "The candidate demonstrated strong problem-solving skills during the technical interview. They were able to solve the algorithm questions efficiently and explained their thought process clearly. Their communication skills were excellent, and they asked insightful questions about the team and company culture. However, they seemed to lack experience with some of our core technologies, particularly in cloud infrastructure and containerization."
}
```

**Response:**
```json
{
  "result": "The candidate showed excellent problem-solving and communication skills during the technical interview. They solved algorithm questions efficiently and explained their approach clearly. They asked good questions about the team and company. However, they lack experience in cloud infrastructure and containerization technologies."
}
```

## Notes

- The Resume Matcher uses cosine similarity to rank resumes against the job description
- The Interview Analyzer uses the T5 model for text summarization of interview feedback
- Both HuggingFace models will be downloaded on first run
- Resume Matcher supports PDF and TXT files for analysis
- Interview Analyzer accepts plain text input
