from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

app = Flask(__name__)
# Simple CORS configuration
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load your model and tokenizer
model_name = "t5-small"  # Smaller model for faster loading
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    # Handle preflight requests
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    
    try:
        # Get input text from frontend
        data = request.json
        input_text = data.get('text', '')

        if not input_text.strip():
            return jsonify({'error': 'Empty input text received'}), 400

        # Format input for model (T5 expects a task prefix)
        formatted_input = f"summarize: {input_text}"

        # Tokenize the input
        inputs = tokenizer(formatted_input, return_tensors='pt', truncation=True)

        # Generate output using the model
        with torch.no_grad():
            outputs = model.generate(
                inputs['input_ids'],
                max_length=100,
                num_beams=4,
                early_stopping=True
            )

        # Decode the output tokens
        summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return jsonify({'result': summary})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/')
def index():
    return 'Interview AI Backend is running. Use /analyze endpoint with POST requests.'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
