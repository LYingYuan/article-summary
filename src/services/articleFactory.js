import Article from "./articles/article.js";
import Bloomberg from "./articles/bloombergArticle.js";

async function summarize(url, llmApiConfig, html) {
  try {
    console.log("\n\nStart!\n\n");

    let result = {
      summary: "",
    };

    const domain = url?.match(/(?<=\/\/)([a-zA-Z0-9-]+)\.[a-zA-Z]+/g)?.[0];
    switch (domain) {
      case "www.bloomberg": {
        const article = new Bloomberg(url, llmApiConfig, html);
        result.summary = await article.summarize();
        break;
      }
      default:
        const article = new Article(url, llmApiConfig, html);
        result.summary = await article.summarize();
        break;
    }

    console.log("\n\nDone!\n\n");

    return result;
  } catch (error) {
    console.error(`Error parsing articles: ${error.message}`);
    throw error;
  }
}

export default summarize;
