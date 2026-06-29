export interface EssayItem {
  date: string;
  content: string;
  image?: string[];
  video?: string[];
  link?: string;
  from?: string;
  address?: string;
  aplayer?: {
    id: string;
    server: string;
  };
}

export interface EssayPageConfig {
  title: string;
  subTitle: string;
  tips: string;
  buttonText: string;
  buttonLink: string;
  home_essay: boolean;
  limit: number;
  top_background?: string;
  essay_list: EssayItem[];
}

export const essayPage: EssayPageConfig = {
  title: "闲言碎语",
  subTitle: "上冬十二的碎碎念",
  tips: "随时随地，分享点滴",
  buttonText: "关于我",
  buttonLink: "/about/",
  home_essay: true,
  top_background: "/assets/images/cover/essay_top.jpg",
  limit: 30,
  essay_list: [
    {
      date: "2026-06-25",
      content: "😭心累的6月，希望7月能带给你更多的快乐和幸福！",
    },
    {
      date: "2026-02-09",
      content: "快要马年了，希望新的一年诸事顺遂，心情安好，身体康健",
    },
    {
      date: "2024-07-15",
      content: `好喜欢这段话

悟已往之不谏，知来者之可追。
实迷途其未远，觉今是而昨非。

——陶渊明 ·《归去来兮辞》`,
    },
    {
      date: "2023-10-11",
      content: `嘿~ vuepress-plugin-meting2

播放器有了，撒花✿✿ヽ(°▽°)ノ✿🎉🎉🎉

文档👉🏻戳这里文档`,
    },
    {
      date: "2023-09-25",
      content: `一转眼就快十月了，工作比较忙，有点顾不上更新了哈哈

想加一个音乐播放插件，但是没时间(〒︿〒))

希望接下来一切都好吧，加油！！🎉🎉🎉`,
    },
    {
      date: "2023-06-05",
      content: `"世间多是方展博，人间难寻小犹太"`,
      video: ["https://player.bilibili.com/player.html?bvid=BV1ve4y1776E"],
    },
    {
      date: "2023-06-05",
      content: `同样的六月

加油吧💪🏻`,
    },
    {
      date: "2023-06-02",
      content: `我宣布，经过两天的自定义后

🎉说说开始营业了哈哈!!!散花🎉`,
    },
  ],
};
