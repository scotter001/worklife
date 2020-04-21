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
        <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="ngayHHMD" id="NgayHHMD" />
    </div>
    <div class="col-md-2">
        <label>Huyện/Tp</label>
        <select class="form-control" name="huyenHHMD" id="HuyenHHMD">
            <option value="-1"></option>
        </select>
    </div>
    <div class="col-md-2">
        <label>Xã/Phường</label>
        <select class="form-control" name="xaPhuongHHMD" id="XaPhuongHHMD">
            <option value="-1"></option>
        </select>
    </div>
    <div class="col-md-2">
        <label>Tuyến đường</label>
        <select class="form-control" name="tuyenDuongHHMD" id="TuyenDuongHHMD">
            <option value="-1"></option>
        </select>
    </div>
    <div class="col-md-2">
        <label>Lý trình: Điểm đầu</label>
        <div class="input-group">
            <input type="text" class="col-md-4 form-control" style="width:40%" placeholder="km" name="diemDauKmHHMD" id="DiemDauKmHHMD" />

            <input type="text" class="col-md-4 form-control text-center" style="width:20%" placeholder="+" name="diemDauCongHHMD" id="DiemDauCongHHMD" disabled/>
            <input type="text" class="col-md-4 form-control" style="width:40%" placeholder="m"name="diemDauHHMD" id="DiemDauHHMD" />
        </div>
    </div>
    <div class="col-md-2">
        <label>Điểm cuối</label>
        <div class="input-group">
            <input type="text" class="col-md-4 form-control" style="width: 40%;" placeholder="km" name="diemCuoiKmHHMD" id="DiemCuoiKmHHMD" />
            <input type="text" class="col-md-4 form-control text-center" style="width: 20%;" placeholder="+" name="diemCuoiCongHHMD" id="DiemCuoiCongHHMD" disabled/>
            <input type="text" class="col-md-4 form-control" style="width: 40%;" name="diemCuoiHHMD" id="DiemCuoiHHMD" />
        </div>
    </div>
</div>
<br>
<div class="row">
    <div class="col-md-12">
        <label>Tình hình hư hỏng mặt đường</label>
        <textarea class="form-control" rows="5" name="tinhHinhHuHongMatDuongHHMD" id="TinhHinhHuHongMatDuongHHMD" ></textarea>
    </div>
</div>
<br/>
<div class="row">
    <div class="col-md-12">
        <label>Những việc đã được nhân viên tuần đường xử lý</label>
        <textarea class="form-control" rows="5" name="viecDaDuocXuLyHHMD" id="ViecDaDuocXuLyHHMD"></textarea>
    </div>
</div>
<br>
<div class="row">
    <div class="col-md-12">
        <label>Giải pháp khắc phục</label>
        <textarea class="form-control" rows="5"name="giaiPhapKhacPhucHHMD" id="GiaiPhapKhacPhucHHMD"></textarea>
    </div>
</div>


