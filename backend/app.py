import os
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from google import genai
from google.genai import types

load_dotenv()
app = Flask(__name__)
CORS(app)

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("Please set the GEMINI_API_KEY environment variable")

# Initialize the Gen AI client
client = genai.Client(api_key=API_KEY)


@app.route('/generate_blog', methods=['POST'])
def generate_blog():
    data = request.get_json()
    title    = data.get('title')
    keywords = data.get('keywords')  # list of strings
    length   = data.get('length')    # target word count

    if not title or not keywords or not length:
        return jsonify({'error': 'Missing title, keywords, or length'}), 400

    prompt = (
        f"Generate a comprehensive, engaging blog post about '{title}' "
        f"incorporating keywords {', '.join(keywords)} "
        f"with approximately {length} words."
    )
    contents = [
        types.Content(
            role="user",
            parts=[ types.Part(text=prompt) ]
        )
    ]
    config = types.GenerateContentConfig(response_mime_type="text/plain")

    blog = ""
    for chunk in client.models.generate_content_stream(
        model="gemini-2.0-flash-lite",
        contents=contents,
        config=config
    ):
        blog += chunk.text or ""

    return jsonify({'blog': blog})


@app.route('/generate_image', methods=['OPTIONS', 'POST'], provide_automatic_options=True)
def generate_image():
    data = request.get_json()
    title = data.get("title")
    if not title:
        return jsonify({"error": "Missing title"}), 400

    prompt = f"Generate an image for a blog titled '{title}'"
    contents = [
        types.Content(
            role="user",
           parts=[ types.Part(text=prompt) ]
        )
    ]
    config = types.GenerateContentConfig(response_modalities=["IMAGE", "TEXT"])

    for chunk in client.models.generate_content_stream(
        model="gemini-2.0-flash-preview-image-generation",
        contents=contents,
        config=config
    ):
        for cand in chunk.candidates or []:
            for part in cand.content.parts or []:
                inline = getattr(part, "inline_data", None)
                if inline and inline.data:
                    b64 = base64.b64encode(inline.data).decode("utf-8")
                    return jsonify({"image": f"data:{inline.mime_type};base64,{b64}"})

    return jsonify({"error": "No image generated"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
