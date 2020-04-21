<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmTuyenDuongTheoHatImpl" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.DmHuyenVO" %>
<%@ page import="java.util.List" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmQLThietBiBienBaoImpl" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.DmXaVO" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>Cấp phép thi công công trình thiết yếu</title>
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
                    <h3><b>CẤP PHÉP THI CÔNG CÔNG TRÌNH THIẾT YẾU</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row form-group">
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
                                    <li class="active" id="thongTinCTTY"><a>Thông tin công trình</a></li>
                                    <li id="chapThuanCTTY"><a>Chấp thuận chủ trương</a></li>
                                    <c:if test="${hoSoVO.idLoaiHoSo == '6'}">
                                        <li id="giayPhepTCTY"><a>Giấy phép thi công</a></li>
                                    </c:if>
                                    <c:if test="${hoSoVO.idLoaiHoSo == '6'}">
                                        <li id="thuPhiKyQuy"><a>Thông báo thu phí/ký quỹ</a></li>
                                    </c:if>
                                </ul>
                                <div class="tab-content">
                                    <form id="formThongTinCTTY">
                                        <input type="hidden" id="isInsertSuccessfully" value="${message}"/>
                                        <input type="hidden" name="idHoSo" value="${idHoSo eq null?-1:idHoSo}">
                                        <input type="hidden" name="idLoaiHoSo" value="${idLoaiHoSo eq null?-1:idLoaiHoSo}">
                                        <input type="hidden" name="user_Nhan" value="${user_Nhan eq null?-1:user_Nhan}">
                                        <input type="hidden" name="idCongTrinh" id="idCongTrinh" value="${idCongTrinh eq null?-1:idCongTrinh}">
                                        <input type="hidden" id="sidLoaiCongTrinh" value="${idLoaiCongTrinh eq null?-1:idLoaiCongTrinh}">
                                        <input type="hidden" name="idDoanhNghiep" id="idDoanhNghiep" value="${idDoanhNghiep eq null?-1:idDoanhNghiep}">
                                        <input type="hidden" name="idgp" id="idgp" value="${idgp eq null?-1:idgp}">
                                        <input type="hidden" id="sidHuyen" value="${idHuyen eq null?-1:idHuyen}">
                                        <input type="hidden" id="sidXa" value="${idXa eq null?-1:idXa}">
                                        <div id="tabttctthietyeu" class="tab-pane active">
                                            <div class="ibox float-e-margins m-n">
                                                <div class="ibox-content">
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-3">
                                                                <label>Tên đơn vị xin phép</label>
                                                                <c:if test="${congTrinhVO.tenDoanhNghiep eq null}">
                                                                    <input type="text" class="form-control" name="tenDoanhNghiep" id="tenDoanhNghiep" value="${hoSoVO.tenDoanhNghiep}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.tenDoanhNghiep != null}">
                                                                    <input type="text" class="form-control" name="tenDoanhNghiep" id="tenDoanhNghiep" value="${congTrinhVO.tenDoanhNghiep}">
                                                                </c:if>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Địa chỉ</label>
                                                                <c:if test="${congTrinhVO.diaChi_DN eq null}">
                                                                    <input type="text" class="form-control" name="diaChi_DN" id="diaChi_DN" value="${hoSoVO.diaChi_DN}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.diaChi_DN != null}">
                                                                    <input type="text" class="form-control" name="diaChi_DN" id="diaChi_DN" value="${congTrinhVO.diaChi_DN}">
                                                                </c:if>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Người đại diện</label>
                                                                <c:if test="${congTrinhVO.daiDien eq null}">
                                                                    <input type="text" class="form-control" name="daiDien" id="daiDien" value="${hoSoVO.daiDien}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.daiDien != null}">
                                                                    <input type="text" class="form-control" name="daiDien" id="daiDien" value="${congTrinhVO.daiDien}">
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
                                                                    <input type="text" class="form-control" name="dienThoai" id="dienThoai" value="${hoSoVO.dienThoai}">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.dienThoai != null}">
                                                                    <input type="text" class="form-control" name="dienThoai" id="dienThoai" value="${congTrinhVO.dienThoai}">
                                                                </c:if>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-4">
                                                                <label>Loại hình</label>
                                                                <select class="form-control" name="idLoaiCongTrinh" id="idLoaiCongTrinh">
                                                                    <option value="-1"></option>
                                                                    <c:forEach items="${listData}" var="idLoaiCT">
                                                                        <option value="${idLoaiCT.id}" ${congTrinhVO.idLoaiCongTrinh==idLoaiCT.id?"selected":""}>${idLoaiCT.ten}</option>
                                                                    </c:forEach>
                                                                </select>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Loại công trình</label>
                                                                <input type="text" class="form-control" name="tenLoai" value="${congTrinhVO.tenLoai}">
                                                            </div>
                                                            <div class="col-md-5">
                                                                <label>Tên công trình</label>
                                                                <input type="text" class="form-control" name="tenCongTrinh"  value="${congTrinhVO.tenCongTrinh}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-9">
                                                                <label>Tên hạng mục</label>
                                                                <c:if test="${congTrinhVO.tenHangMuc eq null}">
                                                                    <input type="text" class="form-control" name="tenHangMuc" id="tenHangMuc" value="Đào vỉa hè đấu nối đường cống thoát nước thải, nước mưa">
                                                                </c:if>
                                                                <c:if test="${congTrinhVO.tenHangMuc != null}">
                                                                    <input type="text" class="form-control" name="tenHangMuc"  value="${congTrinhVO.tenHangMuc}">
                                                                </c:if>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>HS đề nghị cấp phép(số, ngày)</label>
                                                                <input type="text" class="form-control" name="donXinCP" value="${congTrinhVO.donXinCP}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-2">
                                                                <label>Phạm vi công trình</label>
                                                            </div>
                                                            <input type="hidden" name="nhieuDuong" id="nhieuDuong">
                                                            <div class="col-md-2">
                                                                <div class="radio radio-info radio-inline">
                                                                    <input type="radio" id="rb1" name="rbGroup" checked="">
                                                                    <label for="rb1">Một tuyến đường</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <div class="radio radio-inline">
                                                                    <input type="radio" id="rb2" name="rbGroup">
                                                                    <label for="rb2">Nhiều tuyến đường</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group" id="diaDiemDuong">
                                                        <div class="col-md-12">
                                                            <div class="col-md-2">
                                                                <label>Tên tuyến đường</label>
                                                                <input type="text" class="form-control" name="congTrinhChiTietVO.tenDuong" id="tenDuong">
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Tên huyện/TP/TX</label>
                                                                <select class="form-control" name="congTrinhChiTietVO.idHuyen" id="idHuyen"></select>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Tên phường/xã</label>
                                                                <select class="form-control" name="congTrinhChiTietVO.idXa" id="idXa"></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group" id="phamViCT">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <label>Phạm vi công trình</label>
                                                                <textarea class="form-control" rows="3" name="congTrinhChiTietVO.dienGiai" id="dienGiai"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group hidden" id="tableND">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <table class="table table-bordered table-hover dataTable" id="tableNhieuTD" style="width: 100%;">
                                                                    <thead>
                                                                    <tr>
                                                                        <th class="text-center"><input type="checkbox" class="i-checks" id="checkAll"></th>
                                                                        <th class="text-center">TT</th>
                                                                        <th class="text-center">Tên đường</th>
                                                                        <th class="text-center">Huyện/TP/TX</th>
                                                                        <th class="text-center">Phường/Xã</th>
                                                                        <th class="text-center">Lý trình, nội dung thi công</th>
                                                                    </tr>
                                                                    </thead>
                                                                </table>
                                                            </div>
                                                            <div class="col-md-12">
                                                                <button type="button" class="btn btn-xs btn-primary" id="btnAdd">
                                                                    <i class="fa fa-plus"></i>&nbsp;Thêm
                                                                </button>
                                                                <button type="button" class="btn btn-xs btn-primary" id="btnDel">
                                                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <label>Kích thước hố đào</label>
                                                                <textarea class="form-control" rows="3" name="phamVi_CapPhep">${congTrinhVO.phamVi_CapPhep}</textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <label>Địa điểm</label>
                                                                <a class="hidden" id="layDiaDiem" style="padding-left: 20px">Lấy địa điểm</a>
                                                                <textarea class="form-control" rows="2" name="diaDiem_DiaChi" id="diaDiem_DiaChi">${congTrinhVO.diaDiem_DiaChi}</textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <label>Nội dung cấp phép</label>
                                                                <a class="hidden" id="layNDCP" style="padding-left: 20px">Lấy nội dung cấp phép</a>
                                                                <textarea class="form-control" rows="3" name="noiDung_CapPhep" id="noiDung_CapPhep">${congTrinhVO.noiDung_CapPhep}</textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <c:if test="${hoSoVO.idLoaiHoSo == '6'}">
                                                        <div class="row form-group">
                                                            <div class="col-md-12">
                                                                <div class="col-md-2">
                                                                    <label>Thời hạn cấp phép(ngày)</label>
                                                                    <c:if test="${giayPhepChapThuanVO eq null}">
                                                                        <input type="text" class="form-control decimalNumber" name="thoiHan" id="thoiHan" value="${hoSoVO.thoiHanTY==0?"":hoSoVO.thoiHanTY}">
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
                                                                <table class="table table-bordered table-hover dataTable" id="tableTaiLieu" style="width: 100%;">
                                                                    <thead>
                                                                    <tr>
                                                                        <th class="text-center"><input type="checkbox" class="i-checkstl" id="checkAllTL"></th>
                                                                        <th class="text-center">TT</th>
                                                                        <th class="text-center">Tên hồ sơ</th>
                                                                        <th class="text-center">File đính kèm</th>
                                                                        <th class="text-center"><span class="btn btn-white btn-sm"> <i class="fa fa-download"></i></span></th>
                                                                    </tr>
                                                                    </thead>
                                                                </table>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <button id="btnAddTL" type="button" class="btn btn-primary btn-xs m-r-xs">
                                                                    <i class="fa fa-plus"></i>&nbsp;Thêm
                                                                </button>
                                                                <button id="btnDeleteTL" type="button" class="btn btn-primary btn-xs">
                                                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ibox-content">
                                                    <div class="row">
                                                        <div class="col-md-12 text-right">
                                                            <button type="button" class="btn btn-primary" id="btnSaveTT">
                                                                <i class="fa fa-save"></i>&nbsp;Lưu
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <form id="formVanBanCTTY">
                                        <div id="tabchapthuanct" class="tab-pane hidden">
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
                                                            <textarea class="form-control" rows="20" name="noiDung" id="noiDung"></textarea>
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
                                    <form id="giayPhepCTTY">
                                        <div id="tabgiayphepctty" class="tab-pane hidden">
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
                                                            <textarea class="form-control" rows="8" name="canCu" id="canCu"></textarea>
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
                                                            <textarea class="form-control" rows="30" name="noiDungGP" id="noiDungGP"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="col-md-3">
                                                                <label>Nơi nhận</label>
                                                                <textarea rows="7" class="form-control" name="noiNhanGP" id="noiNhanGP"></textarea>
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
                                    <form id="formThuPhiKQ">
                                        <div id="tabthuphikyquy" class="tab-pane hidden">
                                            <input type="hidden" name="idHoSo" value="${idHoSo eq null?-1:idHoSo}">
                                            <input type="hidden" name="idCongTrinh" value="${idCongTrinh eq null?-1:idCongTrinh}">
                                            <input type="hidden" name="idPhi" id="idPhi">
                                            <div class="ibox float-e-margins m-n">
                                                <div class="ibox-content">
                                                    <div class="row form-group" id="tinhPhi">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <label>Tính phí</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group" id="lbCongThuc">
                                                        <div class="col-md-12">
                                                            <div class="col-md-4" style="top: 20px;">
                                                                <table class="table table-bordered table-hover dataTable" id="tableCongThucThuPhi" style="width: 100%;">
                                                                    <thead>
                                                                    <tr>
                                                                        <th class="text-center"><input type="checkbox" class="i-checks" id="checkAllCT"></th>
                                                                        <th class="text-center">Công thức</th>
                                                                        <th class="text-center">Diện tích</th>
                                                                    </tr>
                                                                    </thead>
                                                                </table>
                                                                <button type="button" class="btn btn-xs btn-primary" id="btnAddCT">
                                                                    <i class="fa fa-plus"></i>&nbsp;Thêm
                                                                </button>
                                                                <button type="button" class="btn btn-xs btn-primary" id="btnDelCT">
                                                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                                                </button>
                                                            </div>
                                                            <div class="col-md-3 form-group">
                                                                <label>Đơn giá tháng</label>
                                                                <input type="text" class="form-control" name="donGia_Thang" id="donGia_Thang">
                                                            </div>
                                                            <div class="col-md-3 form-group">
                                                                <label>Tương ứng ngày(đồng/m2/ngày)</label>
                                                                <input type="text" class="form-control" name="donGia_Ngay" id="donGia_Ngay">
                                                            </div>
                                                            <div class="col-md-2 form-group" style="width: 15.5%">
                                                                <label>Thời hạn cấp phép(ngày)</label>
                                                                <input type="text" class="form-control" name="thoiHan" value="${giayPhepChapThuanVO eq null or giayPhepChapThuanVO.thoiHan=='0'?"":giayPhepChapThuanVO.thoiHan}" disabled>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Tổng diện tích đào(m2)</label>
                                                                <input type="text" class="form-control decimalNumber" name="tongDT" id="tongDT">
                                                            </div>
                                                            <div class="col-md-3">
                                                                <label>Mức phí phải nộp(Đồng)</label>
                                                                <input type="text" class="form-control" name="congThuc" id="congThuc">
                                                            </div>
                                                            <div class="col-md-2" style="top: 26px; left: -20px">
                                                                <input type="text" class="form-control" name="tienNop" id="tienNop">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group" style="margin-top: 30px">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <label>Thông báo phí thi công đào lấp lòng đường hè phố</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <label>Tiêu đề</label>
                                                                <textarea class="form-control" rows="3" name="tieuDeTB" id="tieuDeTB"></textarea>
                                                            </div>
                                                            <div class="col-md-12">
                                                                <textarea class="form-control text-center" rows="2" name="kinhGui" id="kinhGui"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <label>Căn cứ pháp lý</label>
                                                                <textarea class="form-control" rows="10" name="canCuTB" id="canCuTB"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row form-group">
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <label>Nội dung thông báo</label>
                                                                <textarea class="form-control" rows="15" name="noiDungTB" id="noiDungTB"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="col-md-3">
                                                                <label>Nơi nhận</label>
                                                                <textarea rows="3" class="form-control" name="noiNhanTB" id="noiNhanTB"></textarea>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <label>Người ký</label>
                                                                <select class="form-control" id="nguoiKyTB" name="nguoiKyTB"></select>
                                                            </div>
                                                            <div class="col-md-1" style="width: 13%">
                                                                <label>Chức vụ</label>
                                                                <input type="text" class="form-control" name="chucVuTB" id="chucVuTB">
                                                            </div>
                                                            <div class="col-md-2" style="width: 12%">
                                                                <label>Ủy quyền</label>
                                                                <input type="text" class="form-control" name="uyQuyenTB" id="uyQuyenTB">
                                                            </div>
                                                            <div class="col-md-1" style="width: 10.4%">
                                                                <label>Thông báo Số</label>
                                                                <input type="text" class="form-control" name="tb_So" id="tb_So">
                                                            </div>
                                                            <div class="col-md-2" style="margin: 26px 0 0 -20px; width: 12%">
                                                                <input type="text" class="form-control" id="kyHieuTB">
                                                            </div>
                                                            <div class="col-md-1" style="width: 12%">
                                                                <label>Ngày thông báo</label>
                                                                <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="gp_Ngay" id="tb_Ngay" disabled>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ibox-content">
                                                    <div class="row">
                                                        <div class="col-md-12 text-right">
                                                            <button type="button" class="btn btn-primary hidden" id="btnReportTB">
                                                                <i class="fa fa-file-word-o"></i>&nbsp;In thông báo
                                                            </button>
                                                            <button type="button" class="btn btn-primary" id="btnSaveTB">
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
<%@ include file="/WEB-INF/views/jspf/js.jspf"%>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf"%>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/qlctgt/user/xulyhoso/hscpctthietyeu/hscpctthietyeu.Form.js'/>"></script>
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
