<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Quản lý thiết bị thuộc tuyến đường</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
</head>
<body class="top-navigation">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>QUẢN LÝ THIẾT BỊ THUỘC TUYẾN ĐƯỜNG</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row col-md-offset-3">
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label>Tên tuyến đường</label>
                                <select class="form-control" id="tuyenDuong"></select>
                            </div>
                            <div class="col-md-2">
                                <label>Loại thiết bị</label>
                                <select class="form-control" id="loaiThietBi"></select>
                            </div>
                            <div class="col-md-3">
                                <label>Hạt quản lý</label>
                                <select class="form-control" id="hatQuanLy"></select>
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-primary" id="btnTim" style="margin-top: 25px">
                                    <i class="fa fa-search"></i>&nbsp;Tìm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Danh sách thiết bị thuộc đường</label>
                            <table class="table table-bordered table-hover" id="tableQLThietBiBienBao"
                                   style="width: 100%">
                                <thead>
                                <tr>
                                    <th class="text-center">TT</th>
                                    <th class="text-center">Loại thiết bị</th>
                                    <th class="text-center">Tên thiết bị</th>
                                    <th class="text-center">Lý trình</th>
                                    <th class="text-center">Thuộc đường</th>
                                    <th class="text-center">Hạt quản lý</th>
                                    <th class="text-center">Hạn bảo trì</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="ibox-content">
                    <form id="formDmQLThietBiBienBao" <%--onsubmit="return validateform()--%>" >
                        <%--<input type="hidden" value="<%=pageContext.getAttribute("startAt")%>" />
                        <input type="hidden" value="<%=request.getAttribute("startAt")%>" id="startAt" />--%>
                        <input type="hidden" value="${startAt eq null?0:startAt}" id="startAt"/>
                        <input type="hidden" id="isInsertSuccessfully" value="${message}"/>
                        <input type="hidden" name="idtb" id="idtb" value="${idtb eq null?-1:idtb}">
                        <%--<input type="hidden" value="<%=request.getAttribute("idtb") == null?-1:request.getAttribute("idtb")%>" id="idtb" name="idtb" />--%>
                        <div class="title">
                            <h3><b>Thông tin chung</b></h3>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2" style="width: 14%">
                                    <label>Loại thiết bị</label>
                                    <select class="form-control" name="idLoaiTB" id="idLoaiTB"></select>
                                </div>
                                <div class="col-md-2" style="width: 14%">
                                    <label>Tên thiết bị</label>
                                    <input type="text" class="form-control" name="tenTB" id="tenTB">
                                </div>
                                <div class="col-md-2 " style="width: 14%">
                                    <div style="width: 240px;height:60px;">
                                        <label>Lý trình</label>
                                        <div style="width:237px;height: 34px;float: left;">

                                            <input type="text" placeholder="Km"
                                                   style="width:95px;height: 34px;;float: left; text-align: center;"
                                                   name="lyTrinhkm" id="lyTrinhkm">
                                            <lable style="width:63px;height: 34px;border-top: #9C9C9C solid 1px;border-bottom: #9C9C9C solid 1px;float: left; vertical-align: middle;line-height:31px; text-align: center;font-weight: bold;">
                                                +
                                            </lable>
                                            <input type="text" name="lyTrinhm" id="lyTrinhm"
                                                   style="width:75px;height: 34px;float: left; text-align: center;">
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-2" style="width: 14%">
                                    <label>Thuộc đường</label>
                                    <select class="form-control" name="idTuyenDuong" id="idTuyenDuong"></select>
                                </div>
                                <div class="col-md-2" style="width: 14%">
                                    <label>Huyện/TP</label>
                                    <select class="form-control" name="idhuyen" id="idhuyen"></select>
                                </div>
                                <div class="col-md-2" style="width: 14%">
                                    <label>Phường/Xã</label>
                                    <select class="form-control" name="idxa" id="idxa"></select>
                                </div>
                                <div class="col-md-2" style="width: 16%">
                                    <label>Hạt quản lý</label>
                                    <select class="form-control" name="idgroup" id="idGroup"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2" style="width: 14%">
                                    <label>Năm hoạt động</label>
                                    <input type="text" class="form-control" name="namHoatDong" id="namHoatDong"
                                           minlength="4" maxlength="4"
                                           onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
                                </div>
                                <div class="col-md-2" style="width: 16%">
                                    <label>Thời hạn bảo trì (năm)</label>
                                    <input type="text" class="form-control" name="thoiHanBaoTri" id="thoiHanBaoTri" maxlength="4"
                                           onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
                                </div>
                                <div class="col-md-2" style="width: 14%">
                                    <label>Ngày bảo trì cuối</label>
                                    <input type="date" class="form-control" name="ngaybtsc_cuoi" id="ngaybtsc_cuoi">
                                </div>
                                <%--<div class="col-md-2" style="width: 14%">--%>
                                    <%--<label>Ngày bảo trì cuối</label>--%>
                                    <%--<div class="" data-datepicker="true">--%>
                                        <%--<input type="text" class="form-control datepicker formatDate " data-mask="99/99/9999" name="ngaybtsc_cuoi" id="ngaybtsc_cuoi">--%>
                                    <%--</div>--%>
                                <%--</div>--%>
                                <div class="col-md-2" style="width: 14%">
                                    <label>Hạn bảo trì</label>
                                    <input type="text" class="form-control" name="hanBaoTri" id="hanBaoTri" disabled>
                                </div>
                                <div class="col-md-4" style="width: 42%">
                                    <label>Mô tả/Ghi chú</label>
                                    <input type="text" class="form-control myPopover" data-trigger="hover"
                                           data-placement="top"  data-original-title="${moTa}" data-toggle="tooltip" name="moTa" id="moTa">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="row text-right">
                        <div class="col-md-12">
                            <button type="button" class="btn btn-primary" id="btnThemMoi">
                                <i class="fa fa-plus-square"></i>&nbsp;Thêm mới
                            </button>
                            <button type="button" class="btn btn-primary" id="btnSave">
                                <i class="fa fa-save"></i>&nbsp;Lưu
                            </button>
                        </div>
                    </div>
                </div>
                <%--FOOTER--%>
                <%@ include file="/WEB-INF/views/worklife/nav/footer.jsp" %>
                </div>
    </div>
</body>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js'/>"></script>
<script type="text/javascript"
        src="<c:url value='/style/js/worklife/user/qltuyenduong/dmqlthietbibienbao.Form.js' />"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
<%--<style>--%>
    <%--.myPopover {width: 500px;height: 350px;background-color:#cecece;color:black ;--%>
    <%--text-align: center;border-radius: 20px;padding: 15px 0;position: absolute; z-index: 1;}--%>
<%--</style>--%>
</html>
