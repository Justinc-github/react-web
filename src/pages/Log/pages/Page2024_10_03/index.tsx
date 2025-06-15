import { useState } from "react";
import ImageModal from "../../../../utils/ImageModal";

export default function Page2024_10_03() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const handleImageClick = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setShowModal(true);
  };
  return (
    <div className="bg-gray-100 font-sans">
      <div className="container mx-auto p-8" style={{ padding: "10%" }}>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="article-header" id="articleHeader"></div>
          <p className="text-gray-700 leading-relaxed">
            时隔八个月，脑内映像已经模糊了；仅剩青色的天，树影也透气；粗糙的游乐设施与梦回零几年的小项目；据说东湖公园适合观鸟，上次只在波面瞥见一块白影。一群人溢出的活人气才给这次出行添些分量。
          </p>

          <img
            src="https://img.picgo.net/2025/06/05/hz958343429e0d0aa7.gif"
            width="50%"
            height="50%"
            alt="1"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://img.picgo.net/2025/06/05/hz958343429e0d0aa7.gif"
              )
            }
          />

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/phedc20d69c65c0dc0.jpg"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/phedc20d69c65c0dc0.jpg"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              合照
            </figcaption>
          </figure>

          <img
            src="https://img.picgo.net/2025/06/05/cloverlineafbe021b93c25229.png"
            style={{ opacity: 1 }}
            width="70%"
            height="50%"
            alt="1"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://img.picgo.net/2025/06/05/cloverlineafbe021b93c25229.png"
              )
            }
          />

          <h2 className="text-2xl font-bold mb-2">俗世奇人</h2>
          <p className="text-gray-700 leading-relaxed">
            每期必看，相信带伙都奔这块来的。希望猴头能保住吧。
          </p>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/bunnyladyf656c162c31f5962.png"
              alt="2"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/bunnyladyf656c162c31f5962.png"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              开幕雷击-兔女郎
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/wb08d65e6938a19b121.jpg"
              alt="2"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/wb08d65e6938a19b121.jpg"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              o.0
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/giant1e14199e2434da7d.png"
              alt="3"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/giant1e14199e2434da7d.png"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              谁家车力巨人
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/chainsawmanc3b85c0b775804a1.png"
              alt="4"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/chainsawmanc3b85c0b775804a1.png"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              脖子缠风筝想起彩色大肠了
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/yellowwind48ac42aebe32f788.png"
              alt="4"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/yellowwind48ac42aebe32f788.png"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              透视真是太简单了.jpg
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/dumb54250fb5e155f89f.jpg"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/dumb54250fb5e155f89f.jpg"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              看哭了，这些年大家都挺唐的
            </figcaption>
          </figure>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/longd32132afac40623f.png"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/longd32132afac40623f.png"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              前面忘了，后面忘了,总之如图
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/loong29cf2aa85b76f480.png"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/loong29cf2aa85b76f480.png"
                )
              }
            />
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/looong1be460b93610df0f.png"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/looong1be460b93610df0f.png"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              幻视🐅割
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/borb33c931889599d512.png"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/borb33c931889599d512.png"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              牢鸟依人
            </figcaption>
          </figure>

          <img
            src="https://img.picgo.net/2025/06/05/cloverlineafbe021b93c25229.png"
            style={{ opacity: 1 }}
            width="70%"
            height="50%"
            alt="1"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://img.picgo.net/2025/06/05/cloverlineafbe021b93c25229.png"
              )
            }
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <img
            src="https://img.picgo.net/2025/06/05/cloverlineafbe021b93c25229.png"
            style={{ opacity: 1 }}
            width="70%"
            height="50%"
            alt="1"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://img.picgo.net/2025/06/05/cloverlineafbe021b93c25229.png"
              )
            }
          />

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/shuipiao5d769f26c2936dc0.gif"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/shuipiao5d769f26c2936dc0.gif"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              基于涡旋诱导升力的二维抛体跨介质连续运动研究
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/jzdw0a87b769e5f6524eb.jpg"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/jzdw0a87b769e5f6524eb.jpg"
                )
              }
            />
            <figcaption className="text-sm italic text-gray-600">
              蒋政带玉
            </figcaption>
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/jzdw114593c3025fecb84.jpg"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/jzdw114593c3025fecb84.jpg"
                )
              }
            />
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/lyz469c3ddfaa84ce0c.jpg"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/lyz469c3ddfaa84ce0c.jpg"
                )
              }
            />
          </figure>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">小景</h2>
          <p className="text-gray-700 leading-relaxed">
            没错，每当各位看到这个标题就说明我们没东西可播了=o
          </p>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/river1f6680c621713202.jpg"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/river1f6680c621713202.jpg"
                )
              }
            />
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/ovod5324c0f4e25597f.jpg"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/ovod5324c0f4e25597f.jpg"
                )
              }
            />
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/viewfa7c465d4ad919f0.jpg"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/viewfa7c465d4ad919f0.jpg"
                )
              }
            />
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/landscapecce3466aea6e9c32.png"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/landscapecce3466aea6e9c32.png"
                )
              }
            />
          </figure>

          <figure className="text-center">
            <img
              width="50%"
              height="50%"
              src="https://img.picgo.net/2025/06/05/flosa272c623bda64e57.png"
              alt="5"
              className="mt-4 rounded-lg mx-auto block"
              onClick={() =>
                handleImageClick(
                  "https://img.picgo.net/2025/06/05/flosa272c623bda64e57.png"
                )
              }
            />
          </figure>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-gray-700 leading-relaxed">
            如果有素材可以投稿（）
          </p>
        </div>
      </div>
      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imgUrl={selectedImg}
      />
    </div>
  );
}
