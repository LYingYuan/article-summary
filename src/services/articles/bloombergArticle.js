import Article from "./article.js";
import { load } from "cheerio";
import { extractFromHtml } from "@extractus/article-extractor";

class Bloomberg extends Article {
  async parseContent() {
    try {
      const $ = load(this.html);
      $(".inline-newsletter-top").remove();
      $(".inline-newsletter-middle").remove();
      const article = await extractFromHtml($?.html());
      console.log("🧐ELowen - Article - parseContent - article:", article);
      return article;
    } catch (error) {
      throw new Error(`Error parsing content: ${error.message}`);
    }
  }
}

export default Bloomberg;
