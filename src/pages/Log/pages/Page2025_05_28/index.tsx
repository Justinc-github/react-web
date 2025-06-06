import { useState } from "react";
import ImageModal from "../../../../utils/ImageModal";

export default function Page2025_05_28() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const handleImageClick = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setShowModal(true);
  };

  const containerStyle = {
    maxWidth: "1080px",
    minWidth: "340px",
    margin: "0 auto",
    backgroundColor: "#f5f6fb",
    padding: "20px",
    fontFamily: "-apple-system, Arial, Helvetica, sans-serif",
    fontSize: "14px",
    lineHeight: 1.5,
  } as const;

  const contentStyle = {
    width: "85%",
    backgroundColor: "#fff",
    margin: "0 auto 20px auto",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundImage: "linear-gradient(to bottom, #fff, #f0f0f0)",
  } as const;

  const contentTitleStyle = {
    ...contentStyle,
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  } as const;

  const galleryStyle = {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  } as const;

  const columnGalleryStyle = {
    ...galleryStyle,
    flexDirection: "column",
    alignItems: "center", // 确保纵向排列时内容居中
  } as const;

  const centeredGalleryItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // 确保每个图片项内容居中
    marginBottom: "20px",
    width: "100%", // 确保宽度足够
  } as const;

  const photo1Style = {
    width: "150px",
    height: "auto",
    cursor: "pointer",
    margin: "0 auto", // 添加自动边距居中
    padding: "0",
    boxShadow: "0 10px 8px -8px black",
    transition: "transform 0.3s ease",
  } as const;

  const photo2Style = {
    height: "100px",
    width: "100px",
    cursor: "pointer",
    margin: "0 auto", // 添加自动边距居中
    padding: "0",
    boxShadow: "0 10px 8px -8px black",
    transition: "transform 0.3s ease",
  } as const;

  const photo3Style = {
    margin: "0 auto", // 添加自动边距居中
    padding: "0",
    height: "auto",
    width: "150px",
  } as const;

  const memeStyle = {
    height: "120px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  } as const;

  const remarkStyle = {
    fontSize: "1rem",
    color: "#000",
    textAlign: "center",
    marginTop: "5px",
  } as const;

  const endBlockStyle = {
    textAlign: "center",
    backgroundImage:
      "url('https://img.picgo.net/2025/06/06/f69d3f049838e5019ea62683c051820259d695ef984d6c7d.gif')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "20px",
  } as const;

  return (
    <div style={containerStyle}>
      <div className="form-floating">
        <div style={contentTitleStyle} id="content-title">
          <div style={{ height: "150px", flex: "1" }}></div>
          <div
            style={{
              display: "flex",
              height: "150px",
              flex: "2",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: "25px",
                maxWidth: "400px",
                margin: "0 auto",
                wordWrap: "break-word",
                wordBreak: "normal",
                lineHeight: "1.3",
              }}
            >
              “赛教结合,
              <br />
              以赛促学”讲座
            </h1>
          </div>
          <div
            style={{
              width: "150px",
              display: "flex",
              flex: "1",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <img
              src="https://img.picgo.net/2025/06/06/df84fc5276e1f092adb699d3bc44dd2d2fcb0d01d26fa482.png"
              alt="鹏哥小课堂"
              style={{ width: "140px", height: "auto", objectFit: "contain", margin: "0 auto" }}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/df84fc5276e极ad3bc44dd2d2fcb0d01d26fa482.png"
                )
              }
            />
          </div>
        </div>
        <br />

        <div
          style={{ ...contentStyle, display: "flex", flexDirection: "column" }}
        >
          <br />
          <div>
            <p
              style={{
                fontSize: "1rem",
                color: "#000",
                textAlign: "left",
                marginTop: "5px",
                marginLeft: "6px",
              }}
            >
              为深入理解 "赛教结合，以赛促学"的理念，掌握其在实践中的应用方法，
              以及围观激情赵鹏的演讲，团队大部分成员报名参与了此次主题演讲，
              期望借此机会深化对该教育理念的认知，为团队后续发展汲取新动力。
            </p>
          </div>
          <div style={galleryStyle}>
            <div
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/6a66b40788ad0807df90e7b8e818cfbe3a0e662789ad4fca.jpg"
                )
              }
              style={centeredGalleryItemStyle}
            >
              <img
                src="https://img.picgo.net/2025/06/06/6a66b40788ad0807df90e7b8e818cfbe3a0e662789ad4fca.jpg"
                alt="幕后"
                style={photo1Style}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <p style={remarkStyle}>幕后鹏哥之准备充分</p>
            </div>
          </div>
          <div>
            <h2 style={{ marginTop: "20px" }}>他山之石</h2>
          </div>
          <div>
            <p
              style={{
                fontSize: "1rem",
                color: "#000",
                textAlign: "left",
                marginTop: "5px",
                marginLeft: "6px",
              }}
            >
              前半段是由机器人团队的两名学生以及其指导老师蓝和慧老师来演讲，都充分表达了自己的观点。
              蓝和慧老师还普及了竞赛相关的知识，并讲述他们团队得奖的经验,不过这部分好像没人拍照片，补一张曝光图。
            </p>
          </div>
          <div style={galleryStyle}>
            <div
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/3ed9c60a7647f1c625240506f8eee22f3ac4c4cd1520c734.jpg"
                )
              }
              style={centeredGalleryItemStyle}
            >
              <img
                src="https://img.picgo.net/2025/06/06/3ed9c60a7647f1c625240506f8eee22f3ac4c4cd1520c734.jpg"
                alt="曝光"
                style={photo1Style}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <p style={remarkStyle}>像素最清晰的一张了</p>
            </div>
          </div>
          <br />
        </div>

        <br />
        <div
          style={{ ...contentStyle, display: "flex", flexDirection: "column" }}
        >
          <br />
          <div>
            <h2 style={{ marginTop: "20px" }}>
              声如流泉情满注，语似连珠意自扬
            </h2>
          </div>
          <div>
            <p
              style={{
                fontSize: "1rem",
                color: "#000",
                textAlign: "left",
                marginTop: "5px",
                marginLeft: "6px",
              }}
            >
              后半段几乎鹏哥主导，不说虚的，讲的非常认真，全是真情实感，从初识团队到现在，说了很多看法和心里话。
            </p>
          </div>
          <div style={columnGalleryStyle}>
            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/26d5f9c457db730cb.jpg"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/26d5f9c457db730cb.jpg"
                alt="激情演讲"
                style={photo1Style}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <p style={remarkStyle}>激情的开始</p>
            </div>

            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "极ttps://img.picgo.net/2025/06/06/335b971c809adc454.jpg"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/335b971c809adc454.jpg"
                alt="语重心长"
                style={photo1Style}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <p style={remarkStyle}>语重心长</p>
            </div>

            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/4dafa7ebff4d97494.png"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/4dafa7ebff4d97494.png"
                alt="演讲张力"
                style={photo1Style}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <p style={remarkStyle}>演讲非常有张力</p>
            </div>
          </div>
          <br />
          <div style={memeStyle}>
            <div
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/2279f17aeffd1a406.jpg"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/2279f17aeffd1a406.jpg"
                alt="是是是"
                style={photo2Style}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
            <div
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/16b82631380e3ca7a.jpg"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/16b82631380e3ca7a.jpg"
                alt="对对对"
                style={photo2Style}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          </div>
        </div>

        <br />
        <div
          style={{ ...contentStyle, display: "flex", flexDirection: "column" }}
        >
          <br />
          <div>
            <h2 style={{ marginTop: "20px" }}>三人合力，共同讲解</h2>
          </div>
          <div style={columnGalleryStyle}>
            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/1dafa7c3960880db22d72282831076683cdb033bccad7c16.jpg"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/1dafa7c3960880db22d72282831076683cdb033bccad7c16.jpg"
                alt="来器材了"
                style={photo1Style}
              />
              <p style={remarkStyle}>
                讲完不咋讲的ppt后，
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专武上场
              </p>
            </div>

            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/1fe4b863bb4c08a17.jpg"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/1fe4b863bb4c08a17.jpg"
                alt="二阶段"
                style={photo1Style}
              />
              <p style={remarkStyle}>鹏哥抿嘴开二阶段</p>
            </div>

            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/4cc670b4cd56dc8ac4548af04c3d0abb14e0cce4b05438d1.jpg"
                )}
         >
              <img
                src="https://img.picgo.net/2025/06/06/4cc670b4cd56dc8ac4548af04c3d0abb14e0cce4b05438d1.jpg"
                alt="共同讲解"
                style={photo1Style}
              />
              <p style={remarkStyle}>讲解"三巨头"</p>
            </div>

            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/8f01339e248b487e7.png"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/8f01339e248b487e7.png"
                alt="特写"
                style={photo1Style}
              />
              <div style={remarkStyle}>
                高尚：
                <img
                  src="https://img.picgo.net/2025/06/06/3ed5003d21bb52795b467368fdf58ed929803c881a94e3aa.png"
                  alt="嘟嘴"
                  style={{
                    width: "25px",
                    height: "25px",
                    display: "inline-block",
                    verticalAlign: "middle",
                    marginLeft: "5px",
                  }}
                />
              </div>
            </div>

            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/9e6d953c57fe334bb.png"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/9e6d953c57fe334bb.png"
                alt="演示"
                style={photo1Style}
              />
              <p style={remarkStyle}>
                现场展示机器
                <br />
                (出了点小问题)
              </p>
            </div>

            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/20a347657f25eb13d50acbe988100ff0de67736f2226360c.jpg"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/20a347657f25eb13d50acbe988100ff0de67736f2226360c.jpg"
                alt="共同讲解"
                style={photo1Style}
              />
              <p style={remarkStyle}>"三龙同朝"</p>
            </div>
          </div>
        </div>

        <br />
        <div
          style={{
            ...contentStyle,
            display: "flex",
            flexDirection: "column",
            ...endBlockStyle,
          }}
        >
          <br />
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h2
              style={{
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              讲座顺利结束，完结撒花
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#000",
                textAlign: "center",
                marginTop: "5px",
              }}
            >
              讲座在接近6点时就结束了，等其他人退场后团队组织进行大合照，大家上台拍照后活动完美谢幕。
            </p>
          </div>
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              src="https://img.picgo.net/2025/06/06/d9907064bfcd08de9810775d15d6b6fbb7f878e30f5b7e1e.jpg"
              alt="不行了"
              style={photo3Style}
            />
            <br />
            <p style={{ fontSize: "1rem", color: "#000", fontWeight: "bold" }}>
              时间最长的一集
            </p>
          </div>
          <div style={columnGalleryStyle}>
            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/f4b45bee9d30695109eec7f3d26e423acc38d373f2465682.jpg"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/f4b45bee9d30695109eec7f3d26e423acc38d373f2465682.jpg"
                alt="大合照"
                style={photo1Style}
              />
              <p style={remarkStyle}>结尾大合照（近）</p>
            </div>

            <div
              style={centeredGalleryItemStyle}
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/06/1047d2a1c668c1ea824dddb62c394fd1c43f0d7e53a79243.jpg"
                )
              }
            >
              <img
                src="https://img.picgo.net/2025/06/06/1047d2a1c668c1ea824dddb62c394fd1c43f0d7e53a79243.jpg"
                alt="大合照"
                style={photo1Style}
              />
              <p style={remarkStyle}>结尾大合照（远）</p>
            </div>
          </div>
          <br />
          <br />
        </div>
        <br />
      </div>
      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imgUrl={selectedImg}
      />
    </div>
  );
}