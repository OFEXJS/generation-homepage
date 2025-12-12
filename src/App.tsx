// App.tsx（直接替换之前的）
import React from "react";
import "./App.css";

const me = {
  name: "Will/ZX",
  title: "全栈开发者 · 独立创作者",
  bio: "把疯狂的想法写成代码，把代码变成现实",
  avatar: "https://avatars.githubusercontent.com/u/20078022?v=4",
  links: [
    {
      name: "GitHub",
      url: "https://github.com/zhengjialux",
      icon: "/icons/Github.svg",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/kunsile16",
      icon: "/icons/Twitter.svg",
    },
    {
      name: "Email",
      url: "15879398507@163.com",
      icon: "/icons/Gmail.svg",
    },
  ],
};

const works = [
  {
    title: "JPCodePlayground",
    desc: "代码在线调试。支持 JavaScript And Python",
    url: "https://github.com/OFEXJS/JPCodePlayground.git",
    icon: "JPCodePlayground.svg",
  },
  {
    title: "FundTabelTools",
    desc: "简单的报表统计可视化工具",
    url: "https://github.com/OFEXJS/FundTabelTools.git",
    icon: "FundTabelTools.svg",
  },
  {
    title: "dailyUI",
    desc: "日常开箱即用的UI组件",
    url: "https://github.com/OFEXJS/dailyUI.git",
  },
  {
    title: "Utility",
    desc: "日常使用的工具方法集合",
    url: "https://github.com/OFEXJS/Utility.git",
    cover: "",
  },
];

const App: React.FC = () => {
  return (
    <div className="app">
      {/* 毛玻璃英雄区 */}
      <header className="hero">
        <div className="avatar-wrapper">
          <img src={me.avatar} alt={me.name} className="avatar" />
          <div className="avatar-glow" />
        </div>

        <h1 className="name">{me.name}</h1>
        <p className="title">{me.title}</p>
        <p className="bio">{me.bio}</p>

        <div className="social">
          {me.links.map((link) => (
            <span className={`icon icon-${link.name}`}>
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  style={{ width: "45px" }}
                />
              </a>
            </span>
          ))}
        </div>
      </header>

      {/* 作品网格 */}
      <main className="works">
        {works.map((work, i) => (
          <a
            key={i}
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-card"
            style={{
              backgroundImage: work.cover
                ? `url(${work.cover})`
                : work.url.includes("github.com")
                ? "linear-gradient(135deg, #0d1117, #161b22)"
                : undefined,
            }}
          >
            {/* GitHub 项目自动图标 */}
            {work.url.includes("github.com") && !work.cover && (
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub"
                className="github-mark"
              />
            )}

            {/* 遮罩层 */}
            <div className="card-content">
              <h3>
                {work.icon && (
                  <img
                    src={`/icons/${work.icon}`}
                    alt={work.title}
                    style={{ width: "24px", marginRight: 10 }}
                  />
                )}
                {work.title}
              </h3>
              <p>{work.desc}</p>
              <span className="link-hint">查看项目 →</span>
            </div>

            {/* 毛玻璃标签（自定义封面才有） */}
            {work.cover && <div className="glass-tag">作品</div>}
          </a>
        ))}
      </main>
    </div>
  );
};

export default App;
