import styles from "./Footer.module.css";

export default function Footer() {
  const footSvg =
    "https://cdn.jsdelivr.net/gh/Justinc-github/project_resources@main/web/web_foot/svgs/";
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-section"]}>
          <h3>关于我们</h3>
          <p>
            校级团队，成立于2016年。团队名称“众智创新”取自：“积力之所举，则无不胜也；众智之所为，则无不成也。”，旨在聚集众智以得创新。
          </p>
        </div>
        <div className={styles["footer-section"]}>
          <h3>下载</h3>
          <div>
            <a
              href="https://gitee.com/justinc-gitee/project_resources/raw/main/static/zhongzhi/zhongzhi-1.1.00+21-setup.apk"
              target="_blank"
            >
              <img
                style={{ height: "50px", width: "50px" }}
                src={footSvg + "sign.svg"}
                alt="android"
              />
            </a>
            <a
              href="https://gitee.com/justinc-gitee/project_resources/raw/main/static/zhongzhi_windows/zhongzhi_windows-1.0.0+1-setup.exe"
              target="_blank"
            >
              <img
                style={{ height: "30px", width: "30px" }}
                src={footSvg + "windows.svg"}
                alt="windows"
              />
            </a>
          </div>
        </div>
        <div className={styles["footer-section"]}>
          <h3>联系方式</h3>
          <p>
            <img
              style={{
                height: "20px",
                width: "20px",
                verticalAlign: "middle",
                position: "relative",
              }}
              src={footSvg + "QQ.svg"}
              alt="QQ"
            />
            <span style={{ verticalAlign: "middle", marginLeft: "6px" }}>
              1004552592
            </span>
          </p>
          <p>
            <img
              style={{
                height: "20px",
                width: "20px",
                verticalAlign: "middle",
                position: "relative",
              }}
              src={footSvg + "地址.svg"}
              alt="地址"
            />
            <span style={{ verticalAlign: "middle", marginLeft: "6px" }}>
              辽宁工业大学-第五教学楼
            </span>
          </p>
        </div>
        <div className={styles["footer-section"]}>
          <h3>关注我们</h3>
          <a
            href="https://blog.csdn.net/lalaone?type=blog"
            target="_blank"
            aria-label="CSDN"
            title="CSDN"
          >
            <img
              style={{ height: "30px", width: "30px" }}
              src={footSvg + "csdn.svg"}
              alt="CSDN"
            />
          </a>
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        <p>
          © 2025 众智创新团队. 保留所有权利. | <a href="#">隐私政策</a> |{" "}
          <a href="#">服务条款</a>
        </p>
        <p>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            辽ICP备2025055354号-1
          </a>
        </p>
      </div>
    </footer>
  );
}
