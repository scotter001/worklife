<%--
  ~ Copyright (c) 2018.
  ~ Author : Phat Thinh
  --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <title>QUẢN LÝ VỆ SINH LAO ĐỘNG TẠI DOANH NGHIỆP</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf"%>
    <%@ include file="/WEB-INF/views/jspf/css.jspf"%>
    <link href="<c:url value='/style/css/others/inspinia/plugins/ladda/ladda-themeless.min.css' />" rel="stylesheet">
</head>
<body class="top-navigation" class="pace-done">
<div class="pace pace-inactive">
    <div class="pace-progress" data-progress-text="100%" data-progress="99" style="transform: translate3d(100%, 0px, 0px);">
        <div class="pace-progress-inner"></div>
    </div>
    <div class="pace-activity"></div>
</div>
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <!-- HEADER -->
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu.jsp"%>
        <!-- BODY -->
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins boxborder">
                <div class="ibox-title">
                    <h2>QUẢN LÝ VỆ SINH LAO ĐỘNG TẠI DOANH NGHIỆP</h2>
                </div>
                <div class="ibox-content" id="searchContainer">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-3">
                            <label>Ngành nghề</label>
                            <select class="form-control" id="selNganhNghe">
                                <option value="-1"></option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Huyện/thành phố* :</label>
                            <select id="selDistrictSearch" class="form-control">
                                <option value="-1"><spring:message code="label.district.select"/></option>>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Tên cơ sở :</label>
                            <input type="text" id="txtFacilityNameSearch" class="form-control"/>
                        </div>
                        <div class="col-md-2">
                            <label class="lbhidden"></label>
                            <button type="button" class="btn btn-primary" id="btnSearch"><spring:message code="label.search"/> </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <%@ include file="/WEB-INF/views/worklife/nav/footer.jsp"%>
    </div>
</div>
<%@ include file="/WEB-INF/views/jspf/js.jspf"%>
<%--<script src="<c:url value='/style/js/others/inspinia/plugins/ladda/spin.min.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/others/inspinia/plugins/ladda/ladda.jquery.min.js' />" type="text/javascript"></script>
<script src="<c:url value='/style/js/others/inspinia/plugins/ladda/ladda.min.js' />" type="text/javascript"></script>--%>
<%@ include file="/WEB-INF/views/jspf/modal/dlgStreet.jspf"%>
<script src="<c:url value='/style/js/worklife/user/basic/utils.js'/>" type="text/javascript"></script>
<%--<script src="<c:url value='/style/js/worklife/user/YTeDuPhong/vsld/vsldcs.Init.js'/>" type="text/javascript"></script>--%>
<%--<script src="<c:url value='/style/js/worklife/user/YTeDuPhong/vsld/vsldcs.Form.js'/>" type="text/javascript"></script>--%>
<script type="text/javascript">
    let multiLanguage = {
        saveSuccessful: '<spring:message code="label.savesuccessfully"/>',
        saveFailed: '<spring:message code="label.savefailed"/>',
        accept : '<spring:message code="label.accept"/> ',
        notify : '<spring:message code="label.notify"/> '
    };
</script>
</body>
</html>