<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tag"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><spring:message code="label.update" /> <spring:message code="label.permission" /></title>
	<!-- LIST SOURCE FILE CSS -->
	<link href="<c:url value='/style/css/others/inspinia/style.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.bootstrap.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.responsive.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.tableTools.min.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/worklife/admin/datatable/datatable_custom.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/datapicker/datepicker3.css' />" rel="stylesheet">
	<!-- MULTI LEVEL DROPDOWNLIST -->
	<link href="<c:url value='/style/css/others/multidropdownlist/fg.menu.css'/>" rel="stylesheet">
	<!-- ICHECK -->
	<link href="<c:url value='/style/css/others/inspinia/plugins/iCheck/custom.css'/>" rel="stylesheet">
	<!-- LIST JS LIB  -->
	<script src="<c:url value='/style/js/others/inspinia/jquery-2.1.1.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/bootstrap.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/datapicker/bootstrap-datepicker.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/jasny/jasny-bootstrap.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/slimscroll/jquery.slimscroll.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/pace/pace.min.js'/>" type="text/javascript"></script>
	<!-- LIST JS DATATABLE -->
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/jquery.dataTables.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/dataTables.bootstrap.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/dataTables.responsive.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/dataTables.tableTools.min.js'/>" type="text/javascript"></script>
	<!-- MULTI LEVEL DROPDOWNLIST -->
	<script src="<c:url value='/style/js/others/inspinia/plugins/iCheck/icheck.min.js'/>" type="text/javascript"></script>
	<!-- ICHECK -->
	<script src="<c:url value='/style/js/others/multidropdownlist/fg.menu.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/worklife/admin/manager_user/create_admin_user.js'/>" type="text/javascript"></script>
	
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
	    var multiLanguageName 				= '<spring:message code="validate.rolegroup.name" />';
		var multiLanguageCode				= '<spring:message code="validate.rolegroup.code" />';
		var multiLanguageDescription		= '<spring:message code="validate.rolegroup.description" />';
		var multiLanguageNotify			= '<spring:message code="label.notify"/>';
		var multiLanguageAccept			= '<spring:message code="label.accept"/>';
		var multiLanguageExsit				= '<spring:message code="validate.rolegroup.code.exsit"/>';
	</script>
	
	<style type="text/css">
		.div-bordered {
		    border: 1px solid #E4E3E3;
		    padding: 8px;
		    margin-bottom: 15px;
		}
		
		.hrTitle {
		    margin: 8px -9px;
		    border: 0 !important;
		    border-top: 1px solid #E4E3E3 !important;
		}
		
		.hrContent {
		    margin: 8px -9px;
		    border: 0 !important;
		    border-top: 1px solid #eee!important;
		}
		
		.icheckbox_square-green, .iradio_square-green {
		    margin-right: 20px;
		}
	</style>
