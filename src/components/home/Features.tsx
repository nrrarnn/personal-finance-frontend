import React from "react";
import { FaChartLine, FaListAlt, FaPiggyBank, FaWallet } from "react-icons/fa";

interface Feature {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const features: Feature[] = [
  {
    title: "Track Expenses",
    description: "Quickly and efficiently add your expenses. Input your daily transactions with predefined categories that adapt to your lifestyle.",
    Icon: FaWallet,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Manage Income",
    description: "Keep track of your income from various sources and ensure that your monthly budget stays perfectly balanced.",
    Icon: FaPiggyBank,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Custom Categories",
    description: "Personalize your expense and income categories to fit your unique spending habits and financial goals.",
    Icon: FaListAlt,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Visual Reports",
    description: "Get comprehensive financial insights through beautiful charts and interactive diagrams that reveal your spending patterns.",
    Icon: FaChartLine,
    gradient: "from-orange-500 to-red-500",
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <span className="text-white text-sm font-medium px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Powerful Financial
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Management</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Discover the intelligent features that make SaldaQ the ultimate choice for managing your personal finances with precision and ease.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:border-gray-300/50 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg shadow-gray-900/10 group-hover:shadow-xl group-hover:shadow-gray-900/20 transition-all duration-500`}
                >
                  <feature.Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">{feature.title}</h3>

                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">{feature.description}</p>
              </div>

              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
