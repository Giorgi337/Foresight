import { motion } from "motion/react";
import { ArrowRight, CreditCard, Shield, Briefcase, TrendingUp, Landmark, Smartphone } from "lucide-react";

const products = [
  {
    id: "corporate-banking",
    title: "Corporate Banking",
    description: "Tailored financial solutions for large enterprises and corporations.",
    icon: Briefcase,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "wealth-management",
    title: "Wealth Management",
    description: "Expert guidance to grow and protect your personal and family wealth.",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "digital-banking",
    title: "Digital Banking",
    description: "Seamless online and mobile banking experiences for everyday needs.",
    icon: Smartphone,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "premium-cards",
    title: "Premium Cards",
    description: "Exclusive credit and debit cards with premium travel and lifestyle benefits.",
    icon: CreditCard,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "insurance",
    title: "Insurance Services",
    description: "Comprehensive coverage options to secure your future and assets.",
    icon: Shield,
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: "investment-banking",
    title: "Investment Banking",
    description: "Strategic advisory and capital raising services for institutional clients.",
    icon: Landmark,
    color: "bg-indigo-50 text-indigo-600",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foresight-navy mb-4">
            Our Financial Products
          </h2>
          <p className="text-gray-500 text-lg">
            Explore Foresight's comprehensive suite of financial solutions designed to meet the diverse needs of our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.a
                href={`#product-${product.id}`}
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group block p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:border-foresight-orange/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-foresight-orange/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${product.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-foresight-navy mb-3 group-hover:text-foresight-orange transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-gray-500 mb-6 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center text-sm font-semibold text-foresight-navy group-hover:text-foresight-orange transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
