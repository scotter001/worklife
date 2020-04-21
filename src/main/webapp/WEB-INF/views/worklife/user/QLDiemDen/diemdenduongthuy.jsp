<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
    <title>Điểm đen giao thông đường thủy</title>
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
                    <h3><b>Điểm đen giao thông đường thủy</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row form-group">
                        <div class="col-md-12 col-md-offset-2">
                            <div class="col-md-2">
                                <label>Trên sông/trên biển</label>
                                <select class="form-control" id="thuocSB">
                                    <option value="-1"></option>
                                    <option value="1">Trên sông</option>
                                    <option value="2">Trên biển</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Loại điểm</label>
                                <select class="form-control" id="loaiDiem">
                                    <option value="-1"></option>
                                    <option value="1">Điểm đen</option>
                                    <option value="2">Điểm tiềm ẩn tai nạn giao thông</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Địa bàn huyện/TP/TX</label>
                                <select class="form-control" id="huyenTP"></select>
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
                            <label>Danh sách điểm đen/điểm tiềm ẩn tai nạn giao thông đường thủy</label>
                            <table class="table table-bordered table-hover" id="tableDSDiemDenDT" style="width: 100%">
                                <thead>
                                <tr>
                                    <th class="text-center">TT</th>
                                    <th class="text-center">Tên điểm đen, điểm tiềm ẩn tai nạn giao thông</th>
                                    <th class="text-center">Lý trình</th>
                                    <th class="text-center">Trên sông/trên biển</th>
                                    <th class="text-center">Loại điểm</th>
                                    <th class="text-center">Tên sông, rạch</th>
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
                    <form id="formDiemDenDT">
                        <input type="hidden" name="idDiemDen" id="idDiemDen" value="${idDiemDen eq null?"-1":idDiemDen}">
                        <input type="hidden" value="${startAt eq null ? 0 : startAt}" id="startAt" />
                        <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2">
                                    <label>Tên điểm đen/tiềm ẩn</label>
                                    <input type="text" class="form-control" name="tenDiem" id="tenDiem">
                                </div>
                                <div class="col-md-2">
                                    <label>Lý trình đường thủy</label>
                                    <input type="text" class="form-control" name="lyTrinh" id="lyTrinh">
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
                                <div class="col-md-6">
                                    <label>Phạm vi, chiều dài(m)</label>
                                    <input type="text" class="form-control" name="phamVi_ChieuDai" id="phamVi_ChieuDai">
                                </div>
                                <div class="col-md-6">
                                    <label>Lý do tiềm ẩn nguy hiểm - Hiện trạng</label>
                                    <input type="text" class="form-control" name="lyDo_TiemAnNguyHiem" id="lyDo_TiemAnNguyHiem">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2" style="top: 17px">
                                    <input type="hidden" name="trenSong" id="trenSong" value="1">
                                    <div class="checkbox checkbox-primary">
                                        <input id="checkTrenBien" type="checkbox">
                                        <label for="checkTrenBien">Check trên biển</label>
                                    </div>
                                </div>
                                <div class="col-md-3" style="width: 15%">
                                    <label>Tên sông, kênh rạch</label>
                                    <input type="text" class="form-control" name="tenSong" id="tenSong">
                                </div>
                                <div class="col-md-3" style="width: 20%">
                                    <label>Chiều rộng sông/kênh(m)</label>
                                    <input type="text" class="form-control" name="rongSong" id="rongSong">
                                </div>
                                <div class="col-md-2 text-right" style="top: 30px;width: 25%">
                                    <label>Chuẩn tắc luồng tại vị trí nguy hiểm</label>
                                </div>
                                <div class="col-md-1" style="width: 12%">
                                    <label>Chiều rộng(m)</label>
                                    <input type="text" class="form-control" name="chieuRong" id="chieuRong">
                                </div>
                                <div class="col-md-1" style="width: 11%">
                                    <label>Chiều sâu(m)</label>
                                    <input type="text" class="form-control" name="chieuSau" id="chieuSau">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-3" style="top: 30px">
                                    <label>Báo Hiệu ĐTNĐ đã lắp đặt(ký hiệu - số lượng):</label>
                                </div>
                                <div class="col-md-3">
                                    <label>Báo hiệu chỉ giới hạn, vị trí luồng</label>
                                    <input type="text" class="form-control" placeholder="Ký hiệu - số lượng" name="bh_GioiHan" id="bh_GioiHan">
                                </div>
                                <div class="col-md-3">
                                    <label>BH chỉ VT nguy hiểm, VCN trên luồng</label>
                                    <input type="text" class="form-control" placeholder="Ký hiệu - số lượng" name="bh_NguyHiem" id="bh_NguyHiem">
                                </div>
                                <div class="col-md-3">
                                    <label>BH thông báo chỉ dẫn</label>
                                    <input type="text" class="form-control" placeholder="Ký hiệu - số lượng" name="bh_ChiDan" id="bh_ChiDan">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2">
                                    <label>Tĩnh không(m)</label>
                                    <input type="text" class="form-control" name="tinhKhong" id="tinhKhong">
                                </div>
                                <div class="col-md-4">
                                    <label>Tình trạng trụ chống va</label>
                                    <input type="text" class="form-control" name="tinhTrang_TruChongVa" id="tinhTrang_TruChongVa">
                                </div>
                                <div class="col-md-3">
                                    <label>Kết cấu trụ chống va</label>
                                    <input type="text" class="form-control" name="ketCau_TruChongVa" id="ketCau_TruChongVa">
                                </div>
                                <div class="col-md-3">
                                    <label>Đơn vị bảo trì</label>
                                    <input type="text" class="form-control" name="donVi_BaoTri" id="donVi_BaoTri">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Tình tình tai nạn giao thông</label>
                                <textarea class="form-control" rows="5" name="tinhHinh_TNGT" id="tinhHinh_TNGT"></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-3">
                                    <label>Địa phận huyện/TP/TX</label>
                                    <select class="form-control" name="nhieuHuyen" id="nhieuHuyen" multiple="multiple"></select>
                                </div>
                                <div class="col-md-1">
                                    <label>Năm</label>
                                    <input type="text" class="form-control" name="nam" id="nam">
                                </div>
                                <div class="col-md-3">
                                    <label>Phân loại</label>
                                    <select class="form-control" name="loai" id="loai">
                                        <option value="1">Điểm đen</option>
                                        <option value="2">Điểm tiềm ẩn tai nạn giao thông</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Thuộc tiêu chí</label>
                                    <select class="form-control" name="tieuChi_DiemDenGTThuy" id="tieuChi_DiemDenGTThuy"></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Ngày xóa</label>
                                    <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="ngayXoa" id="ngayXoa">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Ghi chú</label>
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
        src="<c:url value='/style/js/worklife/user/qldiemden/diemdenduongthuy.Form.js' />"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</html>
