<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link href="<c:url value='/style/font-awesome/css/font-awesome.min.css'/>" rel="stylesheet">
	<meta name="_csrf" content="${_csrf.token}"/>
	<meta name="_csrf_header" content="${_csrf.headerName}"/>
</head>
<body>
	<div class="row border-bottom">
	    <nav class="navbar navbar-static-top " role="navigation" style="margin-bottom: 0">
	        <div class="navbar-header">
	            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
	        </div>
	         <!-- PHẦN HEADER RIGHT -->
	         <ul class="nav navbar-top-links navbar-right">
		         <li>
		         	<sec:authorize access="isAuthenticated()">
		             	<a href="<c:url value='/logout.do' />"><i class="fa fa-sign-out">Đăng xuất</i></a>
		             </sec:authorize>
		         	<sec:authorize access="!isAuthenticated()">
		             	<a href="<c:url value='/login.do' />"><i class="fa fa-sign-out">Đăng nhập</i></a>
		             </sec:authorize>
		         </li>
	     	</ul> 
	     	<!-- THE END PHẦN HEADER RIGHT -->
	    </nav>
	</div>
</body>
</html>