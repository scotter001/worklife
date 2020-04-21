<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>Cấp phép thi công công trình đấu nối đường</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <style type="text/css">
        #ulTabXLHS > .active > a {
            background-color: #0177d7 !important;
            color: white !important;
            padding: 10px;
        }
        .nav-tabs a {
            background: rgb(232,125,55) !important;
            color: #FFFFFF !important;
            border: 1px solid white !important;
            padding: 10px !important;
        }
        .attackFile:hover .deleteFileIcon {
             display: inline!important;
        }
    </style>
</head>
<body class="top-navigation">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu_qlctgt.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>CẤP PHÉP THI CÔNG CÔNG TRÌNH ĐẤU NỐI ĐƯỜNG</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12 col-md-offset-1">
                            <div class="col-md-2">
                                <label>Số biên nhận</label>
                                <input type="text" class="form-control" id="soBienNhan" value="${hoSoVO.soBienNhan}" disabled/>
                            </div>
                            <div class="col-md-4">
                                <label>Loại hồ sơ</label>
                                <input type="text" class="form-control" id="tenLoaiHS" value="${hoSoVO.tenLoaiHS}" disabled>
                            </div>
                            <div class="col-md-2">
                                <label>Ngày nhận</label>
                                <input type="text" class="form-control" id="ngayNhan" value="${hoSoVO.ngayNhan}" disabled>
                            </div>
                            <div class="col-md-2">
                                <label>Ngày hẹn trả</label>
                                <input type="text" class="form-control" id="ngayHenTra" value="${hoSoVO.ngayHenTra}" disabled>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="tabs-container">
                                <ul class="nav nav-tabs" id="ulTabXLHS">
                                    <li class="active" id="thongTinCT"><a>Thông tin công trình</a></li>
                                    <li id="chapThuanCT"><a>Chấp thuận chủ trương</a></li>
                                    <c:if test="${hoSoVO.idLoaiHoSo == '4'}">
                                        <li id="giayPhepTC"><a>Giấy phép thi công</a></li>
                                    </c:if>
                                </ul>
                                <div class="tab-content">
                                    <form id="formThongTinCT">
                                        <input type="hidden" id="isInsertSuccessfully" value="${message}"/>
                                        <input type="hidden" name="idHoSo" value="${idHoSo eq null?-1:idHoSo}">
                                        <input type="hidden" name="idLoaiHoSo" value="${idLoaiHoSo eq null?-1:idLoaiHoSo}">
                                        <input type="hidden" name="user_Nhan" value="${user_Nhan eq null?-1:user_Nhan}">
                                        <input type="hidden" name="idCongTrinh" value="${idCongTrinh eq null?-1:idCongTrinh}">
                                        <input type="hidden" name="idDoanhNghiep" value="${idDoanhNghiep eq null?-1:idDoanhNghiep}">
                                        <input type="hidden" name="idgp" value="${idgp eq null?-1:idgp}">
                                        <input type="hidden" name="idct_Huyen" value="${idct_Huyen eq null?-1:idct_Huyen}">
                                        <input type="hidden" id="sidHuyen" value="${idHuyen eq null?-1:idHuyen}">
                                        <input type="hidden" id="sidXa" value="${idXa eq null?-1:idXa}">
                                        <div id="thongtincongtrinh" class="tab-pane active">
                                            <div class="ibox float-e-margins m-n">
                                                <div class="ibox-content">
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-3">
                                                                <label>Tên đơn vị xin phép</label>
                                                                <c:if test="${congTrinhVO.tenDoanhNghiep eq null}">
                                                                    <input type="text" class="form-control" name="tenDoanhNghiep" value="${hoSoVO.tenDoanhNghiep}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.tenDoanhNghiep != null}">
                                                                    <input type="text" class="form-control" name="tenDoanhNghiep" value="${congTrinhVO.tenDoanhNghiep}">
                                                                </c:if>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Địa chỉ</label>
                                                                <c:if test="${congTrinhVO.diaChi_DN eq null}">
                                                                    <input type="text" class="form-control" name="diaChi_DN" value="${hoSoVO.diaChi_DN}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.diaChi_DN != null}">
                                                                    <input type="text" class="form-control" name="diaChi_DN" value="${congTrinhVO.diaChi_DN}">
                                                                </c:if>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Người đại diện</label>
                                                                <c:if test="${congTrinhVO.daiDien eq null}">
                                                                    <input type="text" class="form-control" name="daiDien" value="${hoSoVO.daiDien}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.daiDien != null}">
                                                                    <input type="text" class="form-control" name="daiDien" value="${congTrinhVO.daiDien}">
                                                                </c:if>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Chức vụ</label>
                                                                <c:if test="${congTrinhVO.chucVu eq null}">
                                                                    <input type="text" class="form-control" name="chucVu" value="${hoSoVO.chucVu}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.chucVu != null}">
                                                                    <input type="text" class="form-control" name="chucVu" value="${congTrinhVO.chucVu}">
                                                                </c:if>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Điện thoại</label>
                                                                <c:if test="${congTrinhVO.dienThoai eq null}">
                                                                    <input type="text" class="form-control" name="dienThoai" value="${hoSoVO.dienThoai}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.dienThoai != null}">
                                                                    <input type="text" class="form-control" name="dienThoai" value="${congTrinhVO.dienThoai}">
                                                                </c:if>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-4">
                                                                <label>Tên công trình</label>
                                                                <input type="text" class="form-control" name="tenCongTrinh" value="${congTrinhVO.tenCongTrinh}">
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label>Tên hạng mục</label>
                                                                <input type="text" class="form-control" name="tenHangMuc" value="${congTrinhVO.tenHangMuc}">
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label>Đơn vị thiết kế</label>
                                                                <input type="text" class="form-control" name="donViTK" value="${congTrinhVO.donViTK}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-5">
                                                                <label>Vị trí</label>
                                                                <input type="text" class="form-control" name="diaDiem_DiaChi" value="${congTrinhVO.diaDiem_DiaChi}">
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Huyện/TP/TX</label>
                                                                <select class="form-control" name="idHuyen" id="idHuyen"></select>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Xã/phường</label>
                                                                <select class="form-control" name="idXa" id="idXa"></select>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Số, ngày đơn</label>
                                                                <input type="text" class="form-control" name="donXinCP" value="${congTrinhVO.donXinCP}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-4">
                                                                <label>Tên dự án</label>
                                                                <input type="text" class="form-control" name="tenDuAn" value="${congTrinhVO.tenDuAn}">
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Số, ngày Quyết định CTĐT</label>
                                                                <input type="text" class="form-control" name="qd_ctdt" value="${congTrinhVO.qd_ctdt}">
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Số, ngày GPXD</label>
                                                                <input type="text" class="form-control" name="gpxd" value="${congTrinhVO.gpxd}">
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Ngày BBKTHT</label>
                                                                <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="bbkt" value="${congTrinhVO.bbkt}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Nội dung cấp phép</label>
                                                            <c:if test="${congTrinhVO.noiDung_CapPhep eq null}">
                                                                <textarea class="form-control" rows="3" name="noiDung_CapPhep">Thi công xây dựng công trình</textarea>
                                                            </c:if>
                                                            <c:if test="${congTrinhVO.noiDung_CapPhep != null}">
                                                                <textarea class="form-control" rows="3" name="noiDung_CapPhep">${congTrinhVO.noiDung_CapPhep}</textarea>
                                                            </c:if>

                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Khối lượng</label>
                                                            <textarea class="form-control" rows="3" name="phamVi_CapPhep">${congTrinhVO.phamVi_CapPhep}</textarea>
                                                        </div>
                                                    </div>
                                                    <c:if test="${hoSoVO.idLoaiHoSo == '4'}">
                                                        <div class="row form-group">
                                                            <div class="col-md-12">
                                                                <div class="col-md-2">
                                                                    <label>Thời hạn cấp phép(ngày)</label>
                                                                    <c:if test="${giayPhepChapThuanVO eq null}">
                                                                        <input type="text" class="form-control decimalNumber" name="thoiHan" id="thoiHan" value="${hoSoVO.thoiHan==0?"":hoSoVO.thoiHan}">
                                                                    </c:if>
                                                                    <c:if test="${giayPhepChapThuanVO != null}">
                                                                        <input type="text" class="form-control decimalNumber" name="thoiHan" id="thoiHan" value="${giayPhepChapThuanVO.thoiHan=='0'?"":giayPhepChapThuanVO.thoiHan}">
                                                                    </c:if>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <label>Kể từ ngày</label>
                                                                    <input type="text" class="form-control datepicker" name="tuNgay" id="tuNgay" data-mask="99/99/9999" value="${congTrinhVO.tuNgay}">
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <label>Đến hết ngày</label>
                                                                    <input type="text" class="form-control datepicker" name="denNgay" id="denNgay" data-mask="99/99/9999" value="${congTrinhVO.denNgay}">
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label>Ghi chú thời hạn</label>
                                                                    <input type="text" class="form-control" name="ghiChu_ThoiHan" id="ghiChu_ThoiHan" value="${congTrinhVO.ghiChu_ThoiHan}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </c:if>
                                                    <div class="row">
                                                        <div class="col-md-12 col-md-offset-2">
                                                            <div class="col-md-8">
                                                                <label>Danh sách hồ sơ công trình</label>
                                                                <table class="table table-bordered table-hover dataTable" id="tableHoSo"
                                                                       aria-describedby="DataTables_Table_0_info" role="grid">
                                                                    <thead>
                                                                    <tr role="row">
                                                                        <th>
                                                                            <div style="margin-top: 5px;">
                                                                                <input type="checkbox" class="i-checks" id="checkAll">
                                                                            </div>
                                                                        </th>
                                                                        <th class="text-center">TT</th>
                                                                        <th class="text-center">Tên hồ sơ</th>
                                                                        <th class="text-center">File đính kèm</th>
                                                                        <th class="text-center"><span class="btn btn-white btn-sm"> <i class="fa fa-download"></i></span></th>
                                                                    </tr>
                                                                    </thead>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12 col-md-offset-2">
                                                            <div class="col-md-8">
                                                                <button id="btnAddHS" type="button" class="btn btn-primary btn-xs m-r-xs">
                                                                    <i class="fa fa-plus"></i>&nbsp;Thêm
                                                                </button>
                                                                <button id="btnDeleteHS" type="button" class="btn btn-primary btn-xs">
                                                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ibox-content">
                                                    <div class="row">
                                                        <div class="col-md-12 text-right">
                                                            <c:if test="${congTrinhVO.gp_So eq null or congTrinhVO.gp_So == ''}">
                                                                <button type="button" class="btn btn-primary" id="btnSaveTTCT">
                                                                    <i class="fa fa-save"></i>&nbsp;Lưu
                                                                </button>
                                                            </c:if>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <form id="vanBanChapThuan">
                                        <div id="chapthuanchutruong" class="tab-pane hidden">
                                            <input type="hidden" name="idCongTrinh" value="${idCongTrinh eq null?-1:idCongTrinh}">
                                            <input type="hidden" name="idVB" id="idVB" value="-1">
                                            <div class="ibox float-e-margins m-n">
                                                <div class="ibox-content">
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Về việc</label>
                                                            <textarea class="form-control" rows="2" name="veViec" id="veViec"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12 text-right">
                                                            <a id="layLaiND">Lấy lại nội dung</a>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Nội dung văn bản chấp thuận</label>
                                                            <textarea class="form-control" rows="12" name="noiDung" id="noiDung"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="col-md-3">
                                                                <label>Nơi nhận</label>
                                                                <textarea rows="3" class="form-control" name="noiNhan" id="noiNhan"></textarea>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Người ký</label>
                                                                <select class="form-control" id="nguoiKy" name="nguoiKy"></select>
                                                            </div>
                                                            <div class="col-md-1" style="width: 13%">
                                                                <label>Chức vụ</label>
                                                                <input type="text" class="form-control" name="chucVu" id="chucVu">
                                                            </div>
                                                            <div class="col-md-2" style="width: 12%">
                                                                <label>Ủy quyền</label>
                                                                <input type="text" class="form-control" name="uyQuyen" id="uyQuyen">
                                                            </div>
                                                            <div class="col-md-1" style="width: 10.4%">
                                                                <label>Số văn bản</label>
                                                                <input type="text" class="form-control" name="vb_So" id="vb_So">
                                                            </div>
                                                            <div class="col-md-2" style="margin: 26px 0 0 -20px; width: 12%">
                                                                <input type="text" class="form-control" id="kyHieu">
                                                            </div>
                                                            <div class="col-md-1" style="width: 12%">
                                                                <label>Ngày văn bản</label>
                                                                <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="vb_Ngay" id="vb_Ngay" disabled>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ibox-content">
                                                    <div class="row">
                                                        <div class="col-md-12 text-right">
                                                            <button type="button" class="btn btn-primary hidden" id="btnReportVBCT">
                                                                <i class="fa fa-file-word-o"></i>&nbsp;In văn bản chấp thuận
                                                            </button>
                                                            <button type="button" class="btn btn-primary" id="btnSaveVBCT">
                                                                <i class="fa fa-save"></i>&nbsp;Lưu
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <form id="giayPhepCT">
                                        <div id="tabgiayphepct" class="tab-pane hidden">
                                            <input type="hidden" name="idHoSo" value="${idHoSo eq null?-1:idHoSo}">
                                            <input type="hidden" name="idCongTrinh" value="${idCongTrinh eq null?-1:idCongTrinh}">
                                            <input type="hidden" name="idgp" value="${idgp eq null?-1:idgp}">
                                            <div class="ibox float-e-margins m-n">
                                                <div class="ibox-content">
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <textarea class="form-control" rows="3" name="tieuDe" id="tieuDe"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Căn cứ</label>
                                                            <textarea class="form-control" rows="10" name="canCu" id="canCu"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12 text-right">
                                                            <a id="layLaiNDCP">Lấy lại nội dung</a>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Nội dung giấy phép</label>
                                                            <textarea class="form-control" rows="25" name="noiDungGP" id="noiDungGP"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="col-md-3">
                                                                <label>Nơi nhận</label>
                                                                <textarea rows="6" class="form-control" name="noiNhanGP" id="noiNhanGP"></textarea>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Người ký</label>
                                                                <select class="form-control" id="nguoiKyGP" name="nguoiKyGP"></select>
                                                            </div>
                                                            <div class="col-md-1" style="width: 13%">
                                                                <label>Chức vụ</label>
                                                                <input type="text" class="form-control" name="chucVuGP" id="chucVuGP">
                                                            </div>
                                                            <div class="col-md-2" style="width: 12%">
                                                                <label>Ủy quyền</label>
                                                                <input type="text" class="form-control" name="uyQuyenGP" id="uyQuyenGP">
                                                            </div>
                                                            <div class="col-md-1" style="width: 10.4%">
                                                                <label>Số giấy phép</label>
                                                                <input type="text" class="form-control" name="gp_So" id="gp_So">
                                                            </div>
                                                            <div class="col-md-2" style="margin: 26px 0 0 -20px; width: 12%">
                                                                <input type="text" class="form-control" id="kyHieuGP">
                                                            </div>
                                                            <div class="col-md-1" style="width: 12%">
                                                                <label>Ngày giấy phép</label>
                                                                <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="gp_Ngay" id="gp_Ngay" disabled>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ibox-content">
                                                    <div class="row">
                                                        <div class="col-md-12 text-right">
                                                            <button type="button" class="btn btn-primary hidden" id="btnReportGP">
                                                                <i class="fa fa-file-word-o"></i>&nbsp;In giấy phép
                                                            </button>
                                                            <button type="button" class="btn btn-primary" id="btnSaveGP">
                                                                <i class="fa fa-save"></i>&nbsp;Lưu
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
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
<%--<script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>--%>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/qlctgt/user/xulyhoso/hscpctdaunoiduong/hscpctdaunoiduong.Form.js' />"></script>
<script type="text/javascript">
    let multiLanguage = {
        attackfile : '<spring:message code="label.attackfile"/>',
        notify : '<spring:message code="label.notify"/>',
        deleteconfirm : '<spring:message code="validate.paperfile.deleteconfirm"/>',
        accept : '<spring:message code="label.accept"/>',
        cancel : '<spring:message code="label.cancel"/>',
        deletesuccesfully : '<spring:message code="label.drawingdesign.info.delsuccess"/>',
    };
    let url = "${pageContext.request.contextPath}";
</script>
</html>
