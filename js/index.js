const audioContainer = document.querySelector("#audioContainer"); //html에서 audio태그
const playBtn = document.querySelector(".playBtn"); //playBtn 버튼
const stopBtn = document.querySelector(".stopBtn"); //stopBtn 버튼
const PrevBtn = document.querySelector(".PrevBtn"); //Btn버튼
const nextBtn = document.querySelector(".NextBtn"); //nextBtn버튼
let musicTitle = document.querySelector(".music_title em"); //
let textWrap = ["Troye Sivan - Wild","Martin - Wicked Wonderland","Nightcore - Good Time"]; //음악 제목
let audioSlider = document.querySelector("#audio_slider");
let audioValue = document.querySelector("#audio_value");


const MUSIC_COUNT = 3; //총 음악/이미지 갯수

let currentAudio = 1; //현재 음악/이미지

/* 오디오 볼륨 조절 */
audioValue.innerHTML = audioSlider.value;
audioSlider.oninput = function(){
    audioValue.innerHTML = this.value;
    audioContainer.volume = audioSlider.value / 100;
};
/* 볼륨바 색상 */
audioSlider.addEventListener("mousemove",function(){
    let x = audioSlider.value;
    let color = "linear-gradient(90deg, rgb(102,126,234)" + x + "%,rgb(214,214,214)" + x + "%)";
    audioSlider.style.background = color;
});

/* playBtn 함수 */
function playAudio(){ //playBtn을 누르면 loadAudio(1)함수가 실행되고 playAudio(2)가 실행됨
    // audioContainer.volume = slider.value / 100; //볼륨은 0~1 까지 설정
    audioContainer.loop = true; //true면 반복재생
    audioContainer.play(); //플레이 시작
};
function loadAudio(){ //플레이 버튼 클릭시 실행 함수
    const source = document.querySelector("#audioSource"); //음악 id
    const musicImg = document.querySelector(".music_img"); //이미지 class
    
    source.src = `audio/${currentAudio}.mp3`; //변수명currentAudio가 1이니 1번 음악 실행
    musicImg.src = `img/${currentAudio}.jpg`; //변수명currentAudio가 1이니 1번 이미지 실행
    audioContainer.load(); //로드로 불러옴
    playAudio(); //playAudio함수 실행
    playBtn.classList.add("active");
    stopBtn.classList.add("active");
    
    musicTitle.innerText = textWrap[currentAudio - 1]; //음악 title은 배열에 저장한값을 불러옴.배열은 갯수는 0부터 시작이기때문에 currentAudio -1을 해줌
};

/* nextBtn 함수 */
function NextBtnClick(){
    if(currentAudio < MUSIC_COUNT){
        currentAudio += 1;
        
    }else{
        currentAudio = 1;
    }
    audioContainer.pause();
    loadAudio();
};

/* PrevBtn 함수 */
function PrevBtnClick(){
    if(currentAudio <= MUSIC_COUNT){
        currentAudio -= 1;
        if(currentAudio == 0){
            currentAudio = MUSIC_COUNT;
        }
    }
    audioContainer.pause();
    loadAudio();
};

/* stop함수 */
function stopAudio(){
    audioContainer.pause();
    playBtn.classList.remove("active");
    stopBtn.classList.remove("active");
};

playBtn.addEventListener("click",loadAudio);
nextBtn.addEventListener("click",NextBtnClick);
PrevBtn.addEventListener("click",PrevBtnClick);
stopBtn.addEventListener("click",stopAudio);