<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<meta name="_csrf_parameter" content="${_csrf.parameterName}" />
<!-- LIST CSS BOOTSTRAP DÙNG CHUNG CHO TẤT CÀ CÁC TRANG -->
<link href="<c:url value='/style/css/others/inspinia/bootstrap.min.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/font-awesome/css/font-awesome.min.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/css/others/inspinia/animate.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/css/others/inspinia/style.css'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/style/css/others/inspinia/plugins/sweetalert/sweetalert.css'/>" rel="stylesheet" type="text/css">
<%-- <link href="<c:url value='/style/css/others/inspinia/plugins/ladda/ladda-themeless.min.css'/>" rel="stylesheet" type="text/css"> --%>
<%-- <link href="<c:url value='/style/css/worklife/user/prototype/prototype.css"' />" rel="stylesheet"> --%>
<!-- Mainly scripts -->
<%-- <script type="text/javascript" src="<c:url value='/style/js/others/inspinia/plugins/ladda/spin.js'/>"></script>
<script type="text/javascript" src="<c:url value='/style/js/others/inspinia/plugins/ladda/ladda.jquery.js'/>"></script>
<script type="text/javascript" src="<c:url value='/style/js/others/inspinia/plugins/ladda/ladda.js'/>"></script> --%>
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
</head>
<body>
	<c:url var="logoutUrl" value="/worklife/user/facility/logout.do" />
	<div class="row border-bottom white-bg m-b">
		<nav class="navbar navbar-static-top" role="navigation">
			<div class="navbar-header">
				<button aria-controls="navbar" aria-expanded="false" data-target="#worklifeTopMenu" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
					<i class="fa fa-reorder"></i>
				</button>
				<a href="#" class="navbar-brand">Y tế</a>
			</div>
			<ul class="nav navbar-nav" id="listMenu">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">Cơ sở &nbsp;<span class="caret"></span></a>
					<ul role="menu" class="dropdown-menu  multi-level">
						<li>
							<a href="<c:url value='/worklife/user/facility/info.do'/>">Thông tin</a>
						</li>		
<%-- 						<li>
							<a href="<c:url value='/worklife/user/BaoCaoThongKe/BaoCaoThongKeYTe.do'/>">Báo cáo thống kê</a>
						</li> --%>							
					</ul>
				</li>
			</ul>
			<c:if test="${facilityLoginVO.idLoaiCoSo == 1 || facilityLoginVO.idLoaiCoSo == 2}">
				<ul class="nav navbar-nav">
					<li>
						<a href="<c:url value='/worklife/user/baocaoyduoc/cosobaocao.do'/>">Cơ sở báo cáo&nbsp;</a>
					</li>
				</ul>
			</c:if>
			<div class="navbar-collapse collapse" id="worklifeTopMenu">
				<ul class="nav navbar-top-links navbar-right">
					<li>
						<a id="profilePage" href="<c:url value="/worklife/user/facility/login.do"/>">Chào ${facilityLoginVO.username}</a>
					</li>
					<li>
						<form id="logoutForm" method="POST">
							<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
							<a href="${logoutUrl}"  data-placement="left" style ="color:#676a6c;" id="btnLogout"><i class="fa fa-sign-out">&nbsp;Thoát</i></a>
						</form>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</body>
</html>