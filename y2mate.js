// ==UserScript==
// @name         Descargar MP3 de y2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/results?search_query=*
// @match        https://www.y2mate.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL    http://circulodorado.onlinewebshop.net/extensions/chrome/y2mate.js
// @downloadURL  http://circulodorado.onlinewebshop.net/extensions/chrome/y2mate_meta.js
// @grant        none
// ==/UserScript==

(function() {

        alert('gdfgd')
    if(location.href.includes('https://www.y2mate.com/youtube-mp3/')){
        function btnFunc(){
            if(document.querySelector('#process_mp3')){document.querySelector('#process_mp3').click(); clearInterval(btnInt)}
        }
        btnInt=setInterval(btnFunc, 300)

        function btnSuccessFunc(){
            if(document.querySelector('.btn.btn-success.btn-file')){document.querySelector('.btn.btn-success.btn-file').click(); clearInterval(btnSuccessInt)}
        }
        btnSuccessInt=setInterval(btnSuccessFunc, 300)



        return
    }



    var repeticion = 0;
    var length= 0;
    function app() {
        var links = document.querySelectorAll('div ytd-video-renderer ytd-thumbnail a');
        if(links.length==0){return}
        if(repeticion==0){
            act();
            length=links.length;
        }
        else{
            if(links.length!=length){
                act();
                length=links.length;
            }
        }

        repeticion++
    }
    setInterval(app, 500)

    function act() {
if(document.querySelectorAll('.matey2')){document.querySelectorAll('.matey2').forEach((ele)=>{ele.outerHTML=''})
}


        var height = document.querySelector("#channel-thumbnail").clientHeight
        var width  = 3*height

        var links = document.querySelectorAll('div ytd-video-renderer ytd-thumbnail a');
        var channelsBoxes = document.querySelectorAll('#channel-info')

        for (let i = 0; i < links.length; i++) {
            var redBox = document.createElement('div');
            redBox.classList.add('matey2')
            redBox.style.width = width+'px';
            redBox.style.height = height+'px';
           // redBox.style.backgroundColor = 'red';
            redBox.style.borderRadius = '5px';
            channelsBoxes[i].appendChild(redBox);
            var link = document.createElement('a');

            link.innerHTML = 'Descargar';
            link.href = 'https://www.y2mate.com/youtube-mp3/' + links[i].href.split("=")[1];
            link.target = '_blank';
            redBox.appendChild(link);
            link.style.fontSize = height+'px';

        }
    }
})();