</head>
<body>
	<div id="wrapper">
		<!-- LEFT MENU  -->
		<%@ include file="../componentpage/leftmenu.jsp"%>
		<!-- HEADER -->
		<input type="hidden" name="error" id="error" value="<c:out value="${ error }" />">
		<input type="hidden" name="success" id="success" value="<c:out value="${ success }"/>">
		<div id="page-wrapper" class="gray-bg">
			<!-- Import file header right -->
			<%@ include file="../componentpage/header.jsp"%>
			<div class="row wrapper border-bottom white-bg page-heading">
				<div class="col-lg-10">
					<h2><spring:message code="label.uppercase.system" /></h2>
					<ol class="breadcrumb">
						<li>
							<a href="<c:url value='/worklife/manager/admin/redirectAdminPage.do' />"> <spring:message code="label.lowercase.system" /></a>
						</li>
						<li>
							<a href="<c:url value='/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do' />"> <spring:message code="label.lowercase.administratepermissiongroup" /></a>
						</li>
						<li class="active">
							<strong><spring:message code="label.update" /> <spring:message code="label.permission" /></strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2"></div>
			</div>
			<!-- BODY -->
			<div class="animated fadeInRight m-t p-b-lg">
				<form:form class="form" modelAttribute="worklifeUserVO" id="worklifeUserVO" name="createAdminUser" action="${pageContext.request.contextPath}/worklife/manager/adminUser/create/insertAdminUser.do" method="POST">
					<input type="hidden" name="pageNumber" id="pageNumber" />
					<input type="hidden" name="permissionId" id="permissionId" />
					<input type="hidden" value="${worklifeUserVO.userId == null ? -1 : worklifeUserVO.userId}" id="userId" name="userId">
   					<input type="hidden" value="" id="dataURLSheme" name="dataURLSheme">
   					<input type="hidden" value="" id="nameImage" name="nameImage">
   					<input type="hidden" value="1" id="checkEmail">
   					<input type="hidden" value="1" id="checkUsername">
   					<input type="hidden" value="${message}" id="message" name="message">
   					
   					<div class="row">
   						<div class="col-lg-12">
   							<div class="ibox float-e-margins">
   								<div class="ibox-title">
									<h5><spring:message code="label.user.manager.admin" /></h5>
								</div>
   								<div class="ibox-content">
									<div class="form-group">
										<div class="row">
											<div class="col-lg-3 col-md-3 m-b">
												<img class="img-responsive md-margin-bottom-10 min-width" id="avatarProfile" src="<c:if test="${ worklifeUserVO.avatar == null || worklifeUserVO.avatar == ''}"><c:url value='/style/images/worklife/useredit.png'/></c:if><c:if test="${ worklifeUserVO.avatar != null && worklifeUserVO.avatar != ''}"><c:url value='/worklife/avatar/viewAvatar.do?imageName=${ worklifeUserVO.avatar }&userName=${ worklifeUserVO.username }'/></c:if>" alt="">
				                 				<!-- Modal -->
						                        
					                       		<!-- End Modal -->
					                        </div>
			                            	<div class="col-lg-9 col-md-9 m-b">
                          						<div class="row">
                          							<div class="col-md-12 m-b">
									                    <label><spring:message code="label.username" /><span class="color-red">*</span></label>
									                    <div class="input-group">
														    <span class="input-group-addon"><i class="icon-append fa fa-user"></i></span>
														    <input tabindex="1" type="text" class="form-control" id="username" name="username" maxlength="255" value="">
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
								
								<!-- IBOX ROLE + LIST PERMISSION  -->
								<div class="animated fadeInRight m-t p-b-lg">
										<input type="hidden" name="pageNumber" id="pageNumber" />
										<input type="hidden" name="permissionId" id="permissionId" />
										<div class="row animated fadeInRight">
											<div class="col-lg-12">
												<div class="ibox float-e-margins">
													<div class="row">
														<div class="col-lg-12">
															<div class="ibox float-e-margins" style="margin-bottom: 0px;">
																<div class="ibox-title">
																	<h5>Khởi tạo vai trò với các quyền hệ thống</h5>
																</div>
																<div class="ibox-content" >
																	<div class="form-group">
																		<div class="row">
																			<div class="col-lg-5 col-md-5 m-b">
																					<label><spring:message code="label.rolegroup.name" /></label> 
																					<label class="required">&nbsp;*</label>
																					<input name="roleName" id="roleName" maxlength="255" class="form-control" value="<c:out value="${ role.roleName }" />" />
																				<input type="hidden" name="roleId" id="roleId" value="${ role.roleId == null || role.roleId == '' ? -1 : role.roleId }"/>
																				</div>
																				<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
																					<label><spring:message code="label.rolegroup.code" /></label>
																					<label class="required">&nbsp;*</label>
																					<input name="roleCode" id="roleCode" maxlength="20" ${ role.roleId == null || role.roleId == '' ? '' : 'disabled="disabled"' } style="text-transform: uppercase;" class="form-control" value="${ role.roleCode }" />
																				</div>
																		</div>
																		<div class="row">
																			<div class="col-lg-12 col-md-12">
																				<label><spring:message code="label.description" /></label> 
																				<label class="required">&nbsp;*</label>
																				<textarea rows="5" cols="" name="roleDescription" id="roleDescription" class="form-control">${ role.roleDescription }</textarea>
																			</div>
																		</div>
																	</div>
																</div>
																<div class="ibox-content">
																	<div class="form-group">
																		<div class="row">
																			<div class="col-lg-12">
																				<c:forEach items="${ listResult }" var="item" varStatus="index">
																					<div class="div-bordered" id="div${ index.index }">
																						<div class="row" id="contentFile">
																							<div class="col-xs-12">
																								<input type="checkbox" class="i-checks" name="checkAll" id="checkAll_div${ index.index }"/> 
																								<label>${ item.listPermissionName }</label>
																							</div>
																						</div>
																						<hr class="hrTitle" />
																						<c:set value="0" var="count"></c:set>
																						<c:forEach items="${ item.arrWorklifePermission }" varStatus="status">
																							<div class="row">
																								<c:if test="${ item.arrWorklifePermission[status.index + count] != null }">
																									<div class="col-sm-6 m-b-15 m-b">
																										<input type="checkbox"  value="<c:out value="${ item.arrWorklifePermission[status.index + count].permissionId }"/>" class="i-checks" />
																										${ item.arrWorklifePermission[status.index + count].permissionName }
																									</div>
																								</c:if>
																								<c:set value="${ count + 1 }" var="count"></c:set>
																								<c:if test="${ item.arrWorklifePermission[status.index + count] != null }">
																									<div class="col-sm-6 m-b-15 m-b">
																										<input type="checkbox"  value="<c:out value="${ item.arrWorklifePermission[status.index + count].permissionId }"/>" class="i-checks" />
																										${ item.arrWorklifePermission[status.index + count].permissionName }
																									</div>
																								</c:if>
																							</div>
																						</c:forEach>
																					</div>
																				</c:forEach>
																			</div>
																		</div>
																		<div class="row">
																			<div class="col-lg-12 col-md-12 col-sm-12 m-b text-right">
																				<input type="button" class="btn btn-sm btn-primary text-right" onclick="submitForm()" value="<spring:message code='label.register.finish' />" />
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
								</div>
								<!-- END: IBOX ROLE + LIST PERMISSION  -->
								
								<%-- <!-- GROUP BUTTON -->
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
								</div> --%>
								
   							</div>
   						</div>
   					
   					</div>
				</form:form>
			</div>
			<!-- FOOTER -->
			<%@ include file="../componentpage/footer.jsp"%>
		</div>
	</div>
</body>
</html>