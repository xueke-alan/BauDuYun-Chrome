// ==UserScript==
// @name         百度网盘webapp模式
// @namespace    https://pan.baidu.com
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at document-body
// ==/UserScript==



let cssHome = `
.web-header-ad-item,
.wp-s-header-cert__ee-cert-tilte,
.wp-s-header__right > a,
.wp-s-header__right > div,
.wp-s-header > .wp-s-header__right > div[pan-host],
.wp-s-aside-nav__main-bottom > a {
  display: none;
}
.wp-s-header__right .wp-s-header__right-item:nth-child(3),
.wp-s-aside-nav__main-bottom > a:nth-last-child(-n + 2) {
  display: block;
}
`
let cssVideo = `
body::-webkit-scrollbar
{
  width: 0px ;
  overflow : overlay
}
.module-video
{
  background : inherit
}
.header-box,
.video-title,
.dis-footer,
.video-toolbar
{
  display: none;
}
.module-video .video-main
{
  padding-top:0;
}
#video-wrap-outer
{
  margin-top : 15px;
}
.video-other-list
{
  width:min(100vw,980px);
}
.video-other-video .video-content-list
{
  width: calc(100% - 56px)
}
.video-other-video .video-other-title
{
  margin:0 20px
}

.setFull #video-wrap-outer
{
  margin-top : 0px;
  width : 100vw;
  position : relative;
  --sw:calc((-100vw + 980px) / 2);
  left : min(var(--sw),0px);
  height : calc(100vw * 480 /980);
}
.setFull #video-wrap
{
  transform-origin : top left;
  overflow:visible
}
`
const pathname = window.location.pathname
console.log(pathname);
if (pathname == '/disk/main') {
  console.log('主页面');
  adblock(cssHome)
  const types = {
    "mp4": (fileName) => {
      return `${window.location.origin}/play/video#/video?${window.location.hash.split("&")[1]}%2F${fileName}`
    },
    "mkv": (fileName) => {
      return `${window.location.origin}/play/video#/video?${window.location.hash.split("&")[1]}%2F${fileName}&t=-1`
    },
    "pdf": (fileName) => {
      return `${window.location.origin}/disk/pdfview?${window.location.hash.split("&")[1]}/${fileName}`
    },
    'docx': (fileName) => {
      return `${window.location.origin}/disk/pdfview?${window.location.hash.split("&")[1]}/${fileName}`
    },
    'doc': (fileName) => {
      return `${window.location.origin}/disk/pdfview?${window.location.hash.split("&")[1]}/${fileName}`
    }
  };
  const bind = setInterval(() => {
    // 给不会被销毁的元素挂事件委托
    const table = document.querySelector(".nd-main-layout__body");
    if (!table) return
    function set(e) {
      const type = e.target.title.split(".").pop().toLowerCase()
      if (
        e.target.localName == "a" &&
        e.target.title.split(".").length != 1 &&
        Object.keys(types).indexOf(type) != -1
      ) {
        // if (type == 'mp4') {
        //   console.log(12345678);
        // } else {
        const n = types[type](e.target.title)
        window.location.href = n;
        // window.location.replace(n)
        // }
        e.stopPropagation();
      }
    }
    table.addEventListener("click", set, true);
    table.addEventListener("dblclick", (e) => { e.stopPropagation(); }, true);
    console.log('table挂载完毕');
    clearTimeout(bind);
  }, 50);
  // 给其他按钮绑定

  const bind2 = setInterval(() => {
    // 给不会被销毁的元素挂事件委托
    const element = document.querySelector(".wp-s-aside-nav__main");
    if (!element) return
    function set(e) {
      console.log(e.target.innerHTML);
      if (
        (e.target.localName == 'p' && e.target.innerHTML.indexOf('同步空间') >= 0) ||
        (e.target.localName == 'img' && e.target.src.indexOf('+D7jsubfEpo7RAAAAAElFTkSuQmCC') >= 0)
      ) {
        console.log('--------------');
        window.location.href = 'https://pan.baidu.com/disk/synchronization'
        e.stopPropagation();
      }
    }
    element.addEventListener("click", set, true);
    clearTimeout(bind2);
  }, 50);

} else if (pathname == '/play/video') {
  console.log('/disk/pdfview页面');
  adblock(cssVideo)

  const file = window.location.hash.split('&')[0].split('%2F').pop()
  document.title = decodeURI(file)

  const listen = setInterval(() => {
    // 监听影子元素
    const element = document.querySelector("#video-root");
    if (!element) return
    document.querySelector(".video-content").classList.add('setFull')
    function a() {
      videoDiv = document.querySelector('#video-wrap')
      videoDiv.style.transform = `scale(calc(${document.body.offsetWidth}/980))`
    }
    a()
    window.onresize = function () {
      a();
    }
    console.log('影子元素监听完毕，销毁定时器');
    clearInterval(listen)
  }, 50)




} else if (pathname == '/disk/synchronization') {
  console.log(document.querySelector('.wp-disk-header__left'));
  const listen = setInterval(() => {
    // 给不会被销毁的元素挂事件委托
    const element = document.querySelector(".wp-disk-header.sync-web");
    if (!element) return
    console.log(element);
    element.style.background = 'none'
    element.style.backgroundImage = 'none'
    element.querySelector('.wp-disk-header__left').innerHTML = '<a href="https://pan.baidu.com" title="百度网盘"  class="wp-s-header__left-item nd-disk-header__item-logo" pan-host="https://pan.baidu.com"><img src="https://pan.baidu.com/box-static/disk-theme/theme/white/img/logo@2x.png" alt="百度网盘" class="wp-s-header__item-img" style="width: 133px;"> <div class="wp-s-header__item-active-bar"></div> <div class="wp-s-header__item-msg"></div> </a>'

    clearInterval(listen)
  })
}


function adblock(css) {
  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
  } else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
  } else if (typeof addStyle != "undefined") {
    addStyle(css);
  } else {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      heads[0].appendChild(node);
    } else {
      document.documentElement.appendChild(node);
    }
  }
}
