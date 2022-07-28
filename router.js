// ==UserScript==
// @name         New Userscript
// @namespace    https://pan.baidu.com
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // console.log('12ui')
  const pathname = window.location.pathname
  console.log(pathname);
  if (pathname == '/disk/main') {
    console.log('主页面');
    // const link = `<link rel="prerender" href="https://pan.baidu.com/videoplay">`
    // document.body.appendChild(link)
    let link = document.createElement("link");
    link.href = "https://yun.baidu.com/videoplay";
    link.rel = "preload";
    link.as = "script";
    document.head.appendChild(link);

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
      const table = document.querySelector(".wp-s-pan-table");
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
      clearTimeout(bind);
    }, 50);


    // 给其他按钮绑定

    window.onload = () => {
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
    }
  } else if (pathname == '/play/video') {
    console.log('/disk/pdfview页面');
    console.log(window.location.hash);
    console.log(window.location.hash.split('&')[0]);
    const file = window.location.hash.split('&')[0].split('%2F').pop()
    console.log();
    document.title = decodeURI(file)

    document.querySelector('.header-box').remove()
    document.querySelector('.video-title').remove()
    document.querySelector('.video-functions-tips').remove()
    document.querySelector('.dis-footer').remove()
    document.querySelector('.module-video').style.background = 'inherit'
    document.querySelector('#video-wrap-outer').style.marginTop = '15px'
    document.body.style.overflow = 'overlay'
    document.styleSheets[0].insertRule(`body::-webkit-scrollbar { width: 0px }`, 0);

    let isFull = false

    document.body.addEventListener('keydown', function (e) {
      if (e.code == 'KeyF') {
        console.log('f');
        console.log(document.body.clientWidth);
        if (isFull) {
          small()

        } else {
          full()
        }
        isFull = !isFull
      }
    })

    window.onresize = function () {
      console.log('监听变化')
      if (isFull) {
        full()
      }
    }

    function full() {
      document.querySelector('.video-main').style.padding = '0'
      if (document.body.offsetWidth >= 980) {
        document.querySelector('#video-wrap-outer').style.marginTop = '0px'
        document.querySelector('#video-wrap-outer').style.width = '100vw'
        document.querySelector('#video-wrap-outer').style.position = 'relative'
        document.querySelector('#video-wrap-outer').style.left = 'calc((-100vw + 980px)/2)'
        document.querySelector('#video-wrap-outer').style.height = 'calc(100vw * 480 /980)'
        document.querySelector('#video-wrap').style.transform = `scale(calc(${document.body.offsetWidth}/980))`
        document.querySelector('#video-wrap').style.transformOrigin = 'top left'
      } else {
        document.querySelector('#video-wrap-outer').style.marginTop = '0px'
        document.querySelector('#video-wrap-outer').style.width = '100vw'
        document.querySelector('#video-wrap-outer').style.position = 'relative'
        document.querySelector('#video-wrap-outer').style.left = '0'
        document.querySelector('#video-wrap-outer').style.height = 'calc(100vw * 480 /980)'
        document.querySelector('#video-wrap').style.transform = `scale(calc(${document.body.offsetWidth}/980))`
        document.querySelector('#video-wrap').style.transformOrigin = 'top left'
        document.querySelector('#video-wrap').style.overflow = 'visible'
      }

    }
    function small() {
      document.querySelector('#video-wrap-outer').style.marginTop = '15px'
      document.querySelector('#video-wrap-outer').style.width = 'auto'
      document.querySelector('#video-wrap-outer').style.position = 'block'
      document.querySelector('#video-wrap-outer').style.left = ''
      document.querySelector('#video-wrap-outer').style.height = ''
      document.querySelector('#video-wrap').style.transform = ""
      document.querySelector('#video-wrap').style.transformOrigin = ''
    }



  }








})();
