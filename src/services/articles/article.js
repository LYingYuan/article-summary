import chatWithLLM from "../llmService.js";
import { extractFromHtml } from "@extractus/article-extractor";

class Article {
  constructor(url, llmApiConfig, html) {
    this.url = url;
    this.llmApiConfig = llmApiConfig;
    this.html = html;
  }

  async parseContent() {
    try {
      const article = await extractFromHtml(this.html);
      console.log("🧐ELowen - Article - parseContent -  article:", article);
      return article?.content;
    } catch (error) {
      throw new Error(`Error parsing content: ${error.message}`);
    }
  }

  async summarize() {
    try {
      const content = await this.parseContent();
      const summary = await chatWithLLM(content, this.llmApiConfig);
      // 超过 10s 重新请求或返回请求失败
      return summary;
    } catch (error) {
      console.error(`Error summarizing content: ${error.message}`);
      throw error;
    }
  }
}

export default Article;
