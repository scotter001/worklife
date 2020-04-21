formManager = (function () {
    let tblInformation;
    let form = $('#frmSuaChuaThuongXuyen');
    const URL_SAVE = utils.getSafePath('/worklife/user/repair/regular/save.do');
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        initNam();
        utils.loadDatePicker();
        validatorUtils.getDateFormat();
        validatorUtils.getDateRequired();
        validatorUtils.getDateCompare(_);
        $.validator.addClassRules('required-date', {
            dateformat: true,
            "date-required": true
        });
        $.validator.addClassRules('validate-date', {
            dateformat: true
        });
        tblInformation = tableInformationRepairRegularlyFactory();
        $('#btnSave').on('click', submitHandler);
        utils.initNotifyMessageBox();
        btnTim();
        $('#selPeriod, #selYear, #selStatus').on('change', btnTim);
        $('#btnView').on('click', btnView);
    };
    let initNam = function () {
        let date = new Date();
        let year = date.getFullYear();
        let options = '';
        for (let i = year; i >= 2019; i--) {
            options += '<option value="' + i + '">' + i + '</option>'
        }
        $('#selYear').html(options);
    };
    let btnTim = function() {
        let quy = $('#selPeriod').val();
        let nam = $('#selYear').val();
        let tinhTrang = $('#selStatus').val();
        let idGroup = $('#group_Id').val();
        if (idGroup === '1')
            idGroup = -1;
        $.ajax({
            url: url + '/worklife/user/repair/regular/get-list.do',
            type: 'POST',
            data: {
                quy: quy,
                nam: nam,
                tinhTrang: tinhTrang,
                idGroup: idGroup
            },
            success: function (data) {
                if (data != null){
                    tblInformation.clear().draw();
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
                            '<input class="form-control" value="'+utils.initCommaSeparateNumber(klDuyet_Tong==='0'?'':klDuyet_Tong) + " " + (data.danhMucSCTXVOS[i].tenDVT===null?'':data.danhMucSCTXVOS[i].tenDVT)+'" disabled>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS['+i+'].keHoach_TH" style="width: 100%">' + data.danhMucSCTXVOS[i].keHoach_TH + '</textarea>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS['+i+'].thoiGian_TH" style="width: 100%">' + data.danhMucSCTXVOS[i].thoiGian_TH + '</textarea>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS['+i+'].ghiChu_TH" style="width: 100%">' + data.danhMucSCTXVOS[i].ghiChu_TH + '</textarea>'
                        ];
                        tblInformation.row.add(rowHtml).draw();
                        tblInformation.draw(false);
                        tblInformation.page('first').draw('page');
                    }
                    tblInformation.page.len(5).draw();
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
    let submitHandler = function (e) {
        let form = $('#frmSuaChuaThuongXuyen');
        if (tblInformation.data().count() !== 0) {
            tblInformation.page.len(tblInformation.data().count()).draw();
        }
        let method = "POST";
        let modelAttribute = "danhMucSCTXVO";
        form.attr("method", method);
        form.attr("action", url + "/worklife/user/repair/regular/save.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        form.attr("modelAttribute", modelAttribute);
        form.attr("enctype", "multipart/form-data");
        form.submit();
    };
    let tableInformationRepairRegularlyFactory = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "searchable": false,
                "orderable": false,
                "className": "text-center",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {"targets": 1, "className": "text-left", "sWidth": "10%"},
            {"targets": 2, "className": "text-center", "sWidth": "10%"},
            {"targets": 3, "className": "text-left", "sWidth": "10%"},
            {"targets": 4, "className": "text-center", "sWidth": "10%"},
            {"targets": 5, "className": "text-center", "sWidth": "10%"},
            {"targets": 6, "className": "text-center", "sWidth": "10%"},
            {"targets": 7, "className": "text-center", "sWidth": "10%"}
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
        return datatableFactory.initDataSourceDataTableNonLoad("tblHMSCTX", colDefs, opts, 1);
    };
    let btnView = function () {
        let quy = parseInt($('#selPeriod').val());
        let nam = parseInt($('#selYear').val());
        let tinhTrang = parseInt($('#selStatus').val());
        let idGroup = parseInt($('#group_Id').val());
        if (idGroup === 1)
            idGroup = -1;
        window.location = url + "/worklife/user/repair/regular/reportExcel.do?quy=" + quy + "&nam=" + nam + "&tinhTrang=" + tinhTrang + "&idGroup=" + idGroup;
    };
    return {
        init: function () {
            return setup();
        }
    }
})();
