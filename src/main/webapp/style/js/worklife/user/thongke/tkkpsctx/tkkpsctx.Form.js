formManager = (function () {
    let tblQuy, tblFiveYears;
    let setup = function () {
        selYear();
        /*utils.initIntegerNumberRule('.onlyNumber');*/
        $('#tieuChi, #selYear, #selNam').on('change', onChange);
        getYears();
        tblQuy = inSetupTableQuy();
        tblFiveYears = inSetupTableFiveYears();
        /*$('#btnSearch').on('click', onSearch);*/
        $('#btnXuatBaoCaoNam').on('click', btnXuatBaoCaoNam);
        $('#btnXuatBaoCaoQuy').on('click', btnXuatBaoCaoQuy);
        /*xuatEcell(tblQuy);*/
    };
    let selYear = function() {
        $('#tblFiveYear thead tr th:eq(2)').remove();
        $('#tblFiveYear thead tr th:eq(2)').remove();
        $('#tblFiveYear thead tr th:eq(2)').remove();
        $('#tblFiveYear thead tr th:eq(2)').remove();
        $('#tblFiveYear thead tr th:eq(2)').remove();
        let currentTime = new Date();
        let toYear = currentTime.getFullYear();
        let nam = toYear;
        for (let i = nam - 4; i <= nam; i++) {
            let th = '<th class="text-center">Năm ' + i + '</th>';
            $('#tblFiveYear thead tr').append(th);
        }
    };
    let xuatEcell = function (table) {
        var buttons = new $.fn.dataTable.Buttons(table, datatableFactory.getButtonExcel('<i class="fa fa-file-excel-o" id="btnExell"></i>&nbsp;&nbsp;Xuất excel', 'btn btn-red', function () {
            let
                tuThang = $('#tuThang').val();
            let
                denThang = $('#denThang').val();
            let
                nam = $('#nam').val();
            let
                header = 'THỐNG KÊ KINH PHÍ SỬA CHỮA THƯỜNG XUYÊN \n ';

            return header;
        }, 'Thống kê kinh phí sửa chữa thường xuyên')).container().insertBefore($('#btnXuatBaoCao'));
    };
    let reNameHeaderTable = function () {
        let year = $('#selYear').val();

        $('#tblFiveYear thead tr').find("th:nth-child(3)").text("Năm " + (parseInt(year) - 4));
        $('#tblFiveYear thead tr').find("th:nth-child(4)").text("Năm " + (parseInt(year) - 3));
        $('#tblFiveYear thead tr').find("th:nth-child(5)").text("Năm " + (parseInt(year) - 2));
        $('#tblFiveYear thead tr').find("th:nth-child(6)").text("Năm " + (parseInt(year) - 1));
        $('#tblFiveYear thead tr').find("th:nth-child(7)").text("Năm " + parseInt(year));
    };
    let onChange = function () {
        tieuChi = $('#tieuChi').val();
        $('#btnExell').closest('button').remove();
        if (tieuChi === '1') {
            $('#tuNamId').hide();
            $('#namId').show();
            $('#tblQuy').show();
            $('#tblFiveYear').hide();
            $('#btnXuatBaoCaoQuy').show();
            $('#btnXuatBaoCaoNam').hide();
        } else {
            $('#tuNamId').show();
            $('#namId').hide();
            $('#tblQuy').hide();
            $('#tblFiveYear').show();
            $('#btnXuatBaoCaoQuy').hide();
            $('#btnXuatBaoCaoNam').show();
            $('#tblFiveYear thead tr th:eq(2)').remove();
            $('#tblFiveYear thead tr th:eq(2)').remove();
            $('#tblFiveYear thead tr th:eq(2)').remove();
            $('#tblFiveYear thead tr th:eq(2)').remove();
            $('#tblFiveYear thead tr th:eq(2)').remove();
            let nam = parseInt($('#selYear').val());
            for (let i = nam - 4; i <= nam; i++) {
                let th = '<th class="text-center">Năm ' + i + '</th>';
                $('#tblFiveYear thead tr').append(th);
            }
        }
        tblQuy.ajax.reload();
        tblFiveYears.ajax.reload();
    };
    let onSearch = function () {
        tieuChi = $('#tieuChi').val();
        if (tieuChi == 1) {
            $('.namClass').show();
            $('.tuNamClass').hide();
        } else {
            $('.tuNamClass').show();
            $('.namClass').hide();
        }
        tblQuy.ajax.reload();
        tblFiveYears.ajax.reload();
        reNameHeaderTable();
    };
    let getYears = function () {
        let currentTime = new Date();
        let fromYear = 1990;
        let toYear = currentTime.getFullYear();
        let options = "";
        for (let year = toYear; year >= fromYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $('#selNam').html(options);
        $('#selNam').val(toYear);
        $('#selYear').val(toYear);
    };
    /////////////////////////////tableQuy/////////////////////////////////////
    let inSetupTableQuy = function () {
        let colDefs = [{
            "sWidth": "5%",
            "targets": 0,
            "class": "text-center",
            "mData": "",
            "searchable": false,
            "orderable": false,
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
            {
                "targets": 1,
                "mData": "ten",
                "sWidth": "20%",
                "orderable": false,
            },
            {
                "targets": 2,
                "mData": "quy1",
                "sWidth": "20%",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return utils.initCommaSeparateNumber(row.quy1.split('.')[0]);
                }
            }, {
                "targets": 3,
                "mData": "quy2",
                "sWidth": "20%",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return utils.initCommaSeparateNumber(row.quy2.split('.')[0]);
                }
            }, {
                "targets": 4,
                "mData": "quy3",
                "sWidth": "15%",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return utils.initCommaSeparateNumber(row.quy3.split('.')[0]);
                }
            }, {
                "targets": 5,
                "mData": "quy4",
                "sWidth": "20%",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return utils.initCommaSeparateNumber(row.quy4.split('.')[0]);
                }
            },];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
            },
            "bSort": false
        };
        return datatableFactory.initDataSourceDataTable('tblQuy', colDefs, rootPath + "/worklife/user/thongkesctx/getlistquy.do", function (settings) {
            let obj = {
                nam: $('#selNam').val()
            };
            return Object.assign(obj, settings);
        }, opts, 1);
    };
    //////////////////////////////////tableFiveYears//////////////////////////////////
    let inSetupTableFiveYears = function () {
        let colDefs = [{
            "sWidth": "5%",
            "targets": 0,
            "class": "text-center",
            "mData": "",
            "searchable": false,
            "orderable": false,
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
            {
                "targets": 1,
                "mData": "ten",
                "sWidth": "20%",
                "orderable": false,
            },
            {
                "targets": 2,
                "mData": "nam4",
                "sWidth": "20%",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return utils.initCommaSeparateNumber(row['nam4'].split('.')[0]);
                }
            }, {
                "targets": 3,
                "mData": "nam3",
                "sWidth": "20%",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return utils.initCommaSeparateNumber(row['nam3'].split('.')[0]);
                }
            }, {
                "targets": 4,
                "mData": "nam2",
                "sWidth": "15%",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return utils.initCommaSeparateNumber(row['nam2'].split('.')[0]);
                }
            }, {
                "targets": 5,
                "mData": "nam1",
                "sWidth": "20%",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return utils.initCommaSeparateNumber(row['nam1'].split('.')[0]);
                }
            },
            {
                "targets": 6,
                "mData": "nam0",
                "sWidth": "20%",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return utils.initCommaSeparateNumber(row['nam0'].split('.')[0]);
                }
            },
        ];
        let opts = {

            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
            },
            "bSort": false
        };
        return datatableFactory.initDataSourceDataTable('tblFiveYear', colDefs, rootPath + "/worklife/user/thongkesctx/getlistnam.do", function (settings) {
            let obj = {
                nam: $('#selYear').val()
            };
            return Object.assign(obj, settings);
        }, opts, 1);
    };
    let btnXuatBaoCaoNam = function () {
        let toYear = parseInt($('#selYear').val());
        window.location = url + '/worklife/user/thongkesctx/reportExcelToYear.do?toYear=' + toYear;
    };
    let btnXuatBaoCaoQuy = function () {
        let nam = parseInt($('#selNam').val());
        window.location = url + '/worklife/user/thongkesctx/reportExcelQuy.do?nam=' + nam;
    };
    return {
        init: function () {
            return setup();
        },
    }
})();
