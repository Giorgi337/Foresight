import express from "express";
import { createServer as createViteServer } from "vite";
import Parser from "rss-parser";

async function startServer() {
  const app = express();
  const PORT = 3000;

  const parser = new Parser();

  // API routes
  app.get("/api/exchange-rates", async (req, res) => {
    try {
      const response = await fetch("https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json");
      if (!response.ok) throw new Error("NBG API failed");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch exchange rates" });
    }
  });

  app.get("/api/global-news", async (req, res) => {
    try {
      const apiKey = "72938bb28cec480aa536b3b9ddfcba27";
      const response = await fetch(`https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${apiKey}`);
      if (!response.ok) throw new Error("NewsAPI failed");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch global news" });
    }
  });

  app.get("/api/local-news", async (req, res) => {
    try {
      // Using a reliable RSS feed for Georgian news (English or Georgian)
      // Since some might block, we'll try a few or fallback
      const feeds = [
        "https://civil.ge/feed", // Civil.ge is a reliable English news source in Georgia
        "https://agenda.ge/en/rss"
      ];
      
      let allItems: any[] = [];
      for (const feedUrl of feeds) {
        try {
          const feed = await parser.parseURL(feedUrl);
          allItems = allItems.concat(feed.items.map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: feed.title,
            contentSnippet: item.contentSnippet
          })));
        } catch (e) {
          console.error("Failed to parse feed", feedUrl, e);
        }
      }
      
      // Sort by date descending
      allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      
      res.json(allItems.slice(0, 15));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch local news" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
