import { useState } from "react";
import ImageModal from "../../../utils/ImageModal";

export default function Page2025_05_03() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const handleImageClick = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setShowModal(true);
  };

  return (
    <div style={{ padding: "10%" }} className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 text-center">
          龙湾花园偶遇贵物出行，拼尽全力无法绷住
        </h1>
        <p className="text-gray-700 leading-relaxed">
          五月三日，正当春和景明。带着采买来的牛羊告肉，团队润向龙湾花园露营地。偶尔忘却工作，亲近草木与青空，在团队生活里留下小有色彩的一笔。
        </p>
        <img
          src="https://s3.bmp.ovh/imgs/2025/05/04/8b7ccad9750d4a92.jpg"
          width="50%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
          onClick={() =>
            handleImageClick(
              "https://s3.bmp.ovh/imgs/2025/05/04/8b7ccad9750d4a92.jpg"
            )
          }
        />
        <img
          src="https://s3.bmp.ovh/imgs/2025/05/04/b84490c056783ae0.gif"
          style={{ opacity: 0.4 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />

        <h2 className="text-2xl font-bold mb-2">三星米其林</h2>
        <p className="text-gray-700 leading-relaxed">
          热浪卷席着炭粉，让光景失真。手忙脚乱的糗态、不绝于耳的玩笑、都向帐篷内外拨满了快活的空气。
        </p>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/6e9d58b531bc5d71.png"
            alt="2"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/6e9d58b531bc5d71.png"
              )
            }
          />
        </figure>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/1bb44e7efebbcf4a.png"
            alt="2"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/1bb44e7efebbcf4a.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            橘子葡萄皮叫花鸡翅
          </figcaption>
        </figure>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/488bcec88ac11542.png"
            alt="3"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/488bcec88ac11542.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            焦化层带手子
          </figcaption>
        </figure>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/1956b1ec690e845c.jpg"
            alt="4"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/1956b1ec690e845c.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            3000卖给上海人
          </figcaption>
        </figure>

        <p className="text-gray-700 leading-relaxed"></p>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/14497cb5b251e8c9.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/14497cb5b251e8c9.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            烤串中的大伙与路边一条彬
          </figcaption>
        </figure>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-2">队内80（误）</h2>
        <p className="text-gray-700 leading-relaxed">
          团队互敬互爱的优良传统，大概吧。
        </p>
        <img
          src="https://s3.bmp.ovh/imgs/2025/05/04/b84490c056783ae0.gif"
          style={{ opacity: 0.4 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/bb82365471c83b92.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/bb82365471c83b92.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            马革裹啼
          </figcaption>
        </figure>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/60308728d02057d0.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/60308728d02057d0.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            狗咬狗
          </figcaption>
        </figure>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/471f176a494f1549.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/471f176a494f1549.jpg"
              )
            }
          />
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/1281ba154e870fe7.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/1281ba154e870fe7.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            《沉睡魔咒4》
          </figcaption>
        </figure>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/6447c1a9b3d3e2f5.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/6447c1a9b3d3e2f5.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            老吴烤瓷牙
          </figcaption>
        </figure>

        <img
          src="https://s3.bmp.ovh/imgs/2025/05/04/b84490c056783ae0.gif"
          style={{ opacity: 0.4 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-2">树缺池光近，云开日影新</h2>
        <p className="text-gray-700 leading-relaxed"></p>
        <img
          src="https://s3.bmp.ovh/imgs/2025/05/04/bc09502262d9dd68.png"
          alt="tree"
          className="mt-4 rounded-lg mx-auto block"
          onClick={() =>
            handleImageClick(
              "https://s3.bmp.ovh/imgs/2025/05/04/bc09502262d9dd68.png"
            )
          }
        />
        <img
          src="https://s3.bmp.ovh/imgs/2025/05/04/b84490c056783ae0.gif"
          style={{ opacity: 0.4 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">行为艺术</h2>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/e9e4699eeb853252.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/e9e4699eeb853252.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600"></figcaption>
        </figure>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/c26695d055d3d1cd.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/c26695d055d3d1cd.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            注：此张为原图直出未经方向一大手
          </figcaption>
        </figure>

        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://s3.bmp.ovh/imgs/2025/05/04/916d3c5d6a47984d.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://s3.bmp.ovh/imgs/2025/05/04/916d3c5d6a47984d.png"
              )
            }
          />
        </figure>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-2">小夜景</h2>
        <p className="text-gray-700 leading-relaxed"></p>
        <img
          src="https://s3.bmp.ovh/imgs/2025/05/04/c3e6c8dd020d8544.png"
          alt="tree"
          className="mt-4 rounded-lg mx-auto block"
          onClick={() =>
            handleImageClick(
              "https://s3.bmp.ovh/imgs/2025/05/04/c3e6c8dd020d8544.png"
            )
          }
        />
        <img
          src="https://s3.bmp.ovh/imgs/2025/05/04/b84490c056783ae0.gif"
          style={{ opacity: 0.4 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />
      </div>

      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imgUrl={selectedImg}
      />
    </div>
  );
}
