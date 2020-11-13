// jsを記述する際はここに記載していく
console.log("はじめてのジャバスクリプト");
// 演習2
console.log(23 + 5);
console.log(2000 - 1800);
console.log("18+5");
// var test = "テストの文字列を入れてみます";
// console.log(test); //テストの文字列を入れてみます　が表示されます
// 演習3
var name = "もりた";
console.log(name);
// if (name == "おおほり") {
//   // 処理を書きます
//   console.log("正しいです！");
// } else {
//   // 処理を書きます
//   console.log("間違っています!");
// }
// if (janken == "グー") {
//   console.log("グーです");
// } else if (janken == "チョキ") {
//   console.log("チョキです");
// } else if (janken == "パー") {
//   console.log("パーです");
// }
// 素晴らしい!おめでとう!」と表示させる それ以外の場合は「もっと頑張りましょう!」と表示
// 演習４
var point = 50;
if (point >= 80) {
  console.log("素晴らしい!おめでとう!");
} else {
  console.log("もっと頑張りましょう!");
}
// 箱の中身を確認します
// 0 ~ 4までの数字が出ます
$(function () {
  // この中に書いていく
  $(".button").on("click", function () {

  var random = Math.floor(Math.random() * 5);
    console.log(random, "便利な機能を使ってランダムな数字が出ます");
    if (random == 0) {
      // 0の時に実行したいことをかく
      console.log("大吉");
      $(".kekka").html("大吉");
    } else if (random == 1) {
      // 1の時に実行したいことをかく
      console.log("中吉");
      $(".kekka").html("中吉");
    } else if (random == 2) {
      // 2の時に実行したいことをかく
      console.log("小吉");
      $(".kekka").html("小吉");
    } else if (random == 3) {
      console.log("吉");
      $(".kekka").html("吉");
    } else if (random == 4) {
      console.log("末");
      $(".kekka").html("末");
    }
    // 下は消しちゃダメ
    
    // この下は消さない
  });


});