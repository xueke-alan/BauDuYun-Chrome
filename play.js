// ==UserScript==
// @name         play
// @namespace    https://pan.baidu.com
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/play/video*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';



    console.log(window.location.hash);
    console.log(window.location.hash.split('&')[0]);
    const file = window.location.hash.split('&')[0].split('%2F').pop()
    console.log();
    document.title = decodeURI(file)

    // document.querySelector('.header-box').remove()
    document.querySelector('.header-box').innerHTML=''
    document.querySelector('.header-box').style.boxShadow='0px 5px 5px 0px #ababab'
    document.querySelector('.header-box').style.height='1px'
    document.querySelector('.header-box').style.marginBottom='5px'
    document.querySelector('.video-title').remove()
    document.querySelector('.video-functions-tips').remove()
    document.querySelector('.dis-footer').remove()
    document.querySelector('.module-video').style.background = 'inherit'
    document.querySelector('#video-wrap-outer').style.marginTop = '15px'
    document.body.style.overflow = 'overlay'

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

    window.onresize=function(){
        console.log('监听变化')
        if (isFull) {
            full()
        }
    }

    function full() {
        document.querySelector('#video-wrap-outer').style.marginTop = '0px'
        document.querySelector('#video-wrap-outer').style.width = '100vw'
        document.querySelector('#video-wrap-outer').style.position = 'relative'
        document.querySelector('#video-wrap-outer').style.left = 'calc((-100vw + 980px)/2)'
        document.querySelector('#video-wrap-outer').style.height = 'calc(100vw * 480 /980)'
        document.querySelector('#video-wrap').style.transform = `scale(calc(${document.body.offsetWidth}/980))`
        document.querySelector('#video-wrap').style.transformOrigin = 'top left'
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



})();