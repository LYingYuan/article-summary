import summarize from "../services/articleFactory.js";

async function summarizeArticle(req, res) {
  try {
    const body = req.body;
    const llmApiConfig = body.llmApiConfig;
    const url = body.url;
    const html = JSON.parse(body.html);

    const data = await summarize(url, llmApiConfig, html);
    
    res.status(200).send(data);
  } catch (error) {
    console.error(`Error processing article: ${error.message}`);
    res.status(500).send({ error: error.message });
  } finally {
    res.end();
  }
}

export default summarizeArticle;
