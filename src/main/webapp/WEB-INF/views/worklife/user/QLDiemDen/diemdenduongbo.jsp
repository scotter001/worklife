<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
    <title>Điểm đen/Điểm tiềm ẩn giao thông đường bộ</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf"%>
    <%@ include file="/WEB-INF/views/jspf/css.jspf"%>
</head>
<body class="top-navigation">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>Điểm đen/điểm tiềm ẩn giao thông đường bộ</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row form-group">
                        <div class="col-md-12 col-md-offset-2">
                            <div class="col-md-2">
                                <label>Loại điểm</label>
                                <select class="form-control" id="selLoaiDiem">
                                    <option value="-1"></option>
                                    <option value="1">Điểm đen</option>
                                    <option value="2">Điểm tiềm ẩn tai nạn giao thông</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Địa bàn huyện/TP/TX</label>
                                <select class="form-control" id="huyenTP"></select>
                            </div>
                            <div class="col-md-3">
                                <label>Tên đường</label>
                                <input type="text" class="form-control" id="stenDuong"/>
                            </div>
                            <div class="col-md-1" style="top: 26px">
                                <button type="button" class="btn btn-primary" id="btnTim">
                                    <i class="fa fa-search"></i>&nbsp;Tìm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Danh sách điểm đen/điểm tiềm ẩn tai nạn giao thông</label>
                            <table class="table table-bordered table-hover" id="tableDSDiemDenDB" style="width: 100%">
                                <thead>
                                <tr>
                                    <th class="text-center">TT</th>
                                    <th class="text-center">Tên đường</th>
                                    <th class="text-center">Lý trình</th>
                                    <th class="text-center">Loại</th>
                                    <th class="text-center">Thuộc địa bàn huyện/TP/TX</th>
                                    <th class="text-center">Số vụ tai nạn</th>
                                    <th class="text-center">Năm</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label>Thông tin điểm đen</label>
                        </div>
                    </div>
                    <form id="formDiemDenDB">
                        <input type="hidden" name="idDiemDen" id="idDiemDen" value="${idDiemDen eq null?"-1":idDiemDen}">
                        <input type="hidden" value="${startAt eq null ? 0 : startAt}" id="startAt" />
                        <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-3">
                                    <label>Tên điểm đen</label>
                                    <input type="text" class="form-control" name="tenDiem" id="tenDiem">
                                </div>
                                <div class="col-md-3">
                                    <label>Tên đường</label>
                                    <select class="form-control" name="idTuyenDuong" id="idTuyenDuong"></select>
                                </div>
                                <div class="col-md-3">
                                    <label>Lý trình</label>
                                    <input type="text" class="form-control" name="lyTrinh" id="lyTrinh">
                                </div>
                                <div class="col-md-3">
                                    <label>Địa phận huyện/TP/TX</label>
                                    <select class="form-control" name="nhieuHuyen" id="nhieuHuyen" multiple="multiple"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-4">
                                    <label>Mô tả vị trí</label>
                                    <input type="text" class="form-control" name="moTaViTri" id="moTaViTri">
                                </div>
                                <div class="col-md-2">
                                    <label>Điểm đầu: TĐ Long(X)</label>
                                    <input type="text" class="form-control" name="diemDau_X" id="diemDau_X">
                                </div>
                                <div class="col-md-2">
                                    <label>TĐ Lat(Y)</label>
                                    <input type="text" class="form-control" name="diemDau_Y" id="diemDau_Y">
                                </div>
                                <div class="col-md-2">
                                    <label>Điểm cuối: TĐ Long(X)</label>
                                    <input type="text" class="form-control" name="diemCuoi_X" id="diemCuoi_X">
                                </div>
                                <div class="col-md-2">
                                    <label>TĐ Lat(Y)</label>
                                    <input type="text" class="form-control" name="diemCuoi_Y" id="diemCuoi_Y">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-1">
                                    <label>Năm</label>
                                    <input type="text" class="form-control" name="nam" id="nam">
                                </div>
                                <div class="col-md-2">
                                    <label>Số vụ TN/VC</label>
                                    <input type="text" class="form-control" name="vu_TN" id="vu_TN">
                                </div>
                                <div class="col-md-2">
                                    <label>Số vụ chết người</label>
                                    <input type="text" class="form-control" name="vu_Chet" id="vu_Chet">
                                </div>
                                <div class="col-md-2">
                                    <label>Số vụ người bị thương</label>
                                    <input type="text" class="form-control" name="vu_BiThuong" id="vu_BiThuong">
                                </div>
                                <div class="col-md-3">
                                    <label>Loại điểm</label>
                                    <select class="form-control" name="loai" id="loai">
                                        <option value="1">Điểm đen</option>
                                        <option value="2">Điểm tiềm ẩn tai nạn giao thông</option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label>Ngày xóa</label>
                                    <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="ngayXoa" id="ngayXoa">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Diễn giải</label>
                                <textarea class="form-control" rows="5" name="dienGiai" id="dienGiai"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button type="button" class="btn btn-primary" id="btnReset">
                                <i class="fa fa-plus-square"></i>&nbsp;Thêm mới
                            </button>
                            <button type="button" class="btn btn-primary" id="btnSave">
                                <i class="fa fa-save"></i>&nbsp;Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <%--FOOTER--%>
            <%@ include file="/WEB-INF/views/worklife/nav/footer.jsp" %>
        </div>
    </div>
</div>
</body>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script type="text/javascript"
        src="<c:url value='/style/js/worklife/user/qldiemden/diemdenduongbo.Form.js' />"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</html>
