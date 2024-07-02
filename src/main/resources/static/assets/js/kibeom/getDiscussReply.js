document.addEventListener('DOMContentLoaded', function () {
    const discussionNo = document.querySelector('input[name="discussionNo"]').value;
    const commentsContainer = document.getElementById('comments');
    const submitCommentButton = document.getElementById('submitComment');
    const commentForm = document.getElementById('commentForm');

    async function fetchComments() {
        try {
            const response = await fetch(`/api/v1/discuss/reply/${discussionNo}`);
            if (!response.ok) throw new Error('댓글을 불러오는데 실패했습니다.');
            const {dtoList, loginUserDto} = await response.json();
            renderComments(dtoList, loginUserDto);
        } catch (error) {
            console.error(error);
        }
    }

    async function submitComment() {
        const formData = new FormData(commentForm);
        const data = {
            discussionNo: formData.get('discussionNo'),
            email: formData.get('email'),
            discussionReplyContent: formData.get('discussionReplyContent')
        };

        try {
            const response = await fetch('/api/v1/discuss/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                await fetchComments(); // 전체 댓글 다시 불러오기
                commentForm.reset();
            } else {
                console.error('Error submitting comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    }

    function renderComments(comments, loginUserDto) {
        commentsContainer.innerHTML = '';
        if (comments.length === 0) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment-card');
            let tag = `<div>댓글이 없습니다.</div>`
            commentElement.innerHTML = tag;
            commentsContainer.appendChild(commentElement);
        } else {
            comments.forEach(comment => {
                addCommentToDOM(comment, loginUserDto);
            });
        }
    }

    function addCommentToDOM(comment, loginUserDto) {
        const oldDate = new Date(comment.discussionReplyCreatedAt);
        const newDate = new Date(comment.discussionReplyUpdatedAt);

        const commentElement = document.createElement('div');
        commentElement.classList.add('comment-card');
        let tag;

        if (loginUserDto.nickname === comment.nickname) {
            // 내가 쓴 댓글
            tag = `
            <div class="comment-header self" data-replyNo="${comment.discussionReplyNo}">
                <span class="comment-nickname" id="my-nickname">${comment.nickname || comment.email}</span> `;

            if (oldDate.getTime() + 1000 < newDate.getTime()) { // 내가 쓴 글이 수정됐을 때
                tag += `
                        <br>
                        <span class="comment-date" id="my-date">*수정됨*&nbsp;&nbsp; ${oldDate.toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</span>
                    </div>`;
            } else { // 내가 쓴 글이 수정되지 않았을 때
                tag += `
                        <br>
                        <span class="comment-date" id="my-date">${oldDate.toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</span>
                    </div>`;
            }

            tag += `
            <div class="comment-body self" id="my-content">
                <p class="reply-comment">${comment.discussionReplyContent}</p>
            </div>
            <div id="modify-delete-btn">

                    <a class="deleteBtn" data-rno="${comment.discussionReplyNo}" 
                    onclick="window.location.href='/discussion/reply/remove?rno=' + ${comment.discussionReplyNo} + '&&dno=' + ${comment.discussionNo}">삭제</a>

                    <a class="modifyBtn" data-rno="${comment.discussionReplyNo}" data-email="${comment.email}">수정</a>

            </div>`;
        } else {
            // 남이 쓴 댓글
            tag = `
            <div class="comment-header" data-replyNo="${comment.discussionReplyNo}">
                <span class="comment-nickname">${comment.nickname || comment.email}</span> `;

            if (oldDate.getTime() + 1000 < newDate.getTime()) { // 남이 쓴 글이 수정됐을 때
                tag += `
                        <br>
                        <span class="comment-date">${oldDate.toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}&nbsp;&nbsp;*수정됨*</span>
                    </div>`;
            } else { // 남이 쓴 글이 수정되지 않았을 때
                tag += `
                        <br>
                        <span class="comment-date">${oldDate.toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</span>
                    </div>`;
            }

            tag += `
            <div class="comment-body">
                <p class="reply-comment">${comment.discussionReplyContent}</p>
            </div>`;
        }

        commentElement.innerHTML = tag;

        commentsContainer.appendChild(commentElement);
    }

    fetchComments();
    submitCommentButton.addEventListener('click', submitComment);




    // 댓글 수정 기능 추가
    commentsContainer.addEventListener('click', e => {
        if (e.target.matches('.modifyBtn')) {
            const $parentNode = e.target.closest('.comment-card');
            const $modifyBtn = e.target;
            const $delBtn = $parentNode.querySelector('.deleteBtn');
            const $commentBody = $parentNode.querySelector('.comment-body');
            const $oldP = $commentBody.querySelector('.reply-comment');
            const originalText = $oldP.textContent;

            const $newInput = document.createElement('textarea');
            $newInput.value = originalText;
            $newInput.classList.add('modify-input');

            $commentBody.innerHTML = '';
            $commentBody.appendChild($newInput);

            $modifyBtn.textContent = '완료';
            $delBtn.textContent = '취소';
            $delBtn.setAttribute("onclick", '')

            $modifyBtn.classList.add('saveBtn');
            $delBtn.classList.add('cancelBtn');
            $modifyBtn.classList.remove('modifyBtn');
            $delBtn.classList.remove('deleteBtn');

            // 완료 버튼 클릭 이벤트
            const saveHandler = () => {
                const updatedContent = $newInput.value;
                const replyNo = $modifyBtn.getAttribute('data-rno');
                const email = $modifyBtn.getAttribute('data-email');

                // 폼 생성
                const form = document.createElement('form');
                form.method = 'post';
                form.action = '/discussion/reply/modify';

                // 폼 데이터 추가
                const inputReplyNo = document.createElement('input');
                inputReplyNo.type = 'hidden';
                inputReplyNo.name = 'discussionReplyNo';
                inputReplyNo.value = replyNo;

                const inputEmail = document.createElement('input');
                inputEmail.type = 'hidden';
                inputEmail.name = 'email';
                inputEmail.value = email;

                const inputContent = document.createElement('input');
                inputContent.type = 'hidden';
                inputContent.name = 'discussionReplyContent';
                inputContent.value = updatedContent;

                const inputDiscussionNo = document.createElement('input');
                inputDiscussionNo.type = 'hidden';
                inputDiscussionNo.name = 'discussionNo';
                inputDiscussionNo.value = discussionNo;

                form.appendChild(inputReplyNo);
                form.appendChild(inputEmail);
                form.appendChild(inputContent);
                form.appendChild(inputDiscussionNo);

                document.body.appendChild(form);
                form.submit();
            };

            // 취소 버튼 클릭 이벤트
            const cancelHandler = () => {
                $commentBody.innerHTML = `<p class="reply-comment">${originalText}</p>`;
                $modifyBtn.textContent = '수정';
                $delBtn.textContent = '삭제';

                $modifyBtn.classList.add('modifyBtn');
                $delBtn.classList.add('deleteBtn');
                $modifyBtn.classList.remove('saveBtn');
                $delBtn.classList.remove('cancelBtn');

                // 기존 이벤트 리스너를 제거하여 메모리 누수를 방지
                $modifyBtn.removeEventListener('click', saveHandler);
                $delBtn.removeEventListener('click', cancelHandler);
            };

            // 기존 이벤트 리스너를 제거하고 새로 추가
            $modifyBtn.removeEventListener('click', saveHandler);
            $delBtn.removeEventListener('click', cancelHandler);
            $modifyBtn.addEventListener('click', saveHandler);
            $delBtn.addEventListener('click', cancelHandler);
        }
    });
});
