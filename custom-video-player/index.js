console.log('Самооценка:\nРеализован проект с базовой(+10) и обязательной дополнительной функциональностью(+10), помимо этого на панель управления была добавлена информация о текущем времени воспроизведения видео и его продолжительности(+3)\nПеремотка видео вперед/назад на 5 секунд осуществляется при помощи кнопок, расположенных по бокам от кнопки play/pause\nОтметка:22/30\nПроект еще дорабатывается');
let video=document.querySelector('.current-video__viewer');
let playButton=document.querySelector('.controls__play-sm-button');
let volumeButton=document.querySelector('.controls__volume-button');
let fullscreenButton=document.querySelector('.controls__fullscreen-button');
let videoDurationProgress=document.querySelector('.controls__duration');
let videoDurationTime=document.querySelector('.time__duration');
let videoCurrentTime=document.querySelector('.time__current-time');
let videoVolumeProgress=document.querySelector('.controls__volume');
let backButton=document.querySelector('.controls__previous-button');
let nextButton=document.querySelector('.controls__next-button');
let volumeValue=video.volume;


video.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',videoTime);
playButton.addEventListener('click',togglePlay);
fullscreenButton.addEventListener('click',toggleFullscreen);
window.addEventListener('keydown', keyHandler);
videoDurationProgress.addEventListener('input', videoTime);
videoVolumeProgress.addEventListener('input',editProgressBar);
volumeButton.addEventListener('click',toggleMute);
backButton.addEventListener('click',function(e){skipFragment(e,-5);});
nextButton.addEventListener('click',function(e){skipFragment(e,5);});
video.addEventListener('loadedmetadata',function(){
    videoDurationTime.innerHTML=setTime(video.duration);
    video.volume=0.5;
});

function skipFragment(e,value){
    video.currentTime+=value;
    videoTime();
}

function togglePlay(){
    let status=video.paused? 'play' : 'pause';
    video[status]();
    playButton.classList.toggle('pause');
    playButton.classList.toggle('play');
}

function toggleFullscreen(e){
    console.log(video.fullscreenEnabled);
    video.webkitRequestFullScreen();
    if(video.fullscreenEnabled) openFullscreen();
    else closeFullscreen();
}

function openFullscreen(){
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.mozRequestFullScreen) elem.mozRequestFullScreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();
}

function closeFullscreen(){
    if (video.exitFullscreen) video.exitFullscreen(); 
    else if (video.mozCancelFullScreen) video.mozCancelFullScreen();
    else if (video.webkitExitFullscreen) video.webkitExitFullscreen();
    else if (video.msExitFullscreen) video.msExitFullscreen();
}

function editPlaybackRate(value){
    let char=String(value)[0];
    if(char=='-' && video.playbackRate>=0.5 || char=='0' && video.playbackRate<=1.75 ) video.playbackRate+=eval(value);
}

function keyHandler(e){
    if(e.keyCode==70) toggleFullscreen();
    else if(e.keyCode==32) togglePlay();
    else if(e.key=='<') editPlaybackRate(-0.25);
    else if(e.key=='>') editPlaybackRate(0.25);
    else if (e.keyCode==77) toggleMute();
}

function videoTime(e){
    if(e!==undefined){
     let value=e.currentTarget.value;
     if(value!=null)  video.currentTime=parseFloat(value*video.duration);
     if(e.type=='input' && video.paused) togglePlay();
    }
    videoCurrentTime.innerHTML=setTime(video.currentTime);
    let videoProgress=video.currentTime/ video.duration;
    editProgressBar(videoDurationProgress,videoProgress);
    if(video.ended ) {
    playButton.classList.remove('play');
    playButton.classList.add('pause');
    }
}

function editProgressBar(progressBar,value){
    progressBar.value=value;
    if(progressBar.target) {
        video.volume=progressBar.currentTarget.value;
        editVolumeProgressBar();
    }
    fillProgressBar(progressBar);
}

function toggleMute(){
    volumeButton.classList.toggle('mute');
    volumeButton.classList.toggle('sound');
    if(volumeButton.classList.contains('mute')){
        volumeValue=video.volume;
        video.volume=0;
    }
    else video.volume=volumeValue;
    editProgressBar(videoVolumeProgress,video.volume);
}

function editVolumeProgressBar(){
    if(video.volume==0) {
        volumeButton.classList.remove('sound')
        volumeButton.classList.add('mute');
    }
    else {
        volumeButton.classList.remove('mute')
        volumeButton.classList.add('sound');
    }
}

function setTime(time){
    let mins=Math.floor(time/60);
    let secs=Math.floor(time-mins*60);
    if(secs<10)secs='0'+secs;
    return mins+':'+secs;
}

function fillProgressBar(progressBar){
    if(progressBar.type=='input') progressBar=progressBar.currentTarget;
    const value= progressBar.value*100;
    progressBar.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}




