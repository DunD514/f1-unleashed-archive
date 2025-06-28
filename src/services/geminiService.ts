
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
    return data.candidates[0]?.content?.parts[0]?.text || 'No additional information available.';
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    return 'Unable to fetch additional information at this time.';
  }
};

export const fetchDriverMedia = async (driverName: string): Promise<{
  images: string[];
  videos: string[];
  biography: string;
}> => {
  try {
    const query = `${driverName} Formula 1 driver comprehensive profile, career highlights, racing history, and achievements`;
    const response = await fetchAdditionalInfo(query);
    
    // For now, return structured data - in a real implementation, you'd parse the response
    // and potentially use additional APIs for actual media URLs
    return {
      images: [
        'https://placeholder.com/300x400/FF0000/FFFFFF?text=Driver+Photo',
        'https://placeholder.com/600x400/FF0000/FFFFFF?text=Racing+Action',
        'https://placeholder.com/400x300/FF0000/FFFFFF?text=Podium+Celebration'
      ],
      videos: [
        'https://placeholder.com/800x450/FF0000/FFFFFF?text=Career+Highlights',
        'https://placeholder.com/800x450/FF0000/FFFFFF?text=Best+Overtakes'
      ],
      biography: response
    };
  } catch (error) {
    console.error('Error fetching driver media:', error);
    return {
      images: [],
      videos: [],
      biography: 'Unable to load driver information.'
    };
  }
};
