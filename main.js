let mybgcolor
let mytxcolor
let myf1text
let myf1link
let myf2text
let myf2link
let myf3text
let myf3link
let alermms
let jikan = [585,635,645,695,705,755,1440]
let timer = document.getElementById("timer");
let nowtimer = document.getElementById("nowtimer");
let next = document.getElementById("next");
let alermleft;
let timeLeft;
let timerId;
let nowjikantime;
let isRunning = false;
let music = new Audio("se.mp3");

function startup(){
  mybgcolor = localStorage.getItem("mybgcolor");
  mytxcolor = localStorage.getItem("mytxcolor");
  mystarttime = localStorage.getItem("mystarttime");
  myhourend = localStorage.getItem("myhourend");
  myhourtime = localStorage.getItem("myhourtime");
  myresttime = localStorage.getItem("myresttime");
  mybigresttime = localStorage.getItem("mybigresttime");
  mybigrestpos = localStorage.getItem("mybigrestpos");
  if(mybgcolor === null){
    localStorage.setItem('mybgcolor',"#0000aa");
    mybgcolor = localStorage.getItem("mybgcolor");
  }
  if(mytxcolor === null){
    localStorage.setItem('mytxcolor',"#eeeeee");
    mytxcolor = localStorage.getItem("mytxcolor");
  }
  if(mystarttime === null){
    localStorage.setItem("mystarttime","09:45");
    mystarttime = localStorage.getItem("mystarttime");
  }
  if(myhourend === null){
    localStorage.setItem('myhourend',"6");
    myhourend = localStorage.getItem("myhourend");
  }
  if(myhourtime === null){
    localStorage.setItem("myhourtime","50");
    myhourtime = localStorage.getItem("myhourtime");
  }
  if(myresttime === null){
    localStorage.setItem("myresttime","10");
    myresttime = localStorage.getItem("myresttime");
  }
  if(mybigresttime === null){
    localStorage.setItem("mybigresttime","40");
    mybigresttime = localStorage.getItem("mybigresttime");
  }
  if(mybigrestpos === null){
    localStorage.setItem("mybigrestpos","13");
    mybigrestpos = localStorage.getItem("mybigrestpos");
  }
  document.getElementById("bg").value=mybgcolor;
  document.getElementById("tx").value=mytxcolor;
  document.getElementById("container").style.backgroundColor=mybgcolor;
  document.getElementById("container").style.color=mytxcolor;
  document.getElementById("starttime").value=mystarttime;
  document.getElementById("hourend").value=myhourend;
  document.getElementById("hourtime").value=myhourtime;
  document.getElementById("resttime").value=myresttime;
  document.getElementById("bigresttime").value=mybigresttime;
  document.getElementById("bigrestpos").value=mybigrestpos;
  starttimes=mystarttime.split(":");
  jikanwari()
}

startup();

function updateTimer(m) {
  let d = new Date(); //現在時刻
  let s = 59 - d.getSeconds();
  s = ("0" + s).slice(-2);
  timer.textContent = m + "分" + s + "秒"; //表示される文字列を設定
}

window.onload = function countDown() {
  timerId = setTimeout(function () {
    let nowid = 0;
    let nd = new Date();
    let nh = nd.getHours();
    let nm = nd.getMinutes();
    let ns = nd.getSeconds();
    let endtime;
    let nowtime = nh * 60 + nm;
    nh = ("0" + nh).slice(-2); //「０」が表示される桁を設定
    nm = ("0" + nm).slice(-2);
    ns = ("0" + ns).slice(-2);
    nowtimer.textContent = nh + ":" + nm + ":" + ns;
    for (let i = 0; i <= jikan.length; i++) {
      endtime = jikan[i] - 1;
      if (endtime >= nowtime) {
        nowid = i;
        break;
      }
    }
    if(nowid % 2 ==0){
      next.textContent = Math.floor(nowid/2+1)+"限開始まであと";
    }else{
      next.textContent = Math.floor(nowid/2+1)+"限終了まであと";
    }
    timeLeft = jikan[nowid] - nowtime - 1;
    updateTimer(timeLeft);
    if (ns == 59 && timeLeft == 0) {
      music.play(); // 再生
    }
    if(timeLeft<0){
      next.textContent="本日の授業は"
      timer.textContent="終了しました"
    }
    countDown();
  }, 300);
};

function bgcolor() {
  document.getElementById(
    "container"
  ).style.backgroundColor = document.getElementById("bg").value;
  mybgcolor = document.getElementById("bg").value
  localStorage.setItem('mybgcolor',mybgcolor);
}

function txcolor() {
  document.getElementById("container").style.color = document.getElementById(
    "tx"
  ).value;
  mytxcolor = document.getElementById("tx").value
  localStorage.setItem('mytxcolor', mytxcolor);
}
function jikanwari(){
  jikan=[]
  mystarttime=document.getElementById("starttime").value
  myhourend=document.getElementById("hourend").value
  myhourtime=document.getElementById("hourtime").value
  myresttime=document.getElementById("resttime").value
  mybigresttime=document.getElementById("bigresttime").value
  mybigrestpos=document.getElementById("bigrestpos").value
  mystartvalue=mystarttime.split(":")
  allstarttime=parseInt(mystartvalue[0])*60+parseInt(mystartvalue[1])
  jikan.push(parseInt(allstarttime))
  document.getElementById("gen").innerHTML="時間割<br>"
  nowjikantime=allstarttime;
  for(let i=1;i<=myhourend;i++){
    if(i!=1){
      if(i==parseInt(mybigrestpos)+1){
        jikan.push(parseInt(nowjikantime)+parseInt(mybigresttime));
      }else{
        jikan.push(parseInt(nowjikantime)+parseInt(myresttime));
      }
      nowjikantime=jikan[jikan.length-1]
    }
    jikan.push(parseInt(nowjikantime)+parseInt(myhourtime));
    nowjikantime=jikan[jikan.length-1]
    console.log(jikan)
    document.getElementById("gen").innerHTML+=+i+"限 "+("0"+Math.floor(jikan[jikan.length-2]/60)).slice(-2)+":"+(("0" + jikan[jikan.length-2]%60).slice(-2))+"~"+("0"+Math.floor(jikan[jikan.length-1]/60)).slice(-2)+":"+(("0" + jikan[jikan.length-1]%60).slice(-2))+"<br>";
  }
  allendtime=("0"+Math.round(jikan[jikan.length-1]/60)).slice(-2)+":"+(("0" + jikan[jikan.length-1]%60).slice(-2));
  document.getElementById("allend").textContent="(終了　"+allendtime+")"
  localStorage.setItem("mystarttime",mystarttime);
  localStorage.setItem('myhourend',myhourend);
  localStorage.setItem("myhourtime",myhourtime);
  localStorage.setItem("myresttime",myresttime);
  localStorage.setItem("mybigresttime",mybigresttime);
  localStorage.setItem("mybigrestpos",mybigrestpos); 
}