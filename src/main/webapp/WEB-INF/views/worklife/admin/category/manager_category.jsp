<%--
  ~ Copyright (c) 2017.
  ~ Author : Phat Thinh
  --%>

<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 8/10/2017
  Time: 15:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="_csrf" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>
    <meta name="_csrf_name" content="${_csrf.parameterName}"/>
    <link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />"/>
    <title>DANH MỤC ${fn:toUpperCase(category.title)}</title>
    <!-- CSS FILE -->
    <link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/datatables.min.css'/>" rel="stylesheet">
    <link href="<c:url value='/style/css/worklife/admin/datatable/datatable_custom.css'/>" rel="stylesheet">
    <link href="<c:url value='/style/css/others/inspinia/plugins/iCheck/custom.css' />" rel="stylesheet">
    <link href="<c:url value='/style/css/others/multidropdownlist/fg.menu.css'/>" rel="stylesheet">
    <!-- LIST JS LIB  -->
    <script src="<c:url value='/style/js/others/inspinia/jquery-2.1.1.js'/>" type="text/javascript"></script>
    <script src="<c:url value='/style/js/others/inspinia/bootstrap.min.js'/>" type="text/javascript"></script>
    <script src="<c:url value='/style/js/others/inspinia/plugins/iCheck/icheck.min.js'/>"></script>
    <script src="<c:url value='/style/js/others/inspinia/plugins/slimscroll/jquery.slimscroll.min.js'/>" type="text/javascript"></script>
    <script src="<c:url value='/style/js/others/inspinia/plugins/pace/pace.min.js'/>" type="text/javascript"></script>
    <!-- LIST JS DATATABLE -->
    <script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/datatables.min.js'/>" type="text/javascript"></script>
    <script src="<c:url value='/style/js/others/multidropdownlist/fg.menu.js'/>" type="text/javascript"></script>
    <script type="text/javascript">
        var url = '${pageContext.request.contextPath}/';
    </script>
    <script type="text/javascript" src="<c:url value='/style/js/worklife/admin/manage_category/manager_category.Init.js' />"></script>
    <script type="text/javascript" src="<c:url value='/style/js/worklife/user/basic/basic-public.js'/>"></script>
</head>
<script>
    var multiLanguage = {
        saveSuccessful: '<spring:message code="label.savesuccessfully"/>',
        saveFailed: '<spring:message code="label.savefailed"/>',
        accept: '<spring:message code="label.accept"/> ',
        notify: '<spring:message code="label.notify"/> '
    }
</script>
<style>
    .dataTables_empty {
        text-align: center;
    }
</style>
<body>
<div id="wrapper">
    <!-- HEADER -->
    <%@ include file="../componentpage/leftmenu.jsp" %>
    <div id="page-wrapper" class="gray-bg">
        <!-- HEADER -->
        <%@ include file="../componentpage/header.jsp" %>
        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2><spring:message code="label.uppercase.system"></spring:message></h2>
                <ol class="breadcrumb">
                    <li class="active">
                        <spring:message code="label.category"/> / <strong>${category.title}</strong>
                    </li>
                </ol>
            </div>
            <div class="col-lg-2"></div>
        </div>
        <!-- BODY -->
        <div class="wrapper wrapper-content animated fadeInRight">
            <!-- content -->
            <div class="ibox">
                <div class="ibox-title">
                    <h5>
                        DANH MỤC ${fn:toUpperCase(category.title)}
                    </h5>
                </div>
                <div class="ibox-content">
                    <div class="text-right">
                        <button type="button" class="btn btn-primary" id="btnAdd" class="btn btn-info btn-lg">
                            <i class="fa fa-plus "></i> <spring:message code="label.create"/>
                        </button>
                    </div>
                    <div class="row top-buffer">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <input type="hidden" id="txtTableName" value="${category.name}"/>
                                    <input type="hidden" id="txtUrl" value="${category.url}"/>
                                    <input type="hidden" value="${message}" id="isInsertSuccessfully"/>
                                    <table class="table table-bordered table-hover" id="tblCategory"
                                           style="width: 100%">
                                        <thead>
                                        <tr>
                                            <th>
                                                <div style="margin-top: 5px;">
                                                    <input type="checkbox" class="i-checks" id="checkAllCategory">
                                                </div>
                                            </th>
                                            <th class="text-center"><spring:message code="label.number"/></th>
                                            <c:forEach var="field" items="${category.fields}">
                                                <c:if test="${field.property ne 'id'}">
                                                    <th class="text-center"
                                                        colref="${field.property}">${field.title}</th>
                                                </c:if>
                                            </c:forEach>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6" id="btnControlThemXoa" style="margin-top: -37px;">
                                    <button id="btnDelete" type="button" class="btn btn-xs btn-danger">
                                        <i class="fa fa-trash-o"></i> &nbsp;&nbsp;
                                        <spring:message code="label.delete"></spring:message>
                                        &nbsp;&nbsp;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- FOOTER -->
        <%@ include file="../componentpage/footer.jsp" %>
    </div>
</div>
</body>
</html>
<div class="modal inmodal" id="modalCategory" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated fadeIn" style="width:850px;margin: 20% 0 0 -130px;">
            <div class="modal-header">
                <label class="col-lg control-label" style="float: left;">TẠO MỚI/CẬP
                    NHẬT ${fn:toUpperCase(category.title)}</label>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                        class="sr-only">Close</span></button>
            </div>
            <div class="modal-body">
                <form id="formCategory" method="POST">
                    <input type="hidden" name="id" value="-1" id="txtId"/>
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                    <input type="text" name="FixBugPOST" value="Fix IE bug" style="display:none"/>
                    <div class="row">
                        <div class="form-group">
                            <c:forEach var="field" items="${category.fields}" varStatus="status">
                                <c:if test="${field.property ne 'id'}">
                                    <div class="col-md-${field.size}">
                                        <label>${field.title}</label>
                                        <c:if test="${field.ddefault eq 'option' or field.ddefault eq 'association'}">
                                            <select name="${field.property}" class="form-control">
                                                <option value="-1"></option>
                                                <c:forEach var="item" items="${field.options}" varStatus="status">
                                                    <option value="${item.value}">${item.text}</option>
                                                </c:forEach>
                                            </select>
                                        </c:if>
                                        <c:if test="${field.ddefault eq null}">
                                            <c:if test="${field.type eq 'int'}">
                                                <input type="text" name="${field.property}"
                                                       class="form-control onlynumber"/>
                                            </c:if>
                                            <c:if test="${field.type eq 'String'}">
                                                <input type="text" name="${field.property}" class="form-control"/>
                                            </c:if>
                                        </c:if>
                                    </div>
                                </c:if>
                            </c:forEach>
                        </div>
                    </div>
                    <br/>&nbsp;
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button type="button" class="btn btn-outline btn-default" id="btnDong" data-dismiss="modal">
                                <i class="fa fa-close"></i>&nbsp;&nbsp;<spring:message code="label.close"/>
                            </button>
                            <button type="button" class="btn btn-primary" id="btnLuu" name="btnLuu">
                                <i class="fa fa-save "></i> <spring:message code="label.save"/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>