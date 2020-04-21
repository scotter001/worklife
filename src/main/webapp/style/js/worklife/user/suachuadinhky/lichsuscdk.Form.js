formManager = (function () {
    let lichSuDMSCDKTable = undefined;
    let setup = function () {
        $('#loai').on('change',initCongTrinh);
        configSelTuyenDuong();
        configSelFromYear();
        configSelToYear();
        lichSuDMSCDKTable = configTableLichSuSCDK();
        eventClickSearch();
        utils.initDecimal(".decimalNumber", 3,0);
        $('.decimalNumber').trigger('blur');
        exportExcel();
    };
    let initCongTrinh = function() {
        let loai = $('#loai').val();
        if (loai === '1'){
            $.ajax({
                url: url + '/worklife/user/suachuadinhky/gettuyenduong.do',
                type: 'post',
                success: function (data) {
                    if (data != null){
                        $('#tenDuong option').remove();
                        let options = '<option value="-1"></option>';
                        for (let i = 0; i < data.length; i++){
                            options += '<option value="'+data[i].idTuyenDuong+'">'+data[i].tenDuong+'</option>'
                        }
                        $('#tenDuong').html(options);
                    }
                }
            })
        }
        else if (loai === '2'){
            $.ajax({
                url: url + '/worklife/user/suachuadinhky/getcau.do',
                type: 'post',
                success: function (data) {
                    if (data != null){
                        $('#tenDuong option').remove();
                        let options = '<option value="-1"></option>';
                        for (let i = 0; i < data.length; i++){
                            options += '<option value="'+data[i].idCau+'">'+data[i].tenCau+'</option>'
                        }
                        $('#tenDuong').html(options);
                    }
                }
            })
        }
        else if (loai === '3'){
            $.ajax({
                url: url + '/worklife/user/suachuadinhky/getthietbi.do',
                type: 'post',
                success: function (data) {
                    if (data != null){
                        $('#tenDuong option').remove();
                        let options = '<option value="-1"></option>';
                        for (let i = 0; i < data.length; i++){
                            options += '<option value="'+data[i].idTB+'">'+data[i].tenThietBi+'</option>'
                        }
                        $('#tenDuong').html(options);
                    }
                }
            })
        }
        else {
            $.ajax({
                url: url + '/worklife/user/suachuadinhky/getcongtrinh.do',
                type: 'post',
                success: function (data) {
                    if (data != null){
                        $('#tenDuong option').remove();
                        let options = '<option value="-1"></option>';
                        for (let i = 0; i < data.length; i++){
                            options += '<option value="'+data[i].idDmScdk+'">'+data[i].tenCongTrinh+'</option>'
                        }
                        $('#tenDuong').html(options);
                    }
                }
            })
        }
    };
    let configTableLichSuSCDK = function () {
        let colDefs = [
            {
                "sWidth": "3%",
                "targets": 0,
                "orderable": false,
                class: "text-center",
                render: function (data, type, row, meta) {
                    let rowIndex = parseInt(meta.row);
                    let startAt = parseInt(meta.settings._iDisplayStart);
                    return rowIndex + startAt + 1;
                }
            }, {
                "sWidth": "8%",
                "targets": 1,
                "orderable": false,
                class: "text-center",
                "mData":"viTri"
            }, {
                "sWidth": "15%",
                "targets": 2,
                "orderable": false,
                class: "text-center",
                "mData":"nhieuHuyen"
            }, {
                "sWidth": "5%",
                "targets": 3,
                "orderable": false,
                class: "text-center",
                "mData": "thoiGian_TH"
            }, {
                "sWidth": "5%",
                "targets": 4,
                "orderable": false,
                class: "text-center",
                "mData": "ngay_HT"
            }, {
                "sWidth": "7%",
                "targets": 5,
                "orderable": false,
                class: "text-center",
                render: function (data,type,row) {
                    if (row.kinhPhi_Duyet === null || row.kinhPhi_Duyet === '')
                        return '';
                    else
                        return utils.initCommaSeparateNumber(row.kinhPhi_Duyet.split('.')[0]);
                }
            }, {
                "sWidth": "7%",
                "targets": 6,
                "orderable": false,
                class: "text-center decimalNumber",
                "mData": "tenNguonVon"
            },{
                "sWidth": "5%",
                "targets": 7,
                "orderable": false,
                class: "text-center decimalNumber",
                render: function (data,type,row) {
                    if (row.giaTrungThau === null || row.giaTrungThau === '')
                        return '';
                    else
                        return utils.initCommaSeparateNumber(row.giaTrungThau.split('.')[0]);
                }
            },{
                "sWidth": "7%",
                "targets": 8,
                "orderable": false,
                class: "text-center",
                "mData": "idDMTV_TC"
            },{
                "sWidth": "7%",
                "targets": 9,
                "orderable": false,
                class: "text-center",
                "mData": "tenTVTK"
            },{
                "sWidth": "7%",
                "targets": 10,
                "orderable": false,
                class: "text-center",
                "mData": "tenTVGS"
            },{
                "sWidth": "8%",
                "targets": 11,
                "orderable": false,
                class: "text-center",
                "mData": "hienTrang"
            },{
                "sWidth": "8%",
                "targets": 12,
                "orderable": false,
                class: "text-center",
                "mData": "giaiPhap"
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('tblLichSuDMSCDK', colDefs, url + "/worklife/user/suachuadinhky/selectlichsusuachuadinhky.do", function (settings) {
            let td = $('#tenDuong').val();
            let obj = {
                "optional": {
                    "loai": $('#loai').val(),
                    "tuNam": $('#selTuNam').val(),
                    "denNam": $('#selDenNam').val(),
                    "idTuyenDuong": !td?-1:td
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
            },
            'pageLength': 20,
            "scrollX" : true,
            'deferLoading': null
        }, 1, 1);
    };
    let eventClickSearch = function () {
        $('#btnSearch').on('click',function () {
            lichSuDMSCDKTable.ajax.reload();
        })
    };
    let configSelTuyenDuong = function () {
        $.when(eventUtils.getAllCategory("tuyenduong")).done(function (tuyenduong) {
            eventUtils.selOption("tenDuong", "id", "name", tuyenduong);
        });
    };
    let configSelFromYear = function () {
        let thisYear = new Date().getFullYear();
        let startYear = 2000;
        let endYear = thisYear;
        let options = "";
        for (let year = endYear; year >= startYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $("#selTuNam").html(options);
        $("#selTuNam").val(thisYear);
    };
    let configSelToYear = function () {
        let thisYear = new Date().getFullYear();
        let startYear = thisYear;
        let endYear = thisYear + 1;
        let options = "";
        for (let year = endYear; year >= startYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $("#selDenNam").html(options);
        $("#selDenNam").val(thisYear);
    };
    let exportExcel = function () {
        $('#btnXuatExcel').on('click', function () {
            let tuNam = $('#selTuNam').val();
            let denNam = $('#selDenNam').val();
            let idTuyenDuong = $('#tenDuong').val();
            let param = $.param(
                {
                    tuNam: tuNam,
                    denNam: denNam,
                    idTuyenDuong: idTuyenDuong,
                    tenDuong: $('#tenDuong').find('option:selected').text().trim()
                }
            );
            window.open(url + "/worklife/user/suachuadinhky/exportexcel.do" + "?" + param);
        })
    };
    return {
        init: function () {
            return setup();
        },
    }
})();
