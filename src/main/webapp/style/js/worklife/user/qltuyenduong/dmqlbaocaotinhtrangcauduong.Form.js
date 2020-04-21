formManager = (function () {
    let tableBaoCaoTTMatDuong;
    let tableBaoCaoTTCau;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        init();
        tableBaoCaoTTMatDuong = inittableBaoCaoTTMatDuong();
        tableBaoCaoTTCau = inittableBaoCaoTTCau();
        //tableBaoCaoTTCau = inittableBaoCaoTTCau();
        $('#btnTim').on('click', btnTim);
        btnTim();
        let ngayHienTai = new Date();
        setSelectValByDate(ngayHienTai);
    };
    let init=function(){
        //utils.loadDatePicker();
        let ngayHienTai = new Date() ;
        getYears(ngayHienTai.getFullYear(),1970);
        utils.initIntegerNumber();

    };

    let getYears = function (fromYear, toYear) {
        let options = "";
        for (let year = fromYear; year >= toYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $('#selNam').html(options);

    };

    let inittableBaoCaoTTMatDuong = function () {
        let colDefs = [
            {
                "sWidth": "10%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1 ;
                }
            },
            {"targets": 1, class:"text-left", width: "60%", "mData": "group_name", "orderable": false},
            {"targets": 2, class:"text-center", width: "30%", "mData": "ngayBC", "orderable": false},

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
        return datatableFactory.initAjaxDataSourceDataTable("tableBaoCaoTTMatDuong", colDefs, url + "/worklife/user/quanlytuyenduong/getlistbaocaottduong.do", function (settings) {

            let obj = {
                "optional": {
                    "quy": $('#selQuy').val(),
                    "nam": $('#selNam').val(),
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let inittableBaoCaoTTCau = function () {
        let colDefs = [
            {
                "sWidth": "10%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1 ;
                }
            },
            {"targets": 1, class:"text-left", width: "60%", "mData": "group_name", "orderable": false},
            {"targets": 2, class:"text-center", width: "30%", "mData": "ngayBC", "orderable": false},

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
        return datatableFactory.initAjaxDataSourceDataTable("tableBaoCaoTTCau", colDefs, url + "/worklife/user/quanlytuyenduong/getlistbaocaottcau.do", function (settings) {

            let obj = {
                "optional": {
                    "quy": $('#selQuy').val(),
                    "nam": $('#selNam').val(),
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let btnTim = function () {
        tableBaoCaoTTMatDuong.ajax.reload();
        tableBaoCaoTTCau.ajax.reload();

        //tableBaoCaoTTMatCau.ajax.reload();
    };
    let setSelectValByDate = function(ngay){
        let momentTmp = moment(ngay, "dd/MM/yyyy");
        moment().quarter();
        let quyTmp = momentTmp.quarter();
        $('#selQuy').val(quyTmp);
    };
    return{
        init: function () {
            return setup();
            }
        }
    })();