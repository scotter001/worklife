<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <title>SỰ CỐ ĐƯỜNG</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf"%>
    <%@ include file="/WEB-INF/views/jspf/css.jspf"%>
    <link href="<c:url value='/style/css/others/inspinia/plugins/ladda/ladda-themeless.min.css' />" rel="stylesheet">
</head>
<script type="text/javascript">
    let url = '${pageContext.request.contextPath}/';
</script>
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
                    <h2>Nhập sự cố đường, thiết bị giao thông</h2>
                </div>
                <div class="ibox-content" id="searchContainer">
                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-2">
                            <label>Tuần Thứ</label>
                            <select class="form-control" id="selTuan">
                                <option value="-1"></option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label>Năm</label>
                            <select id="selNam" class="form-control">
                                <option value="-1"></option>>
                            </select>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row top-buffer">
                                <div class="col-md-12">
                                    <table class="table table-bordered table-hover" id="fileListTable" style="width: 100%;">
                                        <thead>
                                        <tr>
                                            <th class="text-center">
                                                STT
                                            </th>
                                            <th class="text-center">
                                                Ngày
                                            </th>
                                            <th class="text-center">
                                                Tuyến đường
                                            </th>
                                            <th class="text-center">
                                                Tình hình giao thông
                                            </th>
                                            <th class="text-center">Xử lý và giải pháp khắc phục</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <form id="formSuCoDetails">
                    <input type="hidden" id="group_Id" name="idGroup" value="${group_Id}">
                    <input type="hidden" id="isInsertSuccessfully" value="${message}"/>
                    <input type="hidden" name="idSuCo" id="idSuCo" value="${idSuCo eq null?-1:idSuCo}">
                    <input type="hidden" value="${startAt eq null?0:startAt}" id="startAt" />
                    <div class="ibox-content" id="cudContainer">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2">
                                    <label>Ngày kiểm tra</label>
                                    <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="ngay" id="ngay" />
                                </div>
                                <div class="col-md-2">
                                    <label>Tuyến đường</label>
                                    <select class="form-control" name="idTuyenDuong" id="idTuyenDuong"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Tai nạn giao thông xảy ra trong tuần, địa điểm, lý trình, nguyên nhân xảy ra tai nạn</label>
                                <textarea class="form-control" rows="3" name="taiNan" id="taiNan"></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Hư hỏng mặt đường và biển báo giao thông</label>
                                <textarea class="form-control" rows="3" name="huHong" id="huHong"></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Những việc đã được nhân viên tuần đường xử lý</label>
                                <textarea class="form-control" rows="3" name="xuLy" id="xuLy"></textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Giải pháp khắc phục</label>
                                <textarea class="form-control" rows="3" name="khacPhuc" id="khacPhuc"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button class="btn btn-primary" type="button" id="btnSave">
                                <i class="fa fa-save"></i>
                                &nbsp;Lưu
                            </button>
                            <button class="btn btn-primary" type="button" id="btnReset">
                                <i class="fa fa-plus"></i>
                                &nbsp;Thêm mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%@ include file="/WEB-INF/views/worklife/nav/footer.jsp"%>
        <%@ include file="/WEB-INF/views/jspf/js.jspf"%>
    </div>
</div>
</body>
<script type="text/javascript" src="<c:url value='/style/js/others/moment/moments.js' />"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/user/sucoduong/suco.Init.js' />"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/user/sucoduong/suco.Form.js' />"></script>
</html>