"use client";

import { useState } from "react";

const BUSINESS_TYPES = [
  "Food & Beverage",
  "Fashion & Apparel",
  "Health & Wellness",
  "Home & Lifestyle",
  "Beauty & Skincare",
  "Education & Coaching",
  "Retail & E-commerce",
  "Services & Consulting",
  "Tech & SaaS",
  "Other",
];

const CONTENT_TYPES = [
  "Recipe / How-To",
  "Product Description",
  "Promo / Announcement",
  "Event / Launch",
  "Blog Post / Article",
  "Customer Story",
  "Behind the Scenes",
  "Tips & Advice",
];

const TONES = [
  "Warm & Homey",
  "Bold & Promotional",
  "Friendly & Casual",
  "Professional & Trustworthy",
  "Playful & Fun",
  "Inspiring & Motivational",
];

const IMAGE_STYLES = [
  "Flat Lay",
  "Lifestyle Shot",
  "Minimalist Studio",
  "Vibrant & Bold",
  "Soft Aesthetic",
  "Editorial",
];

const IMAGE_FORMATS = [
  { label: "Square", hint: "Instagram feed", value: "1024x1024" },
  { label: "Landscape", hint: "Facebook / LinkedIn", value: "1792x1024" },
  { label: "Portrait", hint: "Stories / TikTok", value: "1024x1792" },
];

const PLATFORMS = [
  {
    key: "instagram",
    label: "Instagram",
    icon: "📸",
    color: "from-pink-500 to-purple-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    badge: "bg-pink-100 text-pink-700",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: "👥",
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: "💬",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
  },
  {
    key: "email",
    label: "Email Newsletter",
    icon: "📧",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: "💼",
    color: "from-sky-600 to-blue-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-700",
  },
] as const;

type OutputKey = (typeof PLATFORMS)[number]["key"];
type RepurposeOutput = Record<OutputKey, string>;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-150 text-gray-600 hover:text-gray-900 shadow-sm"
    >
      {copied ? (
        <>
          <svg
            className="w-3.5 h-3.5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function OutputCard({
  platform,
  content,
}: {
  platform: (typeof PLATFORMS)[number];
  content: string;
}) {
  return (
    <div
      className={`rounded-2xl border ${platform.border} ${platform.bg} p-5 flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{platform.icon}</span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${platform.badge}`}
          >
            {platform.label}
          </span>
        </div>
        <CopyButton text={content} />
      </div>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
      <p className="text-xs text-gray-400 text-right">
        {content.length} characters
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );
}

