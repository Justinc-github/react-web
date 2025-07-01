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

  const photo1Style = {
    width: "150px",
    height: "auto",
    cursor: "pointer",
    margin: "0",
    padding: "0",
    boxShadow: "0 10px 8px -8px black",
    transition: "transform 0.3s ease",
  } as const;

  const photo2Style = {
    height: "100px",
    width: "100px",
    cursor: "pointer",
    margin: "0",
    padding: "0",
    boxShadow: "0 10px 8px -8px black",
    transition: "transform 0.3s ease",
  } as const;

  const photo3Style = {
    margin: "0",
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

  const imgUrl = (urlName: string): string => {
    return `https://i.postimg.cc/${urlName}`;
  };
  const endBlockStyle = {
    textAlign: "center",
    backgroundImage: `url('${imgUrl("b8XCxgTq/image.gif?dl=1")}')`,
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
              src={imgUrl("pPZrZs84/image.png?dl=1")}
              alt="鹏哥小课堂"
              style={{ width: "140px", height: "auto", objectFit: "contain" }}
              onClick={() =>
                handleImageClick(imgUrl("pPZrZs84/image.png?dl=1"))
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
                handleImageClick("https://i.postimg.cc/VfqzfR1m/image.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/VfqzfR1m/image.jpg?dl=1"
                alt="幕后"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <br />
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
                handleImageClick("https://i.postimg.cc/pVPRpFX8/image.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/pVPRpFX8/image.jpg?dl=1"
                alt="曝光"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <br />
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
          <div style={{ ...galleryStyle, flexDirection: "column" }}>
            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/FmxhwDDx/2.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/FmxhwDDx/2.jpg?dl=1"
                alt="激情演讲"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <br />
              <p style={remarkStyle}>激情的开始</p>
            </div>

            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/PdChphh6/3.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/PdChphh6/3.jpg?dl=1"
                alt="语重心长"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <br />
              <p style={remarkStyle}>语重心长</p>
            </div>

            <img
              src="https://i.postimg.cc/F9c4pZY3/4.png?dl=1"
              alt="演讲张力"
              style={{
                ...photo1Style,
                display: "block", // 使图片作为块级元素便于居中
                margin: "0 auto", // 水平居中
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={() =>
                handleImageClick("https://i.postimg.cc/F9c4pZY3/4.png?dl=1")
              }
            />
            <br />
            <p style={remarkStyle}>演讲非常有张力</p>
          </div>
          <br />
          <div style={memeStyle}>
            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/jqqYsYZ4/1.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/jqqYsYZ4/1.jpg?dl=1"
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
                handleImageClick("https://i.postimg.cc/kJvd3gF5/2.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/kJvd3gF5/2.jpg?dl=1"
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
          <div style={{ ...galleryStyle, flexDirection: "column" }}>
            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/GcvWGmfj/image.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/GcvWGmfj/image.jpg?dl=1"
                alt="来器材了"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
              />
              <br />
              <p style={remarkStyle}>
                讲完不咋讲的ppt后，
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;专武上场
              </p>
            </div>

            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/mbxxPHmD/1.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/mbxxPHmD/1.jpg?dl=1"
                alt="二阶段"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
              />
              <br />
              <p style={remarkStyle}>鹏哥抿嘴开二阶段</p>
            </div>

            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/D2FTCGLN/image.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/D2FTCGLN/image.jpg?dl=1"
                alt="共同讲解"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
              />
              <br />
              <p style={remarkStyle}>讲解"三巨头"</p>
            </div>

            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/zz2YXP6m/8.png?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/zz2YXP6m/8.png?dl=1"
                alt="特写"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
              />
              <br />
              <div style={remarkStyle}>
                高尚：
                <img
                  src="https://i.postimg.cc/XWsb8pJ2/image.png?dl=1"
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
              onClick={() =>
                handleImageClick("https://i.postimg.cc/38czH00Y/9.png?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/38czH00Y/9.png?dl=1"
                alt="演示"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
              />
              <br />
              <p style={remarkStyle}>现场展示机器</p>
            </div>

            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/ZTYQBxrJ/image.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/ZTYQBxrJ/image.jpg?dl=1"
                alt="共同讲解"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
              />
              <br />
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
              src="https://i.postimg.cc/gY0MkkWJ/image.jpg?dl=1"
              alt="不行了"
              style={{
                ...photo3Style,
                display: "block", // 使图片作为块级元素便于居中
                margin: "0 auto", // 水平居中
              }}
              onClick={() =>
                handleImageClick("https://i.postimg.cc/gY0MkkWJ/image.jpg?dl=1")
              }
            />
            <br />
            <p style={{ fontSize: "1rem", color: "#000", fontWeight: "bold" }}>
              时间最长的一集
            </p>
          </div>
          <div
            style={{
              ...galleryStyle,
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/TfqQVW21/image.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/TfqQVW21/image.jpg?dl=1"
                alt="大合照"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
              />
              <br />
              <p style={remarkStyle}>结尾大合照（近）</p>
            </div>

            <div
              onClick={() =>
                handleImageClick("https://i.postimg.cc/YtrRbqj3/image.jpg?dl=1")
              }
            >
              <img
                src="https://i.postimg.cc/YtrRbqj3/image.jpg?dl=1"
                alt="大合照"
                style={{
                  ...photo1Style,
                  display: "block", // 使图片作为块级元素便于居中
                  margin: "0 auto", // 水平居中
                }}
              />
              <br />
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
