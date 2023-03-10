export interface LinkData {
  title: string;
  desc: string;
  img: string;
  href:string;
}

export const friends: LinkData[] = [
  {
    title: "上冬十二",
    desc: "一生短暂，过程很美",
    img: "/logo.svg",
    href: "https://oragekk.me/"
  },
  {
    title: "Mr.Hope",
    desc: "VuePress Theme Hope 主题作者。",
    img: "https://mrhope.site/logo.svg",
    href: "https://mrhope.site/"
  },
  {
    title: "一之笔",
    desc: "大圣，此去欲何？踏南天，碎凌霄，如若一去不回……？便一去不回！💪",
    img: "https://yizibi.github.io/img/avatar-hux-ny.jpg",
    href: "https://yizibi.github.io/"
  },
  {
    title: "Vivian陈薇",
    desc: "《程序员》专题主编 Android程序媛",
    img: "http://upload.jianshu.io/users/upload_avatars/196894/99323ae8-5924-4730-b73f-9d0d284ff243.png?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
    href: "http://www.vivianchen.cn/"
  },
];
