import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Configure the Gemini API client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "AI Service is running!"

@app.route('/generate-question', methods=['POST'])
def generate_question():
    data = request.json
    if not data or 'previous_answers' not in data:
        return jsonify({"error": "Missing 'previous_answers' in request body"}), 400

    previous_answers = data['previous_answers']

    prompt = f"""
    You are an AI assistant for a product transparency form. Your goal is to ask a single, relevant follow-up question based on the user's previous answers.

    You must not repeat a question that has already been asked or answered.
    Your question should be specific and build on the information provided.
    
    If you have asked five follow-up questions, you must respond with the single word "DONE".
    If the user's answers are very detailed, and you cannot think of another relevant, specific question, you must also respond with "DONE".

    Generate one short and specific question based on this context:
    {previous_answers}
    """

    try:
        model = genai.GenerativeModel('gemini-2.0-flash-001')
        response = model.generate_content(prompt)
        question = response.text.strip()
        
        if "DONE" in question.upper():
            return jsonify({"question": "DONE"}), 200
        else:
            return jsonify({"question": question}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)