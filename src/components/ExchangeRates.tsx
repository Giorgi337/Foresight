import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Currency {
  code: string;
  rate: number;
  diff: number;
  name: string;
}

export default function ExchangeRates() {
  const [rates, setRates] = useState<Currency[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("/api/exchange-rates");
        const data = await res.json();
        
        if (data && data.length > 0) {
          const currencies = data[0].currencies;
          setDate(new Date(data[0].date).toLocaleDateString());
          
          const targetCodes = ["USD", "EUR", "GBP"];
          const filtered = currencies
            .filter((c: any) => targetCodes.includes(c.code))
            .map((c: any) => ({
              code: c.code,
              rate: c.rate / c.quantity,
              diff: c.diff,
              name: c.name
            }));
            
          setRates(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-foresight-navy rounded-2xl shadow-sm">
        <div className="w-8 h-8 border-4 border-foresight-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-foresight-navy text-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-foresight-orange/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      
      <div className="p-6 border-b border-white/10 relative z-10">
        <h2 className="text-xl font-bold">Exchange Rates</h2>
        <p className="text-sm text-white/60 mt-1">Official NBG Rates • {date}</p>
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-center gap-6 relative z-10">
        {rates.map((currency) => {
          const isUp = currency.diff > 0;
          const isDown = currency.diff < 0;
          
          return (
            <div key={currency.code} className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-lg group-hover:bg-foresight-orange group-hover:text-foresight-navy transition-colors">
                  {currency.code}
                </div>
                <div>
                  <div className="font-semibold text-lg">{currency.rate.toFixed(4)} <span className="text-sm text-white/50 font-normal">GEL</span></div>
                  <div className="text-xs text-white/50">{currency.name}</div>
                </div>
              </div>
              
              <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md ${
                isUp ? "text-emerald-400 bg-emerald-400/10" : 
                isDown ? "text-rose-400 bg-rose-400/10" : 
                "text-white/60 bg-white/5"
              }`}>
                {isUp ? <TrendingUp className="w-4 h-4" /> : 
                 isDown ? <TrendingDown className="w-4 h-4" /> : 
                 <Minus className="w-4 h-4" />}
                {Math.abs(currency.diff).toFixed(4)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
