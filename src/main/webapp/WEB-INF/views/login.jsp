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
    <link href="<c:url value='/style/css/worklife/user/style-login.css'/>" rel="stylesheet">
    <script src="<c:url value='/style/js/others/inspinia/jquery-2.1.1.js' />"></script>
    <script src="<c:url value='/style/js/others/inspinia/bootstrap.min.js' />"></script>
	<link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />" />
</head>
<body class="lg-bg">
<div class="animated fadeInDown">
    <div class="grandParentContaniner">
        <div class="parentContainer">
            <c:url var="loginUrl" value="/validateInforLogin.do" />
            <form class="parentForm" role="form" action="${loginUrl}" method="post" style="margin-bottom: 5%">
                <div class="row lg-header" style="margin-top: 43%">
                    <div class="col-md-2">
                        <img src="<c:url value="/style/css/worklife/user/img/logo.png"/>">
                    </div>
                    <div class="col-md-10" style="margin-top: 20px">
                        <p class="lg-title">ỦY BAN NHÂN DÂN TỈNH KHÁNH HÒA</p>
                        <div class="text-center">
                            <p class="lg-name text-center">HỆ THỐNG QUẢN LÝ <br/> GIAO THÔNG VẬN TẢI ỨNG DỤNG GIS</p>
                        </div>
                    </div>
                </div>
                <div class="row lg-content" style="padding-bottom: 40px;">
                    <div class="col-md-12" style="margin-top: 25px">
                        <p class="lg-text">Tên người dùng: &nbsp;<input id="username" name="username" class="lg-ipt" type="text" value=""></p>
                    </div>
                    <div class="col-md-12" style="margin-left: 40.6px">
                        <p class="lg-text">Mật khẩu: &nbsp;<input  type="password" id="password" name="password" class="lg-ipt" value=""></p>
                    </div>
                    <div class="col-md-12" style="margin-top: 10px;text-align: center">
                        <button class="lg-btn">Đăng nhập</button>
                    </div>
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                </div>
                <div style="margin-left: 30px" class="lg-line"></div>
                <div class="row lg-footer">
                    <p style="font-size: 13px; padding: 13px 18px 6px 46px" class="lg-text">
                        Sở giao thông vận tải tỉnh Khánh Hòa<br/>
                        Địa chỉ: 4 Phan Chu Trinh, P. Xương Huân, TP. Nha Trang, tỉnh Khánh Hòa<br/>
                        Điện thoại: 058.3824270 - Fax: 058.3825970<br/>
                        Email: sgtvt@khanhhoa.gov.vn
                    </p>
                </div>
                <%--<div class="form-group">
                    <input type="text" id="username" name="username" class="form-control" placeholder="Username" required=""  value="admin">
                </div>
                <div class="form-group">
                    <input type="password" id="password" name="password" class="form-control" placeholder="Password" required=""  value="123456789">
                </div>--%>
                <%--<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>
                <a><small>Forgot password?</small></a>
                <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block">Create an account</a>--%>
            </form>
        </div>
    </div>
</div>
</body>
</html>
