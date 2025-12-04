import StatCard from "@/Components/Dashboard/StatCard";
import { FaUsers, FaBox, FaChartLine, FaClock } from "react-icons/fa";

const HomePage = () => {
  return (
    <div>
     <h1 className="text-xl font-bold">
         Dashboard
     </h1>
     {/* stat cards  */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50">
      <StatCard
        title="Total User"
        value="40,689"
        change={8.5}
        changeText="Up from yesterday"
        icon={<FaUsers className="text-purple-600 text-xl" />}
        iconBg="bg-purple-100"
        isUp={true}
      />

      <StatCard
        title="Total Order"
        value="10,293"
        change={1.3}
        changeText="Up from past week"
        icon={<FaBox className="text-yellow-600 text-xl" />}
        iconBg="bg-yellow-100"
        isUp={true}
      />

      <StatCard
        title="Total Sales"
        value="$89,000"
        change={4.3}
        changeText="Down from yesterday"
        icon={<FaChartLine className="text-green-600 text-xl" />}
        iconBg="bg-green-100"
        isUp={false}
      />

      <StatCard
        title="Total Pending"
        value="2040"
        change={1.8}
        changeText="Up from yesterday"
        icon={<FaClock className="text-orange-600 text-xl" />}
        iconBg="bg-orange-100"
        isUp={true}
      />
    </div>
    </div>
  )
}

export default HomePage
