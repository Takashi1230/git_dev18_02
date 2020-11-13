/*
 * じゃんけんの手
 * 0: グー
 * 1: チョキ
 * 2: パー
 * として処理する
 */
hand = new Array("rock.png","scissors.png","paper.png");
let resultArray =[];
let statisticsArray=[];
//勝利回数と試行回数
let winRate;
let jankenCount;
//無敵フラグ
let invincibleFlag=0;

let simNum;
let speechResult;

function rsp(playerSelect) {
    let result;
    let playerSelectHand;
    let comSelectHand;
    let resultString;
    let random = Math.random();
    let comSelect = Math.floor(random * 3);
    let historyMsg;

    // console.log("YOU:"+playerSelect);
    // console.log("COM:"+comSelect);
    if(invincibleFlag==1){
        if(playerSelect==0){
            comSelect = 1;
        }else if(playerSelect==1){
            comSelect = 2;
        }else{
            comSelect = 0;
        }
    }else if(invincibleFlag==2){
        if(playerSelect==0){
            comSelect = 2;
        }else if(playerSelect==1){
            comSelect = 0;
        }else{
            comSelect = 1;
        }
    }
	document.getElementById("ahand").innerHTML = "<img src='img/" + hand[playerSelect] + "'>";
	document.getElementById("bhand").innerHTML = "<img src='img/" + hand[comSelect] + "'>";

    /*
     * プレーヤーの勝ち負け(result)は以下
     * 0: 負け
     * 1: 勝ち
     * 2: あいこ
     */

    if (playerSelect == comSelect) {
        // 一緒だったらあいこ
        result = 2;
    } else {
        // 違うので条件によって勝敗を振り分ける
        if (playerSelect == 0) {
            // プレイヤーはグー
            if (comSelect == 1) {
                // コンピューターはチョキ
                result = 1;
            } else {
                // コンピューターはパー
                result = 0;
            }
        } else if (playerSelect == 1) {
            // プレイヤーはチョキ
            if (comSelect == 0) {
                // コンピューターはグー
                result = 0;
            } else {
                // コンピューターはパー
                result = 1;
            }
        } else {
            // プレイヤーはパー
            if (comSelect == 0) {
                // コンピューターはグー
                result = 1;
            } else {
                // コンピューターはチョキ
                result = 0;
            }
        }
    }
    // console.log("Result:"+result);

    if (playerSelect == 0) {
        playerSelectHand = 'グー';
    } else if (playerSelect == 1) {
        playerSelectHand = 'チョキ';
    } else {
        playerSelectHand = 'パー';
    }

    if (comSelect == 0) {
        comSelectHand = 'グー';
    } else if (comSelect == 1) {
        comSelectHand = 'チョキ';
    } else {
        comSelectHand = 'パー';
    }

    if (result == 0) {
        resultString = '負け';
    } else if (result == 1) {
        resultString = '勝ち';
    } else {
        resultString = 'あいこ';
    }

    document.getElementById('player').innerHTML = 'あなたは ' + playerSelectHand;
    document.getElementById('computer').innerHTML =
        'コンピューターは ' + comSelectHand;
    document.getElementById('resultMsg').innerHTML = '結果は ' + resultString + '<br><br>';
    
    //結果を配列に追加
    resultArray.push(resultString);
    for(let i=0; i < resultArray.length; i++){
        historyMsg = (i+1) + '回目の結果：'+ resultArray[i] +'<br>';

        // console.log(resultArray[i]);
    }
    document.getElementById('history').innerHTML += historyMsg;
    //勝ち数初期化
    num = 0;
    //勝ち数を計算
    for(let i=0; i<resultArray.length; i++){
        if(resultArray[i] == '勝ち'){
            // console.log(resultArray[i] == '勝ち');
            num++;
        }
    }
    // console.log('num:'+num);
    // console.log('length:'+resultArray.length);
    jankenCount = resultArray.length;
    winRate = Math.floor(100 * num/jankenCount);

    document.getElementById('winrate').innerHTML = '勝率は' + winRate + '%';

}
function sim(simNum = 10){
    //入力欄に数字が入ってたらその回数を使用する
    if(document.getElementById('number1').value != ""){
        simNum = document.getElementById('number1').value;
        document.getElementById('result').innerHTML = simNum +"回のシミュレーション実施中";
    }
    //音声入力の数字があればそちら優先
    if(isFinite(speechResult)){
        simNum = Number(speechResult);
        speechResult = "初期化"; 
        console.log("speechResult:"+speechResult);
    }
    console.log("simulation:"+simNum);
    //配列と履歴を初期化
    resultArray=[];
    document.getElementById('history').innerHTML = "";

    //連想配列を初期化
    for(let j=0; j<simNum; j++){
        statisticsArray[j]=[];
    }
    //入力された回数分じゃんけんを実施
    for(let j=0; j<simNum; j++){
        rsp(Math.floor(Math.random()*3));
        //試行回数と勝率を連想配列に登録→これをもとに散布図を描画したかったのですがうまくいかず・・・
        statisticsArray[j]=[jankenCount, winRate];
        console.log(statisticsArray[j]);
    }


}

