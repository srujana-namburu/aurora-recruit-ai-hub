from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import datetime
import PyPDF2
import torch
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from transformers import AutoTokenizer, AutoModel
import torch

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load Hugging Face model
MODEL_NAME = "Shushant/ApplicantTrackingSystemBERT"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModel.from_pretrained(MODEL_NAME)

# Utility to compute mean pooled embedding
def get_embedding(text):
    # Truncate text to fit within BERT's maximum token limit (512)
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
    print(f"Tokenized input length: {len(inputs['input_ids'][0])}")
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

# Extract text from PDF
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

# Extract text from resume (PDF or TXT)
def extract_resume_text(file_storage):
    if file_storage.filename.lower().endswith(".pdf"):
        try:
            return extract_text_from_pdf(file_storage)
        except Exception as e:
            print(f"Error extracting PDF: {e}")
            return ""
    elif file_storage.filename.lower().endswith(".txt"):
        try:
            return file_storage.read().decode('utf-8')
        except Exception as e:
            print(f"Error reading TXT: {e}")
            return ""
    else:
        print(f"Unsupported file type: {file_storage.filename}")
        return ""

@app.route("/rank-resumes", methods=["POST", "OPTIONS"])
def rank_resumes():
    if request.method == "OPTIONS":
        return jsonify({}), 200
        
    try:
        print("Request received for resume ranking")
        print(f"Form data: {request.form}")
        print(f"Files: {request.files}")
        
        if 'job_description' not in request.form or 'resumes' not in request.files:
            print("Missing job description or resumes")
            return jsonify({"error": "Missing job description or resumes", "results": []}), 200

        jd = request.form['job_description']
        resume_files = request.files.getlist("resumes")
        print(f"Job description length: {len(jd)}")
        print(f"Number of resumes: {len(resume_files)}")

        # Force reload of files if needed
        print(f"Number of resume files in request: {len(resume_files)}")
        for i, file in enumerate(resume_files):
            print(f"Resume {i+1}: {file.filename}")
            
        if len(resume_files) == 0:
            print("No resume files found in request")
            return jsonify({"error": "No resume files found", "results": []}), 200

        try:
            jd_embedding = get_embedding(jd)
            print("Successfully created job description embedding")
        except Exception as e:
            print(f"Error creating job description embedding: {e}")
            return jsonify({"error": f"Error processing job description: {str(e)}", "results": []}), 200

        scores = []

        for resume_file in resume_files:
            try:
                print(f"Processing file: {resume_file.filename}")
                text = extract_resume_text(resume_file)
                print(f"Extracted text length: {len(text)}")
                
                if not text.strip():
                    print(f"No text extracted from {resume_file.filename}")
                    continue
                    
                resume_embedding = get_embedding(text)
                score = cosine_similarity([jd_embedding], [resume_embedding])[0][0]
                
                result = {
                    "filename": resume_file.filename,
                    "cosine_similarity": round(float(score), 4)
                }
                print(f"Score for {resume_file.filename}: {result['cosine_similarity']}")
                scores.append(result)
            except Exception as e:
                print(f"Error processing resume {resume_file.filename}: {e}")
                # Continue with other resumes instead of failing completely
                continue

        sorted_scores = sorted(scores, key=lambda x: x['cosine_similarity'], reverse=True)
        print(f"Final results: {sorted_scores}")

        # Always return a 200 status code with results, even if empty
        return jsonify({"results": sorted_scores})
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Error in rank_resumes: {str(e)}")
        return jsonify({"error": str(e), "results": []}), 200

@app.route("/test", methods=["GET"])
def test_route():
    return jsonify({"status": "success", "message": "Backend is working!", "timestamp": str(datetime.datetime.now())})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5002)
