<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Login</title>
    <link href="<c:url value='/style/css/others/inspinia/bootstrap.min.css'/>" rel="stylesheet">
    <link href="<c:url value='/style/font-awesome/css/font-awesome.css'/>" rel="stylesheet">
    <link href="<c:url value='/style/css/others/inspinia/animate.css' />" rel="stylesheet">
    <link href="<c:url value='/style/css/others/inspinia/style.css' />" rel="stylesheet">
    
    <script src="<c:url value='/style/js/others/inspinia/jquery-2.1.1.js' />"></script>
    <script src="<c:url value='/style/js/others/inspinia/bootstrap.min.js' />"></script>
    
	<link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />" />
</head>
<body class="gray-bg">
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>
                <h1 class="logo-name">WL</h1>
            </div>
            <h3>Welcome tosss Worklife</h3>
            <c:if test="${param.error != null}">
            	<p style="color: red">Invalid username and password. ${ param.error }</p>
            </c:if>
            <c:if test="${param.logout != null}">
                 <p style="color: blue">You have been logged out successfully.</p>
            </c:if>
            <c:url var="loginUrl" value="/validateInforLogin.do" />
            <form class="m-t" role="form" action="${loginUrl}" method="post">
                <div class="form-group">
                    <input type="text" id="username" name="username" class="form-control" placeholder="Username" required="">
                </div>
                <div class="form-group">
                    <input type="password" id="password" name="password" class="form-control" placeholder="Password" required="">
                </div>
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>
                <a><small>Forgot password?</small></a>
                <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block">Create an account</a>
            </form>
        </div>
    </div>
</body>
</html>
