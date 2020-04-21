<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%--
  ~ Copyright (c) 2018.
  ~ Author : Phat Thinh
  --%>

<!DOCTYPE html>
<html>
<head>
	<title>Trang chủ</title>
	<%@ include file="/WEB-INF/views/jspf/head.jspf" %>
	<%@ include file="/WEB-INF/views/jspf/css.jspf" %>
</head>
<body class="top-navigation">
<div id="wrapper">
	<div id="page-wrapper" class="gray-bg">
		<%@ include file="/WEB-INF/views/worklife/nav/topmenu.jsp" %>
	</div>
	<%@ include file="/WEB-INF/views/worklife/nav/footer.jsp" %>
	<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
</div>
</body>
</html>

