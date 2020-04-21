<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tag"%>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Control Panel</title>

    <!-- Meta -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Web Fonts -->
    <link rel="shortcut" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600&subset=cyrillic,latin">

    <!-- CSS Global Compulsory -->
	<link href="<c:url value='/style/css/others/inspinia/style.min.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/multidropdownlist/fg.menu.css'/>" rel="stylesheet">

    <!-- CSS Implementing Plugins -->
	<link rel="stylesheet" href="<c:url value='/style/css/worklife/admin/manager_user/manager_user.css'/>">
    <!-- CSS Page Style -->  
     <link href="<c:url value='/style/css/others/inspinia/plugins/datapicker/datepicker3.css' />" rel="stylesheet">
	<link rel="stylesheet" href="<c:url value='/style/css/others/inspinia/plugins/sweetalert/sweetalert.css'/>">
	<link rel="stylesheet" href="<c:url value='/style/css/others/cropbox/cropbox.css'/>">
	
	<!-- JS Implementing Plugins -->
	<!-- MULTI LEVEL DROPDOWNLIST -->
	<script src="<c:url value='/style/js/others/inspinia/jquery-2.1.1.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/bootstrap.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/datapicker/bootstrap-datepicker.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/jasny/jasny-bootstrap.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/slimscroll/jquery.slimscroll.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/pace/pace.min.js'/>" type="text/javascript"></script>
	<script type="text/javascript" src="<c:url value='/style/js/others/inspinia/plugins/sweetalert/sweetalert.min.js'/>"></script>
	<!-- JS Page Level -->
	<script type="text/javascript" src="<c:url value='/style/js/others/multidropdownlist/fg.menu.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/style/js/others/cropbox/cropbox.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/style/js/worklife/admin/manager_user/create_user.js'/>"></script>
	
	<link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />" />
	
	<script type="text/javascript">
		var url = '${pageContext.request.contextPath}/';
		var validatePhone = '<spring:message code="validate.register.phone" />';
		var datepickerFormatDate = 'dd/mm/yyyy';
		var datepickerFormatMask = '<spring:message code="datepicker.format.mask" />';
		var datepickerValidateFormatDate = '<spring:message code="datepicker.validate.formatdate" />';
		var questionSecurity = '<spring:message code="validate.reigister.questionsecurity" />';
		var validEmailFormat = '<spring:message code="validate.email.format" />';
	    var validEmailRequired = '<spring:message code="validate.email.required" />';
	    var validPassRequired = '<spring:message code="validate.register.password.required" />';
	    var validPassNotSame = '<spring:message code="validate.register.password.notsame" />';
	    var validPassLength = '<spring:message code="validate.register.password.length" />';
	    var validTermRequired = '<spring:message code="validate.reigister.term"/>';
	    var validNameRequired = '<spring:message code="validate.register.name" />';
	    var validCheckEmail = '<spring:message code="alert.register.email.exist" />';
	    var validCheckUsername = '<spring:message code="alert.register.username.exist" />';
	    var validCheckUseSpace = '<spring:message code="alert.register.username.notusespace" />';
	    var groupchose = '<spring:message code="validate.register.groupchose" />';
	</script>
	<style type="text/css">
		.fix-info {
		  position: absolute;
		  top: -2px;
		  width: 20px;
		  margin: 0 !important;
		}
		
		.action {
            width: 400px;
            height: 30px;
            margin: 10px 0;
        }
        
        .cropped>img {
            margin-right: 10px;
        }
	</style>
