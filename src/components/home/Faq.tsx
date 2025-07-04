import React, { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is SaldaQ?",
    answer: "SaldaQ is a simple expense tracker designed for personal use with features like managing expenses, income tracking, and creating categories.",
  },
  {
    question: "Is SaldaQ free to use?",
    answer: "Yes, SaldaQ is free to use for all basic features. We also offer premium features for advanced users.",
  },
  {
    question: "How do I get started with SaldaQ?",
    answer: "You can start by signing up for a free account. Once signed up, you can start tracking your expenses and income right away.",
  },
  {
    question: "Can I use SaldaQ on multiple devices?",
    answer: "Yes, your data is synchronized across devices. You can log in from any device and continue tracking your finances.",
  },
  {
    question: "How secure is my financial data?",
    answer: "We use bank-level encryption and security measures to protect your data. Your information is stored securely and never shared with third parties.",
  },
];

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
            <FaQuestionCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find answers to common questions about SaldaQ and how it can help you manage your finances better.</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <button className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl" onClick={() => toggleFAQ(index)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors duration-200">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-all duration-300 ${activeIndex === index ? "bg-blue-100 rotate-180" : ""}`}>
                      <FaChevronDown className={`w-4 h-4 transition-colors duration-200 ${activeIndex === index ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"}`} />
                    </div>
                  </div>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed mt-4">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Can't find the answer you're looking for? Our support team is here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">Contact Support</button>
              <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200">View Documentation</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
