<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Admin Control Panel</title>
<link rel="shortcut icon" href="<c:url value="/images/worklife/worklife.ico" />" />
</head>
<body>
	<div id="wrapper">
		<!-- HEADER -->
		<%@ include file="componentpage/leftmenu.jsp"%>
		<div id="page-wrapper" class="gray-bg">
			<!-- Import file header right -->
			<%@ include file="componentpage/header.jsp"%>
			<div class="row wrapper border-bottom white-bg page-heading">
				<input type="hidden" id="activePage" value="CV03XemCongViec" />
				<div class="col-lg-10">
					<h2>HỆ THỐNG</h2>
					<ol class="breadcrumb">
						<li>
							<a href="#">Hệ thống</a>
						</li>
						<li class="active">
							<strong>Quản trị hệ thống</strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2"></div>
			</div>
			<!-- BODY -->
			<!-- FOOTER -->
			<%@ include file="componentpage/footer.jsp"%>
		</div>
	</div>
</body>
</html>