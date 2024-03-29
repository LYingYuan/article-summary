import fetch from "node-fetch";

async function chatWithLLM(article, llmApiConfig) {
  try {
    const { model, url, apiKey, prompt } = llmApiConfig;
    const message = `${prompt}\n---\n${JSON.stringify(article)}`;

    const data = JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData.choices[0].message.content;
  } catch (error) {
    console.error(`Error chatting with LLM: ${error.message}`);
    throw error;
  }
}

export default chatWithLLM;
