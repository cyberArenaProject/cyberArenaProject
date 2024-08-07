// callApi 함수 정의
const callApi = async (url, method = 'GET', payload = null) => {
    const requestInfo = {
        method,
    };

    if (payload) {
        requestInfo.headers = { 'content-type': 'application/json' };
        requestInfo.body = JSON.stringify(payload);
    }

    const res = await fetch(url, requestInfo);

    if (res.status === 403) {
        alert('접근 권한이 없습니다.');
        return null;
    }

    return await res.json();
};

// fetchMedia 함수 정의
const fetchMedia = async (url) => {
    const mediaResponse = await callApi(url);
    return mediaResponse;
};

// category 정의 함수
function getCategory(categoryNo) {
    switch (categoryNo) {
        case 1:
            return "영화"
            break;
        case 2:
            return "시리즈"
            break;
        case 3:
            return "도서"
            break;
        default: 0;
    }
}


// renderReplies 함수 정의
const renderReplies = (mediaResponse) => {
    let tag = '';

    if (!mediaResponse || mediaResponse.length === 0) {
        tag = `<div class="empty-list">검색 결과가 없습니다.</div>`;
    } else {
        tag += `<div class="click">토론을 원하시는<br> 미디어, 작품을 클릭!</div>`
        mediaResponse.forEach(media => {
            tag += `
                 <div class="modal-right-wrap" onclick="selectMedia('${media.mediaTitle}')">
                    <div class="modal-media-left">
                        <div class="modal-media-wrap">
                            <img src="${media.imageUrl || 'default-image.png'}" alt="이미지">
                        </div>
                    </div>
                    <div class="modal-media-right">
                        <div class="modal-media-title"><h2>${media.mediaTitle || '제목 없음'}</h2></div>
                        <div class="modal-media-category">
                        ${getCategory(media.categoryNo)}
                        </div>
                        <div class="modal-media-rating">평점: ${media.rating || 0}</div>
                    </div>
                </div>
                <hr class="line">
            `;
        });
    }



    const $fetchWrap = document.querySelector('.fetch-wrap');
    $fetchWrap.innerHTML = tag;


    $fetchWrap.addEventListener("click", e => {
        const $mediaInput = document.getElementById('media')
        $fetchWrap.style.display = 'none';
        $fetchWrap.innerHTML = "";

        // $mediaInput.style.backgroundColor = "#E7F0FE"
    })
};

// 미디어 선택 함수 정의
const selectMedia = (mediaTitle) => {
    console.log(mediaTitle)
    document.querySelector('input[name="mediaName"]').value = mediaTitle;
};

// 디바운스 함수 정의
const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
};

// 이벤트 리스너 추가
const handleInput = async (event) => {
    const searchQuery = event.target.value;
    if (searchQuery.trim() === '') {
        document.querySelector('.fetch-wrap').innerHTML = '<div class="empty-list">검색 결과가 없습니다.</div>';
        return;
    }
    const encodedQuery = encodeURIComponent(searchQuery);

    // URL에 쿼리 파라미터 추가
    const url = `http://localhost:8989/api/v1/media/mediaList/${encodedQuery}`;

    // 서버로 fetch 요청 보내기
    const mediaResponse = await fetchMedia(url);

    // 응답 데이터 렌더링
    renderReplies(mediaResponse);
};

const debouncedHandleInput = debounce(handleInput, 300);

document.getElementById('searchMediaInput').addEventListener('input', debouncedHandleInput);

// 글로벌 함수로 selectMedia를 정의하여 onclick 속성에서 사용할 수 있도록 함
window.selectMedia = selectMedia;

