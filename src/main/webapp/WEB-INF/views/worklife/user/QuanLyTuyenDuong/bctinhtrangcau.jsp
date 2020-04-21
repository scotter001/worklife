<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.TTChiTietTuyenDuongTheoHatImpl" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.DmTinhTrangDuongVO" %>
<%@ page import="java.util.List" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Báo cáo tình trạng cầu</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <script type="text/javascript">
        <%
        try{
            TTChiTietTuyenDuongTheoHatImpl bean = vn.worklife.utils.BeanUtil.getBean(TTChiTietTuyenDuongTheoHatImpl.class);
            List<DmTinhTrangDuongVO> listTTDuong = bean.selectListTTDuong();
            ObjectMapper objectMapper = new ObjectMapper();
            out.write("let listTTDuong = ");
            out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(listTTDuong));
            out.write(";");
        }catch (Exception e){
            e.printStackTrace();
        }
        %>
    </script>
</head>
<body class="top-navigation">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>BÁO CÁO TÌNH TRẠNG CẦU</b></h3>
                </div>
                <form id="formBCTTCau">
                    <div class="ibox-content">
                        <input type="hidden" id="group_Id" value="${group_Id}">
                        <div class="row">
                            <div class="col-md-12 col-md-offset-2">
                                <div class="col-md-2">
                                    <label>Quý</label>
                                    <select class="form-control" name="quy" id="quy">
                                        <option value="1">Quý I</option>
                                        <option value="2">Quý II</option>
                                        <option value="3">Quý III</option>
                                        <option value="4">Quý IV</option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label>Năm</label>
                                    <select class="form-control" name="nam" id="nam"></select>
                                </div>
                                <div class="col-md-3">
                                    <label>Hạt quản lý</label>
                                    <select class="form-control" id="hatQuanLy"></select>
                                </div>
                                <%--<div class="col-md-1">
                                    <button type="button" class="btn btn-primary" id="btnTim" style="margin-top: 25px">
                                        <i class="fa fa-search"></i>&nbsp;Tìm
                                    </button>
                                </div>--%>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-bordered table-hover" id="tableDSBaoCaoTTCau"
                                       style="width: 100%;margin-bottom: 0!important;">
                                    <thead>
                                    <tr style="display: none">
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                    </tr>
                                    <tr>
                                        <th class="text-center" rowspan="2" style="min-width: 50px">TT</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Tên cầu</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Tên đường</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Tên sông suối<br>(vượt)</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Địa danh huyện</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Lý trình</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Tình trạng<br>mặt đường</th>
                                        <th class="text-center" rowspan="2" style="min-width: 300px">Ghi chú</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Chiều dài<br>(m)</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Chiều rộng<br>(m)</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Bề rộng<br>xe chạy (m)</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Tĩnh không<br>(m)</th>
                                        <th class="text-center" colspan="4" style="min-width: 600px">Kết cấu dầm nhịp (nhịp/m)</th>
                                        <th class="text-center" colspan="2" style="min-width: 300px">Kết cấu dưới mố</th>
                                        <th class="text-center" colspan="2" style="min-width: 300px">Kết cấu dưới trụ</th>
                                        <th class="text-center" colspan="2" style="min-width: 300px">Tải trọng</th>
                                        <th class="text-center" rowspan="2" style="min-width: 300px">Năm xây dựng</th>
                                        <th class="text-center" rowspan="2" style="min-width: 300px">Năm khai thác</th>
                                        <th class="text-center" rowspan="2" style="min-width: 300px">Đơn vị quản lý</th>
                                    </tr>
                                    <tr>
                                        <th class="text-center">Số nhịp</th>
                                        <th class="text-center">Sơ đồ nhịp</th>
                                        <th class="text-center">Chiều dài (m)</th>
                                        <th class="text-center">Loại</th>
                                        <th class="text-center">Móng</th>
                                        <th class="text-center">Thân</th>
                                        <th class="text-center">Móng</th>
                                        <th class="text-center">Thân</th>
                                        <th class="text-center">Thiết kế</th>
                                        <th class="text-center">Hiện tại</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-2" style="top: -7px">
                                <div class="checkbox checkbox-primary">
                                    <input id="htbaocao" type="checkbox">
                                    <label for="htbaocao">Hoàn thành báo cáo</label>
                                </div>
                            </div>
                            <div class="col-md-1" style="top: 5px">
                                <label>Ngày báo cáo</label>
                            </div>
                            <div class="col-md-2">
                                <input type="text" class="form-control" id="ngayBaoCao" disabled>
                            </div>
                            <div class="col-md-7 text-right">
                                <button type="button" class="btn btn-primary" id="btnReportExcel">
                                    <i class="fa fa-file-excel-o"></i>&nbsp;Xuất excel
                                </button>
                                <button type="button" class="btn btn-primary" id="btnSave">
                                    <i class="fa fa-save"></i>&nbsp;Lưu
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
</div>
</body>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>
<script type="text/javascript"
        src="<c:url value='/style/js/worklife/user/qltuyenduong/bctinhtrangcau.Form.js' />"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</html>
