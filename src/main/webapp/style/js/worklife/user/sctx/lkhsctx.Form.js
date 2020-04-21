formManager = (function () {
    let dmSctxTable;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        let ngayHienTai = new Date();
        initNam();
        setSelectValByDate(ngayHienTai);
        dmSctxTable = initdmSctxTable();
        btnTim();
        $('#selQuy, #selNam').on('change', btnTim);
        loadScreenOnSelChange();
        exportDmSctxForPlanningToExcel();
        validation();
        utils.loadDatePicker();
        $('#btnSaveSctxThucHien').on('click', btnSaveSctxThucHien);
        /*getYears(1900,ngayHienTai.getFullYear()+1);*/
        utils.initNotifyMessageBox();
    };
    let initNam = function () {
        let date = new Date();
        let year = date.getFullYear();
        let options = '<option value="-1"></option>';
        for (let i = year; i >= 2019; i--) {
            options += '<option value="' + i + '">' + i + '</option>'
        }
        $('#selNam').html(options);
    };
    let initdmSctxTable = function() {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {"targets": 1, class: "text-center", "orderable": false, width: "10%"},
            {"targets": 2, class: "text-center", "orderable": false, width: "10%"},
            {"targets": 3, class: "text-center", "orderable": false, width: "20%"},
            {"targets": 4, class: "text-center", "orderable": false, width: "10%"},
            {"targets": 5, class: "text-center", "orderable": false, width: "15%"},
            {"targets": 6, class: "text-center", "orderable": false, width: "15%"},
            {"targets": 7, class: "text-center", "orderable": false, width: "15%"}
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
            },
        };
        return datatableFactory.initDataSourceDataTableNonLoad('dmSctxTable', colDefs, opts, 1);
    };
    let btnTim = function() {
        let quy = $('#selQuy').val();
        let nam = $('#selNam').val();
        let idGroup = $('#group_Id').val();
        $.ajax({
            url: url + '/worklife/user/suachuathuongxuyen/lapkehoachthuchien/getlist.do',
            type: 'POST',
            data: {quy: quy, nam: nam, idGroup: idGroup},
            success: function (data) {
                if (data != null){
                    dmSctxTable.clear().draw();
                    for (let i = 0; i < data.danhMucSCTXVOS.length; i++) {
                        let klDuyet_Tong = data.danhMucSCTXVOS[i].klDuyet_Tong;
                        if (klDuyet_Tong.split('.')[1] === '0')
                            klDuyet_Tong = klDuyet_Tong.split('.')[0];
                        let rowHtml = [
                            '<input type="checkbox" class="i-checks isChecked" id="checkSCTX"/>',
                            createSel('danhMucSCTXVOS[' + i + '].idTuyenDuong', data.danhMucSCTXVOS[i].idTuyenDuong),
                            '<input type="text" name="danhMucSCTXVOS[' + i + '].lyTrinh" value="' + data.danhMucSCTXVOS[i].lyTrinh + '" disabled/>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS[' + i + '].noiDungSuaChua" style="width: 100%">' + data.danhMucSCTXVOS[i].noiDungSuaChua + '</textarea>'
                            + '<input type="hidden" name="danhMucSCTXVOS[' + i + '].idDmSctx" value="' + data.danhMucSCTXVOS[i].idDmSctx + '"/>'
                            + '<input type="hidden" name="danhMucSCTXVOS[' + i + '].idSctx" value="' + data.danhMucSCTXVOS[i].idSctx + '"/>',
                            '<input class="form-control" value="'+utils.initCommaSeparateNumber(klDuyet_Tong===0?'':klDuyet_Tong) + " " + (data.danhMucSCTXVOS[i].tenDVT===null?'':data.danhMucSCTXVOS[i].tenDVT)+'" disabled>',
                            '<input type="text" class="form-control decimalNumber" name="danhMucSCTXVOS[' + i + '].kinhPhi" value="' + utils.initCommaSeparateNumber((data.danhMucSCTXVOS[i].kinhPhi).split('.')[0]) + '" style="width: 100%" disabled/>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS['+i+'].keHoach_TH" style="width: 100%">' + data.danhMucSCTXVOS[i].keHoach_TH + '</textarea>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS['+i+'].ghiChu_KH" style="width: 100%">' + data.danhMucSCTXVOS[i].ghiChu_KH + '</textarea>'
                        ];
                        dmSctxTable.row.add(rowHtml).draw();
                        dmSctxTable.draw(false);
                        dmSctxTable.page('first').draw('page');
                    }
                    dmSctxTable.page.len(5).draw();
                    utils.initDecimal(".decimalNumber", 3, 0);
                    $('.decimalNumber').trigger('blur');
                }
            }
        })
    };
    let createSel = function (selName, idTuyenDuong) {
        let selHtml = '<select class="form-control" name="' + selName + '" style="width:100%;" disabled>';
        selHtml += '<option value="-1"></option>';
        listIdTuyenDuong.forEach(function (item, index) {
            selHtml += '<option ' + (idTuyenDuong == item.idTuyenDuong ? 'selected' : '') + ' value="' + item.idTuyenDuong + '">' + item.tenDuong + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let loadScreenOnSelChange = function(){
        $('#selQuy,#selNam').on('change',function(){
        });
    };
    let exportDmSctxForPlanningToExcel = function(){
        $('#btnExportDmSctxTableToExcel').on('click', function(){
            let thuocQuy = $('#selQuy').val();
            let nam = $('#selNam').val();
            let groupId =$('#groupId').val();
            window.open(url + '/worklife/user/suachuathuongxuyen/exportdmsctxforplanningtoexcel.do' + "?thuocQuy="+thuocQuy+"&nam="+nam+"&groupId="+groupId);
        });
    };
    let validation = function () {
        // phần mặc đinh tạo validation cho date, select tag
        validatorUtils.getDateRequired();
        $('#formSctxThucHien').validate({
            rules: {
                tuNgayKh :{
                    "date-required" :true
                }
            },
            messages : {
                tuNgayKh :{
                    "date-required" :"Vui lòng nhập ngày"
                }
            }

        })
    };
    let setSelectValByDate = function(ngay){
        let momentTmp = moment(ngay, "dd/MM/yyyy");
        moment().quarter();
        let quyTmp = momentTmp.quarter();
        let namTmp = momentTmp.year();
        $('#selQuy').val(quyTmp);
        $('#selNam').val(namTmp );
    };
    let getYears = function (fromYear, toYear) {
        let options = "";
        for (let year = fromYear; year <= toYear; year++) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $('#selNam').html(options);
    };
    let btnSaveSctxThucHien = function () {
        let form = $('#formSctxThucHien');
        if (dmSctxTable.data().count() !== 0) {
            dmSctxTable.page.len(dmSctxTable.data().count()).draw();
        }
        let method = "POST";
        let modelAttribute = "danhMucSCTXVO";
        form.attr("method", method);
        form.attr("action", url + "/worklife/user/suachuathuongxuyen/lapkehoachsuachuathuongxuyen/saveForm.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        form.attr("modelAttribute", modelAttribute);
        form.attr("enctype", "multipart/form-data");
        form.submit();
    };
    return {
        init: function () {
            return setup();
        },
    }
})();
