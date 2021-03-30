document.getElementById('textarea1').focus();


let textarea1 = document.getElementById('textarea1');
let clientHeight1 = textarea1.clientHeight;
textarea1.addEventListener('input', ()=>{
    textarea1.style.height = clientHeight1 + 'px';
    let scrollHeight1 = textarea1.scrollHeight;
    textarea1.style.height = scrollHeight1 + 'px';
});





let textarea = document.getElementById('textarea');
let clientHeight = textarea.clientHeight;
textarea.addEventListener('input', ()=>{
    textarea.style.height = clientHeight + 'px';
    let scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + 'px';
});
