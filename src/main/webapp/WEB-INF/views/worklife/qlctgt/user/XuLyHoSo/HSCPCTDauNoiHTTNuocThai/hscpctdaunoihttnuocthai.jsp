<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmTuyenDuongTheoHatImpl" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmQLThietBiBienBaoImpl" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.DmXaVO" %>
<%@ page import="java.util.List" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.DmHuyenVO" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>Cấp phép đầu nối hệ thống thoát nước thải</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <script type="text/javascript">
        <%
        try{
            DmTuyenDuongTheoHatImpl bean = vn.worklife.utils.BeanUtil.getBean(DmTuyenDuongTheoHatImpl.class);
            List<DmHuyenVO> listIdHuyen = bean.selectHuyen();
            ObjectMapper objectMapper = new ObjectMapper();
            out.write("let listIdHuyen = ");
            out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(listIdHuyen));
            out.write(";");

            DmQLThietBiBienBaoImpl beanx = vn.worklife.utils.BeanUtil.getBean(DmQLThietBiBienBaoImpl.class);
            List<DmXaVO> listIdXa = beanx.selectDmXaByIdHuyen(-1);
            ObjectMapper objectMapperx = new ObjectMapper();
            out.write("let listIdXa = ");
            out.write(objectMapperx.writerWithDefaultPrettyPrinter().writeValueAsString(listIdXa));
            out.write(";");
        }catch (Exception e){
            e.printStackTrace();
        }
        %>
    </script>
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
                    <h3><b>CẤP PHÉP THI CÔNG CÔNG TRÌNH ĐẤU NỐI HỆ THỐNG THOÁT NƯỚC THẢI</b></h3>
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
                                    <li id="tabGiayPhep"><a>Giấy phép thi công</a></li>
                                    <li id="tabThuPhiKyQuy"><a>Thông báo thu phí/Ký quỹ</a></li>
                                </ul>
                                <div class="tab-content">
                                    <form id="formThongTinCT">
                                        <input type="hidden" id="isInsertSuccessfully" value="${message}"/>
                                        <input type="hidden" name="idHoSo" id="hs" value="${idHoSo eq null?-1:idHoSo}">
                                        <input type="hidden" name="idLoaiHoSo" value="${idLoaiHoSo eq null?-1:idLoaiHoSo}">
                                        <input type="hidden" name="user_Nhan" value="${user_Nhan eq null?-1:user_Nhan}">
                                        <input type="hidden" name="idCongTrinh" value="${idCongTrinh eq null?-1:idCongTrinh}">
                                        <input type="hidden" name="idDoanhNghiep" value="${idDoanhNghiep eq null?-1:idDoanhNghiep}">
                                        <input type="hidden" name="idgp" value="${idgp eq null?-1:idgp}">
                                        <input type="hidden" name="idct_Huyen" value="${idct_Huyen eq null?-1:idct_Huyen}">
                                        <input type="hidden" name="idctct" value="${idctct eq null?-1:idctct}">
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
                                                                <label>Loại công trình</label>
                                                                <input type="text" class="form-control" name="tenLoai" value="${congTrinhVO.tenLoai}">
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label>Tên công trình</label>
                                                                <input type="text" class="form-control" name="tenCongTrinh" value="${congTrinhVO.tenCongTrinh}">
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label>Tên hạng mục</label>
                                                                <input type="text" class="form-control" name="tenHangMuc" value="${congTrinhVO.tenHangMuc}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-4">
                                                                <label>Lý trình</label>
                                                                <input type="text" class="form-control" name="congTrinhChiTietVO.lyTrinh"  value="${congTrinhChiTietVO.lyTrinh}">
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Tuyến đường</label>
                                                                <input type="text" class="form-control" name="congTrinhChiTietVO.tenDuong" id="tenDuong" value="${congTrinhChiTietVO.tenDuong}">
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Huyện/TP/TX</label>
                                                                <select type="text" class="form-control" name="congTrinhChiTietVO.idHuyen" id="idHuyen" <%--data="${congTrinhChiTietVO.idHuyen}"--%>></select>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Xã/Phường</label>
                                                                <select type="text" class="form-control" name="congTrinhChiTietVO.idXa" id="idXa" <%--data="${congTrinhChiTietVO.idXa}"--%> ></select>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Hồ sơ đề nghị cấp phép (số, ngày)</label>
                                                                <input type="text" class="form-control" name="donXinCP"  value="${congTrinhVO.donXinCP}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Nội dung cấp phép</label>
                                                            <c:if test="${congTrinhVO.noiDung_CapPhep == ''}">
                                                                <textarea class="form-control" rows="3" id="noiDung_CapPhep" name="noiDung_CapPhep"></textarea>
                                                            </c:if>
                                                            <c:if test="${congTrinhVO.noiDung_CapPhep != ''}">
                                                                <textarea class="form-control" rows="3" id="noiDung_CapPhep" name="noiDung_CapPhep">${congTrinhVO.noiDung_CapPhep}</textarea>
                                                            </c:if>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Phạm vi công trình</label>
                                                            <textarea class="form-control" rows="3" name="phamVi_CapPhep">${congTrinhVO.phamVi_CapPhep}</textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-2">
                                                                <label>Thời hạn cấp phép(ngày)</label>
                                                                <c:if test="${congTrinhVO.thoiHan eq null}">
                                                                    <input type="text" class="form-control decimalNumber" name="thoiHan" id="thoiHan" value="${hoSoVO.thoiHan==0?"":hoSoVO.thoiHan}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.thoiHan != null}">
                                                                    <input type="text" class="form-control decimalNumber" name="thoiHan" id="thoiHan" value="${congTrinhVO.thoiHan=='0'?"":congTrinhVO.thoiHan}">
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
                                                        </div>
                                                    </div>
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
                                                                <button type="button" class="btn btn-primary" id="btnSaveTTCT">
                                                                    <i class="fa fa-save"></i>&nbsp;Lưu
                                                                </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <form id="formgiayPhepThiCong">
                                        <div id="giayPhepCongTrinh" class="tab-pane hidden">
                                            <input type="hidden" name="idHoSo" value="${idHoSo eq null?-1:idHoSo}">
                                            <input type="hidden" name="idCongTrinh" value="${idCongTrinh eq null?-1:idCongTrinh}">
                                            <input type="hidden" name="idgp" id="idgp" value="${idgp eq null?-1:idgp}">
                                            <div class="ibox float-e-margins m-n">
                                                <div class="ibox-content">
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <textarea  class="form-control middle" style="font-weight:bold ;" rows="3" name="tieuDe" id="tieuDe"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Căn cứ pháp lý</label>
                                                            <textarea class="form-control" rows="8" name="canCu" id="canCu"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12 text-right">
                                                            <a id="layLaiGP">Lấy lại nội dung</a>
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
                                                            <div class="col-md-1">
                                                                <label>Chức vụ</label>
                                                                <input type="text" class="form-control" name="chucVuGP" id="chucVuGP">
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Ủy quyền</label>
                                                                <input type="text" class="form-control" name="uyQuyenGP" id="uyQuyenGP">
                                                            </div>
                                                            <div class="col-md-1">
                                                                <label>Số văn bản</label>
                                                                <input type="text" class="form-control" name="gp_So" id="gp_So">
                                                            </div>
                                                            <div class="col-md-2" style="margin: 26px 0 0 -20px">
                                                                <input type="text" class="form-control" id="kyHieuGP">
                                                            </div>
                                                            <div class="col-md-1">
                                                                <label>Ngày cấp phép</label>
                                                                <input type="text" disabled class="form-control datepicker " data-mask="99/99/9999" name="gp_Ngay" id="gp_Ngay">
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
                                    <form id="formTBThuPhiKyQuy">
                                        <div id="tBThuPhiKyQuy" class="tab-pane hidden">
                                            <input type="hidden" name="idHoSo" value="${idHoSo eq null?-1:idHoSo}">
                                            <input type="hidden" name="idCongTrinh" value="${idCongTrinh eq null?-1:idCongTrinh}">
                                            <div class="ibox float-e-margins m-n">
                                                <div class="ibox-content">
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <textarea  class="form-control middle" style="font-weight:bold ;" rows="2" name="tieuDe" ></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Căn cứ pháp lý</label>
                                                            <textarea class="form-control" rows="7" name="canCu" ></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12 text-right">
                                                            <a id="layLaiGP2">Lấy lại nội dung</a>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <label>Nội dung giấy phép</label>
                                                            <textarea class="form-control" rows="25" name="noiDungGP"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="col-md-3">
                                                                <label>Nơi nhận</label>
                                                                <textarea rows="6" class="form-control" name="noiNhanGP" ></textarea>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Người ký</label>
                                                                <select class="form-control"  name="nguoiKyGP"></select>
                                                            </div>
                                                            <div class="col-md-1">
                                                                <label>Chức vụ</label>
                                                                <input type="text" class="form-control" name="chucVuGP" >
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Ủy quyền</label>
                                                                <input type="text" class="form-control" name="uyQuyenGP" >
                                                            </div>
                                                            <div class="col-md-1">
                                                                <label>Số văn bản</label>
                                                                <input type="text" class="form-control" name="gp_So" >
                                                            </div>
                                                            <div class="col-md-2" style="margin: 26px 0 0 -20px">
                                                                <input type="text" class="form-control" >
                                                            </div>
                                                            <div class="col-md-1">
                                                                <label>Ngày cấp phép</label>
                                                                <input type="text" disabled class="form-control datepicker " data-mask="99/99/9999" name="gp_Ngay" >
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ibox-content">
                                                    <div class="row">
                                                        <div class="col-md-12 text-right">
                                                            <button type="button" class="btn btn-primary hidden" id="btnReportG2">
                                                                <i class="fa fa-file-word-o"></i>&nbsp;In giấy phép
                                                            </button>
                                                            <button type="button" class="btn btn-primary" id="btnSaveG2">
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
<script type="text/javascript" src="<c:url value='/style/js/worklife/qlctgt/user/xulyhoso/hscpctdaunoihttnuocthai/hscpctdaunoihttnuocthai.Form.js' />"></script>
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
