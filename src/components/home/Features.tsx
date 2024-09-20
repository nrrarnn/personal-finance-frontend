import { FaChartLine, FaListAlt, FaPiggyBank, FaWallet } from 'react-icons/fa';
interface Feature {
  title: string;
  description: string;
  Icon: React.ComponentType;
}

const features: Feature[] = [
  { 
    title: "Track Expenses", 
    description: "quickly and efficiently add your expenses. Input your daily transactions with predefined categories", 
    Icon: FaWallet 
  },
  { 
    title: "Manage Income", 
    description: "Keep track of your income from various sources and ensure that your monthly budget stays balanced.", 
    Icon: FaPiggyBank
  },
  { 
    title: "Custom Categories", 
    description: "Personalize your expense and income categories to fit your spending habits and financial needs", 
    Icon: FaListAlt 
  },
  { 
    title: "Visual Reports", 
    description: "provides financial reports in the form of charts and diagrams, making it easy for you to analyze your financial habits", 
    Icon: FaChartLine 
  }
];

const Features = () => {
  return(
    <>
      <div className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-3 font-poppins">Our Features</h2>
          <p className="text-lg text-center mb-16">Explore the powerful features that make SaldaQ the best choice for managing your personal finances.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"  data-aos="fade-up">
            {features.map((feature, index) => (
              <div key={index} className="hover-card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <div className="bg-blue-400 text-white w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <feature.Icon className="text-3xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Features