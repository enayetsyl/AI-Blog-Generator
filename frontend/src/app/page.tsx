"use client";

import  { useState, useRef } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import Image from "next/image";
import { toast } from "sonner";

const BACKEND_BASE_URL = "https://ai-blog-generator-backend-1cl7.onrender.com";

export default function Home() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [length, setLength] = useState(500);
  const [post, setPost] = useState("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const postRef = useRef<HTMLParagraphElement>(null);

  async function handleGenerate() {
    setLoading(true);
    setPost("");
    setImage("");

    try {
      // Generate the blog text
      const blogRes = await fetch(`${BACKEND_BASE_URL}/generate_blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          keywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
          length,
        }),
      });
      if (!blogRes.ok) throw new Error(`Blog error ${blogRes.status}`);
      const { blog } = await blogRes.json();
      setPost(blog);
      toast("Blog created Successfully.")
      // Generate a single image
      const imgRes = await fetch(`${BACKEND_BASE_URL}/generate_image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!imgRes.ok) throw new Error(`Image error ${imgRes.status}`);
      const { image } = await imgRes.json();
      if (typeof image === "string") {
        setImage(image);
      }
      toast("Image generated successfully.")
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (post) {
      navigator.clipboard.writeText(post);
      toast("Blog text copied to clipboard!");
    }
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-8">
        AI Blog & Image Generator
      </h1>

      {/* Input Card */}
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Generate Blog + Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Title
            </label>
            <Input
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="keywords"
              className="block text-sm font-medium text-gray-700"
            >
              Keywords (comma separated)
            </label>
            <Textarea
              id="keywords"
              placeholder="e.g. AI, ethics, innovation"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="length"
              className="block text-sm font-medium text-gray-700"
            >
              Length (approx. words)
            </label>
            <Input
              id="length"
              type="number"
              min={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="mt-4">
            {loading ? "Generating..." : "Generate"}
          </Button>
        </CardContent>
      </Card>

      {/* Blog Post Card */}
      {post && (
        <Card className="w-full max-w-3xl">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Blog Post</CardTitle>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              Copy Text
            </Button>
          </CardHeader>
          <CardContent>
            <p ref={postRef} className="whitespace-pre-line">
              {post}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Generated Image Card */}
      {image && (
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Image
                src={image}
                alt="Generated"
                width={400}
                height={300}
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
              <a href={image} download="generated-image.png">
                <Button>Download Image</Button>
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      <footer className="text-sm text-gray-500">Powered by Gemini API</footer>
    </div>
  );
}
