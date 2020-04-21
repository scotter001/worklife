formManager = (function () {
    let tableDSCongTrinh;
    let tableDSvanBanPhapLy;
    let listHuyen = [];

    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        //initSelNam();
        configSelFromYear();
        //loadSelYear();
        tableDSCongTrinh = inittableDSCongTrinh();
        tableDSvanBanPhapLy = inittableDSvanBanPhapLy();
        initListHuyen();
        initTim();
        initTimNOn();
        utils.initNotifyMessageBox();
        loadScreenOnSelChange();
        utils.initIChecks('i-checks');
        utils.initIChecks('i-checksPL');
        $('#btnSave').on('click', btnSave);
        $('#btnSave2').on('click', btnSave2);
        $('#btnThemMoi').on('click', btnThemMoi);
        $('#btnThemMoi2').on('click', btnThemMoi2);
        $('#btnDelete').on('click', btnDelete);
        $('#btnDelete2').on('click', btnDelete2);
        exportDmScdkToExcel();
        //$('#btnDeleteTaiLieu').on('click', btnDeleteTaiLieu);
        //exportDmScdkToExcel();
    };
    let loadScreenOnSelChange = function () {
        $('#nam').on('change', initTim);
        $('#nam').on('change',  initTimNOn);
    };
    /*LOAD SEL YEAR*/
   /* let loadSelYear = function () {
        let thisYear = new Date().getFullYear();
        let startYear = 2019;
        let endYear = thisYear;
        let options = "";
        for (let year = endYear; year >= startYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $("#nam").html(options);
        $("#nam").val(thisYear);
    };*/
    /*let initSelNam = function () {
        let ngayHienTai = new Date();
        getYears(2000, ngayHienTai.getFullYear());
    };
    let getYears = function (fromYear, toYear) {
        let options = "";
        let year;
        for (year = toYear; year >= fromYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $('#nam').html(options);
    };*/
    let configSelFromYear = function () {
        let thisYear = new Date().getFullYear();
        let startYear = 2000;
        let endYear = thisYear;
        let options = "";
        for (let year = endYear; year >= startYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $("#nam").html(options);
        $("#nam").val(thisYear);
    };
    let initListHuyen = function () {
        $.ajax({
            url: url + '/worklife/user/quanlytuyenduong/dmtdtheohat/getlisthuyen.do',
            type: "POST",
            success: function (data) {
                if (data !== null) {
                    for (let i = 1; i < data.length; i++) {
                        listHuyen = data;
                    }
                }
            }
        })
    };
    let initSelect2 = function (elemId) {
        $(elemId).select2({
            tags: true,
            dropdownCssClass: 'bigdrop',
            allowClear: true,
            tokenSeparators: [','],
            multiple: true,
            placeholder: "Vui lòng chọn huyện/TP/TX"
        });
        $('.select2-selection__choice').css('margin', 0);
        $(elemId).change(function () {
            $('.select2-selection__choice').css('margin', 0);
        });
    };
    let inittableDSCongTrinh = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isChecked" />';
                }
            },
            {"targets": 1, class: "text-center", "orderable": false, "sWidth": "5%"},
            {"targets": 2, class: "text-center", "orderable": false, "sWidth": "15%"},
            {"targets": 3, class: "text-center", "orderable": false, "sWidth": "15%"},
            {"targets": 4, class: "text-center", "orderable": false, "sWidth": "10%"},
            {"targets": 5, class: "text-center", "orderable": false, "sWidth": "10%"},
            {"targets": 6, class: "text-center", "orderable": false, "sWidth": "10%"},
            {"targets": 7, class: "text-center", "orderable": false, "sWidth": "10%"},
            {"targets": 8, class: "text-center", "orderable": false, "sWidth": "10%"},
            {"targets": 9, class: "text-center", "orderable": false, "sWidth": "10%"},
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                for (let index = 0; index < $('#tableDSCongTrinh tbody tr').length; index++){
                    let data =($('select[name="lapDanhMucSCDKVOs['+index+'].listIdHuyen"]').attr('data'));
                    if (data === null && data === '' && data === undefined && data==="null") {
                    }else if (data !== null && data !== '' && data !== undefined && data!=="null") {
                        $('select[name="lapDanhMucSCDKVOs['+index+'].listIdHuyen"]').select2().val(data.split(',')).trigger("change");
                    }
                }
                utils.initIChecks('i-checks');

            },
            "scrollX": true,
            "scrollY": false,
            "scrollCollapse": true,
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableDSCongTrinh', colDefs, opts, 1);
    };
    let initTim = function () {
        $.ajax({
            url: url + "/worklife/user/suachuadinhky/lapdmscdk/dsdmscdks.do",
            type: "POST",
            data: {nam: $('#nam').val()},
            success: function (data) {
                if (data !== null) {
                    tableDSCongTrinh.clear().draw();
                    for (let i = 0; i < data.lapDanhMucSCDKVOs.length; i++) {
                        let rowHtml = [
                            '<input type="checkbox" class="i-checks isChecked" />',
                            createSel('lapDanhMucSCDKVOs[' + i + '].idDmhmScdk', data.lapDanhMucSCDKVOs[i].idDmhmScdk, i, data)+'<input type="hidden" name="lapDanhMucSCDKVOs[' + i + '].thuoc" value="' + data.lapDanhMucSCDKVOs[i].thuoc + '">'
                            +'<input type="hidden" name="lapDanhMucSCDKVOs[' + i + '].idDmScdk" value="' + data.lapDanhMucSCDKVOs[i].idDmScdk + '">',
                            createSelcham(data, data.lapDanhMucSCDKVOs[i].thuoc, data.lapDanhMucSCDKVOs[i].idCau, data.lapDanhMucSCDKVOs[i].idTuyenDuong, data.lapDanhMucSCDKVOs[i].idThietBi, i),
                            '<textarea rows="2" class="form-control"  multiple="multiple" name="lapDanhMucSCDKVOs[' + i + '].viTri"  style="width: 100%">' + FormatsNBTC(data.lapDanhMucSCDKVOs[i].viTri) + '</textarea>',
                            createSelHuyen('lapDanhMucSCDKVOs[' + i + '].listIdHuyen',data.lapDanhMucSCDKVOs[i].listIdHuyen,i),
                            createSels('lapDanhMucSCDKVOs[' + i + '].idUuTien', data.lapDanhMucSCDKVOs[i].idUuTien),
                            '<input type="text" class="form-control text-right"  name="lapDanhMucSCDKVOs[' + i + '].kinhPhiDuyet" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  value="' + FormatsNBTC(data.lapDanhMucSCDKVOs[i].kinhPhiDuyet) + '" style="text-align: right;text-align-last:center;margin-right: 0;;width: 100%"/>',
                            createSelss('lapDanhMucSCDKVOs[' + i + '].idDmNguonVon', data.lapDanhMucSCDKVOs[i].idDmNguonVon),
                            '<textarea rows="2" class="form-control"  multiple="multiple" name="lapDanhMucSCDKVOs[' + i + '].hienTrang"  style="width: 100%">' + FormatsNBTC(data.lapDanhMucSCDKVOs[i].hienTrang) + '</textarea>',
                            '<textarea rows="2" class="form-control"  multiple="multiple" name="lapDanhMucSCDKVOs[' + i + '].giaiPhap"  style="width: 100%">' + FormatsNBTC(data.lapDanhMucSCDKVOs[i].giaiPhap) + '</textarea>',
                        ];
                        tableDSCongTrinh.row.add(rowHtml).draw();
                        /*  tableDSCongTrinh.page.len(5).draw();*/
                        tableDSCongTrinh.draw(true);
                        if (tableDSCongTrinh.data().count() !== 0) {
                            tableDSCongTrinh.page.len(tableDSCongTrinh.data().count()).draw();
                        }
                        initSelect2('select[name="lapDanhMucSCDKVOs[' + i + '].listIdHuyen"]');
                    }
                }
                tableDSCongTrinh.page.len(10).draw();
                utils.initIChecks('i-checks');
                datatableFactory.checkCheckBox('checkAll', 'isChecked');
                datatableFactory.checkBoxOnSelect('checkAll', 'isChecked');
                utils.initDecimal(".decimalNumber", 3, 0);
                $('.decimalNumber').trigger('blur');

            }
        })
    };
    let createSels = function (selName, idUuTien,) {
        let selHtml = '<select class="form-control" name="' + selName + '" style="width:100%;text-align: center;text-align-last:center;margin-right: 0;" >';
        listUuTien.forEach(function (item, index) {
            selHtml += '<option ' + (idUuTien == item.id ? 'selected' : '') + ' value="' + item.id + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelHuyen = function (selName,data,index) {
        let selHtml = '<select class="form-control idhuyen nhieuHuyen" multiple="multiple"  name="' + selName + '" data = "'+data+'" index = "'+index  +'">';
        selHtml += '<option value="-1"></option>';
        listHuyen.forEach(function (item, index) {
            selHtml += '<option '  + ' value="' + item.idHuyen + '">' + item.tenHuyen + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    /* let createSelHuyen = function(selName,data, index){
         let selHtml = '<select class="form-control listnhieuHuyen" name="' + selName + '" listnhieuHuyen = "'+data+'" onchange="formManager.lnhieuhuyen(this, '+index+')" style="width:100%;" multiple="multiple">';
         selHtml += '<option value="-1"></option>';
         listHuyen.forEach(function (item, index) {
             selHtml += '<option ' + (data === item.idHuyen ? 'selected' : '') + ' value="' + item.tenHuyen + '">' + item.tenHuyen + '</option>';
         });
         selHtml += '</select>';
         return selHtml;
     };*/
    let createSel = function (selName, idDmhmScdk, i,) {
        let selHtml = '<select class="form-control hangMuc " name="' + selName + '" style="width:100%;"  onchange="formManager.ChangesT3(this,' + i + ')">';
        selHtml += '<option value="-1"></option>';
        listHangMuc.forEach(function (item, index) {
            selHtml += '<option ' + (idDmhmScdk == item.id ? 'selected' : '') + ' value="' + item.id + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelss = function (selName, idDmNguonVon) {
        let selHtml = '<select class="form-control "  name="' + selName + '" style="width:100%;text-align: center;text-align-last:center;margin-right: 0;" >';
        // selHtml += '<option value="-1"></option>';
        listNguonVon.forEach(function (item, index) {
            selHtml += '<option ' + (idDmNguonVon == item.idNguonVon ? 'selected' : '') + ' value="' + item.idNguonVon + '">' + item.tenNguonVon + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelcham  = function (data, thuoc, idCau, idTuyenDuong, idThietBi, i) {
        let thuoc1 = data.lapDanhMucSCDKVOs[i].thuoc;
        if (thuoc1 === null||thuoc1 ==='') {
            let abc =  '<lable type="text" class="form-control text-left" style="width: 100%"/>'
            return abc;
        } else
        if (thuoc1 === '1') {
            let abc= createSelTuyenDuong('lapDanhMucSCDKVOs[' + i + '].idTuyenDuong', data.lapDanhMucSCDKVOs[i].idTuyenDuong);
            return abc;
        } else if (thuoc1 === '2') {
            let abc= createSelCau('lapDanhMucSCDKVOs[' + i + '].idCau', data.lapDanhMucSCDKVOs[i].idCau);
            return abc;
        } else if (thuoc1 === '3') {
            let abc= createSelThietBi('lapDanhMucSCDKVOs[' + i + '].idThietBi', data.lapDanhMucSCDKVOs[i].idThietBi);
            return abc;
        } else if (thuoc1 === '4') {
            let abc = '<input type="text" class="form-control"  name="lapDanhMucSCDKVOs[' + i + '].tenCongTrinh"  value="' + data.lapDanhMucSCDKVOs[i].tenCongTrinh + '" style="width: 100%"/>';
            return abc;
        }
    };
    let createSelThietBi = function (selName, idThietBi) {
        let selHtml = '<select class="form-control TBval    "  name="' + selName + '" style="width:100%" >';
        selHtml += '<option value="-1"></option>';
        listThietBi.forEach(function (item, index) {
            selHtml += '<option ' + (idThietBi == item.idtb ? 'selected' : '') + ' value="' + item.idtb + '">' + item.tenTB + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelCau = function (selName, idCau) {
        let selHtml = '<select class="form-control CauVal "  name="' + selName + '" style="width:100%;text-align: center;text-align-last:center;margin-right: 0;" >';
        selHtml += '<option value="-1"></option>';
        listCau.forEach(function (item, index) {
            selHtml += '<option ' + (idCau == item.idCau ? 'selected' : '') + ' value="' + item.idCau + '">' + item.tenCau + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelTuyenDuong = function (selName, idTuyenDuong) {
        let selHtml = '<select class="form-control changechen "  name="' + selName + '" style="width:100%;text-align: center;text-align-last:center;margin-right: 0;" >';
        selHtml += '<option value="-1"></option>';
        listTuyenDuong.forEach(function (item, index) {
            selHtml += '<option ' + (idTuyenDuong == item.idTuyenDuong ? 'selected' : '') + ' value="' + item.idTuyenDuong + '">' + item.tenDuong + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let btnThemMoi = function () {
        let index = tableDSCongTrinh.rows().count();
        let rowHtml = [
            '<input type="checkbox" class="i-checks isChecked" id="checkSCTX"/>',
            createSel('lapDanhMucSCDKVOs[' + index + '].idDmhmScdk','',index) +'<input type="hidden" name="lapDanhMucSCDKVOs[' + index + '].idDmScdk" value="-1">',
            '<lable type="text" class="form-control text-left" style="width: 100%"/>',
            '<textarea type="text" class="form-control text-left"  name="lapDanhMucSCDKVOs[' + index + '].viTri"    style="width: 100%"</textarea> ',
            //'<input type="text" class="form-control"  name="lapDanhMucSCDKVOs[' + index + '].viTri"  onkeypress="return event.charCode >= 48 && event.charCode <= 57"   style="width: 100%;text-align: right;text-align-last:center;margin-right: 0;"/>',
            createSelHuyen('lapDanhMucSCDKVOs[' + index + '].listIdHuyen'),
            createSels('lapDanhMucSCDKVOs[' + index + '].idUuTien'),
            '<input type="text" class="form-control text-right"  name="lapDanhMucSCDKVOs[' + index + '].kinhPhiDuyet" onkeypress="return event.charCode >= 48 && event.charCode <= 57" style="text-align: right;text-align-last:center;margin-right: 0;;width: 100%"/>',
            createSelss('lapDanhMucSCDKVOs[' + index + '].idDmNguonVon'),
            '<textarea type="text" class="form-control text-left"  name="lapDanhMucSCDKVOs[' + index + '].hienTrang"   style="width: 100%"</textarea>',
            '<textarea type="text" class="form-control text-left"  name="lapDanhMucSCDKVOs[' + index + '].giaiPhap"   style="width: 100%"</textarea> '
        ];
        tableDSCongTrinh.row.add(rowHtml).draw();
        datatableFactory.indexing('tableDSCongTrinh', index);
        utils.initDecimal(".decimal", true, 0);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAll', 'isChecked');
        datatableFactory.checkBoxOnSelect('checkAll', 'isChecked');
        initSelect2('select[name="lapDanhMucSCDKVOs[' + index + '].listIdHuyen"]');
    };
    let inittableDSvanBanPhapLy = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "orderable": false,
                class: "text-center",
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isCheckedPL">';
                }
            },{
                "sWidth": "5%",
                "targets": 1,
                "orderable": false,
                class: "text-center",
                render: function (data, type, row, meta) {
                    let rowIndex = parseInt(meta.row);
                    let startAt = parseInt(meta.settings._iDisplayStart);
                    return rowIndex + startAt + 1;
                }
            },
            {"targets": 2, class: "text-center", "orderable": false, "sWidth": "30%"},
            {"targets": 3, class: "text-center", "orderable": false, "sWidth": "15%"},
            {"targets": 4, class: "text-center", "orderable": false, "sWidth": "15%"},
            {"targets": 5, class: "text-center", "orderable": false, "sWidth": "25%"},
            {"targets": 6, class: "text-center", "orderable": false, "sWidth": "5%"},
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
        return datatableFactory.initDataSourceDataTableNonLoad('tableDSvanBanPhapLy', colDefs, opts, 1);
    };
    let initTimNOn = function () {
        $.ajax({
            url: url + "/worklife/user/suachuadinhky/lapdmscdk/getdsphaply.do",
            type: "POST",
            data: {nam: $('#nam').val()},
            success: function (data) {
                if (data.phapLySCDKVOs.length >0) {
                    tableDSvanBanPhapLy.clear().draw();
                    for (let i = 0; i < data.phapLySCDKVOs.length; i++) {
                        let downloadFileIcon = "";
                        let tenFile = "";
                        if (data.phapLySCDKVOs[i].tenFile == null || data.phapLySCDKVOs[i].tenFile == undefined || data.phapLySCDKVOs[i].tenFile == '') {
                            tenFile = 'File đính kèm';
                        } else {
                            downloadFileIcon = '<span class="btn btn-white btn-sm" data-placement="top" title="" data-original-title="Tải file đính kèm" onclick="formManager.downloadPhapLyFile(this)">'
                                + '<i class="fa fa-download" ></i>'
                                + '</span>';
                            tenFile = data.phapLySCDKVOs[i].tenFile;
                        }
                        let rowHtml = [
                            '<input type="checkbox" class="i-checks isCheckedPL" id="isCheckedPL"/>',
                            i+1 ,
                            '<input type="hidden" value="'+data.phapLySCDKVOs[i].idPL+'"  name="phapLySCDKVOs[' + i + '].idPL" >'
                            +'<input type="text" class="form-control"  name="phapLySCDKVOs[' + i + '].tenVanBan"  value="' + FormatsNBTC(data.phapLySCDKVOs[i].tenVanBan) + '" style=";width: 100%"/>',
                            '<input type="text" class="form-control"  name="phapLySCDKVOs[' + i + '].soVB"  value="' + FormatsNBTC(data.phapLySCDKVOs[i].soVB) + '" style=";width: 100%"/>',
                            '<input type="text"   class="form-control datepicker formatDate" data-mask="99/99/9999"  name="phapLySCDKVOs[' + i + '].ngayVB"  value="' + data.phapLySCDKVOs[i].ngayVB + '" style=";width: 100%"/>',
                            '<div class="btn-group attackFile">'
                            + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="formManager.eventUploadDocumentFile(this,\'soVB\')" title="" for="uploadAttackFile' + i + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
                            + formManager.hideStringIfOver20Character(tenFile)
                            + '</label>'
                            + '<input type="file" value="" name="phapLySCDKVOs[' + i + '].file" id="uploadAttackFile' + i + '" class="hide">'
                            + '<span style="display: inherit;"><i onclick="formManager.eventDeleteFileTaiLieu(this)" class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
                            + '</div>',
                            downloadFileIcon
                        ];
                        tableDSvanBanPhapLy.row.add(rowHtml).draw();
                        tableDSvanBanPhapLy.page.len(7).draw();
                        utils.loadDatePicker('.datepicker');
                    }
                }
                else {
                    tableDSvanBanPhapLy.clear().draw();
                    for (let i = 0; i < 3; i++) {
                        let rowHtml = [
                            '<input type="checkbox" class="i-checks isCheckedPL" id="isCheckedPL"/>',
                            i+1 ,
                            '<input type="hidden" value="-1"  name="phapLySCDKVOs[' + i + '].idPL" >'
                             +selLau(i),
                            '<input type="text"  class="form-control"  name="phapLySCDKVOs[' + i + '].soVB"  style=";width: 100%"/>',
                            '<input type="text"   class="form-control datepicker formatDate" data-mask="99/99/9999"  name="phapLySCDKVOs[' + i + '].ngayVB"   style=";width: 100%"/>',
                            '<div class="btn-group attackFile">'
                            + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="formManager.eventUploadDocumentFile(this,\'soVB\')" title="" for="uploadAttackFileTL' + i + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
                            + multiLanguage.attackfile
                            + '</label>'
                            + '<input type="file" value="" name="phapLySCDKVOs[' + i + '].file" id="uploadAttackFileTL' + i + '" class="hide">'
                            + '<span style="display: inherit;"><i onclick="formManager.eventDeleteFileTaiLieu(this)" class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
                            + '</div>',
                            ''
                        ];
                        tableDSvanBanPhapLy.row.add(rowHtml).draw();
                        tableDSvanBanPhapLy.page.len(7).draw();
                        utils.loadDatePicker('.datepicker');
                    }
                }
                utils.initDecimal(".decimalNumber", 3, 0);
                $('.decimalNumber').trigger('blur');
                utils.initIChecks('i-checksPL');
                datatableFactory.checkCheckBox('checkAllPL', 'isCheckedPL');
                datatableFactory.checkBoxOnSelect('checkAllPL', 'isCheckedPL');
            }
        })
    };
    let selLau = function (i) {
        if(i===0){
            abc = '<input type="text" class="form-control"  name="phapLySCDKVOs[' + i + '].tenVanBan"  value="Tờ trình chủ trương đầu tư" style=";width: 100%"/>'
            return abc;
        }else if(i===1){
            abc = '<input type="text" class="form-control"  name="phapLySCDKVOs[' + i + '].tenVanBan"  value="Văn bản thẩm định" style=";width: 100%"/>'
            return abc;
        }else if(i===2){
            abc =  '<input type="text" class="form-control"  name="phapLySCDKVOs[' + i + '].tenVanBan"  value="Quyết định Chủ trương đầu tư" style=";width: 100%"/>'
            return abc;
        }
    };
    let btnThemMoi2 = function () {
        let index = tableDSvanBanPhapLy.rows().count();
        let rowHtml = [
            '<input type="checkbox" class="i-checks isCheckedPL" id="isCheckedPL"/>',
            index + 1,
            '<input type="hidden" name="phapLySCDKVOs[' + index + '].idPL" value="-1">'
            +'<input type="text" class="form-control"  name="phapLySCDKVOs[' + index + '].tenVanBan"  style=";width: 100%"/>',
            '<input type="text" class="form-control"  name="phapLySCDKVOs[' + index + '].soVB"   style=";width: 100%"/>',
            '<input type="text" class="form-control datepicker formatDate" data-mask="99/99/9999"  name="phapLySCDKVOs[' + index + '].ngayVB"   style=";width: 100%"/>',
            '<div class="btn-group attackFile">'
            + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="formManager.eventUploadDocumentFile(this,\'soVB\')" title="" for="uploadAttackFileTL' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
            + multiLanguage.attackfile
            + '</label>'
            + '<input type="file" value="" name="phapLySCDKVOs[' + index + '].file" id="uploadAttackFileTL' + index + '" class="hide">'
            + '<span style="display: inherit;"><i onclick="formManager.eventDeleteFileTaiLieu(this)" class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
            + '</div>',
            ''
        ];
        tableDSvanBanPhapLy.row.add(rowHtml).draw();
        datatableFactory.indexing('tableDSvanBanPhapLy', index);
        utils.initDecimal(".decimal", true, 0);
        utils.loadDatePicker('.datepicker');
        utils.initIChecks('i-checksPL');
        datatableFactory.checkCheckBox('checkAllPL', 'isCheckedPL');
        datatableFactory.checkBoxOnSelect('checkAllPL', 'isCheckedPL');
    };
    let FormatsNBTC = function (abc) {
        if (abc ===  0||abc === null||abc === undefined){
            abc = "";
            return abc;
        }
        return abc;
    };
    let btnSave = function () {
        let form = $("#formDSCongTrinh");
        for (let i = 0; i < $('#tableDSCongTrinh tbody tr').length; i++) {
            $('.select2-hidden-accessible').attr('data', '')
        }
        if (form.valid()){
            if (tableDSCongTrinh.data().count() !== 0) {
                tableDSCongTrinh.page.len(tableDSCongTrinh.data().count()).draw();
            }
            let modelAttribute = "lapDanhMucSCDKVO";
            for (let i = 0; i < $('#tableDSCongTrinh tbody tr').length; i++) {
                form.append('<input hidden name="lapDanhMucSCDKVOs[' + i + '].nam"  value="' + ($('#nam').val()) + '"/>');
                let listIdHuyen = [];
                $('select[name="lapDanhMucSCDKVOs[' + i + '].listIdHuyen"]').find(':selected').each(function (i, d) {
                    listIdHuyen.push($(d).attr('value'))
                });
                if (listIdHuyen.length === 0) {
                    form.append('<input type="hidden" name="lapDanhMucSCDKVOs[' + i + '].listIdHuyen" value="-1">');
                }
            }
            form.attr("action", url + "/worklife/user/suachuadinhky/lapdmscdk/saveForm.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
            form.attr("modelAttribute", modelAttribute);
            form.attr("enctype", "multipart/form-data");
            form.submit();
        }
    };
    let valilau = function () {
        for (let i = 0; i < $('#tableDSvanBanPhapLy tbody tr').length; i++) {
            a =  $('input[name="phapLySCDKVOs['+i+'].soVB"]').val();
            b = $('input[name="phapLySCDKVOs['+i+'].tenVB"]').val();
            if (a===""){
                swal({
                    title: multiLanguage.notify,
                    text: "Nhập số văn bản trước khi lưu nè",
                    type: "warning",
                    confirmButtonText: multiLanguage.accept
                });
                return false;
            }
        }
        return true;
    };
    let valilau2 = function () {
        for (let i = 0; i < $('#tableDSvanBanPhapLy tbody tr').length; i++) {
            b = $('input[name="phapLySCDKVOs['+i+'].tenVanBan"]').val();
            if (b=== ""){
                swal({
                    title: multiLanguage.notify,
                    text: "Nhập đầy đủ dữ lưu trước khi lưu nè",
                    type: "warning",
                    confirmButtonText: multiLanguage.accept
                });
                return false;
            }
        }
        return true;
    };
    let btnSave2 = function () {
        if(valilau() == true && valilau2()== true){
            let form = $("#formDSvanBanPhapLy");
            if (tableDSvanBanPhapLy.data().count() !== 0) {
                tableDSvanBanPhapLy.page.len(tableDSvanBanPhapLy.data().count()).draw();
            }
            let method = "POST";
            let modelAttribute = "phapLySCDKVO";
            for (let i = 0; i < $('#tableDSvanBanPhapLy tbody tr').length; i++) {
                form.append('<input hidden name="phapLySCDKVOs[' + i + '].nam"  value="' + ($('#nam').val()) + '"/>');
            }
            form.attr("method",method);
            form.attr("action",url + "/worklife/user/suachuadinhky/lapdmscdk/saveForm2.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
            form.attr("modelAttribute",modelAttribute);
            form.attr("enctype","multipart/form-data");
            form.submit();
        }else {
            swal({
                title: multiLanguage.notify,
                text: "Nhập đầy đủ dữ lưu trước khi lưu",
                type: "warning",
                confirmButtonText: multiLanguage.accept
            });
        }

    };

    let btnDelete = function () {
        datatableFactory.removeRowByHoan("idDmScdk",tableDSCongTrinh,rootPath+"/worklife/user/suachuadinhky/deleteDanhMucSCDK.do","checkAll",refeshTable);
    };
    let btnDelete2 = function () {
        datatableFactory.removeRowByHoan("idPL",tableDSvanBanPhapLy,rootPath+"/worklife/user/suachuadinhky/deletedsphaply.do","checkAllPL",refeshTable2);
    };
    let refeshTable = function () {
       // datatableFactory.refreshPagination("tableDSCongTrinh");
        datatableFactory.resetIndex(tableDSCongTrinh, "lapDanhMucSCDKVOs");

    };
    let refeshTable2 = function () {
        datatableFactory.refreshPagination("tableDSvanBanPhapLy");
        datatableFactory.resetIndex(tableDSvanBanPhapLy, "phapLySCDKVOs");
    };
    let exportDmScdkToExcel = function () {
        $('#btnExportDmScdkToExcel').on('click', function () {
            let nam = $('#nam').val();
            window.open(url + '/worklife/user/suachuadinhky/reportExcelToYear.do?nam=' + nam);
        });
    };
    return {
        init: function ss() {
            return setup();
        },
        eventUploadDocumentFile: function (element,selName) {
            element.form = $('#formDSvanBanPhapLy');
            let currentRow = $(element).closest('tr');
            let tenGiay = $(currentRow).find('[name$="' + selName + '"]').val();
            console.log(tenGiay);
            if (!tenGiay) {
                swal({
                    title: multiLanguage.notify,
                    text: "Nhập số văn bản trước khi chọn file",
                    type: "warning",
                    confirmButtonText: multiLanguage.accept
                });
                event.preventDefault();
                return false;
            } else {
                let input = $(currentRow).find('input[type="file"]');
                //Khi click vào thẻ input[type=file], hộp thoại browser hiện lên để chọn file cần upload
                $(input).on('change', function (event) {
                    //Khi nếu chọn được file để upload
                    //event.stopPropagation();
                    let $this = $(this);
                    let tenfile = $(input).val();
                    if (null == $this[0].files[0]) {
                        this.value = null;
                        return;
                    }
                    let sizeFile = $this[0].files[0].size;
                    let html = $this[0].outerHTML;
                    if (sizeFile > 209715200) {
                        swal({
                            title: multiLanguage.notify,
                            text: "Dung lượng file đính kèm không được vượt quá 200Mb",
                            type: "warning",
                            confirmButtonText: multiLanguage.accept
                        });
                        this.value = null;
                    } else {
                        if (tenfile != '') {
                            strArr = tenfile.split("\\");
                            let fixStr = strArr[strArr.length - 1];
                            if (fixStr.length > 20) {
                                $(element).attr("data-original-title", fixStr);
                            }
                            else {
                                $(element).attr("data-original-title", '');
                            }
                            $(element).text(formManager.hideStringIfOver20Character(fixStr));
                            $(currentRow).find('input[name*="fileUploadVO.ten"]').val(fixStr);
                            console.log(fixStr);
                            $(currentRow).find('.btn-download').hide();
                            //Delete icon download
                            if ($(currentRow).find('td:last-child span').length) {
                                $(currentRow).find('td:last-child span').remove();
                            }
                        }
                    }
                });
            }
        },
        hideStringIfOver20Character: function (tenFile) {
            let arrData = tenFile.split(".");
            let joinStr = "";
            if (arrData.length > 2) {
                for (var i = 0; i < arrData.length - 1; i++) {
                    if (i != 0)
                        joinStr += "." + arrData[i];
                    else
                        joinStr += arrData[i];
                }
            } else {
                joinStr = arrData[0];
            }
            if (joinStr.length >= 20) {
                joinStr = joinStr.substring(0, 15);
                tenFile = joinStr + "...." + arrData[arrData.length - 1];
            }
            return tenFile;
        },
        eventDeleteFileTaiLieu: function (element) {
            let divFile = $(element).closest("div.attackFile");
            let fileName = $(divFile).find("label").text().trim();
            if (fileName === multiLanguage.attackfile) {
                return;
            } else {
                swal
                ({
                    title: multiLanguage.notify,
                    text: multiLanguage.deleteconfirm,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: multiLanguage.accept,
                    cancelButtonText: multiLanguage.cancel,
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        try {
                            let idPL = $(element).closest("tr").find("input[name*='idPL']").val();
                            $.ajax({
                                type: "POST",
                                url: url + "/worklife/user/doccumentfile/filetailieuphaply/json/delete.do?" + $("meta[name='_csrf_name']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'),
                                data: {'idPL': idPL},
                                success: function (data) {
                                    $(divFile).find("label").text(multiLanguage.attackfile);
                                    $(divFile).find("label").attr("data-original-title", "");
                                    let currentRow = $(element).closest('tr');
                                    $(currentRow).find("input[type='file']").val(null);
                                    /*$(currentRow).find('input[name*="fileUploadVO.ten"]').val('');*/
                                    $(currentRow).find('input[name*="idPL"]').val(0);
                                    $(currentRow).find('.btn-download').hide();
                                    if ($(currentRow).find('td:last-child span').length) {
                                        $(currentRow).find('td:last-child span').remove();
                                    }
                                    swal({
                                        title: multiLanguage.notify,
                                        text: multiLanguage.deletesuccesfully,
                                        type: "success",
                                        confirmButtonText: multiLanguage.accept
                                    });
                                },
                            });
                        }
                        catch (e) {

                        }
                    }
                });
            }
        },
        downloadPhapLyFile: function (element) {
            let idPL = $(element).closest("tr").find("td:eq(2)").find('input[type="hidden"]').val();
            window.location = url + "/worklife/user/file/json/downloadfilephaply.do?idPL=" + parseInt(idPL);
        },
        ChangesT3: function (element, index) {
            let idDmhmScdk =   $('select[name="lapDanhMucSCDKVOs['+index+'].idDmhmScdk"]').val();
            let arr = listHangMuc;
            $.ajax({
                url: url + '/worklife/user/suachuadinhky/lapdmscdk/getdanhmucbyid.do',
                data: {idDmhmScdk: idDmhmScdk},
                type: "POST",
                success: function (data) {
                    if (data !== null) {
                        let thuoc1 = data.thuoc;
                        $('select[name="lapDanhMucSCDKVOs['+index+'].idDmhmScdk"]').parents('td').next().children().remove();
                        if (thuoc1 === '1') {
                            $('select[name="lapDanhMucSCDKVOs['+index+'].idDmhmScdk"]').parents('td').next().append(createSelTuyenDuong('lapDanhMucSCDKVOs[' + index + '].idTuyenDuong'));
                            return;
                        } else if (thuoc1 === '2') {
                            $('select[name="lapDanhMucSCDKVOs['+index+'].idDmhmScdk"]').parents('td').next().append(createSelCau('lapDanhMucSCDKVOs[' + index + '].idCau'));
                            return;
                        } else if (thuoc1 === '3') {
                            $('select[name="lapDanhMucSCDKVOs['+index+'].idDmhmScdk"]').parents('td').next().append(createSelThietBi('lapDanhMucSCDKVOs[' + index + '].idThietBi'));
                            return;
                        } else if (thuoc1 === '4') {
                            $('select[name="lapDanhMucSCDKVOs['+index+'].idDmhmScdk"]').parents('td').next().append('<input type="text" class="form-control"   name="lapDanhMucSCDKVOs[' + index + '].tenCongTrinh"  style="width: 100%"/>');
                            return;
                        }else  if (thuoc1 === '' || thuoc1 === '-1' || thuoc1 === undefined){
                            $('select[name="lapDanhMucSCDKVOs['+index+'].idDmhmScdk"]').parents('td').next().append('<lable type="text" class="form-control text-left" style="width: 100%"/>');
                            return;
                        }}}
            });
        }
    }
})();
