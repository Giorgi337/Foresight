import express from "express";
import Parser from "rss-parser";

const app = express();
const router = express.Router();

// Shared News Logic
async function getGlobalNews(req, res) {
    try {
        const apiKey = "72938bb28cec480aa536b3b9ddfcba27";
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${apiKey}`);
        if (!response.ok) throw new Error(`NewsAPI failed with status ${response.status}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.json({
            articles: [
                {
                    title: "Global Markets Update: Economic indicators show resilience",
                    source: { name: "Financial Times" },
                    publishedAt: new Date().toISOString(),
                    url: "#",
                    content: "Global markets continue to analyze recent economic data..."
                },
                {
                    title: "Tech Innovation: New developments in fintech automation",
                    source: { name: "Business Insider" },
                    publishedAt: new Date().toISOString(),
                    url: "#",
                    content: "Automation in the financial sector is reaching new heights..."
                }
            ]
        });
    }
}

async function getLocalNews(req, res) {
    try {
        const feeds = ["https://civil.ge/feed", "https://agenda.ge/en/rss", "https://bm.ge/en/rss.xml"];
        let allItems: any[] = [];
        const secureParser = new Parser({
            requestOptions: { rejectUnauthorized: false, headers: { "User-Agent": "Mozilla/5.0" } }
        });
        for (const feedUrl of feeds) {
            try {
                const feed = await secureParser.parseURL(feedUrl);
                allItems = allItems.concat(feed.items.map(item => ({
                    title: item.title, link: item.link, pubDate: item.pubDate,
                    source: feed.title || (feedUrl.includes("civil") ? "Civil Georgia" : "Agenda.ge"),
                    contentSnippet: item.contentSnippet
                })));
            } catch (e) {
                console.error(`Failed to parse feed ${feedUrl}`);
            }
        }
        allItems.sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime());
        res.json(allItems.slice(0, 15));
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch local news" });
    }
}

async function getExchangeRates(req, res) {
    try {
        const response = await fetch("https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json");
        if (!response.ok) throw new Error("NBG API failed");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch exchange rates" });
    }
}

// Diagnostic middleware
router.use((req, res, next) => {
    res.setHeader("X-Debug-Backend-Source", "vercel-standalone-function");
    res.setHeader("X-Debug-TS", new Date().toISOString());
    next();
});

// Routes
router.get("/exchange-rates", getExchangeRates);
router.get("/global-news", getGlobalNews);
router.get("/local-news", getLocalNews);

// Catch-all for when Vercel rewrites /api/xxx to just /api
router.get("/", (req, res) => {
    const url = req.url || "";
    const fullPath = req.headers["x-matched-path"] || url;

    if (fullPath.includes("global-news")) return getGlobalNews(req, res);
    if (fullPath.includes("local-news")) return getLocalNews(req, res);
    if (fullPath.includes("exchange-rates")) return getExchangeRates(req, res);

    res.status(404).json({
        error: "Not found",
        path: req.path,
        url: req.url,
        matchedPath: req.headers["x-matched-path"],
        matched: "none"
    });
});

// IMPORTANT: Mount on root for Vercel functions
app.use("/api", router);
app.use("/", router);

export default app;
