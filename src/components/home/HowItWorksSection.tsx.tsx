import React from "react";
import { FaUserPlus, FaReceipt, FaChartBar, FaCheckCircle } from "react-icons/fa";

interface HowItWorksItem {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  step: number;
}

const howItWorks: HowItWorksItem[] = [
  {
    title: "Create an Account",
    description: "Sign up on SaldaQ to start tracking your personal finances with our secure platform.",
    Icon: FaUserPlus,
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
    step: 1,
  },
  {
    title: "Add Transactions",
    description: "Log your daily expenses and income by selecting predefined categories or creating custom ones to suit your lifestyle.",
    Icon: FaReceipt,
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-600",
    step: 2,
  },
  {
    title: "Visualize Financial Data",
    description: "SaldaQ generates reports and graphs based on your transactions, helping you understand your financial habits and make better decisions.",
    Icon: FaChartBar,
    gradient: "bg-gradient-to-r from-purple-500 to-pink-600",
    step: 3,
  },
  {
    title: "Stay in Control",
    description: "With detailed insights, you can plan your budget, track savings, and manage expenses efficiently, all in one place.",
    Icon: FaCheckCircle,
    gradient: "bg-gradient-to-r from-orange-500 to-red-600",
    step: 4,
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative mb-12 lg:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full w-80 h-80 mx-auto blur-xl"></div>

              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
                    <FaChartBar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Financial Dashboard</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-emerald-700">Monthly Income</span>
                      <span className="text-lg font-bold text-emerald-600">$4,250</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-700">Expenses</span>
                      <span className="text-lg font-bold text-blue-600">$2,890</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-700">Savings</span>
                      <span className="text-lg font-bold text-purple-600">$1,360</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-end space-x-2 h-16">
                    <div className="bg-blue-400 rounded-t w-4 h-8"></div>
                    <div className="bg-emerald-400 rounded-t w-4 h-12"></div>
                    <div className="bg-purple-400 rounded-t w-4 h-6"></div>
                    <div className="bg-orange-400 rounded-t w-4 h-10"></div>
                    <div className="bg-pink-400 rounded-t w-4 h-14"></div>
                    <div className="bg-teal-400 rounded-t w-4 h-9"></div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border border-gray-200">
                <FaCheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg border border-gray-200">
                <FaReceipt className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How Does It <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Work?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">Get started with SaldaQ in just four simple steps and take control of your financial future.</p>
            </div>

            <div className="space-y-6">
              {howItWorks.map((item, index) => (
                <div key={index} className="group relative">
                  {index < howItWorks.length - 1 && <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-gray-300 to-transparent"></div>}

                  <div className="flex items-start space-x-6">
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 ${item.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <item.Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">{item.step}</span>
                      </div>
                    </div>

                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>          
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
