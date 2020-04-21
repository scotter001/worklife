<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>LỊCH SỬ SỬA CHỮA ĐỊNH KỲ</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <link href="<c:url value='/style/css/others/inspinia/plugins/jasny/jasny-bootstrap.min.css' />" rel="stylesheet">
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
                    <h4>LỊCH SỬ SỬA CHỮA ĐỊNH KỲ</h4>
                </div>
                <div class="ibox-content detail">
                    <div class="row form-group">
                        <div class="col-md-12" style="margin-top: 20px">
                            <div class="col-md-2">
                                <label>Tuyến đường/Công trình</label>
                                <select class="form-control">
                                    <option value="1">Đường Lê Hồng Phong</option>
                                    <option value="2">Hầm chui Lê Hồng Phong</option>
                                    <option value="4">Đường Lê Thánh Tôn</option>
                                    <option value="5">Cầu vượt Lê Thánh Tôn</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Từ năm</label>
                                <input type="text" class="form-control" value="2017">
                            </div>
                            <div class="col-md-2">
                                <label>Đén năm</label>
                                <input type="text" class="form-control" value="2018">
                            </div>
                            <div class="col-md-2">
                                <label class="lbhidden"></label>
                                <button type="button" class="btn btn-red" id="btnXem">
                                    <i class="fa fa-search"></i>&nbsp;&nbsp;Xem&nbsp;&nbsp;
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12" style="margin-top: 20px">
                                <h4>Danh mục sửa chữa định kỳ</h4>
                                <table id="tblDMSCDK" class="table table-bordered table-hover dataTable" style="width: 100%;">
                                    <thead>
                                    <tr>
                                        <th class="text-center">TT</th>
                                        <th class="text-center">Lý trình</th>
                                        <th class="text-center">Địa điểm</th>
                                        <th class="text-center">Thời gian thực hiện</th>
                                        <th class="text-center">Ngày hoàn thành</th>
                                        <th class="text-center">Hạng mục công việc chính</th>
                                        <th class="text-center">Nhà thầu thi công</th>
                                        <th class="text-center">Kinh phí thực hiện</th>
                                        <th class="text-center">Nguồn vốn</th>
                                        <th class="text-center">Tư vấn thiết kế</th>
                                        <th class="text-center">Tư vấn giám sát</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <td class="text-center">1</td>
                                    <td class="text-center">Km 2+325</td>
                                    <td class="text-center">Nút giao Lê Hồng Phong</td>
                                    <td class="text-center">12/10/2017</td>
                                    <td class="text-center">25/03/2018</td>
                                    <td class="text-center">Sửa chữa hệ thống thoát khí và PCCC</td>
                                    <td class="text-center">Công ty CPXD 1 Cofico</td>
                                    <td class="text-center">1.535.000.000</td>
                                    <td class="text-center">1.100.000.000</td>
                                    <td class="text-center">Tổng công ty CPXD 47</td>
                                    <td class="text-center">Công ty GSXD StarHouse</td>
                                    </tbody>
                                    <tbody>
                                    <td class="text-center">2</td>
                                    <td class="text-center">Km 3+543</td>
                                    <td class="text-center">Nút giao Ngả Bảy</td>
                                    <td class="text-center">05/07/2017</td>
                                    <td class="text-center">25/03/2018</td>
                                    <td class="text-center">Sửa chữa thành cầu, lắp đèn tín hiệu</td>
                                    <td class="text-center">Công ty hạ tầng giao thông Saneco Nhật Bản</td>
                                    <td class="text-center">2.200.000.000</td>
                                    <td class="text-center">1.100.000.000</td>
                                    <td class="text-center">Công ty đầu tư phát triển hạ tầng UDIC</td>
                                    <td class="text-center">Công ty GSXD công trình giao thông Miền Nam</td>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ibox-title text-right">
                    <button type="button" class="btn btn-red" style="margin-left: 10px;margin-right: 20px">
                        <i class="fa fa-file-excel-o"></i>&nbsp;Xuát excel
                    </button>
                </div>
            </div>
            <!-- FOOTER -->
            <%@ include file="../../nav/footer.jsp" %>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script src="<c:url value='/style/js/worklife/public/utils.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>
</body>
<script>
    $(document).ready(function(){

        $('#tblDMSCDK').find('tbody').on('click', 'tr', function () {
            $('#tblDMSCDK').find('tr.selected').removeClass('selected');
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#tblDMSCDK').find('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                $('#hangMuc').text('Sửa chữa hệ thống thoát khí và PCCC');
                $('#trungThau').val('1.535.000.000 VNĐ');
                $('#thietKe').val(4);
                $('#thiCong').val(3);
                $('#giamSat').val(1);
                $('#suaChua').val('12/10/2017');
                $('#hoanThanh').val('25/03/2018');
            }
        });
    });
</script>
</html>