//writeページにアクセスした際にフォーカスをtextareaに合わせる。
document.getElementById('textarea').focus();


//textareaに文字を入力した際に横幅いっぱいになると自動で改行する。
let textarea = document.getElementById('textarea');
let clientHeight = textarea.clientHeight;
textarea.addEventListener('input', ()=>{
    textarea.style.height = clientHeight + 'px';
    let scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + 'px';
});

let textarea1 = document.getElementById('textarea1');
let clientHeight1 = textarea1.clientHeight;
textarea1.addEventListener('input', ()=>{
    textarea1.style.height = clientHeight1 + 'px';
    let scrollHeight1 = textarea1.scrollHeight;
    textarea1.style.height = scrollHeight1 + 'px';
});

//title 画面でenter　key を取得した際にキキーコード取得 => enter => focusを article 画面へ
document.getElementById('textarea').onkeypress = (e) => {
    const key = e.keyCode || e.charCode || 13;
    if(key == 13){
        document.getElementById('textarea1').focus();
    }
}