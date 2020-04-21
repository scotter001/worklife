<%--
  ~ Copyright (c) 2018.
  ~ Author : Phat Thinh
  --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<div class="row">
    <div class="col-md-2">
        <label>Ngày</label>
        <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="ngayTN" id="NgayTN" />
    </div>
    <div class="col-md-2">
        <label>Huyện/Tp</label>
        <select class="form-control" name="huyenTN" id="HuyenTN">
            <option value="-1"></option>
        </select>
    </div>
    <div class="col-md-2">
        <label>Xã/Phường</label>
        <select class="form-control" name="xaPhuongTN" id="XaPhuongTN">
            <option value="-1"></option>
        </select>
    </div>
    <div class="col-md-2">
        <label>Tuyến đường</label>
        <select class="form-control" name="tuyenDuongTN" id="TuyenDuongTN">
            <option value="-1"></option>
        </select>
    </div>
    <div class="col-md-2">
        <label>Lý trình:</label>
        <div class="input-group">
            <input type="text" class="col-md-3 form-control" style="width:33%" placeholder="km" name="diemDauKmTN" id="DiemDauKmTN" />
            <input type="text" class="col-md-3 form-control" style="width:33%" placeholder="+" name="diemDauCong"TN id="DiemDauCongTN" />
            <input type="text" class="col-md-4 form-control" style="width:33%" name="diemDauTN" id="DiemDauTN" />
        </div>
    </div>
</div>
<br>
<div class="row">
    <div class="col-md-12">
        <label>Nguyên nhân xảy ra tai nan</label>
        <textarea class="form-control" rows="5" name="nguyenNhanXayRaTaiNanTN" id="NguyenNhanXayRaTaiNanTN" ></textarea>
    </div>
</div>
<br/>



