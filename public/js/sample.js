//writeページにアクセスした際にフォーカスをtextareaに合わせる。
// document.getElementById('textarea').focus();


//textareaに文字を入力した際に横幅いっぱいになると自動で改行する。
// let textarea = document.getElementById('textarea');
// let clientHeight = textarea.clientHeight;
// textarea.addEventListener('input', ()=>{
//     textarea.style.height = clientHeight + 'px';
//     let scrollHeight = textarea.scrollHeight;
//     textarea.style.height = scrollHeight + 'px';
// });

// let textarea1 = document.getElementById('textarea1');
// let clientHeight1 = textarea1.clientHeight;
// textarea1.addEventListener('input', ()=>{
//     textarea1.style.height = clientHeight1 + 'px';
//     let scrollHeight1 = textarea1.scrollHeight;
//     textarea1.style.height = scrollHeight1 + 'px';
// });

// //title 画面でenter　key を取得した際にキキーコード取得 => enter => focusを article 画面へ
// document.getElementById('textarea').onkeydown = (e) => {
//     const key = e.keyCode || e.charCode || 13;
//     if(key == 13){
//         document.getElementById('textarea1').focus();
//     }
// }




// command + enter でsubmit を可能に
// 後から気づいたけど、キーコードググるよりも
// console.log(e.Keycode);
// で出した方が楽だったかも


document.onkeydown = pressFunction;
document.onkeyup = releaseFunction;
var keyStatus = {};

function pressFunction(e){
  if(e.keyCode == 91)  
    console.log('⌘');   //⌘が押されたか確認

  if (e.keyCode == 13)  
  {
    console.log('Enter'); //Enterが押されたか確認
  }

  keyStatus[e.keyCode] = true; // キーコードをtrueに
  if(keyStatus[91] && keyStatus[13]) {
    console.log('⌘+Enter'); 
    document.getElementById('write-form').submit();
  }
}


// キーが離されたらfalseに
function releaseFunction(e)
{
  keyStatus[e.keyCode] = false;
}

// var btn = document.getElementById('close');
// btn.addEventListener('click', function(){
//     const result = window.confirm('削除しますか？');

//     if(result){
//         console.log('egu'); 
//     }else{
//         return false;
//     }
   
// })

function Check(){
    var checked = confirm("削除します");
    if (checked == true) {
        return true;
    } else {
        return false;
    }
}