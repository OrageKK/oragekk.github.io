export type LinkStyle = "anzhiyu" | "flexcard";

export interface LinkItem {
  name: string;
  link: string;
  avatar: string;
  descr: string;
  icon?: string;
  desc?: string;
  siteshot?: string;
  recommend?: boolean;
  color?: "vip" | "speed" | string;
  tag?: string;
}

export interface LinkGroup {
  class_name: string;
  class_desc?: string;
  flink_style: LinkStyle;
  hundredSuffix?: string;
  lost_contact?: boolean;
  link_list: LinkItem[];
}

const normalizeLinkItem = (item: LinkItem): LinkItem => ({
  ...item,
  icon: item.icon || item.avatar,
  desc: item.desc || item.descr,
});

export const siteInfo = {
  name: "上冬十二",
  descr: "到最后，竟庆幸于夕阳仍留在身上",
  avatar: "https://oragekk.me/logo.png",
  link: "https://oragekk.me/",
};

export const linkPage = {
  title: "友人帐",
  banner: {
    smallTitle: "友情链接",
    title: "与数百名博主无限进步",
  },
  applyExample: {
    name: "昵称或网站title",
    descr: "网站或个人简介，多出两行部分不显示",
    avatar: "头像连接",
    link: "站点连接",
  },
  disclaimer: [
    "本站将定期检查友情链接，确保所有链接都是有效的，避免死链等无效链接影响用户体验。",
    "本站不接受涉及政治和非法内容的网站申请友情链接，维护健康和谐的网络环境。",
    "长期无更新、无法访问的博客将被视为失效链接，本站有权终止相关的友情链接。",
    "在友情链接之后，希望能够互勉互动，共同促进博客的发展和进步。",
    "为了避免友情链接中断和影响用户体验，本站建议申请友情链接前请确保贵站能够长期稳定运营下去。",
    "如有链接变更，请及时联系本站并告知变更信息，同时请填写正确的邮箱账号，方便联系和告知。",
  ],
  statement: [
    "鉴于多个友链出现死链，无法联通的问题，不再接受运营 1 年以内的博客申请友链",
    "申请友链请告知网站运营年限",
    "请持续稳定的更新运营博客",
  ],
};

