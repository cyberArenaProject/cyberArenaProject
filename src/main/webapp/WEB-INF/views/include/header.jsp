<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
    nav ul {
        list-style: none;
    }
</style>
<head>
    <link rel="stylesheet" href="/assets/css/header.css" />
</head>
<header class="main-header">
    <a href="/index">
        <div class="logo" ><img class="main-logo" src="../assets/img/logo2.png"/></div>
    </a>
    <c:if test="${login != null}">
        <div class="login-user"><a href="/user/mypage"> ${login.nickname} </a>님 환영합니다.</div>
    </c:if>

    <a href="#" class="menu-open">
        <span class="lnr lnr-menu"></span>
    </a>
  
  <nav class="gnb">
        <a href="#" class="close">
            <span class="lnr lnr-cross"></span>
        </a>
        <ul>
            <c:choose>
                <c:when test="${login == null}">
                    <li><a href="/user/sign-up">회원 가입</a></li>
                    <li><a href="/user/sign-in">로그인</a></li>
                </c:when>
                <c:otherwise>
                    <li><a href="/user/mypage">마이페이지</a></li>
                    <li><a href="/user/sign-out">로그아웃</a></li>
                </c:otherwise>
            </c:choose>
                    <li><a href="/media/movie">영화</a></li>
                    <li><a href="/media/series">시리즈</a></li>
                    <li><a href="/media/book">도서</a></li>
                    <li><a href="/discussion/list">토론 게시판</a></li>
          </ul>
    </nav>
</header>