import { Card } from "@nextui-org/react";
import { FaRegMoneyBillAlt, FaLock, FaChartLine } from "react-icons/fa"; 
interface WhyChooseUsCardProps {
  title: string;
  description: string;
  Icon: React.ComponentType;
}

const WhyChooseUsCard: React.FC<WhyChooseUsCardProps> = ({ title, description, Icon }) => {
  return (
    <Card className="p-6">
      <div className="text-blue-400 text-4xl mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

  const points: WhyChooseUsCardProps[] = [
    {
      title: "Simple and Intuitive",
      description: "Track your expenses with ease using our user-friendly platform.",
      Icon: FaRegMoneyBillAlt, 
    },
    {
      title: "Secure and Private",
      description: "Your financial data is safe with industry-leading encryption.",
      Icon: FaLock,
    },
    {
      title: "Clear Insights",
      description: "Get actionable insights into your spending to make informed decisions",
      Icon: FaChartLine,
    },
  ];
const WhyChooseUs = () => {

  return (
  <>
    <div>
      <div className="text-center pb-3">
        <h1 className="text-2xl font-extrabold font-poppins pt-10 ">Why Choose Us?</h1>
          <p className="text-md text-slate-700">
            Empowering you to take control of your finances
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 px-3 md:px-20 py-10">
          {points.map((point, index) => (
            <WhyChooseUsCard
              key={index}
              title={point.title}
              description={point.description}
              Icon={point.Icon}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default WhyChooseUs