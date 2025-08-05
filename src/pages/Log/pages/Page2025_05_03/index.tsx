
export default function Page2025_05_03() {
  return (
    <div>
      {/* 内联所有CSS样式 */}
      <style>{`
        .box1 {
          width: 80%;
          padding: 5% 5%;
          text-align: center;
          background-color: rgb(250, 252, 252);
          margin: 5% auto;
          box-shadow: 0 0 15px rgb(213, 215, 215), 0 0 30px rgb(255, 255, 255);
          border-radius: 1%;
          font-family: Arial, Helvetica, sans-serif;
        }
        h4 {
          color: black;
          text-align: left;
          font-weight: 400;
          margin: 0px 5%;
        }
        img {
          max-width: 50%;
          height: auto;
          margin: 5% 0px 0px 0px;
        }
        p {
          text-align: right;
          font-size: small;
          font-style: italic;
          font-weight: light;
          letter-spacing: 1px;
          margin: 0px;
        }
        .title {
          color: rgb(58, 121, 237);
          margin: auto;
          display: inline-block;
        }
        .explain {
          text-align: center;
          font-size: small;
          font-style: italic;
          font-weight: light;
          letter-spacing: 1px;
          margin: 0px;
        }
        .box2 {
          justify-content: space-between;
          align-items: center;
          height: 2%;
          width: 100%;
          display: flex;
          background-color: rgb(250, 252, 252);
        }
        .line {
          height: 1px;
          background-color: rgb(3, 3, 3);
          flex-grow: 1;
        }
        .text {
          text-align: center;
          margin: 0px 5%;
        }
        .divider {
          background: linear-gradient(
            to right,
            rgb(235, 178, 178),
            rgb(233, 233, 153),
            rgb(153, 235, 153),
            rgb(159, 159, 242)
          );
          height: 2px;
          background-size: 50% 100%;
          animation: gradient 5s linear infinite;
          margin: 5% 0px;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .divider1 {
          position: relative;
          overflow: hidden;
        }
        .divider1::after {
          content: "";
          position: absolute;
          top: 15px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            45deg,
            rgb(248, 144, 144),
            rgb(137, 235, 137),
            rgb(132, 132, 231),
            rgb(235, 126, 126)
          );
          animation: wave 3s linear infinite;
        }
        @keyframes wave {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .explain1 {
          text-align: left;
          font-size: medium;
          font-style: italic;
          font-weight: 300;
          letter-spacing: 2px;
          margin: 10px;
        }
        h5 {
          text-align: left;
          font-weight: 300;
          font-style: italic;
          letter-spacing: 1px;
          font-size: medium;
        }
        h3 {
          text-align: left;
          font-weight: 400;
          font-style: italic;
          font-size: large;
        }
        .explain2 {
          text-align: left;
          font-size: medium;
          font-style: italic;
          font-weight: light;
          letter-spacing: 1px;
          margin: 0px 5%;
        }
        .explain3 {
          text-align: left;
          font-size: small;
          font-style: italic;
          font-weight: light;
          letter-spacing: 1px;
          margin: 0px;
        }
        .explain4 {
          max-width: 20%;
          height: auto;
          margin: 5% 0px 0px 0px;
        }
      `}</style>

      {/* 组件JSX部分 */}
      <div className="box1">
        <h1 className="title">五三探秘！团队润向龙湾之行，解锁城市外的风貌</h1>
        <br />
        <h2 style={{ textAlign: "left" }}>导言：</h2>
        <h4>
          暮春时分，在五一假期来临之际，抛却在团队中繁忙的工作与学习的压力，
          团队朝向龙湾花园进军。在这里，绿树成荫，曲径通幽，在大自然的环抱下，
          又发生了什么有趣的事情呢？ 让我们且听下回分解。
        </h4>
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/团队全体照.jpg"
          alt="团队全体照"
        />
      </div>

      <div className="box1">
        <h2 style={{ textAlign: "left" }}>初入龙湾</h2>
        <h4>
          满怀着对五一团建的期待，早早起身，初升的太阳，早起的晨露，一大早的
          兵荒马乱，东奔西走，但心中不灭的是对即将旅途的期许。
        </h4>
        <div>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/清晨.jpg"
            alt="清晨"
          />
          <p>每天都看的太阳今天好像格外不同呢</p>
          <div className="box2">
            <span className="line"></span>
            <span className="text">来到龙湾啦^^</span>
            <span className="line"></span>
          </div>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/初入龙湾.jpg"
            alt="初入龙湾"
          />
          <br />
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/风景2.jpg"
            alt="风景2"
          />
        </div>
      </div>

      <div className="box1">
        <h2 style={{ textAlign: "left" }}>“快乐”地玩耍</h2>
        <h4>团队是一个“友好”的大家庭，真的，相信博主，“证据”如下：</h4>
        <div>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/团队霸凌（大概）.jpg"
            alt="团队霸凌（大概）"
          />
          <br />
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/团队霸凌2.jpg"
            alt="团队霸凌2"
          />
          <p className="explain">螳螂捕蝉，黄雀在后</p>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/团队霸凌3.jpg"
            alt="团队霸凌3"
          />
          <p className="explain">双“龙”戏“珠”</p>
        </div>
      </div>

      <div className="box1">
        <div className="divider"></div>
        <div>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/团队霸凌之手机，我一生的挚友呀.jpg"
            alt="团队霸凌之手机，我一生的挚友呀"
          />
          <p className="explain">他闹任他闹，手机入我怀</p>
        </div>
        <h2 style={{ textAlign: "left" }}>天空一声巨响，小车我闪亮登场</h2>
        <h4>
          情不知所起，一往而深，如果非用一句话来形容的话，那就是……
          小车，我来啦！
        </h4>
        <div>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/小车合集-1.png"
            alt="小车合集-1"
          />
          <p className="explain">果然，谁也抵挡不了小车我的魅力</p>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/小车我走了.jpg"
            alt="小车我走了"
          />
          <p className="explain">小车我走啦</p>
          <div className="divider1">o(*￣▽￣*)ブ</div>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/小车我又来啦.jpg"
            alt="小车我又来了"
          />
          <p className="explain">你以为我走了，其实我又来啦^o^</p>
        </div>
      </div>

      <div className="box1">
        <h2 style={{ textAlign: "left" }}>欢乐烧烤</h2>
        <h4>
          啊啊啊，终于要准备烧烤啦(☆▽☆)，在这里，又有什么精彩的
          故事呢？让我们敬请期待吧！
        </h4>
        <div>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/厨师争霸.png"
            alt="厨师争霸"
          />
          <p className="explain">厨师争霸，谁是你的心动厨师呢</p>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/战火.png"
            alt="战火"
          />
          <p className="explain">食物和观众</p>
          <h5>别打我塞，都文明人，咱不动粗哈 o(〃＾▽＾〃)o</h5>
          <img
            src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/色香味-2.png"
            alt="色香味-2"
          />
          <p className="explain">大餐登场</p>
        </div>
      </div>

      <div className="box1">
        <h2 style={{ textAlign: "left" }}>闲适午时</h2>
        <h4>
          闲适的干饭时间和休息时间，快快乐乐吃饭啦。喝着小酒或饮料，
          吃着烤肉，听着鸟兽蝉鸣，感受着岁月静好。
        </h4>
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/烧烤图-1.png"
          alt="烧烤图-1"
        />
        <p className="explain">快乐吃烧烤啦</p>
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/小记.png"
          alt="小记"
        />
        <p className="explain">生活小记</p>
      </div>

      <div className="box1">
        <h2 style={{ textAlign: "left" }}>天黑了</h2>
        <h4>天黑请闭眼，狼人请睁👁。</h4>
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/clothe2.png"
          alt="黑道"
        />
        <p className="explain">相信大家都认识我是谁吧</p>
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/writting.png"
          alt="我来啦"
        />
        <p className="explain">我来了，你准备好了吗</p>
        <h5>笑了就过去了哈</h5>

        <h2 style={{ textAlign: "left" }}>结尾</h2>
        <h4>脑子空空啦。再见啦，大伙，咱们下次再见！</h4>
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/夜景3.jpg"
          alt="夜景2"
        />
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/夜景.jpg"
          alt="夜景"
        />
        <p className="explain">
          想进照片感受一下吗？
          <br />
          想着吧o(*￣▽￣*)ブ
        </p>

        <h3 style={{ textAlign: "left" }}>赠品</h3>
        <h4 className="explain2">
          哦，对啦，附赠一点从众多大景里找到的照片吧。
        </h4>
        <p className="explain3">
          （ps:这可不是私货哈，都从群里照片截的一部分）
        </p>

        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/5f30d890323a42db39a5e45245c46aa.jpg"
          className="explain4"
        />
        <br />
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/糊照.jpg"
          className="explain4"
        />
        <br />
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/8c5f1aa707d35561cb1b4f39f72169e.png"
          className="explain4"
        />
        <br />
        <img
          src="https://raw.gitcode.com/justinc/duty/raw/main/2025-05-03/a6343aaf823452714ef1fd00609f297.png"
          className="explain4"
        />
      </div>
    </div>
  );
}
