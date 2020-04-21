<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>NHẬP THÔNG TIN SỬA CHỮA ĐỊNH KỲ</title>
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
                    <h4>NHẬP THÔNG TIN SỬA CHỮA ĐỊNH KỲ</h4>
                </div>
                <div class="ibox-content detail">
                    <div class="row form-group">
                        <h3>Danh mục sửa chữa định kỳ</h3>
                        <div class="col-md-12">
                            <div class="col-md-2" style="margin-top: 20px">
                                <label>Năm</label>
                                <select id="selNam" class="form-control">
                                    <option value="1">2018</option>
                                    <option value="2">2017</option>
                                    <option value="3">2016</option>
                                    <option value="4">2015</option>
                                    <option value="5">2014</option>
                                    <option value="6">2013</option>
                                    <option value="7">2012</option>
                                    <option value="8">2011</option>
                                    <option value="9">2010</option>
                                </select>
                            </div>
                            <div class="col-md-2" style="margin-top: 20px">
                                <label class="lbhidden"></label>
                                <button type="button" class="btn btn-red" id="btnXem">
                                    <i class="fa fa-search"></i>&nbsp;&nbsp;Xem&nbsp;&nbsp;
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12" style="margin-top: 20px">
                                <h4>Danh mục sửa chữa định kỳ</h4>
                                <table id="tblDMSCDK" class="table table-bordered table-hover dataTable"
                                       style="width: 100%;">
                                    <thead>
                                    <tr>
                                        <th class="text-center">TT</th>
                                        <th class="text-center">Tên công trình</th>
                                        <th class="text-center">Lý trình</th>
                                        <th class="text-center">Địa điểm</th>
                                        <th class="text-center">Giá trúng thầu (VNĐ)</th>
                                        <th class="text-center">Nguồn vốn (VNĐ)</th>
                                        <th class="text-center">Thời gian thực hiện</th>
                                        <th class="text-center">Ngày hoàn thành</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <td class="text-center">1</td>
                                    <td class="text-center">Hầm chui Lê Hồng Phong</td>
                                    <td class="text-center">Km 2+325</td>
                                    <td class="text-center">Nút giao Lê Hồng Phong</td>
                                    <td class="text-center">1.535.000.000</td>
                                    <td class="text-center">1.100.000.000</td>
                                    <td class="text-center">12/10/2017</td>
                                    <td class="text-center">25/03/2018</td>
                                    </tbody>
                                    <tbody>
                                    <td class="text-center">2</td>
                                    <td class="text-center">Cầu vượt Lê Thánh Tôn</td>
                                    <td class="text-center">Km 3+543</td>
                                    <td class="text-center">Nút giao Ngả Bảy</td>
                                    <td class="text-center">3.645.000.000</td>
                                    <td class="text-center">2.200.000.000</td>
                                    <td class="text-center">05/07/2017</td>
                                    <td class="text-center">25/03/2018</td>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ibox-content">
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Thông tin sửa chữa định kỳ</h3>
                        </div>
                    </div>
                    <br>
                    <div class="row form-group">
                        <div style="margin-top: 10px" class="col-md-12">
                            <label>Hạng mục công việc chính</label>
                            <textarea id="hangMuc" name="noiDungSuaChua" class="form-control" type="text"
                                      rows="3"></textarea>
                        </div>
                        <div class="col-md-12" style="margin-top: 20px">
                            <div class="col-md-3">
                                <label style="width: 100%; float: left;">Giá trúng thầu</label>
                                <input id="trungThau" type="text" class="form-control">
                            </div>
                            <div class="col-md-3">
                                <label>Nhà thầu thi công</label>
                                <select id="thiCong" type="text" class="form-control">
                                    <option value="0"></option>
                                    <option value="1">Công ty CPXD địa ốc Hòa Bình</option>
                                    <option value="2">Công ty đầu tư phát triển hạ tầng UDIC</option>
                                    <option value="3">Công ty CPXD 1 Cofico</option>
                                    <option value="4">Công ty CPXD 47</option>
                                    <option value="5">Công ty hạ tầng giao thông Saneco Nhật Bản</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label>Nhà thầu tư vấn thiết kế</label>
                                <select id="thietKe" type="text" class="form-control">
                                    <option value="0"></option>
                                    <option value="1">Công ty TVXD công trình giao thông Công Chánh</option>
                                    <option value="2">Công ty TVXD công trình giao thông Miền Nam</option>
                                    <option value="3">Công ty CP thiết kế giao thông 1 Cofico</option>
                                    <option value="4">Tổng công ty CPXD 47</option>
                                    <option value="5">Công ty hạ tầng giao thông Saneco Nhật Bản</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label>Nhà thầu tư vấn giám sát</label>
                                <select id="giamSat" type="text" class="form-control">
                                    <option value="0"></option>
                                    <option value="1">Công ty GSXD StarHouse</option>
                                    <option value="2">Công ty GSXD công trình giao thông Miền Nam</option>
                                    <option value="3">Công ty GSXD thiết kế giao thông 1 Cofico</option>
                                    <option value="4">Tổng công ty GSXD 47</option>
                                    <option value="5">Công ty hạ tầng giao thông Saneco Nhật Bản</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12" style="margin-top: 20px">
                            <div class="col-md-2">
                                <label style="width: 100%; float: left;">Thời gian sửa chữa</label>
                                <input id="suaChua" type="text" class="form-control">
                            </div>
                            <div class="col-md-2">
                                <label style="width: 100%; float: left;">Thời gian hoàn thành</label>
                                <input id="hoanThanh" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ibox-title text-right">
                    <button id="btnXemLS" type="button" class="btn btn-red">
                        <i class="fa fa-search"></i>&nbsp;Xem lịch sử SCĐK
                    </button>
                    <button type="button" class="btn btn-red" style="margin-left: 10px;margin-right: 20px">
                        <i class="fa fa-save"></i>&nbsp;Lưu
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
    $(document).ready(function () {

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
                $('#sBtnDong').on('click', function () {
                    $('#timThongTinTheoSoDKKDForm').hide();
                })
            }
        });
    });
</script>
</html>