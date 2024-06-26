<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/static-head.jsp" %>

    <link rel="stylesheet" href="/assets/css/kibeom/discussion-list.css">

    <%-- 페이징 라이브러리 추가 x --%>
</head>

<body>
<div id="backdrop" class="hide"></div>
<%@ include file="../include/header.jsp" %>

<script type="text/javascript">
    const isLoggedIn = ${login != null};
</script>

<div class="list-wrap">
    <h1>토론 리스트</h1>

    <button class="make-discussion">토론 생성하기</button>

    <c:forEach var="d" items="${dList}">
        <div class="card" data-dno="${d.discussionNo}">
            <p class="discussion-title">${d.discussionTitle}</p>
            <p class="nickname">${d.nickname}</p>
            <p class="discussion-offer">${d.discussionOffer}</p>
            <p class="discuss-view-count">조회수: ${d.viewCount}</p>
            <p class="reply-count">댓글[${d.replyCount}]</p>
            <p class="discussion-created-at">${d.formattedDiscussionCreatedAt}</p>
<%--            <c:if test="${login.nickname == d.nickname}">--%>
<%--                <a href="/discussion/modify">수정</a>--%>
<%--                <a href="/discussion/remove">삭제</a>--%>
<%--            </c:if>--%>
        </div>
    </c:forEach>

</div>

<!-- 게시글 목록 하단 영역 -->
<div class="bottom-section">

    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <c:if test="${maker.pageInfo.pageNo != 1}">
                <li class="page-item">
                    <a class="page-link" href="/discussion/list?pageNo=1" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            </c:if>
            <c:forEach var="i" begin="${maker.begin}" end="${maker.end}">
                <li class="page-item" data-page-num="${i}">
                    <a class="page-link" href="/discussion/list?pageNo=${i}">${i}</a>
                </li>
            </c:forEach>
            <c:if test="${maker.pageInfo.pageNo != maker.finalPage}">
                <li class="page-item">
                    <a class="page-link" href="/discussion/list?pageNo=${maker.finalPage}" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </c:if>
        </ul>
    </nav>

</div>
<!-- end div.bottom-section -->


<%@ include file="../include/footer.jsp" %>

<%-- Modal --%>
<div class="modal-wrap none" id="modal">
    <div class="modal-content">
        <div class="modal-left">
            <h1>토론 등록</h1>
            <form action="/discussion/register" method="POST">
                <input type="hidden" name="email" value="${login.email}">
                <label>
                    # 닉네임 : <input type="text" id="nickname" value="${login.nickname}" readonly>
                </label>
                <label>
                    # 미디어 : <input type="text" id="media" name="mediaName" readonly placeholder="하단의 검색창을 이용해주세요.">
                </label>
                <label>
                    # 주제 : <input type="text" id="title" name="discussionTitle">
                </label>
                <label>
                    # 세부 내용 : <input type="text" id="detail" name="discussionOffer">
                </label>
                <label>
                    <input type="button" id="finish" value="작성 완료">
                    <button type="button" id="cancelButton">작성 취소</button>
                </label>
            </form>
        </div>
        <div class="modal-right">
            <form class="modal-search">

                <label>
                    <p>미디어 검색</p>
                    <input class="modal-input" type="text" name="searchMedia" id="searchMediaInput"
                           placeholder="검색어를 입력해주세요.">
                </label>
            </form>
            <div class="fetch-wrap">

            </div>
        </div>
    </div>
    <div class="modal-close" id="closeModalButton">닫기</div>
</div>


<script type="module" src="/assets/js/kibeom/getMedia.js"></script>
<script type="text/javascript" src="/assets/js/kibeom/list.js"></script>

</body>
</html>