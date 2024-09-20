import { Spinner } from "@nextui-org/react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Spinner/>
    </div>
  );
};

export default Loading;