function ImageGenerationCard({
  businessName,
  businessType,
  contentType,
  content,
}: {
  businessName: string;
  businessType: string;
  contentType: string;
  content: string;
}) {
  const [imageStyle, setImageStyle] = useState("Lifestyle Shot");
  const [imageFormat, setImageFormat] = useState("1024x1024");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productImageMimeType, setProductImageMimeType] = useState("image/jpeg");
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProductImagePreview(URL.createObjectURL(file));
    setProductImageMimeType(file.type || "image/jpeg");

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setProductImage(dataUrl.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateImage = async () => {
    setImageLoading(true);
    setImageError(null);
    setImageUrl(null);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          businessType,
          contentType,
          content,
          imageStyle,
          imageFormat,
          productImage,
          productImageMimeType,
          customPrompt: customPrompt.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (data.error === "no_key") {
        setImageError("no_key");
        return;
      }

      if (!res.ok) {
        setImageError(data.error || "Image generation failed. Please try again.");
        return;
      }

      setImageUrl(data.imageUrl);
    } catch {
      setImageError("Network error. Please check your connection and try again.");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">🖼️</span>
        <span className="text-sm font-semibold text-gray-800">Generate a Marketing Image</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 ml-auto">
          Powered by Gemini
        </span>
      </div>

      {imageError === "no_key" ? (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 leading-relaxed">
          Add your <code className="font-mono bg-amber-100 px-1 rounded">GEMINI_API_KEY</code> to{" "}
          <code className="font-mono bg-amber-100 px-1 rounded">.env.local</code> to enable image
          generation — see README for instructions.
        </div>
      ) : (
        <>
          {/* Custom prompt */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Describe your image{" "}
              <span className="text-gray-400 font-normal">(optional — for services or specific ideas)</span>
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. A calming massage room with soft lighting and white towels, or a coach presenting to a small group..."
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition resize-none leading-relaxed"
            />
          </div>

          {/* Reference image upload */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Upload a reference image{" "}
              <span className="text-gray-400 font-normal">(optional — product photo or logo)</span>
            </label>
            <label className="flex flex-col items-center justify-center w-full cursor-pointer">
              {productImagePreview ? (
                <div className="relative w-full">
                  <img
                    src={productImagePreview}
                    alt="Reference preview"
                    className="w-full max-h-40 object-contain rounded-xl border border-gray-200 bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProductImage(null);
                      setProductImagePreview(null);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-800/70 text-white text-xs flex items-center justify-center hover:bg-gray-900"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="w-full border-2 border-dashed border-gray-200 rounded-xl py-6 flex flex-col items-center gap-1.5 hover:border-purple-300 transition-colors bg-gray-50">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs text-gray-500">Click to upload product photo or logo</span>
                  <span className="text-xs text-gray-400">JPG, PNG, WEBP</span>
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Style selection */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Image Style</label>
            <div className="flex flex-wrap gap-2">
              {IMAGE_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setImageStyle(style)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 ${
                    imageStyle === style
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Format selection */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Format</label>
            <div className="flex gap-2">
              {IMAGE_FORMATS.map((fmt) => (
                <button
                  key={fmt.value}
                  type="button"
                  onClick={() => setImageFormat(fmt.value)}
                  className={`flex-1 flex flex-col items-center py-2 px-3 rounded-xl border text-xs transition-all duration-150 ${
                    imageFormat === fmt.value
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <span className="font-medium">{fmt.label}</span>
                  <span
                    className={`mt-0.5 ${imageFormat === fmt.value ? "text-purple-200" : "text-gray-400"}`}
                  >
                    {fmt.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateImage}
            disabled={imageLoading}
            className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {imageLoading ? (
              <>
                <Spinner />
                Generating image...
              </>
            ) : (
              "Generate Image"
            )}
          </button>

          {imageError && imageError !== "no_key" && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              ⚠️ {imageError}
            </p>
          )}

          {imageUrl && (
            <div className="flex flex-col gap-2">
              <img
                src={imageUrl}
                alt="Generated product image"
                className="w-full rounded-xl border border-gray-200"
              />
              <a
                href={imageUrl}
                download="generated-image.jpg"
                className="text-xs text-center text-purple-600 hover:underline"
              >
                Download image ↓
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [businessName, setBusinessName] = useState("Sunny Homemade");
  const [businessType, setBusinessType] = useState("Food & Beverage");
  const [contentType, setContentType] = useState("Product Description");
  const [tone, setTone] = useState("Warm & Homey");
  const [content, setContent] = useState("");
  const [output, setOutput] = useState<RepurposeOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      const res = await fetch("/api/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, businessType, contentType, tone, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setOutput(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const charCount = content.length;
  const isReady = content.trim().length >= 10;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
              ✦
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-sm leading-none">
                AI Content Repurposer
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">Powered by Claude</p>
            </div>
          </div>
          <a
            href="https://github.com/shireen-mvps"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            shireen-mvps
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            One input.{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Five platforms.
            </span>
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            Paste your content and get ready-to-post captions for Instagram, Facebook, WhatsApp,
            Email, and LinkedIn — instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Sunny Homemade"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition bg-white"
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Content Type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition bg-white"
                >
                  {CONTENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition bg-white"
                >
                  {TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Your Content</label>
                <span
                  className={`text-xs ${charCount > 1500 ? "text-red-400" : "text-gray-400"}`}
                >
                  {charCount} / 1500
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your recipe, product description, announcement, or any content here..."
                rows={7}
                maxLength={1500}
                className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition resize-none leading-relaxed"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!isReady || loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Spinner />
                  Repurposing content...
                </>
              ) : (
                <>
                  <span>✦</span>
                  Repurpose Content
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-400">
              Works for any business. Demo pre-loaded with Sunny Homemade.
            </p>
          </form>

          {/* Output */}
          <div className="flex flex-col gap-4">
            {!output && !loading && (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 p-10 text-center flex flex-col items-center gap-3">
                <div className="text-4xl">✦</div>
                <p className="text-sm text-gray-500 font-medium">
                  Your repurposed content will appear here
                </p>
                <p className="text-xs text-gray-400">
                  5 platform-ready posts generated in seconds
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {PLATFORMS.map((p) => (
                    <span
                      key={p.key}
                      className={`text-xs px-2.5 py-1 rounded-full ${p.badge}`}
                    >
                      {p.icon} {p.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                  <span className="text-white text-xl">✦</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Claude is writing your content...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Crafting 5 platform-specific posts</p>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {output &&
              PLATFORMS.map((platform) => (
                <OutputCard
                  key={platform.key}
                  platform={platform}
                  content={output[platform.key]}
                />
              ))}

            {output && (
              <ImageGenerationCard
                businessName={businessName}
                businessType={businessType}
                contentType={contentType}
                content={content}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-gray-400 pb-8">
          Built by{" "}
          <a
            href="https://github.com/shireen-mvps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:underline"
          >
            Shireen
          </a>{" "}
          · Powered by Claude
        </footer>
      </div>
    </main>
  );
}
