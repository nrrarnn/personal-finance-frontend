import React from "react";
import { FaDollarSign, FaShieldAlt, FaChartLine, FaAward } from "react-icons/fa";


interface WhyChooseUsCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay: string;
}

const WhyChooseUsCard: React.FC<WhyChooseUsCardProps> = ({ title, description, Icon, gradient, delay }) => {
  return (
    <div className={`group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${delay} relative overflow-hidden`}>
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>

      <div className={`relative w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      <div className="relative">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-200">{title}</h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">{description}</p>
      </div>

      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
    </div>
  );
};

const points: WhyChooseUsCardProps[] = [
  {
    title: "Simple and Intuitive",
    description: "Track your expenses with ease using our user-friendly platform designed for everyone.",
    Icon: FaDollarSign,
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-600",
    delay: "hover:delay-0",
  },
  {
    title: "Secure and Private",
    description: "Your financial data is protected with bank-level encryption and industry-leading security.",
    Icon: FaShieldAlt,
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
    delay: "hover:delay-75",
  },
  {
    title: "Clear Insights",
    description: "Get actionable insights and detailed analytics to make informed financial decisions.",
    Icon: FaChartLine,
    gradient: "bg-gradient-to-r from-purple-500 to-pink-600",
    delay: "hover:delay-150",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
            <FaAward className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SaldaQ</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Empowering you to take control of your finances with cutting-edge features and unmatched user experience.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {points.map((point, index) => (
            <WhyChooseUsCard key={index} title={point.title} description={point.description} Icon={point.Icon} gradient={point.gradient} delay={point.delay} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