//じゃんけんの結果削除
function reset(){
    document.getElementById('history').innerHTML = "";
    document.getElementById('winrate').innerHTML = "";
    document.getElementById("ahand").innerHTML = "";
    document.getElementById("bhand").innerHTML = ""
    document.getElementById("computer").innerHTML = "";
    document.getElementById("player").innerHTML = "";
    document.getElementById("resultMsg").innerHTML = "";
    document.getElementById('number1').value = "";
    document.getElementById('result').innerHTML = "";
    resultArray=[];
    invincibleFlag = 0;
}
//？を押下すると音声認識に突入。
//無敵モード/へなちょこモード
//数字を言うと認識した回数分シミュレーション
//リセットでreset関数呼び出し
//ダウンロードで試行回数と勝率の変化をCSVでダウンロード
function invincible(){
    let button = document.getElementById('button');
    let speech = new webkitSpeechRecognition();
    let result = document.getElementById('result');


    speech.start();
    result.innerHTML = '音声入力を受け付けています、、、、'
    speech.onresult = function (e) {
        speech.stop();      
        if (e.results[0].isFinal) {
            speechResult = e.results[0][0].transcript;
            if(speechResult == "接待モード"){
                invincibleFlag = 1;
                result.innerHTML = "接待モード中";
            }else if(speechResult == "へなちょこモード"){
                invincibleFlag = 2;
                result.innerHTML = "へなちょこモード中";
            }else if(isFinite(speechResult)){
                result.innerHTML = "数値認識:"+speechResult+"回のシミュレーション実施中"; //数値認識の場合は音声をNumberに
                sim(Number(speechResult));
                
            }else if(speechResult == "リセット"){
                reset();
            }else if(speechResult == "ダウンロード"){
                download(); //試行結果のCSVダウンロード
            }else{
                result.innerHTML = e.results[0][0].transcript;
            }
      
    }
  }

}
//試行回数と勝率をCSV抽出
function download(){
    let csvContent = "data:text/csv;charset=utf-8,"
     + statisticsArray.map(a => a.join(',')).join('\n');
    console.log(csvContent);
    var encodedUri = encodeURI(csvContent);
    let link = document.createElement('a');
    link.setAttribute("href", encodedUri);

    let today = new Date();
    let todayDate = today.getFullYear() + ('0'+(today.getMonth()+1)).slice(-2)+ ('0'+today.getDate()).slice(-2);
    link.setAttribute("download", 'ジャンケン結果_'+todayDate+'.csv');
    document.body.appendChild(link); // Required for FF
    
    link.click(); // This will download the data file.

}

$('.lang-select').click(function() {
    var lang = $(this).attr('data-lang');
    window.location = $(this).attr('href');
    window.location.reload();
  });

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'ja', 
      layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT
    }, 'google_translate_element');
  }