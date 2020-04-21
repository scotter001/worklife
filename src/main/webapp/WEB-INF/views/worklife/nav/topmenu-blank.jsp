<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<!DOCTYPE html>
<html>
<head>
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<meta name="_csrf_name" content="${_csrf.parameterName}"/>
<!-- LIST CSS BOOTSTRAP DÙNG CHUNG CHO TẤT CÀ CÁC TRANG -->
<link href="<c:url value='/style/css/others/inspinia/bootstrap.min.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/font-awesome/css/font-awesome.min.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/css/others/inspinia/animate.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/css/others/inspinia/style.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/css/others/inspinia/plugins/sweetalert/sweetalert.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/css/others/inspinia/plugins/ladda/ladda-themeless.min.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/css/worklife/user/prototype/prototype.css"' />" rel="stylesheet">
<!-- Mainly scripts -->
<script type="text/javascript" src="<c:url value='/style/js/others/inspinia/plugins/ladda/spin.js'/>"></script>
<script type="text/javascript" src="<c:url value='/style/js/others/inspinia/plugins/ladda/ladda.jquery.js'/>"></script>
<script type="text/javascript" src="<c:url value='/style/js/others/inspinia/plugins/ladda/ladda.js'/>"></script>

<style type="text/css">

.p-d-none {
	padding: 0;
}

.top-navigation .nav>li>a.icon_bell {
	padding: 20px 10px;
}

.top-navigation .nav>li>a {
	padding: 20px 20px;
}

.navbar-brand {
	height: 60px;
}

.top-navigation .navbar-brand {
	padding: 20px 25px;
}
.dropdown-submenu {
    position: relative;
}

.dropdown-submenu>.dropdown-menu {
    top: 0;
    left: 100%;
    margin-top: -6px;
    margin-left: -1px;
    -webkit-border-radius: 0 6px 6px 6px;
    -moz-border-radius: 0 6px 6px;
    border-radius: 0 6px 6px 6px;
}

.dropdown-submenu:hover>.dropdown-menu {
    display: block;
}

.dropdown-submenu>a:after {
    display: block;
    content: " ";
    float: right;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 5px 0 5px 5px;
    border-left-color: #ccc;
    margin-top: 5px;
    margin-right: -10px;
}

.dropdown-submenu:hover>a:after {
    border-left-color: #fff;
}

.dropdown-submenu.pull-left {
    float: none;
}

.dropdown-submenu.pull-left>.dropdown-menu {
    left: -100%;
    margin-left: 10px;
    -webkit-border-radius: 6px 0 6px 6px;
    -moz-border-radius: 6px 0 6px 6px;
    border-radius: 6px 0 6px 6px;
}
</style>
<script type="text/javascript">
$(document).ready(function(){
	$($('ul').filter(function(){ return $(this).children("li").length <= 0 })).parent().remove();
});
</script>
</head>
<body>
	<div class="row border-bottom white-bg m-b">
		<nav class="navbar navbar-static-top" role="navigation">
			<div class="navbar-header">
				<button aria-controls="navbar" aria-expanded="false" data-target="#worklifeTopMenu" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
					<i class="fa fa-reorder"></i>
				</button>
				<a href="<c:url value="/worklife/user/patient/illness/display.do" />" class="navbar-brand">Worklife</a>
			</div>
			<ul class="nav navbar-nav" id="listMenu" id="menuYte">
				<li>
	                <a role="button" class="dropdown-toggle" href="<c:url value="/worklife/user/patient/illness/display.do" />">Danh sách các ca bệnh</a>
	            </li>
	  			<li>
	                <a role="button" class="dropdown-toggle" href="<c:url value="/worklife/user/pesthole/display.do" />">Danh sách các ổ dịch</a>
	            </li>
	   			<li>
					<a href="<c:url value='/worklife/mapmanager.do'/>"> Bản đồ</a>
				</li>		
				<li>
					<a href="<c:url value='/worklife/user/chart/patient/index.do'/>"> Biểu đồ ca bệnh</a>
				</li>		
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">Ổ lăng quăng bọ gậy&nbsp;&nbsp;<span class="caret"></span></a>
					<ul role="menu" class="dropdown-menu  multi-level">
						<li>
							<a href="<c:url value='/worklife/user/moquisto/larvae/input.do'/>">Nhập thông tin ổ lăng quăng bọ gậy</a>
						</li>
						<li>
							<a href="<c:url value='/worklife/user/moquisto/larvae/search.do'/>">Tra cứu thông tin ổ lăng quăng bọ gậy</a>
						</li>
					</ul>
					
				</li>
			</ul>
		</nav>
	</div>
</body>
</html>