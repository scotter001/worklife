<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmTuyenDuongTheoHatImpl" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.TuyenDuongHatVO" %>
<%@ page import="java.util.List" %>
<%@ page import="com.fasterxml.jackson.databind.util.BeanUtil" %>
<%@ page import="vn.worklife.user.mockup.model.DmDVTVO" %>
<%@ page import="vn.worklife.user.mockup.service.impl.DanhMucSCTXServiceImpl" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>LẬP DANH MỤC SỬA CHỮA THƯỜNG XUYÊN</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <%--<link href="<c:url value='/style/css/worklife/user/quanly_hethonghost/hethonghost.css' />" rel="stylesheet">--%>
    <link href="<c:url value='/style/css/others/inspinia/plugins/jasny/jasny-bootstrap.min.css' />" rel="stylesheet">
    <script type="text/javascript">
        <%
        try{
         DmTuyenDuongTheoHatImpl bean = vn.worklife.utils.BeanUtil.getBean(DmTuyenDuongTheoHatImpl.class);
         List<TuyenDuongHatVO> lstTD =  bean.selectListTuyenDuong();
         DanhMucSCTXServiceImpl bean1 = vn.worklife.utils.BeanUtil.getBean(DanhMucSCTXServiceImpl.class);
         List<DmDVTVO> lstDVT = bean1.selectListDVT();
         ObjectMapper objectMapper = new ObjectMapper();
         out.write("let listIdTuyenDuong = ");
         out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD));
         out.write(";");

         out.write("let listIdDVT = ");
         out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstDVT));
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
                    <h4>LẬP DANH MỤC SỬA CHỮA THƯỜNG XUYÊN</h4>
                </div>
                <form id="formDmSctx">
                    <input type="hidden" id="idDmSctx" name="idDmSctx" value="-1">
                    <input type="hidden" id="idSuCo" name="idSuCo" value="-1">
                    <input type="hidden" id="group_Id" name="groupId" value="${worklifeUserVO.groupId}">
                    <input type="hidden" id="groupName" name="groupName" value="${worklifeUserVO.group.groupName}">
                    <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-md-12 col-md-offset-3">
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
                        <div class="row">
                            <div class="col-md-12">
                                <label>Lập danh mục sữa thường xuyên</label>
                                <table class="table table-bordered table-hover" id="tableDSSCTX" style="width: 100%">
                                    <thead>
                                    <tr>
                                        <th class="text-center" rowspan="2"><input type="checkbox" class="i-checks" id="checkAll"></th>
                                        <th class="text-center" rowspan="2">Tuyến đường</th>
                                        <th class="text-center" rowspan="2">Lý trình</th>
                                        <th class="text-center" rowspan="2">Biện pháp xử lý</th>
                                        <th class="text-center" rowspan="2">ĐVT</th>
                                        <th class="text-center" rowspan="2">Công thức</th>
                                        <th class="text-center" colspan="2">Khối lượng</th>
                                        <th class="text-center" rowspan="2">Tình trạng</th>
                                        <th class="text-center" rowspan="2">Ngày sự cố</th>
                                    </tr>
                                    <tr>
                                        <th class="text-center">Chi tiết</th>
                                        <th class="text-center">Tổng cộng</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-xs btn-primary" id="btnDel">
                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="ibox-content">
                    <div class="row">
                        <div class="text-right col-md-12">
                            <button type="button" class="btn btn-primary" id="btnExportDmSctxToExcel">
                                <i class="fa fa-print"></i>&nbsp;&nbsp;Xuất excel &nbsp;&nbsp;
                            </button>
                            <button type="button" class="btn btn-primary" id="btnSave">
                                <i class="fa fa-save"></i>&nbsp;&nbsp;Lưu&nbsp;&nbsp;
                            </button>
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
<script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/worklife/public/utils.js'/>" type="text/javascript"></script>
<%--<script src="<c:url value='/style/js/worklife/user/sctx/sctx.Init.js'/>" type="text/javascript"></script>--%>
<script src="<c:url value='/style/js/worklife/user/sctx/sctx.Form.js'/>" type="text/javascript"></script>
<script type="text/javascript">
    let multiLanguage = {
        saveSuccessful: '<spring:message code="label.savesuccessfully"/>',
        saveFailed: '<spring:message code="label.savefailed"/>',
        accept: '<spring:message code="label.accept"/>',
        notify: '<spring:message code="label.notify"/>',
        cancel: '<spring:message code="label.cancel"/>',
    };
    let url = "${pageContext.request.contextPath}";
</script>
</body>
</html>