</head>
<body>
	<%@ include file="../componentpage/leftmenu.jsp"%>
	<div id="page-wrapper" class="gray-bg">
		<!-- Import file header right -->
		<%@ include file="../componentpage/header.jsp"%>
		<div class="row wrapper border-bottom white-bg page-heading">
			<div class="col-lg-10">
				<h2><spring:message code="label.uppercase.system" /></h2>
				<ol class="breadcrumb">
					<li>
						<a href="<c:url value='/worklife/manager/admin/redirectAdminPage.do' />"><spring:message code="label.lowercase.system" /></a>
					</li>
					<li>
						<a href="<c:url value='/worklife/manager/user/view/redirectToUserPage.do' />"><spring:message code="label.lowercase.administrateuser" /></a>
					</li>
					<li class="active">
						<strong><c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if> <spring:message code="label.user" /></strong>
					</li>
				</ol>
			</div>
			<div class="col-lg-2"></div>
		</div>
		<!-- BODY -->
		<div class="wrapper wrapper-content animated fadeInRight">
			<form:form modelAttribute="worklifeUserVO" id="worklifeUserVO" class="sky-form" action="${pageContext.request.contextPath}/worklife/manager/user/create/insertUser.do?${_csrf.parameterName}=${_csrf.token}" enctype="multipart/form-data" method="POST" name="adduser">
   					<input type="hidden" value="${worklifeUserVO.userId == null ? -1 : worklifeUserVO.userId}" id="userId" name="userId">
   					<input type="hidden" value="" id="dataURLSheme" name="dataURLSheme">
   					<input type="hidden" value="" id="nameImage" name="nameImage">
   					<input type="hidden" value="1" id="checkEmail">
   					<input type="hidden" value="1" id="checkUsername">
   					<input type="hidden" value="${message}" id="message" name="message">
					<div class="row">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-content">
									<div class="form-group">
										<div class="row">
											<div class="col-lg-3 col-md-3 m-b">
												<img class="img-responsive md-margin-bottom-10 min-width" id="avatarProfile" src="<c:if test="${ worklifeUserVO.avatar == null || worklifeUserVO.avatar == ''}"><c:url value='/style/images/worklife/useredit.png'/></c:if><c:if test="${ worklifeUserVO.avatar != null && worklifeUserVO.avatar != ''}"><c:url value='/worklife/avatar/viewAvatar.do?imageName=${ worklifeUserVO.avatar }&userName=${ worklifeUserVO.username }'/></c:if>" alt="">
				                 				<%-- <a class="btn btn-default" data-toggle="file" style="position: inherit; left: 65px; bottom: 45px;" data-target="#myModal"><spring:message code="label.register.changeavatar"/></a> --%>
				                 				<!-- Modal -->
						                        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
						                            <div class="modal-dialog">
						                                <div class="modal-content">
						                                	<div class="modal-header">
						                                        <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
						                                        <h4 id="myModalLabel1" class="modal-title"><spring:message code="label.register.modal.titleavatar"/></h4>
						                                    </div>
						                                    <div class="modal-body">
				                                        		<div class="imageBox" id="imageBox">
															        <div class="thumbBox"></div>
															        <div class="spinner" style="display: none">Loading...</div>
															    </div>
													    	 	<div class="action">
															        <input type="file" accept=".jpg, .png, .jpeg, .gif" id="file" style="float:center; width: 70%">
															        <input type="button" id="btnZoomIn" value="+" style="float: right; width: 10%">
															        <input type="button" id="btnZoomOut" value="-" style="float: right; width: 10%">
															    </div>
						                                  	</div>
						                                  	<div class="modal-footer">
						                                  		<button data-dismiss="modal" class="btn-u btn-u-default" type="button"><spring:message code="label.close" /></button>
												                <button class="btn-u" type="button" id="btnCrop"><spring:message code="label.accept" /></button>
												             </div>
						                            	</div>
					                            	</div>
						                        </div>
					                        <!-- End Modal -->
					                        </div>
			                            	<div class="col-lg-9 col-md-9 m-b">
                          						<div class="row">
                          							<div class="col-md-12 m-b">
									                    <label><spring:message code="label.username" /><span class="color-red">*</span></label>
									                    <div class="input-group">
														    <span class="input-group-addon"><i class="icon-append fa fa-user"></i></span>
														    <input tabindex="1" type="text" class="form-control" id="username" name="username" maxlength="255" value="${worklifeUserVO.username}" ${ worklifeUserVO.userId != null && worklifeUserVO.userId > 0 ? 'readonly' : '' }>
														</div>
													</div>
			                            		</div>
                          						<div class="row">
													<div class="col-lg-5 col-md-5 m-b">
									                     <label><spring:message code="label.register.email" /><span class="color-red">*</span></label>
									                    <div class="input-group">
														   <span class="input-group-addon"><i class="icon-append fa fa-envelope"></i></span>
														   <input tabindex="2" type="text" class="form-control" id="email" name="email" maxlength="255" value="${worklifeUserVO.email}" ${ worklifeUserVO.userId != null && worklifeUserVO.userId > 0 ? 'disabled' : '' }>
														</div>
													</div>
													<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
														<label><spring:message code="label.register.groupname3" /></label><br/>
														<input type="hidden" name="groupId" id="groupId" value="${ worklifeUserVO.groupId == null || worklifeUserVO.groupId == '' ? '-1' : worklifeUserVO.groupId }">
														<a href="#news-items-2" class="btn btn-primary dropdown-toggle" id="listUserGroup" tabindex="3">
															<span id="lblGroupName">${ worklifeUserVO.group == null || worklifeUserVO.group.groupName == '' ? '--Chọn bộ phận--' : worklifeUserVO.group.groupName }</span> <span class="caret"></span>
														</a>
														<div id="news-items-2" class="hidden">
															<ul>
																<c:forEach var="child" items="${ listGroup }">
																	<tag:parent_group list="${ child }" listParentId="${ listParentId }"></tag:parent_group>
																</c:forEach>
															</ul>
														</div>
													</div>
			                            		</div>
                          						<div class="row">
													<div class="col-lg-5 col-md-5 m-b">
									                    <label><spring:message code="label.register.password" /><span class="color-red">*</span></label>
									                    <div class="input-group">
									                    	<span class="input-group-addon"><i class="icon-append fa fa-lock"></i></span>
														    <input tabindex="4" type="password" class="form-control" name="password" id="password" ${ worklifeUserVO.userId != null && worklifeUserVO.userId > 0 ? 'disabled' : '' }>
														</div>
													</div>
													<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
									                    <label><spring:message code="label.register.repassword" /><span class="color-red">*</span></label>
									                    <div class="input-group">
														    <span class="input-group-addon"><i class="icon-append fa fa-lock"></i></span>
														    <input tabindex="5" type="password" class="form-control" id="passwordConfirm" name="passwordConfirm" ${ worklifeUserVO.userId != null && worklifeUserVO.userId > 0 ? 'disabled' : '' }>
														</div>
													</div>
			                            		</div>
				                       		</div>
				                       	</div>
				                    </div>
								</div>
								<div class="row">
									<div class="col-lg-12">
										<div class="ibox float-e-margins" style="margin-bottom: 0px;">
											<div class="ibox-title">
												<h5><spring:message code="label.register.nametab" /></h5>
											</div>
											<div class="ibox-content">
												<div class="form-group">
													<div class="row">
														<div class="col-lg-12 col-md-12 m-b">
															 <label><spring:message code="label.register.name" /></label>
															 <input tabindex="6" type="text" class="form-control" id="realName" name="realName" maxlength="255" value="${worklifeUserVO.realName}">
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12 col-md-12 m-b">
															 <label><spring:message code="label.register.position" /></label>
															 <input tabindex="7" type="text" class="form-control" id="chucvu" name="chucvu" maxlength="255" value="${worklifeUserVO.chucvu}">
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12 col-md-12 m-b">
															<div class="input-group m-b">
					                                            <label><spring:message code="label.register.cmnd"/>&nbsp;</label>
																<span class="input-group-btn">
					                                            	<img id="iconPopCMND" src="<c:url value='/style/images/worklife/info.jpg'/>" class="fix-info"  tabindex="0"  data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" data-content="<spring:message code="alert.register.cmnd.img"/>">
					                                            </span>
					                                        </div>
															<input tabindex="8" type="text" class="form-control" id="identityCard" name="identityCard" maxlength="100" value="${worklifeUserVO.identityCard}">
														</div>
													</div>
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
															<div class="input-group date">
																<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
																<input tabindex="9" type="text" class="form-control date-picker" id="IDDatePicker" 
																class="date-picker" name="IDDatePicker" value="<fmt:formatDate value="${worklifeUserVO.IDDate}" 
																pattern="dd/MM/yyyy"/>" placeholder="<spring:message code="label.regisrer.date"/>"
																disabled>
																
															</div>
														</div>
														<input type="hidden" name="IDDate" 	id="IDDate" value="<fmt:formatDate value="${worklifeUserVO.IDDate}" 
																pattern="dd/MM/yyyy"/>">
														<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
															<input tabindex="10" type="text" class="form-control" id="IDAgency" name="IDAgency"
															 value="${worklifeUserVO.IDAgency}" 
															 placeholder="<spring:message code="label.register.placeofissue"/>" 
															 onchange="changeIDAgency()" disabled>
															 <script type="text/javascript">
															 	function changeIDAgency(){
															 		$('#currIDAgency').val($('#IDAgency').val());
															 	}
															 </script>
															<input type="hidden" name="currIDAgency" id="currIDAgency" value="${worklifeUserVO.IDAgency}">
														</div>
													</div>
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
															<label><spring:message code="label.register.birthday"/></label>
															<div class="input-group date">
																<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
																<input tabindex="11" type="text" class="form-control date-picker" name="birthday" id="birthday" value="<fmt:formatDate value="${worklifeUserVO.birthday}" pattern="dd/MM/yyyy"/>" class="date-picker">
															</div>
														</div>
														<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
															<label><spring:message code="label.register.sex"/></label>
															<select tabindex="12" id="gender" name="gender" class="form-control">
														    	
														    	<option value="1" <c:if test="${worklifeUserVO.gender == 1}"> selected="selected"</c:if>><spring:message code="label.male" /></option>
														    	<option value="2" <c:if test="${worklifeUserVO.gender == 2}"> selected="selected"</c:if>><spring:message code="label.female" /></option>
													    	</select>
														</div>
													</div>
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
															<label><spring:message code="label.register.cellphone"/></label>
															<input tabindex="13" type="text" class="form-control vali" id="cellphone" name="cellphone" maxlength="100" value="${worklifeUserVO.cellphone}">
														</div>
														<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
															<label><spring:message code="label.register.phone"/></label>
															 <input tabindex="14" type="text" class="form-control vali" id="landline" name="landline" maxlength="100" value="${worklifeUserVO.landline}">
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12 col-md-12 m-b">
															<label><spring:message code="label.register.address"/></label>
															  <input tabindex="15" type="text" class="form-control" id="address" name="address" value="${worklifeUserVO.address}">
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- GROUP BUTTON -->
									<div class="col-lg-12">
										<div class="ibox float-e-margins">
											<div class="ibox-content" style="border: none;">
												<div class="form-group">
													<div class="row">
														<div class="col-lg-12 text-right m-b-lg">
															<button tabindex="16" class="btn btn-primary" type="button" onclick="submitForm()"><spring:message code="label.register.finish"/></button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form:form>
			</div>
		<!-- FOOTER -->
		<%@ include file="../componentpage/footer.jsp"%>
   	</div>
</body>
</html>