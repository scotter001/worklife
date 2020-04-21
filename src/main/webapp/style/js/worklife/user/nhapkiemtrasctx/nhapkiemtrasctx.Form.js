formManager = (function () {
    const EXPORT_EXCEL_FILE_URL = utils.getSafePath("/worklife/user/suachuathuongxuyen/exportexcel.do");
    let nhapKiemTraSCTXTable = undefined;
    let setup = function () {
        $('#nameGroup').val(1);
        initNam();
        /*loadSelYear();*/
        setSelQuy();
        exportExcel();
        nhapKiemTraSCTXTable = configTableNhapKiemTraSCTX();
        utils.initIChecks('i-checks');
        validateConfig();
        utils.loadDatePicker();
        utils.initDecimal(".decimalNumber", 3, 0);
        btnTim();
        $('#selQuy, #selNam, #selTinhTrang').on('change', btnTim);
        $('#btnSave').on('click',btnSave);
        utils.initNotifyMessageBox();
    };
    let initNam = function () {
        let date = new Date();
        let year = date.getFullYear();
        let options = '';
        for (let i = year; i >= 2019; i--) {
            options += '<option value="' + i + '">' + i + '</option>'
        }
        $('#selNam').html(options);
    };
    let validateConfig = function () {
        validatorUtils.getDateRequired();
        $('#formNhapKiemTraSCTX').validate({
            rules: {
                tuNgayKh: {"date-required": true}
            },
            messages: {
                tuNgayKh: {"date-required": "Vui lòng nhập ngày"}
            }
        })
    };
    let exportExcel = function () {
        $('#btnXuatExcel').on('click', function () {
            let quy = $('#selQuy').val();
            let nam = $('#selNam').val();
            let tinhTrang = $('#selTinhTrang').val();
            let idGroup = $('#group_Id').val();
            let nameGroup = $('#nameGroup').find('option:selected').text().trim();
            let param = $.param(
                {
                    quy: quy,
                    nam: nam,
                    tinhTrang: tinhTrang,
                    idGroup: idGroup,
                    nameGroup: nameGroup,
                }
            );
            window.open(EXPORT_EXCEL_FILE_URL + "?" + param);
        })
    };
    let configTableNhapKiemTraSCTX = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "orderable": false,
                class: "text-center",
                render: function (data, type, row, meta) {
                    let rowIndex = parseInt(meta.row);
                    let startAt = parseInt(meta.settings._iDisplayStart);
                    return rowIndex + startAt + 1;
                }
            }, {
                "sWidth": "9.5%",
                "targets": 1,
                class: "text-center",
            }, {
                "sWidth": "9.5%",
                "targets": 2,
                class: "text-center"
            }, {
                "sWidth": "9.5%",
                "targets": 3,
                class: "text-center"
            }, {
                "sWidth": "9.5%",
                "targets": 4,
                class: "text-center"
            }, {
                "sWidth": "9.5%",
                "targets": 5,
                class: "text-center"
            }, {
                "sWidth": "9.5%",
                "targets": 6,
                class: "text-center"
            }, {
                "sWidth": "9.5%",
                "targets": 7,
                class: "text-center"
            }, {
                "sWidth": "9.5%",
                "targets": 8,
                class: "text-center"
            }, {
                "sWidth": "9.5%",
                "targets": 9,
                class: "text-center"
            }, {
                "sWidth": "9.5%",
                "targets": 10,
                class: "text-center"
            }
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
            },
            "scrollX": true
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableNhapKiemTraSCTX', colDefs, opts, 1);
    };
    let btnTim = function() {
        let quy = $('#selQuy').val();
        let nam = $('#selNam').val();
        let tinhTrang = $('#selTinhTrang').val();
        let idGroup = $('#group_Id').val();
        $.ajax({
            url: url + '/worklife/user/suachuathuongxuyen/select-all-nhapkiemtra-sctx.do',
            method: 'POST',
            data: {
                quy: quy,
                nam: nam,
                tinhTrang: tinhTrang,
                idGroup: idGroup
            },
            success: function (data) {
                if (data != null) {
                    nhapKiemTraSCTXTable.clear().draw();
                    for (let i = 0; i < data.danhMucSCTXVOS.length; i++) {
                        let klDuyet_Tong = data.danhMucSCTXVOS[i].klDuyet_Tong;
                        if (klDuyet_Tong.split('.')[1] === '0')
                            klDuyet_Tong = utils.initCommaSeparateNumber(klDuyet_Tong.split('.')[0]);
                        let rowHtml = [
                            '<input type="checkbox" class="i-checks isChecked" id="checkSCTX"/>',
                            createSel('danhMucSCTXVOS[' + i + '].idTuyenDuong', data.danhMucSCTXVOS[i].idTuyenDuong),
                            '<input type="text" name="danhMucSCTXVOS[' + i + '].lyTrinh" value="' + data.danhMucSCTXVOS[i].lyTrinh + '" disabled/>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS[' + i + '].noiDungSuaChua" style="width: 100%">' + data.danhMucSCTXVOS[i].noiDungSuaChua + '</textarea>'
                            + '<input type="hidden" name="danhMucSCTXVOS[' + i + '].idDmSctx" value="' + data.danhMucSCTXVOS[i].idDmSctx + '"/>'
                            + '<input type="hidden" name="danhMucSCTXVOS[' + i + '].idSctx" value="' + data.danhMucSCTXVOS[i].idSctx + '"/>',
                            '<input class="form-control" value="'+(klDuyet_Tong === '0'?'':klDuyet_Tong) + " " + (data.danhMucSCTXVOS[i].tenDVT===null?'':data.danhMucSCTXVOS[i].tenDVT)+'" disabled>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS['+i+'].thoiGian_TH" style="width: 100%">' + data.danhMucSCTXVOS[i].thoiGian_TH + '</textarea>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS['+i+'].ghiChu_TH" style="width: 100%">' + data.danhMucSCTXVOS[i].ghiChu_TH + '</textarea>',
                            '<input class="form-control datepicker" type="text" name="danhMucSCTXVOS[' + i + '].ngayKT" data-mask="99/99/9999" value="' + data.danhMucSCTXVOS[i].ngayKT + '"/>',
                            '<select class="form-control" name="danhMucSCTXVOS[' + i + '].thucHien">' +
                                '<option value="-1"></option>'
                                +'<option value="0" '+((data.danhMucSCTXVOS[i].thucHien === '0' || data.danhMucSCTXVOS[i].thucHien === null)?'selected':'')+'>Chưa thực hiện</option>'
                                +'<option value="1" '+(data.danhMucSCTXVOS[i].thucHien === '1'?'selected':'')+'>Đã thực hiện</option>'
                            +'</select>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS['+i+'].danhGia" style="width: 100%">' + data.danhMucSCTXVOS[i].danhGia + '</textarea>',
                            '<input class="form-control" name="danhMucSCTXVOS['+i+'].nguoiKT" style="width: 100%" value="' + data.danhMucSCTXVOS[i].nguoiKT + '"/>'
                        ];
                        nhapKiemTraSCTXTable.row.add(rowHtml).draw();
                        nhapKiemTraSCTXTable.draw(false);
                        nhapKiemTraSCTXTable.page('first').draw('page');
                    }
                    nhapKiemTraSCTXTable.page.len(5).draw();
                    utils.loadDatePicker();
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
    let btnSave = function(){
        let form = $('#formNhapKiemTraSCTX');
        if (nhapKiemTraSCTXTable.data().count() !== 0) {
            nhapKiemTraSCTXTable.page.len(nhapKiemTraSCTXTable.data().count()).draw();
        }
        let method = "POST";
        let modelAttribute = "danhMucSCTXVO";
        form.attr("method", method);
        form.attr("action", url + "/worklife/user/suachuathuongxuyen/nhapkiemtrasctx/save.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        form.attr("modelAttribute", modelAttribute);
        form.attr("enctype", "multipart/form-data");
        form.submit();
    };
    let loadSelYear = function () {
        let thisYear = new Date().getFullYear();
        let startYear = 2000;
        let endYear = thisYear + 1;
        let options = "";
        for (let year = endYear; year >= startYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $("#selNam").html(options);
        $("#selNam").val(thisYear);
    };
    let setSelQuy = function () {
        $('#selQuy').val(moment().quarter());
    };
    return {
        init: function () {
            return setup();
        },
    }
})();
