from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import PyPDF2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertTokenizer, BertModel
import torch

app = Flask(__name__)

# Configure CORS to allow all origins
CORS(app, resources={r"/*": {"origins": "*"}})

# Add CORS headers to all responses
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return response

# Load model only once when the app starts
MODEL_NAME = "bert-base-uncased"  # Using standard BERT instead of specialized one for simplicity
tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)
model = BertModel.from_pretrained(MODEL_NAME)

def extract_text_from_pdf(pdf_file):
    try:
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

def extract_resume_text(resume_file):
    filename = resume_file.filename.lower()
    if filename.endswith('.pdf'):
        return extract_text_from_pdf(resume_file)
    elif filename.endswith('.txt'):
        return resume_file.read().decode('utf-8')
    else:
        return ""

def get_embedding(text):
    # Truncate text to avoid token length issues
    max_length = 512
    inputs = tokenizer(text, return_tensors="pt", max_length=max_length, truncation=True, padding="max_length")
    with torch.no_grad():
        outputs = model(**inputs)
    # Use the CLS token embedding as the document embedding
    return outputs.last_hidden_state[:, 0, :].numpy()[0]

@app.route("/analyze-resumes", methods=["POST", "OPTIONS"])
def analyze_resumes():
    if request.method == "OPTIONS":
        return jsonify({}), 200
        
    try:
        if 'job_description' not in request.form or 'resumes' not in request.files:
            return jsonify({"error": "Missing job description or resumes", "results": []}), 200

        jd = request.form['job_description']
        resume_files = request.files.getlist("resumes")
        
        print(f"Received job description: {jd[:100]}...")
        print(f"Received {len(resume_files)} resume files")
        
        # Get job description embedding
        jd_embedding = get_embedding(jd)
        scores = []

        for resume_file in resume_files:
            print(f"Processing file: {resume_file.filename}")
            text = extract_resume_text(resume_file)
            if not text.strip():
                print(f"No text extracted from {resume_file.filename}")
                continue
                
            print(f"Extracted {len(text)} characters from {resume_file.filename}")
            resume_embedding = get_embedding(text)
            score = cosine_similarity([jd_embedding], [resume_embedding])[0][0]
            
            scores.append({
                "filename": resume_file.filename,
                "cosine_similarity": round(float(score), 4)
            })

        sorted_scores = sorted(scores, key=lambda x: x['cosine_similarity'], reverse=True)
        print(f"Analysis complete. Results: {sorted_scores}")
        
        return jsonify({"results": sorted_scores})
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Error in analyze_resumes: {str(e)}")
        return jsonify({"error": str(e), "results": []}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5010, debug=True)
