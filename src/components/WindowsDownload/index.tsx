import React from "react";

const windowsApps = [
  {
    version: "v1.0.0",
    date: "2024-06-21",
    url: "https://gitee.com/justinc-gitee/project_resources/releases/download/%E2%80%8B%E2%80%8Bv1.0.0/zhongzhi.exe",
    desc: "首发版本，支持视频的简单播放功能。",
  },
];

const Download: React.FC = () => (
  <div
    style={{
      maxWidth: 600,
      margin: "40px auto",
      padding: 24,
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px #eee",
    }}
  >
    <h2 style={{ marginBottom: 24 }}>Windows 应用安装包下载</h2>
    <ul>
      {windowsApps.map((app) => (
        <li key={app.version} style={{ marginBottom: 20 }}>
          <div>
            <strong>{app.version}</strong>（{app.date}）
          </div>
          <div style={{ margin: "8px 0" }}>{app.desc}</div>
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563eb" }}
          >
            点击下载
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Download;
