<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<link href="<c:url value='/style/font-awesome/css/font-awesome.min.css'/>" rel="stylesheet">
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
		             	<a href="<c:url value='/logout.do' />"><i class="fa fa-sign-out">Log out</i></a>
		             	<a href="<c:url value='/login.do' />"><i class="fa fa-sign-out">Login</i></a>
		         </li>
	     	</ul> 
	     	<!-- THE END PHẦN HEADER RIGHT -->
	    </nav>
	</div>
</body>
</html>