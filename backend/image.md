# To run this code you need to install the following dependencies:
# pip install google-genai

import base64
import mimetypes
import os
from google import genai
from google.genai import types


def save_binary_file(file_name, data):
    f = open(file_name, "wb")
    f.write(data)
    f.close()
    print(f"File saved to to: {file_name}")


def generate():
    client = genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

    model = "gemini-2.0-flash-preview-image-generation"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""Generate 2 images for a blog titled \"Effects of Generative AI\""""),
            ],
        ),
        types.Content(
            role="model",
            parts=[
                types.Part.from_text(text="""Image 1: A digital illustration showcasing the transformative potential of generative AI. The image will depict abstract, interconnected nodes and lines in vibrant, futuristic colors, symbolizing the vast network and data processing capabilities of AI. Emerging from this network will be diverse icons representing various applications of generative AI: a paintbrush stroke turning into a realistic portrait, musical notes forming a complex melody, lines of code morphing into a website design, and abstract shapes coalescing into a 3D model. The overall feel should be dynamic and forward-looking, suggesting innovation and creativity.

"""),
                types.Part.from_bytes(
                    mime_type="image/png",
                    data=base64.b64decode(
                        """iVBOMldMbEPaDVWXMKjP597vPw0ax1iviaJBPDo/6XmSHpdbHL8AAAAAElFTkSuQmCC"""
                    ),
                ),
            ],
        ),
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""INSERT_INPUT_HERE"""),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        response_modalities=[
            "IMAGE",
            "TEXT",
        ],
        response_mime_type="text/plain",
    )

    file_index = 0
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if (
            chunk.candidates is None
            or chunk.candidates[0].content is None
            or chunk.candidates[0].content.parts is None
        ):
            continue
        if chunk.candidates[0].content.parts[0].inline_data and chunk.candidates[0].content.parts[0].inline_data.data:
            file_name = f"ENTER_FILE_NAME_{file_index}"
            file_index += 1
            inline_data = chunk.candidates[0].content.parts[0].inline_data
            data_buffer = inline_data.data
            file_extension = mimetypes.guess_extension(inline_data.mime_type)
            save_binary_file(f"{file_name}{file_extension}", data_buffer)
        else:
            print(chunk.text)

if __name__ == "__main__":
    generate()
