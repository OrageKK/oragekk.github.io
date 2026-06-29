export interface AboutCareerItem {
  desc: string;
  color: string;
}

export interface AboutComicItem {
  name: string;
  href: string;
  cover: string;
}

export interface AboutRewardItem {
  name: string;
  amount: number;
  datatime: string;
  suffix?: string;
}

export interface AboutCreativityItem {
  name: string;
  color: string;
  icon: string;
}

export interface AboutPageConfig {
  class_name: string;
  subtitle: string;
  avatarImg: string;
  avatarSkills: {
    left: string[];
    right: string[];
  };
  name: string;
  description: string;
  aboutsiteTips: {
    tips: string;
    title1: string;
    title2: string;
    word: string[];
  };
  helloAbout: string;
  skillsTips: {
    tips: string;
    title: string;
  };
  careers: {
    tips: string;
    title: string;
    list: AboutCareerItem[];
    img?: string;
  };
  statistic: {
    link: string;
    text: string;
    cover: string;
  };
  map: {
    title: string;
    StrengthenTitle: string;
    background: string;
    backgroundDark: string;
  };
  selfInfo: {
    selfInfoTips1: string;
    selfInfoContentYear: number;
    selfInfoTips2: string;
    selfInfoContent2: string;
    selfInfoTips3: string;
    selfInfoContent3: string;
  };
  personalities: {
    author_name: string;
    personality_type: string;
    photo_url: string;
    personality_img: string;
    name_url: string;
  };
  maxim: {
    maxim_tips: string;
    maxim_top: string;
    maxim_bottom: string;
  };
  buff: {
    buff_tips: string;
    buff_top: string;
    buff_bottom: string;
  };
  game: {
    game_tips: string;
    game_title: string;
    game_uid: string;
    game_bg: string;
  };
  comic: {
    comic_tips: string;
    comic_title: string;
    comic_list: AboutComicItem[];
  };
  like: {
    like_tips: string;
    like_title: string;
    like_bg: string;
    like_bottom: string;
  };
  music: {
    music_tips: string;
    music_title: string;
    music_bg: string;
    music_link: string;
  };
  reward_list: AboutRewardItem[];
  creativity_list: AboutCreativityItem[];
}

