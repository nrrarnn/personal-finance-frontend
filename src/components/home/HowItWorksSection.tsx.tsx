import { Image } from '@nextui-org/react';
import React from 'react';
import { FaCog, FaRocket, FaShieldAlt } from 'react-icons/fa';
interface HowItWorksItem {
  title: string;
  description: string;
  Icon: React.ComponentType;
}

const howItWorks: HowItWorksItem[] = [
  { 
    title: "Easy Setup", 
    description: "Get started quickly with our simple setup process.", 
    Icon: FaCog 
  },
  { 
    title: "Quick Access", 
    description: "Access your data instantly from anywhere.", 
    Icon: FaRocket 
  },
  { 
    title: "Secure Data", 
    description: "Your data is protected with top-notch security measures.", 
    Icon: FaShieldAlt 
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative w-full flex flex-wrap justify-between px-4 md:px-20 mt-20 pb-8">
      {/* Background */}
      <div className='w-full md:w-[46%]'>
      <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] md:top-[30px]  left-9 md:left-[155px] bg-blue-300 rounded-full"></div>
      
      {/* Image */}
      <div className="relative z-10 flex-1">
        <Image
          src="./how.png"
          alt="How It Works Image"
          className="object-cover w-full h-full"
        />
      </div>
      </div>

      {/* How Does It Work */}
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
    </section>
  );
};

export default HowItWorksSection;
