const $finishBtn = document.getElementById('finish');
const $title = document.getElementById('title');
const $offer = document.getElementById('detail');
const $media = document.getElementById('media');
const $modalWrap = document.querySelector('.modal-wrap');
const $replySubmitBtn = document.getElementById('submitComment');
const $replyTextArea = document.getElementById('reply-textarea');

let isExist = false; // 댓글 등록창에 값이 있냐 없냐

// const validate = [$title, $offer];
// let isValidate = [false, false];

$replySubmitBtn.style.pointerEvents = "none";
$replySubmitBtn.style.backgroundColor = "lightgray";


for(let i = 0; i < 1; i++) {
    $replyTextArea.addEventListener('keyup', e => {

        if ($replyTextArea.value.trim().length > 0) {
            isExist = true;
        } else {
            isExist = false;
        }

        if (isExist && $replyTextArea.value.length > 3) {

            $replySubmitBtn.style.animation = "vivid-btn 0.7s"
            $replySubmitBtn.style.animationFillMode = "forwards"
            $replySubmitBtn.style.pointerEvents = "auto"

        } else {

            $replySubmitBtn.style.pointerEvents = 'none'
            $replySubmitBtn.style.backgroundColor = "lightgray";
            $replySubmitBtn.style.animation = '';
            $replyTextArea.preventDefault();
        }
    })
}

$replySubmitBtn.addEventListener('click', e => {
    $replySubmitBtn.style.backgroundColor = "#D3D3D3"
    $replySubmitBtn.style.animation = '';
})




const $modify = document.getElementById('modify');

const $backdrop = document.getElementById('backdrop')


$modify.addEventListener('click', e =>  {

        console.log("modal ", $modalWrap)

        $modalWrap.style.display = 'flex'
        console.log('removed modal, ', $modalWrap)
        $backdrop.classList.remove('none');

});
// });


// 입력값 상호작용

const $modalInput = document.querySelector('.modal-input');

$title.addEventListener('keyup', e => {
    if ($title.value !== '') {
        $title.style.backgroundColor = "#E7F0FE";
    } else {
        $title.style.backgroundColor = "white";
    }
});

$offer.addEventListener('keyup', e => {
    if ($offer.value !== '') {
        $offer.style.backgroundColor = "#E7F0FE";
    } else {
        $offer.style.backgroundColor = "white";
    }
});


// 0626 에러나서 일단 주석처리
// $modalInput.addEventListener('keydown', e => {
//     if ($modalInput.value !== '') {
//         $modalInput.style.backgroundColor = "#E7F0FE";
//     } else {
//         $modalInput.style.backgroundColor = "white";
//     }
// })



