import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  ArrowUpRight,
} from "lucide-react";
import StatCard from "./StatCard";

const StatsCards = () => {
  const stats = [
    {
      id: 1,
      title: "Total Orders",
      value: "2,543",
      change: "+12.5%",
      icon: ShoppingCart,
      color: "blue", // Pass color name instead of class for dynamic styling
    },
    {
      id: 2,
      title: "Total Revenue",
      value: "$45,231",
      change: "+8.2%",
      icon: DollarSign,
      color: "green",
    },
    {
      id: 3,
      title: "New Customers",
      value: "342",
      change: "+5.7%",
      icon: Users,
      color: "purple",
    },
    {
      id: 4,
      title: "Growth Rate",
      value: "23.5%",
      change: "+3.2%",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
