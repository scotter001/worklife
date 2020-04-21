<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Worklife | Lỗi thực thi</title>
    <link href="<c:url value='/style/css/others/inspinia/bootstrap.min.css'/>" rel="stylesheet">
    <link href="<c:url value='/style/font-awesome/css/font-awesome.min.css'/>" rel="stylesheet">
    <link href="<c:url value='/style/css/others/inspinia/animate.css'/>" rel="stylesheet">
    <link href="<c:url value='/style/css/others/inspinia/style.min.css'/>" rel="stylesheet">
    
    <!-- Mainly scripts -->
    <script src="<c:url value='/style/js/others/inspinia/jquery-2.1.1.js'/>"></script>
    <script src="<c:url value='/style/js/others/inspinia/bootstrap.min.js'/>"></script>
    <link rel="shortcut icon" href="<c:url value="/images/p02vpl/worklife.ico" />" />
</head>
<body class="gray-bg">
    <div class="middle-box text-center animated fadeInDown">
        <h3 class="font-bold">Lỗi thực thi</h3>

        <div class="error-desc">
            Đã xảy ra lỗi trong quá trình thực thi website.<br/>
            <br/><a onclick="window.history.back();" class="btn btn-primary m-t">Trở về trang trước</a>
        </div>
    </div>
</body>
</html>