//投稿を消す際に出すアラート
function Check(){
    var checked = confirm("Postを削除します");
    if (checked == true) {
        return true;
    } else {
        return false;
    }
}


function ScrollTextarea(){
let textarea = document.getElementById('textarea');
let clientHeight = textarea.clientHeight;
textarea.addEventListener('input', ()=>{
    textarea.style.height = clientHeight + 'px';
    let scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + 'px';
});
}

ScrollTextarea();

function ScrollTextarea1(){
let textarea1 = document.getElementById('textarea1');
let clientHeight1 = textarea1.clientHeight;
textarea1.addEventListener('input', ()=>{
    textarea1.style.height = clientHeight1 + 'px';
    let scrollHeight1 = textarea1.scrollHeight;
    textarea1.style.height = scrollHeight1 + 'px';
});
}

ScrollTextarea1();


//enter key を押した際にtab key のようにカーソルを移動させる
document.getElementById('textarea').onkeydown = (e) => {
    const key = e.keyCode || e.charCode || 13;
    if(key == 13){
        document.getElementById('textarea1').focus();
    }
}

// command + enter でsubmit を可能に
document.onkeydown = pressFunction;
document.onkeyup = releaseFunction;
var keyStatus = {};

function pressFunction(e){
  keyStatus[e.keyCode] = true;
  if(keyStatus[91] && keyStatus[13]) {
    document.getElementById('write-form').submit();
  }
}


// キーが離されたらfalseに
function releaseFunction(e)
{
  keyStatus[e.keyCode] = false;
}
