<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>${PageTitle}</title>
    <%@ include file="../../jspf/head.jspf" %>
    <%@ include file="../../jspf/map/core/css.jspf" %>
</head>
<style>
    .dataTables_paginate {
        float: left;
    }
    table#tblInfo {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }
</style>
<body class="top-navigation" id="body">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="../nav/topmenu.jsp" %>
        <div id="mapCtl" class="calcite">
            <div id="toolBox" style="display: none;">
                <div class="ibox collapsed border-bottom">
                    <div class="ibox-title">
                        <div class="ibox-tools">
                            <a class="collapse-link">
                                <i class="fa fa-chevron-down"></i>
                            </a>
                        </div>
                    </div>
                    <div class="ibox-content" style="display: block;">
                        <%--Panel Infor Switch Block--%>
                        <c:if test="${FormName == 'cskcb'}">
                            <%@include file="../../jspf/map/cskcb.jspf" %>
                        </c:if>
                        <c:if test="${FormName == 'csd'}">
                            <%@include file="../../jspf/map/csd.jspf" %>
                        </c:if>
                        <c:if test="${FormName == 'vsattp'}">
                            <%@include file="../../jspf/map/vsattp.jspf" %>
                        </c:if>
                        <c:if test="${FormName == 'nd'}">
                            <%@include file="../../jspf/map/nd.jspf" %>
                        </c:if>
                        <c:if test="${FormName == 'cb'}">
                            <%@include file="../../jspf/map/cb.jspf" %>
                        </c:if>
                        <c:if test="${FormName == 'nn'}">
                            <%@include file="../../jspf/map/nn.jspf" %>
                        </c:if>
                        <c:if test="${FormName == 'vsldcs'}">
                            <%@include file="../../jspf/map/vsldcs.jspf" %>
                        </c:if>
                        <c:if test="${FormName == 'tc'}">
                            <%@include file="../../jspf/map/tc.jspf" %>
                        </c:if>
                        <%--Panel Infor Switch Block--%>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="statusBar" id="mapStatusBar" >
    <span class="text-muted" style="width: 200px;">,</span><span class="text-muted" style="width: 200px;">,</span>
</div>
<%@ include file="../../jspf/map/core/layerControl.jspf" %>
<%@ include file="../../jspf/map/core/createPointDialog.jspf" %>
<%@ include file="../../jspf/map/core/js.jspf" %>
<script src="<c:url value='/style/js/worklife/map/core/jqUtils.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/worklife/map/core/core.Init.js'/>" type="text/javascript"></script>
<script src="<c:url value='${JsPath}'/>" type="text/javascript"></script>
</body>
</html>