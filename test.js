// ==UserScript==
// @name         New Userscript
// @namespace    https://pan.baidu.com
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/disk*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const types = {
    "mp4": (fileName) => {
      return `${window.location.origin}/play/video#/video?${window.location.hash.split("&")[1]}%2F${fileName}&t=-1`
    },
    "mkv": (fileName) => {
      return `${window.location.origin}/play/video#/video?${window.location.hash.split("&")[1]}%2F${fileName}&t=-1`
    },
    "pdf": (fileName) => {
      return `${window.location.origin}/disk/pdfview?${window.location.hash.split("&")[1]}/${fileName}`
    },
    'docx': (fileName) => {
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
        const n = types[type](e.target.title)
        window.location.href = n;
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
      console.log(element);
      const yui = document.querySelector('.wp-s-aside-nav__main-bottom>a').remove()
      console.log(yui);
      element.addEventListener("click", set, true);
      clearTimeout(bind2);
    }, 50);
  }




})();
