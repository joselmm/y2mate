// ==UserScript==
// @name         Y2 Mate decargas
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Descargar mp3 de Youtube 
// @author       joselmm
// @match        https://www.youtube.com/*
// @match        https://www.y2mate.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadURL  https://raw.githubusercontent.com/joselmm/y2mate/main/y2mate.user.js
// @updateURL    https://raw.githubusercontent.com/joselmm/y2mate/main/y2mate.meta.js
// @grant        none
// ==/UserScript==

(function() {


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
        var width = 3*height

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
            link.style.fontSize = (height*(5/7))+'px';

        }
    }



    var vId=extraerIdDeVideo(location.href);
    function titleFunc(){
        if(!location.href.includes("https://www.youtube.com/watch")){return}
        if(document.querySelector(".style-scope.ytd-watch-metadata .style-scope.ytd-watch-metadata h1.style-scope.ytd-watch-metadata")){ejecutar();}
    }
    var btnInt=setInterval(titleFunc, 300);
    function ejecutar(){

        if(document.querySelector("#download-watch")){document.querySelector("#download-watch").outerHTML=""}

        var titleBoxParent = document.querySelector(".style-scope.ytd-watch-metadata .style-scope.ytd-watch-metadata h1.style-scope.ytd-watch-metadata");
        //creacion del boton de descaragar abajao del video
        var redBox = document.createElement('div');
        titleBoxParent.appendChild(redBox);
        redBox.outerHTML=`<div id="download-watch" style="border-radius: 5px;display: inline-block;right: 0;position: absolute;">
            <a target="_blank" id="current-video-link">Descargar</a>
        </div>`
        var aTag= document.querySelector("#current-video-link");
        aTag.href="https://www.y2mate.com/youtube-mp3/"+extraerIdDeVideo(location.href);
    }



    function extraerIdDeVideo(url) {
        const expresion = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})(?:\S+)?$/;
        const match = url.match(expresion);
        return match ? match[1] : null;
    }





    function recomendados(){
        if(!location.href.includes("https://www.youtube.com/watch")){return}
        if(document.querySelectorAll("#dismissible > div > div.metadata.style-scope.ytd-compact-video-renderer > a").length){ejecutarListaReco();}
    }
    var listInt=setInterval(recomendados, 300);

    function ejecutarListaReco() {
        var list=document.querySelectorAll("#dismissible > div > div.metadata.style-scope.ytd-compact-video-renderer > a");
        if(document.querySelectorAll(".list-a").length){document.querySelectorAll(".list-a").forEach((div)=>{div.outerHTML=""})}
        for(let a of list){

            var redBox = document.createElement('div');
            a.parentNode.parentNode.appendChild(redBox);
            redBox.outerHTML=`<div class="list-a" style="border-radius: 5px;right: 0;position: absolute;font-size:${(a.parentNode.parentNode.parentNode.clientHeight/6)+"px"}">
            <a href="https://www.y2mate.com/youtube-mp3/${extraerIdDeVideo(a.href)}" target="_blank" id="current-video-link">Descargar</a>
        </div>`

        }
    }


})();
