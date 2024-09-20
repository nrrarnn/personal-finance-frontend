import React, { useState } from 'react';


interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is SaldaQ?",
    answer: "SaldaQ is a simple expense tracker designed for personal use with features like managing expenses, income tracking, and creating categories."
  },
  {
    question: "Is SaldaQ free to use?",
    answer: "Yes, SaldaQ is free to use for all basic features. We also offer premium features for advanced users."
  },
  {
    question: "How do I get started with SaldaQ?",
    answer: "You can start by signing up for a free account. Once signed up, you can start tracking your expenses and income right away."
  },
  {
    question: "Can I use SaldaQ on multiple devices?",
    answer: "Yes, your data is synchronized across devices. You can log in from any device and continue tracking your finances."
  }
];

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <div className="py-16 bg-blue-50"  data-aos="fade-down">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-poppins text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(index)}>
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <span>{activeIndex === index ? '-' : '+'}</span>
                </div>
                {activeIndex === index && (
                  <div className="mt-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
