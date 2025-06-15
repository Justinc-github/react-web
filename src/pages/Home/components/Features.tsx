import React from "react";
import {
  FaCalendarCheck,
  FaComments,
  FaTrophy,
} from "react-icons/fa";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: FaCalendarCheck,
    title: "任务布置",
    description: "找到自己的学习方向。",
  },
  {
    icon: FaComments,
    title: "良好氛围",
    description: "不同阶段的成员一起学习，互相交流经验。",
  },
  {
    icon: FaTrophy,
    title: "多种比赛",
    description: "锻炼个人能力",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-4">
            锻炼个人能力
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            通过对任务的完成，更好的锻炼思维，找到符合自己的学习定位，为未来打下基础。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="text-blue-600 mb-6">
                <feature.icon className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
