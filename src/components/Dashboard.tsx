import NewsWidget from "./NewsWidget";
import ExchangeRates from "./ExchangeRates";

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foresight-navy">Daily Briefing</h2>
          <p className="text-gray-500 mt-2">Stay updated with the latest financial news and exchange rates.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main News Area - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-8">
            <NewsWidget type="global" />
            <NewsWidget type="local" />
          </div>

          {/* Sidebar Area - Takes up 1 column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24">
              <ExchangeRates />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
