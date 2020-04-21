<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Quản lý cầu</title>
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
                    <h3><b>QUẢN LÝ CẦU</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="col-md-2">
                                <label>Hạt quản lý</label>
                                <select class="form-control" id="hatQuanLy"></select>
                            </div>
                            <div class="col-md-2">
                                <label>Địa danh huyện/TP</label>
                                <select class="form-control" id="huyenTP"></select>
                            </div>
                            <div class="col-md-4">
                                <label>Tên đường</label>
                                <input type="text" class="form-control" id="stenDuong">
                            </div>
                            <div class="col-md-3">
                                <label>Tên cầu</label>
                                <input type="text" class="form-control" id="stenCau">
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
                            <label>Danh sách cầu</label>
                            <table class="table table-bordered table-hover" id="tableDSCau" style="width: 100%">
                                <thead>
                                <tr>
                                    <th class="text-center">TT</th>
                                    <th class="text-center">Tên cầu</th>
                                    <th class="text-center">Tên đường</th>
                                    <th class="text-center">Hạt quản lý</th>
                                    <th class="text-center">Lý trình</th>
                                    <th class="text-center">Địa danh huyện</th>
                                    <th class="text-center">Tải trọng</th>
                                    <th class="text-center">Tình trạng</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <h4>Thông tin chung</h4>
                        </div>
                    </div>
                    <form id="formQLCau">
                        <input type="hidden" name="idCau" id="idCau" value="${idCau eq null?0:idCau}">
                        <input type="hidden" name="id" id="id" value="${id eq null?0:id}">
                        <input type="hidden" value="${startAt eq null?0:startAt}" id="startAt" />
                        <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                        <input type="hidden" id="group_Id" name="idGroup" value="${group_Id}">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2">
                                    <label>Tên cầu</label>
                                    <input type="text" class="form-control" name="tenCau" id="tenCau">
                                </div>
                                <div class="col-md-2">
                                    <label>Tên đường</label>
                                    <select class="form-control" name="idTuyenDuong" id="idTuyenDuong"></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Tên sông vượt</label>
                                    <input type="text" class="form-control" name="tenSongVuot" id="tenSongVuot">
                                </div>
                                <div class="col-md-2">
                                    <label>Lý trình tim cầu</label>
                                    <input type="text" class="form-control" name="lyTrinhKm" id="lyTrinhKm">
                                </div>
                                <div class="col-md-2">
                                    <label>Tọa độ long(x) tim cầu</label>
                                    <input type="text" class="form-control" name="toaDoLong" id="toaDoLong">
                                </div>
                                <div class="col-md-2">
                                    <label>Tọa độ lat(y) tim cầu</label>
                                    <input type="text" class="form-control" name="toaDoLat" id="toaDoLat">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2">
                                    <label>Địa danh huyện/TP</label>
                                    <select class="form-control" name="idHuyen" id="idHuyen"></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Hạt quản lý</label>
                                    <select class="form-control" name="idGroup" id="idGroup"></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Năm xây dựng</label>
                                    <input type="text" class="form-control" name="namXD" id="namXD">
                                </div>
                                <div class="col-md-2">
                                    <label>Năm khai thác</label>
                                    <input type="text" class="form-control" name="namKT" id="namKT">
                                </div>
                                <div class="col-md-2">
                                    <label>Tình trạng</label>
                                    <select class="form-control" name="tinhTrang" id="tinhTrang"></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Khu QLĐB/Sở GTVT</label>
                                    <select class="form-control" name="donViQL" id="donViQL"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <h4><b>Thông số kỹ thuật</b></h4>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2">
                                    <label>Chiều dài cầu (m)</label>
                                    <input type="text" class="form-control" name="chieuDai" id="chieuDai">
                                </div>
                                <div class="col-md-2">
                                    <label>Chiều rộng (m)</label>
                                    <input type="text" class="form-control" name="chieuRong" id="chieuRong">
                                </div>
                                <div class="col-md-2">
                                    <label>Bề rộng xe chạy (m)</label>
                                    <input type="text" class="form-control" name="beRong_XeChay" id="beRong_XeChay">
                                </div>
                                <div class="col-md-2">
                                    <label>Tĩnh không (m)</label>
                                    <input type="text" class="form-control" name="tinhKhong" id="tinhKhong">
                                </div>
                                <div class="col-md-2">
                                    <label>Tải trọng thiết kế</label>
                                    <input type="text" class="form-control" name="taiTrong_TK" id="taiTrong_TK">
                                </div>
                                <div class="col-md-2">
                                    <label>Tải trọng hiện tại khai thác</label>
                                    <input type="text" class="form-control" name="taiTrong_KT" id="taiTrong_KT">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-6">
                                    <h4><b>Kết cấu dầm nhịp</b></h4>
                                </div>
                                <div class="col-md-3">
                                    <h4><b>Kết cấu dưới mố</b></h4>
                                </div>
                                <div class="col-md-3">
                                    <h4><b>Kết cấu dưới trụ</b></h4>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-1">
                                    <label>Số nhịp</label>
                                    <input type="text" class="form-control" name="soNhip" id="soNhip">
                                </div>
                                <div class="col-md-1">
                                    <label>Sơ đồ nhịp</label>
                                    <input type="text" class="form-control" name="soDoNhip" id="soDoNhip">
                                </div>
                                <div class="col-md-2">
                                    <label>Chiều dài</label>
                                    <input type="text" class="form-control" name="daiNhip" id="daiNhip">
                                </div>
                                <div class="col-md-2">
                                    <label>Dạng cầu</label>
                                    <select class="form-control" name="dangCau" id="dangCau"></select>
                                </div>
                                <div class="col-md-1">
                                    <label>Móng</label>
                                    <select class="form-control" name="kCMo_Mong" id="kCMo_Mong"></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Thân</label>
                                    <select class="form-control" name="kCMo_Than" id="kCMo_Than"></select>
                                </div>
                                <div class="col-md-1">
                                    <label>Móng</label>
                                    <select class="form-control" name="kCTru_Mong" id="kCTru_Mong"></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Thân</label>
                                    <select class="form-control" name="kCTru_Than" id="kCTru_Than"></select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button type="button" class="btn btn-primary hidden" id="btnReport">
                                <i class="fa fa-file-excel-o"></i>&nbsp;Xuất excel cầu
                            </button>
                            <button type="button" class="btn btn-primary" id="btnSave">
                                <i class="fa fa-save"></i>&nbsp;Lưu
                            </button>
                            <button type="button" class="btn btn-primary" id="btnReset">
                                <i class="fa fa-plus-square"></i>&nbsp;Thêm mới cầu
                            </button>
                        </div>
                    </div>
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
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script type="text/javascript"
        src="<c:url value='/style/js/worklife/user/qltuyenduong/quanlycau.Form.js' />"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</html>
