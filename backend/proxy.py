from flask import Flask, request, Response, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/proxy/rank-resumes', methods=['POST', 'OPTIONS'])
def proxy_rank_resumes():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response, 200
    
    try:
        # Forward the request to the actual backend
        target_url = 'http://localhost:5002/rank-resumes'
        
        # Get the form data and files from the request
        job_description = request.form.get('job_description', '')
        resume_files = request.files.getlist('resumes')
        
        # Create a new request to the target server
        files = []
        for file in resume_files:
            # Reset file pointer to beginning before reading
            file.seek(0)
            files.append(('resumes', (file.filename, file.read(), file.content_type)))
        
        data = {'job_description': job_description}
        print(f"Forwarding request with job description: {job_description} and {len(files)} resume files")
        for f in files:
            print(f"File: {f[1][0]}, Size: {len(f[1][1])} bytes")
        
        # Make the request to the target server
        response = requests.post(target_url, files=files, data=data)
        
        # Create a response with the data from the target server
        proxy_response = Response(
            response.content,
            status=response.status_code,
            content_type=response.headers.get('Content-Type', 'application/json')
        )
        
        # Add CORS headers
        proxy_response.headers.add('Access-Control-Allow-Origin', '*')
        
        return proxy_response
    
    except Exception as e:
        print(f"Error in proxy: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'error': str(e),
            'message': 'Proxy server error',
            'results': []  # Return empty results to avoid frontend errors
        }), 200  # Return 200 to avoid CORS errors

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)
