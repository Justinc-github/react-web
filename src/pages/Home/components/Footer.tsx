import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">众智创新团队</h3>
            <p className="text-gray-400 mb-6">
              专注工业领域知识研究，让学习更简单，协作更高效。
            </p>
            <div className="flex space-x-4">
              <a href="https://blog.csdn.net/lalaone?type=blog" target="_blank">
                <img
                  src="https://img.picgo.net/2025/06/15/csdn6f8c846185ab5140.png"
                  style={{ height: "28px" }}
                ></img>
              </a>
              <a href="https://www.pgyer.com/zhong_zhi" target="_blank">
                <img src="/favicon.svg" style={{ height: "28px" }}></img>
              </a>
              <a href="/download" target="_blank">
                <img
                  src="https://img.picgo.net/2025/06/21/app_icon993fdb19c81464f8.png"
                  style={{ height: "28px" }}
                ></img>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                <span className="text-gray-400">辽宁工业大学-第五教学楼</span>
              </li>
              <li className="flex items-center">
                <img
                  src="https://img.picgo.net/2025/06/15/qqf384df8cb4704045.png"
                  style={{ height: "20px" }}
                ></img>
                <span className="text-gray-400">1004552592</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; 2025 众智创新团队. 保留所有权利.</p>
          <a href="https://beian.miit.gov.cn" id="beian" 
             style={{ textDecoration: "none", outline: "none", color: "inherit" }}
          target="_blank">
            辽ICP备2025055354号-1
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
