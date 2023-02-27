// ==UserScript==
// @name         Y2 Mate decargas
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Descargar mp3 de Youtube
// @author       joselmm
// @match        https://www.youtube.com/*
// @match        https://www.y2mate.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=y2mate.com
// @downloadURL  https://raw.githubusercontent.com/joselmm/y2mate/main/y2mate.user.js
// @updateURL    https://raw.githubusercontent.com/joselmm/y2mate/main/y2mate.meta.js
// @grant        none
// ==/UserScript==
direccion=location.href;
if(direccion.match(/download=.+/)){

    downloadMode=location.href.match(/download=.+/)[0].split("=")[1]

}else{
    downloadMode = "nomode"
}

(function() {


    if(location.href.includes('https://www.y2mate.com/youtube-mp3/')){
        function btnFunc(){
            if(document.querySelector('#process_mp3')){
                 clearInterval(btnInt)
                /////////
                createDefaultQualityBTN(document.querySelector('#process_mp3'));
                var audioOptions = document.querySelector("optgroup[label=Audio]").children;
                var videoOptions = document.querySelector("optgroup[label='MP4 video']").children;
                var defaultQuality = "";

                if(downloadMode==="audio"){
                    var defaultQuality = localStorage.getItem("defaultAudioQuality");}
                else if(downloadMode==="video"){
                    var defaultQuality = localStorage.getItem("defaultVideoQuality");
                }if(downloadMode==="nomode"){
                    var defaultQuality = localStorage.getItem("defaultAudioQuality");}

            if(defaultQuality){

                if(downloadMode==="audio"){
                    for(option of audioOptions){
                        if(option.innerText.includes(defaultQuality)){
                            document.querySelector("optgroup[label=Audio]").parentElement.value=option.value
                            document.querySelector('#process_mp3').click()
                        }

                    }
                }
                if(downloadMode==="video"){

                    for(option of videoOptions){
                        if(option.innerText.includes(defaultQuality)){
                            document.querySelector("optgroup[label=Audio]").parentElement.value=option.value
                            document.querySelector('#process_mp3').click()
                        }

                    }
                }
            }




            }
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
        var linkMP3 = document.createElement('a');

        linkMP3.innerHTML = 'MP3';
        linkMP3.href = 'https://www.y2mate.com/youtube-mp3/' + links[i].href.split("=")[1] + "?download=audio";
        linkMP3.target = '_blank';
        redBox.appendChild(linkMP3);
        linkMP3.style.margin="0 10px"
        linkMP3.style.fontSize = (height*(5/7))+'px';

        var linkVIDEO = document.createElement('a');
        linkVIDEO.innerHTML = 'VIDEO';
        linkVIDEO.href = 'https://www.y2mate.com/youtube-mp3/' + links[i].href.split("=")[1]+"?download=video";
        linkVIDEO.target = '_blank';
        redBox.appendChild(linkVIDEO);
        linkVIDEO.style.fontSize = (height*(5/7))+'px';

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
    //creacion del boton de descaragar abajo del video
    var redBox = document.createElement('div');
    titleBoxParent.appendChild(redBox);
    redBox.outerHTML=`<div id="download-watch" style=" border-radius: 5px;display: inline-block;right: 0;position: absolute;">
            <a target="_blank" style="margin: 0 10px;" id="current-video-link-mp3">MP3</a>
            <a target="_blank" id="current-video-link-video">VIDEO</a>
        </div>`
    var aTagMP3= document.querySelector("#current-video-link-mp3");
    var aTagVIDEO= document.querySelector("#current-video-link-video");
    aTagMP3.href="https://www.y2mate.com/youtube-mp3/"+extraerIdDeVideo(location.href)+"?download=audio";
    aTagVIDEO.href="https://www.y2mate.com/youtube-mp3/"+extraerIdDeVideo(location.href)+"?download=video";
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
            <a href="https://www.y2mate.com/youtube-mp3/${extraerIdDeVideo(a.href)}?download=audio" style="margin: 0 10px;" target="_blank" id="current-video-link-mp3">MP3</a>
           <a href="https://www.y2mate.com/youtube-mp3/${extraerIdDeVideo(a.href)}?download=video" target="_blank" id="current-video-link-video">VIDEO</a>
           </div>`

    }
}


})();


function createDefaultQualityBTN(processBTN){
    var parent=processBTN.parentNode;
    defaultQualityBTN = document.createElement('div');
    parent.appendChild(defaultQualityBTN);
    defaultQualityBTN.outerHTML=`<button class="btn btn-danger m-md-1 my-md-0" href="javascript:void(0)" id="set-default-quality-btn">Predeterminar Calidad</button>`
    defaultQualityBTN=document.querySelector("#set-default-quality-btn")
    defaultQualityBTN.onclick=setDefaultAudioQuality;



};

function setDefaultAudioQuality(){

    var actualValorDeOptionSeleccionado = document.querySelector("#videoFormatSelect").value;
    var optionSelected = document.querySelector(`option[value='${actualValorDeOptionSeleccionado}']`);
    if(optionSelected.dataset.ftype=="mp3"){
    var audioQuality=optionSelected.innerText.match(/\d+kbps/)[0];
    localStorage.setItem("defaultAudioQuality", audioQuality);
    var defaultAudioQuality = localStorage.getItem("defaultAudioQuality");
    defaultQualityBTN.innerText="Calidad MP3 - "+defaultAudioQuality

    }
    if(optionSelected.dataset.ftype=="mp4"){
    var videoQuality=optionSelected.innerText.match(/\d+p/)[0];
    localStorage.setItem("defaultVideoQuality", videoQuality);
    var defaultVideoQuality = localStorage.getItem("defaultVideoQuality");
    defaultQualityBTN.innerText="Calidad Video - "+defaultVideoQuality;

    }
    setTimeout(()=>{
        defaultQualityBTN.innerText="Predeterminar Calidad"
    },2500)


}
