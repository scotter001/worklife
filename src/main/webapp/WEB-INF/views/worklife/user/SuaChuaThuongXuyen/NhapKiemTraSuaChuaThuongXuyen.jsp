<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmTuyenDuongTheoHatImpl" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.TuyenDuongHatVO" %>
<%@ page import="java.util.List" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>NHẬP KIỂM TRA SỬA CHỮA THƯỜNG XUYÊN</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <link href="<c:url value='/style/css/others/inspinia/plugins/jasny/jasny-bootstrap.min.css' />" rel="stylesheet">
    <script type="text/javascript">
        <%
        try{
         DmTuyenDuongTheoHatImpl bean = vn.worklife.utils.BeanUtil.getBean(DmTuyenDuongTheoHatImpl.class);
         List<TuyenDuongHatVO> lstTD =  bean.selectListTuyenDuong();
         ObjectMapper objectMapper = new ObjectMapper();
         out.write("let listIdTuyenDuong = ");
         out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD));
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
        <!-- HEADER -->
        <%@ include file="../../nav/topmenu.jsp" %>
        <!-- BODY -->
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>NHẬP KIỂM TRA SỬA CHỮA THƯỜNG XUYÊN</b></h3>
                </div>
                <div class="ibox-content">
                    <form id="formNhapKiemTraSCTX">
                        <input type="hidden" value="${tuan}" id="txtTuan">
                        <input type="hidden" value="${nam}" id="txtNam">
                        <input type="hidden" id="group_Id" name="idGroup" value="${group_Id}">
                        <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                        <div class="row top-buffer">
                            <div class="col-md-12" style="margin-top: 20px">
                                <div class="col-md-1 col-md-offset-4">
                                    <label>Quý*</label>
                                    <select id="selQuy" class="form-control">
                                        <option value="1">Quý I</option>
                                        <option value="2">Quý II</option>
                                        <option value="3">Quý III</option>
                                        <option value="4">Quý VI</option>
                                    </select>
                                </div>
                                <div class="col-md-1">
                                    <label>Năm*</label>
                                    <select id="selNam" class="form-control"></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Tình trạng*</label>
                                    <select id="selTinhTrang" class="form-control">
                                        <option value="-1"></option>
                                        <option value="0">Chưa thực hiện</option>
                                        <option value="1">Đã thực hiện</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12" style="margin-top: 40px;margin-left: 5px">
                                <div class="col-md-12">
                                    <label>Kế hoạch sửa chữa thường xuyên</label>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="col-md-12">
                                    <table id="tableNhapKiemTraSCTX" class="table table-bordered table-hover dataTable" style="width: 100%;">
                                        <thead>
                                        <tr>
                                            <th class="text-center" style="min-width: 50px">TT</th>
                                            <th class="text-center" style="min-width: 170px">Tuyến đường</th>
                                            <th class="text-center" style="min-width: 150px">Lý trình</th>
                                            <th class="text-center" style="min-width: 200px">Nội dung công việc</th>
                                            <th class="text-center" style="min-width: 150px">Khối lượng</th>
                                            <th class="text-center" style="min-width: 200px">Thời gian thực hiện</th>
                                            <th class="text-center" style="min-width: 150px">Ghi chú</th>
                                            <th class="text-center" style="min-width: 150px">Ngày kiểm tra</th>
                                            <th class="text-center" style="min-width: 150px">Tình trạng</th>
                                            <th class="text-center" style="min-width: 200px">Nhận xét, đánh giá</th>
                                            <th class="text-center" style="min-width: 150px">Người kiểm tra</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12" style="margin-top: 40px">
                            <div class="col-md-12 text-right">
                                <button type="button" style="margin-right: 8px" class="btn btn-primary" id="btnXuatExcel"><i class="fa fa-file-excel-o"></i>&nbsp;Xuất excel</button>
                                <button type="button" class="btn btn-primary" id="btnSave"><i class="fa fa-save"></i>&nbsp;Lưu</button>&nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- FOOTER -->
        <%@ include file="../../nav/footer.jsp" %>
    </div>
</div>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script src="<c:url value='/style/js/worklife/public/utils.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/worklife/user/nhapkiemtrasctx/nhapkiemtrasctx.Init.js'/>"
        type="text/javascript"></script>
<script src="<c:url value='/style/js/worklife/user/nhapkiemtrasctx/nhapkiemtrasctx.Form.js'/>"
        type="text/javascript"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</body>
</html>