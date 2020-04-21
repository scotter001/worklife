formManager = (function () {
    let tableDSSCTX;
    /*let listIdTuyenDuong = [];*/
    /*let listIdDVT = [];*/
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        /*initTuyenDuong();*/
        /*initDVT();*/
        initNam();
        let ngayHienTai = new Date();
        setSelectValByDate(ngayHienTai);
        utils.initHatQuanLyFormBC();
        tableDSSCTX = initTableDSSCTX();
        btnTim();
        /*$('#btnTim').on('click', btnTim);*/
        $('#btnSave').on('click', btnSave);
        $('#quy, #nam, #hatQuanLy').on('change', btnTim);
        exportDmSctxToExcel();
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAll', 'isChecked');
        datatableFactory.checkBoxOnSelect('checkAll', 'isChecked');
        utils.initNotifyMessageBox();
        $('#btnDel').on('click', btnDel);
    };
    let initNam = function () {
        let date = new Date();
        let year = date.getFullYear();
        let options = '';
        for (let i = year; i >= 2019; i--) {
            options += '<option value="' + i + '">' + i + '</option>'
        }
        $('#nam').html(options);
    };
    let setSelectValByDate = function(ngay){
        let momentTmp = moment(ngay, "dd/MM/yyyy");
        moment().quarter();
        let quyTmp = momentTmp.quarter();
        $('#quy').val(quyTmp);
    };
    let initTableDSSCTX = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isChecked" id="checkSCTX"/>';
                }
            },
            {"targets": 1, class: "text-center", "orderable": false, width: "10%"},
            {"targets": 2, class: "text-center", "orderable": false, width: "10%"},
            {"targets": 3, class: "text-center", "orderable": false, width: "20%"},
            {"targets": 4, class: "text-center", "orderable": false, width: "5%"},
            {"targets": 5, class: "text-center", "orderable": false, width: "16%"},
            {"targets": 6, class: "text-center", "orderable": false, width: "7%"},
            {"targets": 7, class: "text-center", "orderable": false, width: "7%"},
            {"targets": 8, class: "text-center", "orderable": false, width: "14%"},
            {"targets": 9, class: "text-center", "orderable": false, width: "6%"}
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                utils.initIChecks('i-checks');
            },
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableDSSCTX', colDefs, opts, 1);
    };
    let btnTim = function () {
        let quy = $('#quy').val();
        let nam = $('#nam').val();
        let idGroup = $('#hatQuanLy').val();
        if (idGroup === null)
            idGroup = $('#group_Id').val();
        $.ajax({
            url: url + "/worklife/user/suachuathuongxuyen/getdmsctxtheoquynam.do",
            type: "POST",
            data: {quy: quy, nam: nam, idGroup: idGroup},
            success: function (data) {
                if (data != null) {
                    tableDSSCTX.clear().draw();
                    for (let i = 0; i < data.danhMucSCTXVOS.length; i++) {
                        let klLap_CT = '';
                        if (data.danhMucSCTXVOS[i].klLap_CT !== '0.0' && data.danhMucSCTXVOS[i].klLap_CT !== null){
                            if ((data.danhMucSCTXVOS[i].klLap_CT).split('.')[1] === '0'){
                                klLap_CT = utils.initCommaSeparateNumber((data.danhMucSCTXVOS[i].klLap_CT).split('.')[0]);
                            }
                        }
                        let klLap_Tong = '';
                        if (data.danhMucSCTXVOS[i].klLap_Tong !== '0.0' && data.danhMucSCTXVOS[i].klLap_Tong !== null){
                            if ((data.danhMucSCTXVOS[i].klLap_Tong).split('.')[1] === '0'){
                                klLap_Tong = utils.initCommaSeparateNumber((data.danhMucSCTXVOS[i].klLap_Tong).split('.')[0]);
                            }
                        }
                        let rowHtml = [
                            '<input type="checkbox" class="i-checks isChecked" id="checkSCTX"/>',
                            createSel('danhMucSCTXVOS[' + i + '].idTuyenDuong', data.danhMucSCTXVOS[i].idTuyenDuong),
                            '<input type="text" name="danhMucSCTXVOS[' + i + '].lyTrinh" value="' + data.danhMucSCTXVOS[i].lyTrinh + '"/>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS[' + i + '].noiDungSuaChua" style="width: 100%">' + data.danhMucSCTXVOS[i].noiDungSuaChua + '</textarea>'
                            + '<input type="hidden" name="danhMucSCTXVOS[' + i + '].idDmSctx" value="' + data.danhMucSCTXVOS[i].idDmSctx + '"/>'
                            + '<input type="hidden" name="danhMucSCTXVOS[' + i + '].idSuCo" value="' + data.danhMucSCTXVOS[i].idSuCo + '"/>',
                            createSelDVT('danhMucSCTXVOS[' + i + '].iddvt', data.danhMucSCTXVOS[i].iddvt),
                            '<textarea rows="3" class="form-control" name="danhMucSCTXVOS[' + i + '].congThucLap" onchange="formManager.congthucLap(this,' + i + ')" style="width: 100%"/>'+data.danhMucSCTXVOS[i].congThucLap+'</textarea>',
                            '<input type="text" class="form-control" name="danhMucSCTXVOS[' + i + '].klLap_CT" value="' + klLap_CT + '" style="width: 100%" disabled/>',
                            '<input type="text" class="form-control" name="danhMucSCTXVOS[' + i + '].klLap_Tong" value="' + klLap_Tong + '" onchange="formManager.changeKlTong(this, '+i+')" style="width: 100%"/>',
                            '<textarea rows="2" class="form-control" style="width: 100%">' + data.danhMucSCTXVOS[i].huHong + '</textarea>',
                            data.danhMucSCTXVOS[i].ngay
                        ];
                        tableDSSCTX.row.add(rowHtml).draw();
                        tableDSSCTX.draw(false);
                        tableDSSCTX.page('first').draw('page');
                    }
                    tableDSSCTX.page.len(5).draw();
                    utils.initIChecks('i-checks');
                    datatableFactory.checkCheckBox('checkAll', 'isChecked');
                    datatableFactory.checkBoxOnSelect('checkAll', 'isChecked');
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
    let createSelDVT = function (selName, iddvt) {
        let selHtml = '<select class="form-control" name="' + selName + '" style="width:100%;">';
        selHtml += '<option value="-1"></option>';
        listIdDVT.forEach(function (item, index) {
            selHtml += '<option ' + (iddvt == item.iddvt ? 'selected' : '') + ' value="' + item.iddvt + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let btnSave = function () {
        let form = $("#formDmSctx");
        let quy = $('#quy').val();
        let nam = $('#nam').val();
        if (quy === '-1' && nam === '-1') {
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn quý và năm để lưu",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        } else {
            if (tableDSSCTX.data().count() !== 0) {
                tableDSSCTX.page.len(tableDSSCTX.data().count()).draw();
            }
            let method = "POST";
            let modelAttribute = "danhMucSCTXVO";
            for (let i = 0; i < $('#tableDSSCTX tbody tr').length; i++) {
                $('input[name="danhMucSCTXVOS['+i+'].klLap_CT"]').attr('disabled', false);
                form.append('<input type="hidden" name="danhMucSCTXVOS[' + i + '].thuocQuy" value="' + quy + '"/>');
                form.append('<input type="hidden" name="danhMucSCTXVOS[' + i + '].nam" value="' + nam + '"/>')
            }
            form.attr("method", method);
            form.attr("action", url + "/worklife/user/suachuathuongxuyen/saveForm.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
            form.attr("modelAttribute", modelAttribute);
            form.attr("enctype", "multipart/form-data");
            form.submit();
        }
    };
    let exportDmSctxToExcel = function () {
        $('#btnExportDmSctxToExcel').on('click', function () {
            let thuocQuy = $('#quy').val();
            let nam = $('#nam').val();
            let groupId = $('#hatQuanLy').val();
            let groupName = $('#groupName').val();
            window.open(url + '/worklife/user/suachuathuongxuyen/exportdmsctxtoexcel.do' + "?thuocQuy=" + thuocQuy + "&nam=" + nam + "&groupId=" + groupId + "&groupName=" + groupName);
        });
    };
    let btnDel = function () {
        datatableFactory.removeRowByHoan("idDmSctx", tableDSSCTX, rootPath + "/worklife/user/suachuathuongxuyen/deleteSCTX.do", "checkAll", refeshTable);
    };
    let refeshTable = function () {
        datatableFactory.refreshPagination("tableDSSCTX");
        datatableFactory.resetIndex(tableDSSCTX, "danhMucSCTXVOS");
    };
    return {
        init: function () {
            return setup();
        },
        congthucLap: function (element, index) {
            let $this = $(element);
            let result = 0;
            eval('result=' + $this.val() + ';');
            $('input[name="danhMucSCTXVOS[' + index + '].klLap_CT"]').val(result);
            $('input[name="danhMucSCTXVOS[' + index + '].klLap_Tong"]').val(result);
        },
        changeKlTong: function (element, index) {
            let $this = $(element);
            $('input[name="danhMucSCTXVOS[' + index + '].klLap_Tong"]').val(utils.initCommaSeparateNumber($this.val().replace(/,/g,'')));
        }
    }
})();
