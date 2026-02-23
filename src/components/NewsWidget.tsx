import { useEffect, useState } from "react";
import { ExternalLink, Clock } from "lucide-react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  contentSnippet?: string;
  urlToImage?: string; // For Global News
  url?: string; // For Global News
  publishedAt?: string; // For Global News
}

export default function NewsWidget({ type }: { type: "global" | "local" }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const endpoint = type === "global" ? "/api/global-news" : "/api/local-news";
        const res = await fetch(endpoint);
        const data = await res.json();
        
        if (type === "global" && data.articles) {
          setNews(data.articles.slice(0, 10));
        } else if (type === "local") {
          setNews(data);
        }
      } catch (error) {
        console.error(`Failed to fetch ${type} news:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [type]);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="w-8 h-8 border-4 border-foresight-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[500px]">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xl font-bold text-foresight-navy flex items-center gap-2">
          {type === "global" ? "Global Financial News" : "Local Business News"}
          <span className="px-2 py-1 bg-foresight-orange/10 text-foresight-orange text-xs rounded-full">
            Live
          </span>
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {news.map((item, i) => {
          const title = item.title;
          const link = item.link || item.url;
          const date = item.pubDate || item.publishedAt;
          const source = typeof item.source === 'string' ? item.source : (item as any).source?.name;
          const image = item.urlToImage;

          return (
            <a 
              key={i} 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
            >
              <article className="flex gap-4">
                {image && (
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 hidden sm:block">
                    <img src={image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-foresight-orange">{source}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(date || "").toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 leading-snug group-hover:text-foresight-orange transition-colors line-clamp-2">
                    {title}
                  </h3>
                  {item.contentSnippet && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {item.contentSnippet}
                    </p>
                  )}
                </div>
                <div className="shrink-0 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-foresight-orange" />
                </div>
              </article>
            </a>
          );
        })}
      </div>
    </div>
  );
}
