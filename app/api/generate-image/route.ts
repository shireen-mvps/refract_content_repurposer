import { GoogleGenerativeAI } from "@google/generative-ai";
import sharp from "sharp";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "no_key" }, { status: 403 });
  }

  try {
    const {
      businessName,
      businessType,
      contentType,
      content,
      imageStyle,
      imageFormat,
      productImage,
      productImageMimeType,
      customPrompt,
    } = await req.json();

    const [width, height] = (imageFormat || "1024x1024").split("x");
    const excerpt = content.slice(0, 300);

    const styleGuides: Record<string, string> = {
      "Flat Lay":
        "overhead flat lay composition, items arranged neatly on a clean surface, soft natural light, minimal props",
      "Lifestyle Shot":
        "lifestyle photography, product in a real-life setting, warm natural light, authentic and inviting atmosphere",
      "Minimalist Studio":
        "clean minimalist studio, white or neutral background, single focused subject, professional product shot",
      "Vibrant & Bold":
        "vibrant bold colors, high contrast, energetic composition, eye-catching and dynamic",
      "Soft Aesthetic":
        "soft pastel tones, dreamy and gentle lighting, romantic and delicate mood, Instagram-worthy",
      Editorial:
        "editorial photography style, artistic composition, magazine-quality, sophisticated and polished",
    };

    const styleDesc = styleGuides[imageStyle] || styleGuides["Lifestyle Shot"];
    const aspectRatio =
      width === height
        ? "SQUARE (1:1 aspect ratio — equal width and height)"
        : parseInt(width) > parseInt(height)
        ? "LANDSCAPE (16:9 aspect ratio — wider than tall)"
        : "PORTRAIT (9:16 aspect ratio — taller than wide)";

    const customSection = customPrompt
      ? `\nAdditional instructions from the user: ${customPrompt}`
      : "";

    const prompt = productImage
      ? `You are a professional product photographer and image generator.

IMPORTANT: Generate this image in ${aspectRatio}. The composition must fill a ${aspectRatio} frame.

Using the uploaded reference image as the exact subject, create a high-quality marketing photograph.

Business: ${businessName} (${businessType})
Content type: ${contentType}
Style: ${styleDesc}
Context: ${excerpt}${customSection}

Instructions:
- Keep the subject as the hero of the image — do not replace or alter it
- Apply the specified style to the setting, lighting, and composition around the subject
- No text, watermarks, or logos in the image
- High quality, commercially usable, visually striking`
      : `Generate this image in ${aspectRatio}. The composition must fill a ${aspectRatio} frame.

Create a high-quality marketing image for a ${businessType} business called "${businessName}".

Content type: ${contentType}
Style: ${styleDesc}
Context: ${excerpt}${customSection}

Instructions:
- No text, watermarks, or logos in the image
- High quality, commercially usable, visually striking`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image",
      generationConfig: {
        // @ts-expect-error responseModalities not yet typed in SDK
        responseModalities: ["IMAGE", "TEXT"],
      },
    });

    const parts = productImage
      ? [
          { text: prompt },
          { inlineData: { mimeType: productImageMimeType || "image/jpeg", data: productImage } },
        ]
      : [{ text: prompt }];

    const result = await model.generateContent(parts);
    const candidate = result.response.candidates?.[0];

    if (!candidate) {
      return Response.json({ error: "No image generated. Please try again." }, { status: 500 });
    }

    const imagePart = candidate.content.parts.find(
      (p: { inlineData?: { data: string; mimeType: string } }) => p.inlineData
    );

    if (!imagePart?.inlineData) {
      return Response.json({ error: "No image in response. Please try again." }, { status: 500 });
    }

    const { data } = imagePart.inlineData;

    // Crop to exact target dimensions regardless of what Gemini outputs
    const resized = await sharp(Buffer.from(data, "base64"))
      .resize(parseInt(width), parseInt(height), { fit: "cover", position: "centre" })
      .jpeg({ quality: 90 })
      .toBuffer();

    return Response.json({ imageUrl: `data:image/jpeg;base64,${resized.toString("base64")}` });
  } catch (error) {
    console.error("Generate image error:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
