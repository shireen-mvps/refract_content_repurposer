# Refract — AI Content Repurposer

> One input. Five platforms. Instantly.

**Refract** is a full-stack AI marketing tool that takes any piece of content and generates platform-optimised copy for **Instagram, Facebook, WhatsApp, Email Newsletter, and LinkedIn** — all tailored to each platform's native culture, and aligned to your campaign goal.

Built with **Next.js 15**, **Vercel AI SDK**, and **Claude AI (claude-sonnet-4-6)**.

**Live demo:** [refract-nu.vercel.app](https://refract-nu.vercel.app)

---

## What it does

1. Set your business name, type, and tone — save it as a **Brand Kit** for future sessions
2. Choose a **Campaign Goal** (Grow Awareness, Drive Sales, Product Launch, and more)
3. Paste your original content
4. Hit **Repurpose Content**
5. Get 5 platform-ready posts with one-click copy buttons
6. Export a branded, editable **PowerPoint content deck** to share with clients or your team
7. Optionally generate a **marketing image** using Gemini AI

Each output is tailored to the native culture of that platform — not just the same text resized. Campaign goal is baked into the prompt so every post serves a strategic purpose.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **5-platform repurposing** | Instagram, Facebook, WhatsApp, Email Newsletter, LinkedIn |
| **Campaign Goal alignment** | Posts are strategically written toward your chosen goal |
| **Brand Kit** | Save business name, type and tone to localStorage — auto-loads on next visit |
| **Content History** | Last 5 generations saved locally — click to restore any session |
| **Export as .pptx** | Download a branded, editable PowerPoint content deck |
| **AI Image Generation** | Generate marketing images via Gemini 2.5 Flash |
| **Rate limiting** | 5 repurposes / day per IP (Upstash Redis) — cost-safe for public demos |

---

## Tech Stack

| Layer       | Technology                                     |
|-------------|------------------------------------------------|
| Framework   | Next.js 15 (App Router)                        |
| AI          | Claude claude-sonnet-4-6 via Anthropic API     |
| AI SDK      | Vercel AI SDK v4 + @ai-sdk/anthropic           |
| Image AI    | Gemini 2.5 Flash via @google/generative-ai     |
| PPTX export | PptxGenJS (browser-side, no server required)   |
| Styling     | Tailwind CSS v3                                |
| Language    | TypeScript                                     |
| Rate limit  | Upstash Redis via @upstash/ratelimit           |
| Deployment  | Vercel (free tier)                             |

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/shireen-mvps/ai-content-repurposer.git
cd ai-content-repurposer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API keys

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your keys:

```
ANTHROPIC_API_KEY=your_anthropic_key_here
```

Get your Anthropic key at [console.anthropic.com](https://console.anthropic.com).

#### Image Generation (Optional)

To enable AI image generation, add your Gemini API key:

```
GEMINI_API_KEY=your_gemini_key_here
```

Get your free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

- Supports uploading a product photo as a reference image
- Square (1:1), Landscape (16:9), and Portrait (9:16) formats
- If the key is not set, the image section shows a setup prompt

#### Rate Limiting (Optional)

To enable daily usage limits (recommended for public deployments):

```
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Create a free Redis database at [upstash.com](https://upstash.com) and copy the REST URL and token.

> **Security note:** Never commit `.env.local` to GitHub. It is already listed in `.gitignore`. Only `.env.local.example` (with placeholder values) is safe to commit.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repo
4. In **Environment Variables**, add:
   - `ANTHROPIC_API_KEY` — required
   - `GEMINI_API_KEY` — optional, for image generation
   - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — optional, for rate limiting
5. Click **Deploy**

Live in under 2 minutes.

---

## Project Structure

```
ai-content-repurposer/
├── app/
│   ├── api/
│   │   ├── repurpose/
│   │   │   └── route.ts        # Claude API — structured content generation
│   │   └── generate-image/
│   │       └── route.ts        # Gemini API — marketing image generation
│   ├── ratelimit.ts            # Upstash Redis rate limiters
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Full UI — form, output cards, export, history
├── lib/
│   └── generatePptx.ts         # PptxGenJS content deck generator
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## Demo Use Case

Pre-loaded with **Sunny Homemade** — a real homemade food business. Fully industry-agnostic: works for fashion, coaching, SaaS, retail, services, and more.

---

## Roadmap

Features planned for the Pro tier:

- [ ] **Audio overview** — generate a podcast-style audio summary of your content via Google NotebookLM API ([notebooklm-py](https://github.com/teng-lin/notebooklm-py))
- [ ] **Supabase auth** — multi-user accounts with saved brand kits and campaign history
- [ ] **Multiple brand kits** — manage content for multiple clients from one dashboard
- [ ] **Batch export** — generate and download a full content calendar for the week
- [ ] **Buffer / Hootsuite integration** — schedule posts directly from the export deck
- [ ] **Team workspace** — share brand kits and content history across a marketing team

---

Built by [Shireen](https://github.com/shireen-mvps) · Powered by Claude AI
