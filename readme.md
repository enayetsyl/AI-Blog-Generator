# Blogsmith AI

## Introduction
An AI-powered web application that generates engaging blog posts and accompanying images based on a user-specified title, keywords, and desired length—powered by Google’s Gemini API.

## Project Description
This project consists of a **Next.js** frontend and a **Flask** backend that together provide a seamless interface for generating AI-written blog posts and AI-created images. Users enter a blog title, keywords, and target word count; upon submission, the frontend calls the backend, which in turn uses Google’s Gemini models to produce both text and imagery. The generated blog text is displayed with a one-click copy feature, and the image can be downloaded immediately.

## Features
- **Custom Blog Generation**: Produce comprehensive blog posts around any title and set of keywords.  
- **Adjustable Length**: Specify approximate word count (minimum 100 words).  
- **AI-Generated Imagery**: Automatically generate a hero image tailored to your blog title.  
- **Clipboard Copy**: Copy the generated blog content with a single click.  
- **Image Download**: Download the generated image as a PNG.  
- **Responsive UI**: Built with Tailwind CSS and Radix UI components for a polished, mobile-friendly experience.  
- **Toast Notifications**: Real-time feedback with Sonner to inform users of generation status.

## Technology Stack

### Frontend
- **Next.js** v15.3.3  
- **React** v19.0.0  
- **Tailwind CSS** v4 & **tw-animate-css**  
- **Radix UI** (`@radix-ui/react-slot`)  
- **clsx** & **class-variance-authority** for utility-first class management  
- **Sonner** for notifications  
- **Next Themes** for dark/light mode support  

### Backend
- **Python** 3.10+  
- **Flask** v3.1.1 & **Flask-CORS**  
- **Google GenAI** (`google-genai` v1.10.0) with Gemini API  
- **Gunicorn** for production WSGI serving  

## Installation Guideline

### Prerequisites
- **Node.js** & **npm** (or Yarn)  
- **Python** 3.10+  
- A **Gemini API Key**  

### Installation Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/enayetsyl/AI-Blog-Generator.git
   cd AI-Blog-Generator
   ```

2. **Backend setup**  
```bash
cd backend
python -m venv venv              # or your preferred virtual environment
source venv/bin/activate         # macOS/Linux
.\venv\Scripts\activate          # Windows
pip install --upgrade pip
pip install -r requirements.txt

```

3. **Frontend setup**  

```bash
cd ../frontend
npm install                      # or yarn install
```

### Configuration

Create a .env file at the root of the backend/ directory containing:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### Usage

1. **Start the backend server** 

```bash
# from backend/ directory
export FLASK_APP=app.py           # macOS/Linux
set FLASK_APP=app.py              # Windows
flask run --host=0.0.0.0 --port=5000
```

2. **Start the frontend** 

```bash
# from frontend/ directory
npm run dev                       # or yarn dev
```

3. **Open in your browser** 
Navigate to http://localhost:3000, enter your blog title, keywords, and length, then click Generate.

- Once generation completes, view and copy the blog text.

- Download the accompanying image as a PNG file.

### Live Links

- Frontend: [Live Link](https://ai-blog-generator-3aa3.vercel.app/)


### GitHub Link


### Contact Information
- Email: enayetflweb@gmail.com
- LinkedIn: [Profile](https://www.linkedin.com/in/md-enayetur-rahman/)


### Conclusion
The AI Blog & Image Generator harnesses the power of Google’s Gemini models to simplify content creation—transforming a simple title and keywords into polished blog posts and visuals in seconds. Whether you’re a content creator, marketer, or developer, this tool accelerates ideation, reduces manual effort, and elevates your workflow with state-of-the-art generative AI.