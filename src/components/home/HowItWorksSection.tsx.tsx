import { Image } from '@nextui-org/react';
import React from 'react';
import { FaChartBar, FaClipboardCheck, FaFileInvoiceDollar, FaUserPlus } from 'react-icons/fa';
interface HowItWorksItem {
  title: string;
  description: string;
  Icon: React.ComponentType;
}

const howItWorks: HowItWorksItem[] = [
  { 
    title: "Create an Account", 
    description: "Sign up on SaldaQ to start tracking your personal finances.", 
    Icon: FaUserPlus 
  },
  { 
    title: "Add Transactions", 
    description: "Log your daily expenses and income by selecting predefined categories or creating custom ones to suit your lifestyle.", 
    Icon: FaFileInvoiceDollar 
  },
  { 
    title: "Visualize Financial Data", 
    description: "SaldaQ generates reports and graphs based on your transactions, helping you understand your financial habits and make better decisions", 
    Icon: FaChartBar 
  },
  { 
    title: "Stay in Control", 
    description: "With detailed insights, you can plan your budget, track savings, and manage expenses efficiently, all in one place", 
    Icon: FaClipboardCheck 
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <>
      <div className="relative w-full flex flex-wrap justify-between px-4 md:px-20 mt-20 pb-8" data-aos="fade-up">
        <div className='w-full md:w-[46%]' >
        <div className="absolute w-[300px] h-[300px] md:w-[350px] md:h-[350px] sm:w-[400px] sm:h-[400px] md:top-[30px] lg:top-20  sm:left-[50px] md:left-12 lg:left-[155px] bg-blue-300 rounded-full"></div>
        
        <div className="relative z-10 flex-1 md:top-10">
          <Image
            src="./how.png"
            alt="How It Works Image"
            className="object-cover w-full h-full"
          />
        </div>
        </div>

        <div className="w-full md:w-[46%] flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold mb-4 font-poppins">How Does It Work?</h2>
          <ul className="space-y-4">
          {howItWorks.map((item, index) => (
              <li key={index} className="flex flex-row items-center justify-start gap-2">
                <div className="flex items-center p-3 bg-blue-400 rounded-full">
                  <item.Icon className="text-white text-2xl" />
                </div>
                <div className="flex flex-col">
                <span className="text-md font-semibold font-poppins">{item.title}</span>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HowItWorksSection;
