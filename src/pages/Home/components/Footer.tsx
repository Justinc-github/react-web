import styles from "../css/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-section"]}>
          <h3>关于我们</h3>
          <p>大学创新团队</p>
        </div>
        <div className={styles["footer-section"]}>
          <h3>下载</h3>
          <div>
            <a href="https://www.pgyer.com/zhong_zhi">
              <img
                style={{ height: "50px", width: "50px" }}
                src="favicon.svg"
                alt="android"
              />
            </a>
            <a href="/download">
              <img
                style={{ height: "30px", width: "30px" }}
                src="https://image.baidu.com/search/down?url=https://lz.sinaimg.cn/large/008txcFbgy1i2w7fqf61xj303k03kq2t.jpg"
                alt="windows"
              />
            </a>
          </div>
        </div>
        <div className={styles["footer-section"]}>
          <h3>联系方式</h3>
          <p>qq群：1004552592</p>
          {/* <p>邮箱：contact@yourcompany.com</p> */}
          <p>地址：辽宁工业大学-第五教学楼</p>
        </div>
        <div className={styles["footer-section"]}>
          <h3>关注我们</h3>
          <a href="#" aria-label="CSDN" title="CSDN">
            <img
              style={{ height: "30px", width: "30px" }}
              src="https://image.baidu.com/search/down?url=https://lz.sinaimg.cn/large/008txcFbgy1i2w7bzg433j303k03kmx0.jpg"
              alt=""
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