export const aboutPage: AboutPageConfig = {
  class_name: "关于页",
  subtitle: "生活明朗，万物可爱✨c",
  avatarImg: "/logo.png",
  avatarSkills: {
    left: ["🤖️ 数码科技爱好者", "🔍 分享与热心帮助", "🏠 智能家居小能手", "🔨 设计开发一条龙"],
    right: ["专修交互与设计 🤝", "脚踏实地行动派 🏃", "团队小组发动机 🧱", "壮汉人狠话不多 💢"],
  },
  name: "上冬",
  description: "是一名 全栈开发、打工狗、博主",
  aboutsiteTips: {
    tips: "追求",
    title1: "源于",
    title2: "热爱而去感受",
    word: ["学习", "生活", "程序", "体验"],
  },
  helloAbout: "人生如剑!",
  skillsTips: {
    tips: "技能",
    title: "开启创造力",
  },
  careers: {
    tips: "生涯",
    title: "无限进步",
    list: [
      { desc: "保持好奇 · 记录技术、产品与生活的细节", color: "#7e1671" },
      { desc: "勇敢冒险 · 不断挑战自己，勇攀高峰", color: "#357ef5" },
      { desc: "拥抱变化 · AI 工具、跨端开发与工程实践", color: "#ec2b24" },
      { desc: "向内生长 · 生活、阅读、思考与自我更新", color: "#f8df72" },
    ],
  },
  statistic: {
    link: "/archives",
    text: "文章隧道",
    cover: "https://bu.dusays.com/2023/05/01/644f4b037b930.jpg",
  },
  map: {
    title: "我现在住在",
    StrengthenTitle: "中国，北京市",
    background: "/assets/images/map.png",
    backgroundDark: "/assets/images/map.png",
  },
  selfInfo: {
    selfInfoTips1: "出生于",
    selfInfoContentYear: 1993,
    selfInfoTips2: "提醒自己",
    selfInfoContent2: "保持专注",
    selfInfoTips3: "现在职业",
    selfInfoContent3: "FDE工程师👨🏻‍💻",
  },
  personalities: {
    author_name: "指挥官",
    personality_type: "ENTJ-A",
    photo_url: "/assets/images/cover/wallhaven-k82p6d.png",
    personality_img: "https://cdn.jsdelivr.net/gh/oragekk/blog-assets/svg/entj-commander-female.svg",
    name_url:
      "https://www.16personalities.com/ch/entj-%E4%BA%BA%E6%A0%BC?utm_source=results-assertive-commander&utm_medium=email&utm_campaign=ch&utm_content=type-personality-image-0",
  },
  maxim: {
    maxim_tips: "座右铭",
    maxim_top: "心有微光，",
    maxim_bottom: "何惧路远。",
  },
  buff: {
    buff_tips: "特长",
    buff_top: "探索欲望爆棚",
    buff_bottom: "冒险指数 MAX",
  },
  game: {
    game_tips: "爱好游戏",
    game_title: "Counter-Strike 2",
    game_uid: "UID: 藏起来",
    game_bg:
      "https://cdn.jsdelivr.net/gh/oragekk/blog-assets/img/csgowallpaper_906670938517_1611074074_278068613702.jpg",
  },
  comic: {
    comic_tips: "爱好番剧",
    comic_title: "追番",
    comic_list: [
      {
        name: "凡人修仙传",
        href: "https://www.bilibili.com/bangumi/media/md28223043",
        cover: "https://cdn.jsdelivr.net/gh/oragekk/blog-assets/img/wallhaven-rrwekjj.jpg",
      },
      {
        name: "罗小黑战记",
        href: "https://www.bilibili.com/bangumi/media/md1733",
        cover: "https://cdn.jsdelivr.net/gh/oragekk/blog-assets/img/wallhaven-o56wom.jpg",
      },
      {
        name: "紫罗兰永恒花园",
        href: "https://www.bilibili.com/bangumi/media/md8892/",
        cover: "https://bu.dusays.com/2025/04/11/67f91eac5acf3.jpg",
      },
      {
        name: "鬼灭之刃",
        href: "https://www.bilibili.com/bangumi/media/md22718131/",
        cover: "https://bu.dusays.com/2025/04/11/67f9200d5a850.jpg",
      },
      {
        name: "JOJO的奇妙冒险 黄金之风",
        href: "https://www.bilibili.com/bangumi/media/md135652/",
        cover: "https://bu.dusays.com/2025/04/11/67f9219fc900c.jpg",
      },
    ],
  },
  like: {
    like_tips: "关注偏好",
    like_title: "数码科技",
    like_bg: "https://bu.dusays.com/2022/12/06/638f5f05ce1f7.jpg",
    like_bottom: "手机、电脑软硬件",
  },
  music: {
    music_tips: "音乐偏好",
    music_title: "自由、摇滚、民谣、电子、华语流行",
    music_bg: "https://cdn.jsdelivr.net/gh/oragekk/blog-assets/img/xuwei-canlan.png",
    music_link: "/music/?id=851947617&server=tencent",
  },
  reward_list: [
    { name: "海阔蓝", amount: 8.8, datatime: "2023-03-28" },
    { name: "LK66", amount: 66.6, datatime: "2023-03-24" },
    { name: "张时貳", amount: 6.6, datatime: "2023-01-22" },
    { name: "ZeroAf", amount: 9.9, datatime: "2022-12-14" },
    { name: "LuckyWangXi", amount: 6.6, datatime: "2022-12-14" },
    { name: "刀中日月长", amount: 10, datatime: "2022-11-16" },
    { name: "鹿啵包", amount: 10, datatime: "2022-11-08" },
    { name: "疾速k", amount: 50, datatime: "2022-09-20" },
    { name: "伴舟先生大霖子", amount: 4.03, datatime: "2022-10-27", suffix: "贝壳" },
    { name: "Magica_0x0", amount: 3.36, datatime: "2022-10-07", suffix: "贝壳" },
    { name: "名字就是要短像这样", amount: 3.36, datatime: "2022-08-25", suffix: "贝壳" },
    { name: "Leviathan520", amount: 1.34, datatime: "2022-08-23", suffix: "贝壳" },
    { name: "托马斯", amount: 10, datatime: "2022-08-19" },
    { name: "哇是猫猫欸", amount: 1.34, datatime: "2022-08-19", suffix: "贝壳" },
  ],
  creativity_list: [
    {
      name: "Java",
      color: "#fff",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/07/29/125766904/26ba17ce013ecde9afc8b373e2fc0b9d_1804318147854602575.jpg",
    },
    {
      name: "Docker",
      color: "#57b6e6",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/07/29/125766904/544b2d982fd5c4ede6630b29d86f3cae_7350393908531420887.png",
    },
    {
      name: "Photoshop",
      color: "#4082c3",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/07/29/125766904/4ce1d081b9b37b06e3714bee95e58589_1613929877388832041.png",
    },
    { name: "Node", color: "#333", icon: "https://npm.elemecdn.com/anzhiyu-blog@2.1.1/img/svg/node-logo.svg" },
    {
      name: "Webpack",
      color: "#2e3a41",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/07/29/125766904/32dc115fbfd1340f919f0234725c6fb4_4060605986539473613.png",
    },
    { name: "Pinia", color: "#fff", icon: "https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/pinia-logo.svg" },
    {
      name: "Python",
      color: "#fff",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/07/29/125766904/02c9c621414cc2ca41035d809a4154be_7912546659792951301.png",
    },
    { name: "Vite", color: "#937df7", icon: "https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/vite-logo.svg" },
    {
      name: "Flutter",
      color: "#4499e4",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/07/29/125766904/b5aa93e0b61d8c9784cf76d14886ea46_4590392178423108088.png",
    },
    {
      name: "Vue",
      color: "#b8f0ae",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/07/29/125766904/cf23526f451784ff137f161b8fe18d5a_692393069314581413.png",
    },
    {
      name: "React",
      color: "#222",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
    },
    {
      name: "CSS3",
      color: "#2c51db",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/08/02/125766904/948767d87de7c5733b5f59b036d28b4b_3573026798828830876.png",
    },
    {
      name: "JS",
      color: "#f7cb4f",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/07/29/125766904/06216e7fddb6704b57cb89be309443f9_7269407781142156006.png",
    },
    {
      name: "HTML",
      color: "#e9572b",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/08/02/125766904/f774c401c8bc2707e1df1323bdc9e423_1926035231499717029.png",
    },
    {
      name: "Git",
      color: "#df5b40",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/07/29/125766904/fcc0dbbfe206b4436097a8362d64b558_6981541002497327189.webp",
    },
    {
      name: "Apifox",
      color: "#e65164",
      icon: "https://upload-bbs.miyoushe.com/upload/2025/08/02/125766904/b61bc7287d7f7f89bd30079c7f04360e_2465770520170903938.png",
    },
  ],
};
