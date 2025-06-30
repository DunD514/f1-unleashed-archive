const GEMINI_API_KEY = 'AIzaSyC4GK_4jAFp8zYckQvOHTKUxchvqA_ye7U';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Helper function to convert markdown to HTML
const formatMarkdownToHtml = (text: string): string => {
  return text
    // Convert headers
    .replace(/### (.*$)/gm, '<h3 class="text-lg font-bold text-white mb-3 mt-4">$1</h3>')
    .replace(/## (.*$)/gm, '<h2 class="text-xl font-bold text-white mb-4 mt-6">$1</h2>')
    .replace(/# (.*$)/gm, '<h1 class="text-2xl font-bold text-white mb-4 mt-6">$1</h1>')
    // Convert bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Convert italic text
    .replace(/\*(.*?)\*/g, '<em class="text-zinc-300 italic">$1</em>')
    // Convert bullet points
    .replace(/^\* (.*$)/gm, '<li class="text-zinc-300 mb-1">• $1</li>')
    // Convert numbered lists
    .replace(/^\d+\. (.*$)/gm, '<li class="text-zinc-300 mb-1">$1</li>')
    // Convert line breaks
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    // Wrap lists
    .replace(/(<li.*?<\/li>)+/gs, '<ul class="mb-4">$&</ul>');
};

export const fetchAdditionalInfo = async (query: string): Promise<string> => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Provide comprehensive information about ${query}. Include historical context, technical details, key statistics, and notable facts. Format the response in a structured way with clear sections.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    const rawText = data.candidates[0]?.content?.parts[0]?.text || 'No additional information available.';
    return formatMarkdownToHtml(rawText);
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    return 'Unable to fetch additional information at this time.';
  }
};

const driverVideoMap: Record<string, string> = {
  "Lewis Hamilton": "https://www.youtube.com/embed/Rw4vF1Ks8aY",
  "Max Verstappen": "https://www.youtube.com/embed/lY5j5w9i9Dk", 
  "Sebastian Vettel": "https://www.youtube.com/embed/0IorQYChMRg",
  "Fernando Alonso": "https://www.youtube.com/embed/tsOblMG_F_w",
  "Charles Leclerc": "https://www.youtube.com/embed/6nTM2OQ3M4A",
  "Lando Norris": "https://www.youtube.com/embed/sRMjlxPJNUo",
  "Ayrton Senna": "https://www.youtube.com/embed/7W4yqUNY5c8",
  "Michael Schumacher": "https://www.youtube.com/embed/cNLdW3yMb0c"
};

export const fetchDriverMedia = async (name: string): Promise<{
  images: string[];
  videos: string[];
  biography: string;
}> => {
  const wikiApiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
  try {
    const res = await fetch(wikiApiUrl);
    if (!res.ok) throw new Error("Wikipedia fetch failed");
    const data = await res.json();

    const image = data.thumbnail?.source || "";
    const bio = data.extract || "";
    const video = driverVideoMap[name] || "";

    return {
      images: image ? [image] : [],
      videos: video ? [video] : [],
      biography: bio
    };
  } catch (error) {
    console.error("Failed to fetch media for driver", name, error);
    return { images: [], videos: [], biography: "" };
  }
};
