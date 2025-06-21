import React from "react";

interface Project {
  id: number;
  name: string;
  members: number;
  subject: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "PS、PR",
    members: 3,
    subject: "方向一",
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    id: 2,
    name: "C#、Java",
    members: 6,
    subject: "方向二",
    image: "https://picsum.photos/400/300?random=3",
  },
  {
    id: 3,
    name: "PLC",
    members: 12,
    subject: "方向三",
    image: "https://picsum.photos/400/300?random=4",
  }
];

const TeamProjects: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-4">
            学习方向
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            发掘兴趣，明确目标。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {project.subject}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {project.name}
                </h3>
                <div className="flex items-center mb-4">
                  <span className="text-gray-500 mr-2">
                    <i className="fas fa-users"></i> {project.members} 成员
                  </span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                  查看详情
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProjects;