export const linkGroups: LinkGroup[] = [
  {
    class_name: "小伙伴",
    class_desc: "那些人，那些事",
    flink_style: "anzhiyu",
    hundredSuffix: "",
    link_list: [
      normalizeLinkItem({
        name: "上冬十二",
        link: "https://oragekk.me/",
        avatar: "/logo.svg",
        descr: "到最后，竟庆幸于夕阳仍留在身上",
        recommend: true,
      }),
      normalizeLinkItem({
        name: "廿壴(GANXB2)博客",
        link: "https://blog.ganxb2.com/",
        avatar: "https://blog.ganxb2.com/img/avatar.png",
        descr: "探讨WEB技术.交流日常生活.感悟短暂人生.分享简单快乐",
        recommend: true,
      }),
      normalizeLinkItem({
        name: "Mr.Hope",
        link: "https://mister-hope.com/",
        avatar: "https://mister-hope.com/logo.svg",
        descr: "VuePress Theme Hope 主题作者。",
      }),
      normalizeLinkItem({
        name: "一之笔",
        link: "https://yizibi.github.io/",
        avatar: "https://yizibi.github.io/img/avatar-hux-ny.jpg",
        descr: "大圣，此去欲何？踏南天，碎凌霄，如若一去不回……？便一去不回！💪",
      }),
      normalizeLinkItem({
        name: "Vivian陈薇",
        link: "http://www.vivianchen.cn/",
        avatar: "http://upload.jianshu.io/users/upload_avatars/196894/99323ae8-5924-4730-b73f-9d0d284ff243.png?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
        descr: "《程序员》专题主编 Android程序媛",
      }),
      normalizeLinkItem({
        name: "Bing🐣",
        link: "https://liubing.me/",
        avatar: "https://liubing.me/logo.png",
        descr: "基于VuePress的个人博客，记录日常开发问题",
      }),
      normalizeLinkItem({
        name: "SaraKale's blog",
        link: "https://www.sarakale.top/blog/",
        avatar: "https://npm.elemecdn.com/sarakale-assets@v1/sarakale.jpg",
        descr: "星轮流转，唯心不变…",
        recommend: true,
      }),
      normalizeLinkItem({
        name: "Leonus",
        link: "https://blog.leonus.cn/",
        avatar: "https://q1.qlogo.cn/g?b=qq&nk=990320751&s=5",
        descr: "进一寸有进一寸的欢喜。",
      }),
      normalizeLinkItem({
        name: "UyoAhz",
        link: "https://uyoahz.cn/",
        avatar: "https://q1.qlogo.cn/g?b=qq&nk=2496091142&s=640",
        descr: "集中精神，以气御剪",
      }),
      normalizeLinkItem({
        name: "铭心石刻",
        link: "https://blog.kouseki.cn/",
        avatar: "https://blog.kouseki.cn/imgs/avatar.webp",
        descr: "愿岁并谢，与友长兮",
      }),
      normalizeLinkItem({
        name: "Anjhon's blog",
        link: "https://www.anjhon.top/",
        avatar: "https://s2.loli.net/2023/05/16/MdciSXAbrEx3LW9.jpg",
        descr: "但知行好事，莫要问前程",
      }),
      normalizeLinkItem({
        name: "OhYee ⭐",
        link: "https://www.ohyee.cc/",
        avatar: "https://static.ohyee.cc/logo.svg",
        descr: "个人向笔记性质技术分享，共产主义开源编程🤪",
      }),
      normalizeLinkItem({
        name: "Quantum Bit",
        link: "https://www.imiao.top/",
        avatar: "https://www.imiao.top/avatar.png",
        descr: "Never stop searching, even if only for a brief flash of light.",
      }),
      normalizeLinkItem({
        name: "LineXic书屋",
        link: "https://linexic.top/",
        avatar: "https://www.linexic.top/avatar.webp",
        descr: "难离难舍，想抱紧些",
      }),
      normalizeLinkItem({
        name: "RichELF",
        link: "https://richelf.tech/",
        avatar: "https://richelf.tech/favicon.ico",
        descr: "给岁月以文明，给机器以生命。",
      }),
      normalizeLinkItem({
        name: "火柴人儿的小站",
        link: "https://huochairener-blog.cn/",
        avatar: "https://ikun.huochairener-blog.cn/i/2025/02/20/67b69bf2c9531.webp",
        descr: "仰望星空的打工人",
      }),
      normalizeLinkItem({
        name: "运维开发绿皮书",
        link: "https://www.geekery.cn/",
        avatar: "https://www.geekery.cn/logo.svg",
        descr: "放置运维开发笔记、搜集、摘录、实践，保持好奇心，看文需谨慎，后果很严重！",
      }),
      normalizeLinkItem({
        name: "Brandon",
        link: "https://heybran.tech/",
        avatar: "https://avatars.githubusercontent.com/u/75633537?v=4",
        descr: "Web开发，摄影 & 旅行",
      }),
      normalizeLinkItem({
        name: "问心斋",
        link: "https://blog.ehnap.com/",
        avatar: "https://blog.ehnap.com/logo.webp",
        descr: "一只狗的精神自留地",
      }),
      normalizeLinkItem({
        name: "ToLiucyLinux",
        link: "http://liuchenyang.top/",
        avatar: "http://www.liuchenyang.top/picture.jpg",
        descr: "享运维人生，探技术奥秘。ToLiucyLinux，Linux学习优质指南，助你构筑知识体系。",
        recommend: true,
      }),
      normalizeLinkItem({
        name: "gooseforum",
        link: "https://gooseforum.online",
        avatar: "https://gooseforum.online/static/pic/icon.png",
        descr: "自由漫谈的江湖茶馆",
      }),
    ],
  },
  {
    class_name: "框架",
    flink_style: "flexcard",
    hundredSuffix: "",
    link_list: [
      normalizeLinkItem({
        name: "VuePress",
        link: "https://v2.vuepress.vuejs.org/zh/",
        avatar: "https://v2.vuepress.vuejs.org/images/hero.png",
        descr: "Vue 驱动的静态网站生成器",
      }),
      normalizeLinkItem({
        name: "vuepress-theme-hope",
        link: "https://theme-hope.vuejs.press/zh/",
        avatar: "https://theme-hope.vuejs.press/logo.svg",
        descr: "一个具有强大功能的 vuepress 主题",
      }),
    ],
  },
  {
    class_name: "失效链接💔",
    class_desc: "暂时无法联通的小伙伴",
    flink_style: "anzhiyu",
    lost_contact: true,
    link_list: [
      normalizeLinkItem({
        name: "Camill",
        link: "",
        avatar: "https://www.camill.love/img/myself.jpg",
        descr: "嵌入式、ROS、还有生活！",
      }),
      normalizeLinkItem({
        name: "SMallTIAN's Blog",
        link: "",
        avatar: "https://mcsmalltian.com/frontend/img/avatar.webp",
        descr: "写我想写的，说我想说的。只要自己开心就好。",
      }),
      normalizeLinkItem({
        name: "寒烟志",
        link: "",
        avatar: "https://www.qiaoxiao.top/static/avater/avater.jpg",
        descr: "半山腰总是挤的，你得去山顶看看",
      }),
      normalizeLinkItem({
        name: "文奚•技术驿站",
        link: "",
        avatar: "https://vxcode.top/assets/icon/logo2.png",
        descr: "代码在手，天下我有",
      }),
      normalizeLinkItem({
        name: "XINGJI",
        link: "",
        avatar: "https://i.p-i.vip/47/20240920-66ed7b168c38c.jpg",
        descr: "迄今所有人生都大写着失败，但不妨碍我继续向前✨",
      }),
    ],
  },
];
