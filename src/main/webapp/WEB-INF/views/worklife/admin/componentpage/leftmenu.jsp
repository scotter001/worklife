<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix ="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="_csrf" content="${_csrf.token}"/>
	<meta name="_csrf_header" content="${_csrf.headerName}"/>
	<meta name="_csrf_name" content="${_csrf.parameterName}"/>
	<!-- LIST CSS BOOTSTRAP DÙNG CHUNG CHO TẤT CÀ CÁC TRANG -->
	<link href="<c:url value='/style/css/others/inspinia/bootstrap.min.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='/style/font-awesome/css/font-awesome.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='/style/css/others/inspinia/animate.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='/style/css/others/inspinia/style.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='/style/css/others/inspinia/plugins/sweetalert/sweetalert.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='/style/css/worklife/user/prototype/prototype.css"' />" rel="stylesheet">
	<!-- Mainly scripts -->
	<script src="<c:url value='/style/js/others/inspinia/plugins/metisMenu/jquery.metisMenu.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/inspinia.js'/>"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/sweetalert/sweetalert.min.js'/>"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/validate/jquery.validate.min.js'/>"></script>
	<!-- Admin utility -->
	<script src="<c:url value='/style/js/worklife/user/basic/utils.js'/>"></script>
	<script src="<c:url value='/style/js/worklife/admin/worklife_admin_util.js'/>"></script>
	<script src="<c:url value='/style/js/worklife/admin/manage_category/manager_category.js'/>"></script>
	<script src="<c:url value='/style/js/worklife/admin/manage_category/leftmenu.js'/>"></script>
	<script>

		var validOLdPassWordRequired = '<spring:message code="lable.change.oldpassword" />';
		var validConfirmPassWordRequiredt = '<spring:message code="lable.change.confirmpassword" />';
		var validNewPassWordRequired = '<spring:message code="lable.change.newpassword" />';
		var validFail = '<spring:message code="lable.change.fail" />';
		var validNotSamePassword='<spring:message code="validate.register.password.notsame"/>';
		var validSuccess='<spring:message code="lable.change.success"/>'; 
		var validSuccessMessege='<spring:message code="lable.change.messege"/>';
		var validlength='<spring:message code="validate.register.password.length"/>'; 
		var validMessage='<spring:message code="label.xd05.message"/>'; 
		var validNotMatch='<spring:message code="lable.change.notmatch"/>';
	</script>
</head>
<body>
	<nav class="navbar-default navbar-static-side" role="navigation">
	<div class="sidebar-collapse">
		<ul class="nav" id="side-menu">
			<li class="nav-header">
				<sec:authorize access="isAuthenticated()">
					<sec:authentication var="worklifeUser" property="principal" />
					<div class="dropdown profile-element">
						<span> 
							<img width="48px" height="48px" alt="image" class="img-circle" src="<c:if test="${ worklifeUser.avatar == null || worklifeUser.avatar == ''}"><c:url value='/style/images/worklife/useredit.png'/></c:if><c:if test="${ worklifeUser.avatar != null && worklifeUser.avatar != ''}"><c:url value='/worklife/avatar/viewAvatar.do?imageName=${ worklifeUser.avatar }&userName=${ worklifeUser.username }'/></c:if>" alt="">
						</span> 
						<a data-toggle="dropdown" class="dropdown-toggle" href="#"> 
							<span class="clear"> 
								<span class="block m-t-xs"> 
									<strong class="font-bold">${worklifeUser.realName == null || worklifeUser.realName == '' ? worklifeUser.username : worklifeUser.realName}</strong>
								</span> 
								<span class="text-muted text-xs block">Administrator <b class="caret"></b></span>
							</span>
						</a>
						<ul class="dropdown-menu animated fadeInRight m-t-xs">
							<li><a href="<c:url value="/worklife/manager/user/modify/modifyUser.do?userId=${worklifeUser.userId}" />">Profile</a></li>
							<li><a href="" data-toggle="modal" data-backdrop="static" data-target="#myModal">Change Password</a></li>
							<li><a href="<c:url value='/logout.do' />">Logout</a></li>
						</ul>
					</div>
				</sec:authorize>
				<sec:authorize access="!isAuthenticated()">
					<div class="dropdown profile-element">
						<span> 
							<img width="48px" height="48px" alt="image" class="img-circle" src="<c:url value='/style/images/worklife/useredit.png'/>">
						</span> 
						<a data-toggle="dropdown" class="dropdown-toggle" href="#"> 
							<span class="clear"> 
								<span class="block m-t-xs"> 
									<strong class="font-bold">Anonymous</strong>
								</span> 
								<span class="text-muted text-xs block"> <b class="caret"></b></span>
							</span>
						</a>
						<ul class="dropdown-menu animated fadeInRight m-t-xs">
							<li><a href="<c:url value='/login.do' />">Login</a></li>
						</ul>
					</div>
				</sec:authorize>
				<div class="logo-element">S4T</div>
			</li>
			<li id="WorklifeSystemManager">
				<a href="<c:url value='/' />">
					<i class="fa fa-step-backward"></i>
					Quay lại trang chủ
				</a>
			</li>
			<li>
				<a href="<c:url value='/worklife/manager/admin/redirectAdminPage.do' />">
					<i class="fa fa-gears"></i>
					<span class="nav-label menu"><spring:message code="label.lowercase.administratesystem" /></span>
				</a>
			</li>
			<li>
                <a href=""><i class="fa fa-list-ol"></i> <span class="nav-label">Quản lý danh mục</span> <span class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse" id="menuList">

				</ul>
            </li>
		</ul>
	</div>
	</nav>
	<!-- Modal -->
		<div class="modal fade" id="myModal" role="dialog">
		    <div class="modal-dialog">
		      <!-- Modal content-->
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" onClick="emptValue()">&times;</button>
		          <h4 class="modal-title">Đổi mật khẩu</h4>
		        </div>
		        <div class="modal-body">
			        <form action="" id="changePassword">
			        	<div class="form-group">
				              <label for="psw"><span class="fa fa-user"></span> Username</label>
				              <input type="text" class="form-control" id="userName" readonly="readonly">
				              <p id="userNameVali" style="color: red"></p>
				         </div>	
				         <div class="form-group">
				              <label for="psw"><span class="fa fa-lock"></span> New Password</label>
				              <input type="password" class="form-control" id="newPassword" maxlength="32" placeholder="Enter new password">
				              <p id="newPasswordVali" style="color: red" ></p>
				         </div>	
				         <div class="form-group">
				              <label for="psw"><span class="fa fa-lock"></span> Confirm Password</label>
				              <input type="password" class="form-control" id="confirmPassword" maxlength="32" placeholder="Enter confirm password">
				              <p id="confirmPasswordVali" style="color: red" ></p>
				         </div>	
				         <div class="form-group">
				              <label for="psw"><span class="fa fa-unlock-alt"></span> Old Password</label>
				              <input type="password" class="form-control" id="oldPassword" maxlength="32" placeholder="Enter old password">
				              <p id="oldPasswordVali" style="color: red"></p>
				         </div>
				     </form>
		        </div>
		        <div class="modal-footer">
		          <button type="button" onClick="changePassword()" id="okChange" class="btn btn-primary" >OK</button>
		          <button type="button" onClick="emptValue()" id="closeModel" class="btn btn-default">Cancel</button>
		        </div>
		    </div>
		      
		</div>
 	 </div>
</body>
</html>