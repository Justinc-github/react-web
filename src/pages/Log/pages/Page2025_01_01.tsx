import { useState } from "react";
import ImageModal from "../../../utils/ImageModal";

export default function Page2025_01_01() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const handleImageClick = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setShowModal(true);
  };

  return (
    <div style={{ padding: "10%" }} className="container mx-auto p-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4 text-center">
          2025众智元旦好活寄·顺颂时宜
        </h1>
        <p className="text-gray-700 leading-relaxed">
          岁末已至，神之人兮列如麻的众智创新发起一年一度的元旦好活寄；各路大仙齐显身手，百家争鸣。暂且卸下平日的体面，简单消遣在片刻的欢愉中。
        </p>
        <img
          src="https://pic1.imgdb.cn/item/6819ec8e58cb8da5c8e06f29.jpg"
          width="50%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
          onClick={() =>
            handleImageClick(
              "https://pic1.imgdb.cn/item/6819ec8e58cb8da5c8e06f29.jpg"
            )
          }
        />
        <img
          src="https://pic1.imgdb.cn/item/6819be6a58cb8da5c8dfcbfb.gif"
          style={{ opacity: 1 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />
        <h2 className="text-2xl font-bold mb-2">新元肇启-歌曲类</h2>
        <p className="text-gray-700 leading-relaxed">
          你就是歌姬吧主题分区，不论唱功；不论形式；带伙都在为晚会的顺利举行发力。
        </p>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/6819e5df58cb8da5c8e06893.png"
            alt="2"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/6819e5df58cb8da5c8e06893.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            大地飞歌-黄俊涛
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/6819e5df58cb8da5c8e06890.png"
            alt="2"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/6819e5df58cb8da5c8e06890.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            喀秋莎-贾鹏博
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b3a4558cb8da5c8e332b8.png"
            alt="3"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b3a4558cb8da5c8e332b8.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            崂山道士-吴宇航
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b3a4558cb8da5c8e332b6.png"
            alt="4"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b3a4558cb8da5c8e332b6.png"
              )
            }
          />
          <div className="flex items-center justify-center space-x-3 mt-2">
            <figcaption className="text-sm italic text-gray-600 flex-shrink-0">
              葡萄成熟时-蒋政
            </figcaption>
            <a
              href="https://www.bilibili.com/video/BV19b7BzZEfZ/?spm_id_from=333.1387.upload.video_card.click"
              className="inline-block px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              style={{ textDecoration: "none" }}
            >
              点我观看
            </a>
          </div>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b3a4558cb8da5c8e332b7.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b3a4558cb8da5c8e332b7.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            如春-陈鹤鑫
          </figcaption>
        </figure>
        <p className="text-gray-700 leading-relaxed">南通笑传之唱唱呗</p>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b3b3358cb8da5c8e3332e.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b3b3358cb8da5c8e3332e.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            杜志跃、王田田-郎的诱惑
          </figcaption>
        </figure>
        <figure className="text-center">
          <div className="max-w-2xl mx-auto">
            <div className="max-w-4xl mx-auto flex flex-nowrap justify-center gap-4 mt-4 overflow-x-auto">
              <img
                width="50%"
                height="50%"
                src="https://pic1.imgdb.cn/item/681b613258cb8da5c8e3d4d4.jpg"
                alt="5"
                className="mt-4 rounded-lg"
                onClick={() =>
                  handleImageClick(
                    "https://pic1.imgdb.cn/item/681b613258cb8da5c8e3d4d4.jpg"
                  )
                }
              />
              <img
                width="50%"
                height="50%"
                src="https://pic1.imgdb.cn/item/681b613658cb8da5c8e3d4d5.jpg"
                alt="5"
                className="mt-4 rounded-lg"
                onClick={() =>
                  handleImageClick(
                    "https://pic1.imgdb.cn/item/681b613658cb8da5c8e3d4d5.jpg"
                  )
                }
              />
            </div>
          </div>
          <figcaption className="text-sm italic text-gray-600">
            娘子，啊哈~
          </figcaption>
        </figure>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-2">旦逢良辰-游戏类</h2>
        <p className="text-gray-700 leading-relaxed">
          比划猜词、谁是卧底、害你在心口难开……这些熟为人知的互坑小游戏最适合水时长了(bushi)，不仅有贼奸的牛人；还有笔者这种脑抽把队友卖了的dinner；以下是照片记录。
        </p>
        <img
          src="https://pic1.imgdb.cn/item/6819be6a58cb8da5c8dfcbfb.gif"
          style={{ opacity: 1 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b3c6258cb8da5c8e333a9.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b3c6258cb8da5c8e333a9.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600"></figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b3c6158cb8da5c8e333a8.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b3c6158cb8da5c8e333a8.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            只剩俩能打的了=D
          </figcaption>
        </figure>
        <p className="text-gray-700 leading-relaxed">
          笔者当时没写珍珠，其实希望玩家更多地用肢体语言表达；不然也不会写大猩猩含笑半步颠啥的（）
        </p>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b3c6058cb8da5c8e333a7.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b3c6058cb8da5c8e333a7.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            比划猜词
          </figcaption>
        </figure>
        <img
          src="https://pic1.imgdb.cn/item/6819be6a58cb8da5c8dfcbfb.gif"
          style={{ opacity: 1 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-2">永绥吉劭-语言类</h2>
        <p className="text-gray-700 leading-relaxed">
          也许是各种晚会最喜闻乐见的部分；有些品鉴过的桥段被熟人演一遍又是新奇的风味；抛却说教与尴尬升华，在此赏味朴素的快乐吧。
        </p>
        <img
          src="https://pic1.imgdb.cn/item/6819be6a58cb8da5c8dfcbfb.gif"
          style={{ opacity: 1 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />
        <p className="text-gray-700 leading-relaxed">
          离真正的相声带师只差一个桃的曲明告，当时好像还没现在的“团宠地位”？𓃟𓃟𓃟
        </p>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a2a.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a2a.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            不像话的人-曲明三点水·告
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/6819e5e058cb8da5c8e06897.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/6819e5e058cb8da5c8e06897.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            哲学家的愿望-王勃、李昭毅、于明昆
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b48b658cb8da5c8e387f6.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b48b658cb8da5c8e387f6.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600"></figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a3f.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a3f.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            三句半-高尚、孙嘉成
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b58c958cb8da5c8e3d220.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b58c958cb8da5c8e3d220.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            我爱团队朗诵-朱海生、李彬、李先念
          </figcaption>
        </figure>
        <p className="text-gray-700 leading-relaxed">
          相亲节目，政治正确要素齐全、LGBTQ友好、团队包容性这一块（）
        </p>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a3e.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a3e.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            一个节目-杜志跃、王田田、鲁晓啼、孙梦镁、余佳琪
          </figcaption>
        </figure>
        <p className="text-gray-700 leading-relaxed">
          贵物最多的一集，乐天二人转刺客王子和煞笔脑子嗯答数学题。
        </p>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b5a5b58cb8da5c8e3d2c2.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b5a5b58cb8da5c8e3d2c2.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            考试结束前十五分钟-赵鹏、赵芷涵、蒋龙、李彬、朱海生、吴宇航、曲明浩
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b4fb858cb8da5c8e38d2d.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b4fb858cb8da5c8e38d2d.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            老赵家神人
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a41.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a41.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            修路冒油子准备跑路的李师傅和朱师傅
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b4fb858cb8da5c8e38d36.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b4fb858cb8da5c8e38d36.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            疑似赵鹏改名赵云鹏
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a3c.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b429358cb8da5c8e35a3c.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            龙哥就是龙，惹啊。数学薄纱祖冲之；物理踩头爱因斯坦，真是斯斯又坦坦啊。
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b4fb858cb8da5c8e38d37.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b4fb858cb8da5c8e38d37.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            头脑风暴段羽球少年再添新爹
          </figcaption>
        </figure>
        <img
          src="https://pic1.imgdb.cn/item/6819be6a58cb8da5c8dfcbfb.gif"
          style={{ opacity: 1 }}
          width="70%"
          height="50%"
          alt="1"
          className="mt-4 rounded-lg mx-auto block"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">喜神多瑞-特别篇</h2>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/6819e5df58cb8da5c8e06892.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/6819e5df58cb8da5c8e06892.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            老师被迫营业
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/6819e5e058cb8da5c8e06896.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/6819e5e058cb8da5c8e06896.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600"></figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b526e58cb8da5c8e3b0f3.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b526e58cb8da5c8e3b0f3.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600"></figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b526d58cb8da5c8e3b0ee.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b526d58cb8da5c8e3b0ee.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            23届卧龙凤雏和一坨不知道什么玩楞
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b52e158cb8da5c8e3b670.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b52e158cb8da5c8e3b670.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            众智兵王，铁血战狠
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b53e858cb8da5c8e3c3af.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b53e858cb8da5c8e3c3af.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            奶龙和贝利亚の糖分OVERDOSE
          </figcaption>
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b53e658cb8da5c8e3c394.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b53e658cb8da5c8e3c394.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            看完得打两管胰岛素-赵芷涵、鲁晓啼
          </figcaption>
        </figure>
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b634758cb8da5c8e3d5f5.jpg"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b634758cb8da5c8e3d5f5.jpg"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            敢直视神吗
          </figcaption>
        </figure>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <figure className="text-center">
          <img
            width="50%"
            height="50%"
            src="https://pic1.imgdb.cn/item/681b604f58cb8da5c8e3d494.png"
            alt="5"
            className="mt-4 rounded-lg mx-auto block"
            onClick={() =>
              handleImageClick(
                "https://pic1.imgdb.cn/item/681b604f58cb8da5c8e3d494.png"
              )
            }
          />
          <figcaption className="text-sm italic text-gray-600">
            大头照合订本
          </figcaption>
        </figure>
      </div>

      <ImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imgUrl={selectedImg}
      />
    </div>
  );
}
