formManager = (function () {
    let tableNhieuTD, tableTaiLieu, tableCongThucThuPhi;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        loadDatePicker();
        initHuyen();
        initXa();
        $('#idHuyen').on('change', initXa);
        /*initLoaiCT();*/
        $('#rb2').on('click', function () {
            $('#diaDiemDuong').addClass('hidden');
            $('#phamViCT').addClass('hidden');
            $('#tableND').removeClass('hidden');
            $('#nhieuDuong').val(1);
            $('#layNDCP').removeClass('hidden');
            $('#layDiaDiem').removeClass('hidden');
        });
        $('#rb1').on('click', function () {
            $('#diaDiemDuong').removeClass('hidden');
            $('#phamViCT').removeClass('hidden');
            $('#tableND').addClass('hidden');
            $('#nhieuDuong').val('');
            $('#layNDCP').addClass('hidden');
            $('#layDiaDiem').addClass('hidden');
        });
        tableNhieuTD = initTableNhieuTD();
        tableTaiLieu = initTableTaiLieu();
        $('#btnAdd').on('click', btnAdd);
        $('#btnAddTL').on('click', btnAddTL);
        $('#tenDuong,#idHuyen').on('change', changeH);
        $('#tenDuong, #idXa').on('change', changeNDCP);
        $('#layNDCP').on('click', layNDCP);
        $('#layDiaDiem').on('click', layDiaDiem);
        $('#btnSaveTT').on('click', btnSaveTT);
        $('#thoiHan,#tuNgay').on('change', changeTuNgay);
        loadTableTaiLieu();
        loadTuyenDuong();
        $('#btnDeleteTL').on('click', btnDeleteHS);
        $('#btnDel').on('click', btnDel);
        $('#chapThuanCTTY').on('click', loadFormChapThuanCTTY);
        $('#giayPhepTCTY').on('click', loatFormGPCTTY);
        $('#thuPhiKyQuy').on('click', loadFormThuPhiKyQuy);
        $('#thongTinCTTY').on('click', function () {
            let idHoSo = parseInt($('input[name="idHoSo"]').val());
            window.location = url + '/worklife/qlctgt/user/danhsachhs/xulyhoso/hosocpctthietyeu.do?idHoSo=' + idHoSo;
            $('#thongTinCTTY').addClass('active');
            $('#chapThuanCTTY').removeClass('active');
            $('#tabttctthietyeu').removeClass('hidden');
            $('#tabchapthuanct').addClass('hidden');
            $('#tabgiayphepctty').addClass('hidden');
            $('#giayPhepTCTY').removeClass('active');
            $('#thuPhiKyQuy').removeClass('active');
            $('#tabthuphikyquy').addClass('hidden');
        });
        $('#nguoiKy').on('change', function () {
            $('#chucVu').val($('#nguoiKy option:selected').attr('chucvu'));
            if ($('#nguoiKy option:selected').attr('uyquyen') === '0'){
                $('#uyQuyen').attr('disabled', true);
            }
        });
        $('#vb_So').on('change', function () {
            $('#vb_Ngay').attr('disabled', false);
        });
        $('#btnSaveVBCT').on('click', btnSaveVBCT);
        $('#btnSaveGP').on('click', btnSaveGP);
        $('#btnReportVBCT').on('click', btnReportVBCT);
        $('#layLaiND').on('click', layLaiND);
        $('#btnReportGP').on('click', btnReportGP);
        if ($('#sidLoaiCongTrinh').val() === '10') {
            $('#thuPhiKyQuy').addClass('hidden');
        }
        else {
            if ($('#sidLoaiCongTrinh').val() === '12'){
                $('#tinhPhi').addClass('hidden');
                $('#lbCongThuc').addClass('hidden');
            }
            else {
                $('#tinhPhi').removeClass('hidden');
                $('#lbCongThuc').removeClass('hidden');
            }
            $('#thuPhiKyQuy').removeClass('hidden');
        }
        eventUtils.initNguoiKyVB();
        eventUtils.initNguoiKyGP();
        $('#nguoiKyGP').on('change', function () {
            $('#chucVuGP').val($('#nguoiKyGP option:selected').attr('chucvu'));
        });
        $('#gp_So').on('change', function () {
            $('#gp_Ngay').attr('disabled', false);
        });
        $('#layLaiNDCP').on('click', layLaiNDCP);
        tableCongThucThuPhi = initTableCongThucThuPhi();
        $('#btnAddCT').on('click', btnAddCT);
        $('#btnDelCT').on('click', btnDelCT);
        initDonGia();
        utils.initIChecks('i-checksTL');
        utils.initIChecks('i-checksTD');
        utils.initDecimal('.decimalNumber', true, 0);
        utils.initNotifyMessageBox();
    };
    let loadDatePicker = function (className) {
        if (className === undefined)
            className = '.datepicker';
        $(className).datepicker({
            todayBtn: "linked",
            format: 'dd/mm/yyyy',
            autoclose: true,
            keyboardNavigation: false,
            forceParse: false,
            todayHighlight: true
        })
    };
    let initHuyen = function () {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getlisthuyen.do",
            type: "POST",
            success: function (data) {
                if (data !== null) {
                    let idHuyen = parseInt($('#sidHuyen').val());
                    let options = '<option value="-1"></option>';
                    for (dat of data) {
                        let selected = '';
                        if (idHuyen !== undefined && idHuyen !== null) {
                            if (dat.idHuyen === idHuyen)
                                selected = 'selected ';
                        }
                        options += '<option {2} value="{0}" loai="{3}">{1}</option>'.f(dat.idHuyen, dat.tenHuyen, selected, dat.loai);
                    }
                    $('#idHuyen').html(options);
                }
            }
        })
    };
    let initXa = function () {
        let idHuyen = $('#idHuyen').val();
        let idXa = parseInt($('#sidXa').val());
        if (idHuyen === undefined || idHuyen === null)
            idHuyen = $('#sidHuyen').val();
        $.ajax({
            url: url + '/worklife/user/quanlytuyenduong/dmtdthuoctinh/getxabyidhuyen.do',
            type: "POST",
            data: {idHuyen: idHuyen},
            success: function (data) {
                if (data !== null) {
                    let options = '<option value="-1"></option>';
                    for (dat of data) {
                        let selected = '';
                        if (idXa !== undefined && idXa !== null) {
                            if (dat.iDDmXa === idXa)
                                selected = 'selected ';
                        }
                        options += '<option {2} value="{0}" loai="{3}">{1}</option>'.f(dat.iDDmXa, dat.tenXa, selected, dat.loai);
                    }
                    $('#idXa').html(options);
                }
            }
        })
    };
    let initLoaiCT = function () {
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpctthietyeu/getloaihinh.do',
            type: 'post',
            success: function (data) {
                if (data != null){
                    let options = '<option value="-1"></option>';
                    for (dat of data) {
                        let selected = '';
                        /*if (id !== undefined && id !== null) {
                            if (dat.id === id)
                                selected = 'selected ';
                        }*/
                        options += '<option {2} value="{0}">{1}</option>'.f(dat.id, dat.ten/*, selected*/);
                    }
                    $('#idLoaiCongTrinh').html(options);
                }
            }
        })
    };
    let initTableNhieuTD = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isCheckedTD"/>';
                }
            },
            {
                "sWidth": "5%",
                "targets": 1,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {"targets": 2, class: "text-center", width: "20%"},
            {"targets": 3, class: "text-center", width: "15%"},
            {"targets": 4, class: "text-center", width: "15%"},
            {"targets": 4, class: "text-center", width: "40%"}
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
        return datatableFactory.initDataSourceDataTableNonLoad('tableNhieuTD', colDefs, opts, 1);
    };
    let btnAdd = function () {
        let index = $('#tableNhieuTD').DataTable().rows().count();
        let rowHtml = [
            '<input type="checkbox" class="i-checks isCheckedTD" value="0" />',
            index + 1,
            '<input type="text" class="form-control" name="congTrinhChiTietVOS['+index+'].tenDuong" style="width: 100%">'
            + '<input type="hidden" class="form-control" name="congTrinhChiTietVOS['+index+'].idctct" value="-1">'
            + '<input type="hidden" class="form-control" name="congTrinhChiTietVOS['+index+'].nhieuDuong" value="1">',
            createSelHuyen('congTrinhChiTietVOS['+index+'].idHuyen','', index),
            createSelXa('congTrinhChiTietVOS['+index+'].idXa',''),
            '<textarea class="form-control" rows="3" name="congTrinhChiTietVOS['+index+'].dienGiai" style="width: 100%"></textarea>'
        ];
        tableNhieuTD.row.add(rowHtml).draw();
        datatableFactory.indexing('tableNhieuTD', index);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAll', 'isCheckedTD');
        datatableFactory.checkBoxOnSelect('checkAll', 'isCheckedTD');
    };
    let createSelHuyen = function (selName, idHuyen, index) {
        let selHtml = '<select class="form-control" name="'+selName+'" onchange="formManager.changeHuyen(this,'+index+')" style="width: 100%">';
        selHtml += '<option value="-1"></option>';
        listIdHuyen.forEach(function (item, index) {
            selHtml += '<option ' + (parseInt(idHuyen) === item.idHuyen ? 'selected' : '') + ' value="' + item.idHuyen + '" loai="'+item.loai+'">' + item.tenHuyen + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelXa = function (selName, idXa) {
        let selHtml = '<select class="form-control" name="'+selName+'" style="width: 100%">';
        selHtml += '<option value="-1"></option>';
        listIdXa.forEach(function (item, index) {
            selHtml += '<option ' + (parseInt(idXa) === item.iDDmXa ? 'selected' : '') + ' value="' + item.idXa + '">' + item.tenXa + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let initTableTaiLieu = function(){
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checkstl isCheckedTL"/>';
                }
            },
            {
                "sWidth": "5%",
                "targets": 1,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {"targets": 2, class: "text-center", width: "50%"},
            {"targets": 3, class: "text-center", width: "30%"},
            {"targets": 4, class: "text-center", width: "10%"},
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                utils.initIChecks('i-checkstl');
            },
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableTaiLieu', colDefs, opts, 1);
    };
    let btnAddTL = function () {
        let index = $('#tableTaiLieu').DataTable().rows().count();
        let rowHTML = [
            '<input type="checkbox" class="i-checkstl isCheckedTL" value="0" />',
            index + 1,
            '<input type="text" class="form-control" name="taiLieuCongTrinhVOS[' + index + '].tenTaiLieu" style="width:100%;"/>'
            + '<input type="hidden" class="form-control" name="taiLieuCongTrinhVOS[' + index + '].idTL" value="-1" />',
            '<div class="btn-group attackFile">'
            + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="formManager.eventUploadDocumentFile(this)" title="" for="uploadAttackFile' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
            + multiLanguage.attackfile
            + '</label>'
            + '<input type="file" value="" name="taiLieuCongTrinhVOS[' + index + '].file" id="uploadAttackFile' + index + '" class="hide">'
            + '<input type="hidden" value="0" name="taiLieuCongTrinhVOS[' + index + '].id"/>'
            + '<span style="display: inherit;"><i onclick="formManager.eventDeleteFileTaiLieu(this)" class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
            + '</div>',
            ''
        ];
        tableTaiLieu.row.add(rowHTML).draw();
        datatableFactory.indexing('tableTaiLieu', index);
        utils.initIChecks('i-checkstl');
        datatableFactory.checkCheckBox('checkAllTL', 'isCheckedTL');
        datatableFactory.checkBoxOnSelect('checkAllTL', 'isCheckedTL');
    };
    let changeNDCP = function () {
        $('#diaDiem_DiaChi').val('');
        let loai = '';
        if ($('#idHuyen option:selected').attr('loai') === '1')
            loai = ' thành phố ';
        else if ($('#idHuyen option:selected').attr('loai') === '2')
            loai = ' huyện ';
        else
            loai = ' thị xã ';

        let loaixa = '';
        if ($('#idXa option:selected').val() !== '-1' && $('#idXa option:selected').val() !== null) {
            if ($('#idXa option:selected').attr('loai') === '1')
                loaixa = ' xã ';
            else if ($('#idHuyen option:selected').attr('loai') === '2')
                loaixa = ' phường ';
            else
                loaixa = ' thị trấn ';
        }
        diaDiem = $('#tenDuong').val()
            + ($('#idXa option:selected').text()===''?'':',' + loaixa + $('#idXa option:selected').text())
            + ($('#idHuyen option:selected').text()===''?'':',' + loai + $('#idHuyen option:selected').text());
        $('#diaDiem_DiaChi').val(diaDiem);
    };
    let changeH = function(){
        $('#diaDiem_DiaChi').val('');
        let loai = '';
        if ($('#idHuyen option:selected').attr('loai') === '1')
            loai = ' thành phố ';
        else if ($('#idHuyen option:selected').attr('loai') === '2')
            loai = ' huyện ';
        else
            loai = ' thị xã ';
        let noiDung_CapPhep = 'Đào vỉa hè lắp đặt công trình thiết yếu trong phạm vi đất của đường bộ tuyến đường ' + $('#tenDuong').val()
            + ($('#idHuyen option:selected').text()===''?'':',' + loai + $('#idHuyen option:selected').text());
        diaDiem = $('#tenDuong').val()
            + ($('#idHuyen option:selected').text()===''?'':',' + loai + $('#idHuyen option:selected').text());
        $('#noiDung_CapPhep').val(noiDung_CapPhep);
        $('#diaDiem_DiaChi').val(diaDiem);
    };
    let layNDCP = function () {
        $('#noiDung_CapPhep').val('');
        let Default = 'Đào vỉa hè lắp đặt công trình thiết yếu trong phạm vi đất của đường bộ tuyến đường ';
        if ($('select[name="congTrinhChiTietVOS[0].idHuyen"] option:selected').attr('loai') === '1')
            loai = ' thành phố ';
        else if ($('select[name="congTrinhChiTietVOS[0].idHuyen"] option:selected').attr('loai') === '2')
            loai = ' huyện ';
        else
            loai = ' thị xã ';
        let diaDiem = $('input[name="congTrinhChiTietVOS[0].tenDuong"]').val() + loai + $('select[name="congTrinhChiTietVOS[0].idHuyen"] option:selected').text();
        if ($('#tableNhieuTD tbody tr').length >= 2) {
            for (let i = 1; i < $('#tableNhieuTD tbody tr').length; i++){
                if ($('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').attr('loai') === '1')
                    loai = ' thành phố ';
                else if ($('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').attr('loai') === '2')
                    loai = ' huyện ';
                else
                    loai = ' thị xã ';
                if ($('input[name="congTrinhChiTietVOS[0].tenDuong"]').val() === $('input[name="congTrinhChiTietVOS['+i+'].tenDuong"]').val()){
                    diaDiem += ', ' + $('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').text();
                }
                else {
                    diaDiem += '; ' + $('input[name="congTrinhChiTietVOS['+i+'].tenDuong"]').val() + loai + $('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').text();
                }
            }
        }
        $('#noiDung_CapPhep').val(Default + diaDiem);
    };
    let layDiaDiem = function() {
        $('#diaDiem_DiaChi').val('');
        if ($('select[name="congTrinhChiTietVOS[0].idHuyen"] option:selected').attr('loai') === '1')
            loai = ' thành phố ';
        else if ($('select[name="congTrinhChiTietVOS[0].idHuyen"] option:selected').attr('loai') === '2')
            loai = ' huyện ';
        else
            loai = ' thị xã ';

        if ($('select[name="congTrinhChiTietVOS[0].idXa"] option:selected').attr('loai') === '1')
            loaixa = ' xã ';
        else if ($('select[name="congTrinhChiTietVOS[0].idXa"] option:selected').attr('loai') === '2')
            loaixa = ' phường ';
        else
            loaixa = ' thị trấn ';
        let diaDiem = ($('input[name="congTrinhChiTietVOS[0].tenDuong"]').val()===''?'': $('input[name="congTrinhChiTietVOS[0].tenDuong"]').val())
            + loaixa + $('select[name="congTrinhChiTietVOS[0].idXa"] option:selected').text()
            + loai + $('select[name="congTrinhChiTietVOS[0].idHuyen"] option:selected').text();
        if ($('#tableNhieuTD tbody tr').length >= 2) {
            for (let i = 1; i < $('#tableNhieuTD tbody tr').length; i++){
                if ($('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').attr('loai') === '1')
                    loai = ' thành phố ';
                else if ($('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').attr('loai') === '2')
                    loai = ' huyện ';
                else
                    loai = ' thị xã ';

                if ($('select[name="congTrinhChiTietVOS['+i+'].idXa"] option:selected').attr('loai') === '1')
                    loaixa = ' xã ';
                else if ($('select[name="congTrinhChiTietVOS['+i+'].idXa"] option:selected').attr('loai') === '2')
                    loaixa = ' phường ';
                else
                    loaixa = ' thị trấn ';

                if(i !== $('#tableNhieuTD tbody tr').length-1)
                    diaDiem += ', ';
                else
                    diaDiem += ' và ';
                if ($('input[name="congTrinhChiTietVOS[0].tenDuong"]').val() === $('input[name="congTrinhChiTietVOS['+i+'].tenDuong"]').val()){
                    diaDiem += loaixa + $('select[name="congTrinhChiTietVOS['+i+'].idXa"] option:selected').text() + loai + $('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').text();
                }
                else {
                    diaDiem += $('input[name="congTrinhChiTietVOS['+i+'].tenDuong"]').val() + loaixa + $('select[name="congTrinhChiTietVOS['+i+'].idXa"] option:selected').text() + loai + $('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').text();
                }
            }
        }
        $('#diaDiem_DiaChi').val(diaDiem);
    };
    let btnSaveTT = function () {
        let form = $('#formThongTinCTTY');
        if (tableTaiLieu.data().count() !== 0) {
            tableTaiLieu.page.len(tableTaiLieu.data().count()).draw();
        }
        if (tableNhieuTD.data().count() !== 0) {
            tableNhieuTD.page.len(tableNhieuTD.data().count()).draw();
        }
        let method = "POST";
        let modelAttribute = "congTrinhVO";
        form.attr("method", method);
        form.attr("action", url + "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/saveFormTTCT.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        form.attr("modelAttribute", modelAttribute);
        form.attr("enctype", "multipart/form-data");
        form.submit();
    };
    let changeTuNgay = function () {
        let thoiHan = $('#thoiHan').val().replace(/,/g,'');
        if (thoiHan === '')
            thoiHan = 0;
        else
            thoiHan = parseInt(thoiHan);
        let tuNgay = $('#tuNgay').val();
        let ngay = tuNgay.split('/')[0];
        let thang = tuNgay.split('/')[1];
        let nam = tuNgay.split('/')[2];
        let date = new Date(nam,thang,parseInt(ngay) + thoiHan);
        $('#denNgay').val(date.getDate() + '/' + date.getMonth() +'/' + date.getFullYear());
        if (tuNgay === '')
            $('#denNgay').val('');
    };
    let loadTableTaiLieu = function () {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/loadtailieu.do',
            type: 'post',
            data: {idCongTrinh: idCongTrinh},
            success: function (data) {
                if (data != null && data.length > 0) {
                    for (let index = 0; index < data.length; index++) {
                        let downloadFileIcon = "";
                        let tenFile = "";
                        if (data[index].tenFile == null || data[index].tenFile == undefined || data[index].tenFile == '') {
                            tenFile = 'File đính kèm';
                        } else {
                            downloadFileIcon = '<span class="btn btn-white btn-sm" data-placement="top" title="" data-original-title="Tải file đính kèm" onclick="formManager.downloadTaiLieuFile(this)">'
                                + '<i class="fa fa-download" ></i>'
                                + '</span>';
                            tenFile = data[index].tenFile;
                        }
                        let rowHTML = [
                            '<input type="checkbox" class="i-checkstl isCheckedTL" value="0" />',
                            index + 1,
                            '<input type="text" class="form-control" name="taiLieuCongTrinhVOS[' + index + '].tenTaiLieu" value="' + data[index].tenTaiLieu + '" style="width:100%;"/>'
                            + '<input type="hidden" class="form-control" name="taiLieuCongTrinhVOS[' + index + '].idTL" value="' + data[index].idTL + '" />',
                            '<div class="btn-group attackFile">'
                            + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="formManager.eventUploadDocumentFile(this)" title="" for="uploadAttackFileTL' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
                            + formManager.hideStringIfOver20Character(tenFile)
                            + '</label>'
                            + '<input type="file" value="" name="taiLieuCongTrinhVOS[' + index + '].file" id="uploadAttackFileTL' + index + '" class="hide">'
                            + '<span style="display: inherit;"><i onclick="formManager.eventDeleteFileTaiLieu(this)" class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
                            + '</div>',
                            downloadFileIcon
                        ];
                        tableTaiLieu.row.add(rowHTML).draw();
                        tableTaiLieu.draw(false);
                        tableTaiLieu.page('first').draw('page');
                    }
                    tableTaiLieu.page.len(5).draw();
                    utils.initIChecks('i-checkstl');
                    datatableFactory.checkCheckBox('checkAllTL', 'isCheckedTL');
                    datatableFactory.checkBoxOnSelect('checkAllTL', 'isCheckedTL');
                }
            }
        })
    };
    let loadTuyenDuong = function() {
        let idCongTrinh = parseInt($('#idCongTrinh').val());
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpctthietyeu/loadtuyenduong.do',
            type: 'post',
            data: {idCongTrinh: idCongTrinh},
            success: function (data) {
                if (data != null && data.length > 0) {
                    tableNhieuTD.clear().draw();
                    for (let index= 0; index < data.length; index++){
                        if (data[0].nhieuDuong === null){
                            $('#rb1').iCheck('check');
                            $('#diaDiemDuong').removeClass('hidden');
                            $('#phamViCT').removeClass('hidden');
                            $('#tableND').addClass('hidden');
                            $('#nhieuDuong').val('');
                            $('#layNDCP').addClass('hidden');
                            $('#layDiaDiem').addClass('hidden');
                            $.each(data[0], function (key, val) {
                                $('#' + key).val(val);
                            });
                        }
                        else {
                            $('#rb2').iCheck('check');
                            $('#diaDiemDuong').addClass('hidden');
                            $('#phamViCT').addClass('hidden');
                            $('#tableND').removeClass('hidden');
                            $('#nhieuDuong').val(1);
                            $('#layNDCP').removeClass('hidden');
                            $('#layDiaDiem').removeClass('hidden');
                            let rowHtml = [
                                '<input type="checkbox" class="i-checks isCheckedTD" value="0" />',
                                index + 1,
                                '<input type="text" class="form-control" name="congTrinhChiTietVOS['+index+'].tenDuong" value="'+data[index].tenDuong+'" style="width: 100%">'
                                + '<input type="hidden" class="form-control" name="congTrinhChiTietVOS['+index+'].idctct" value="'+data[index].idctct+'">'
                                + '<input type="hidden" class="form-control" name="congTrinhChiTietVOS['+index+'].nhieuDuong" value="1">',
                                createSelHuyen('congTrinhChiTietVOS['+index+'].idHuyen',data[index].idHuyen, index),
                                '<select class="form-control" name="congTrinhChiTietVOS['+index+'].idXa" style="width: 100%"></select>',
                                /*createSelXa('congTrinhChiTietVOS['+index+'].idXa',data[index].idXa),*/
                                '<textarea class="form-control" rows="3" name="congTrinhChiTietVOS['+index+'].dienGiai" style="width: 100%">'+data[index].dienGiai+'</textarea>'
                            ];
                            tableNhieuTD.row.add(rowHtml).draw();
                            tableNhieuTD.draw(false);
                            tableNhieuTD.page('first').draw('page');
                        }
                        tableNhieuTD.page.len(5).draw();
                        utils.initIChecks('i-checks');
                        datatableFactory.checkCheckBox('checkAll', 'isCheckedTD');
                        datatableFactory.checkBoxOnSelect('checkAll', 'isCheckedTD');
                        formManager.createSelX('congTrinhChiTietVOS['+index+'].idXa',data[index].idHuyen,data[index].idXa);
                    }
                }
            }
        })
    };
    let btnDeleteHS = function () {
        datatableFactory.removeRowByHoan("idTL", tableTaiLieu, url + "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/deleteTLCT.do", "checkAllTL", refeshTable);
    };
    let refeshTable = function () {
        datatableFactory.refreshPagination("tableTaiLieu");
        datatableFactory.resetIndex(tableTaiLieu, "taiLieuCongTrinhVOS");
    };
    let btnDel = function () {
        datatableFactory.removeRowByHoan("idctct", tableNhieuTD, url + "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/deleteTD.do", "checkAll", refeshTableTD);
    };
    let refeshTableTD = function () {
        datatableFactory.refreshPagination("tableNhieuTD");
        datatableFactory.resetIndex(tableNhieuTD, "congTrinhChiTietVOS");
    };
    let loadFormChapThuanCTTY = function () {
        let idCongTrinh = parseInt($('#tabchapthuanct input[name="idCongTrinh"]').val());
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getvanbanchapthuan.do',
            type: 'post',
            data: {idCongTrinh: idCongTrinh, idLoaiHoSo: idLoaiHoSo},
            success: function (data) {
                if (data.vanBanChapThuanVO !== null && data.vanBanChapThuanVO !== undefined){
                    $.each(data.vanBanChapThuanVO, function (key, val) {
                        $('#' + key).val(val);
                    });
                    if (data.vanBanChapThuanVO.vb_So !== null && data.vanBanChapThuanVO.vb_So !== '' && data.vanBanChapThuanVO.vb_So !== undefined) {
                        $('#vb_So').val(data.vanBanChapThuanVO.vb_So.split('/')[0]);
                        $('#kyHieu').val(data.vanBanChapThuanVO.vb_So.replace(data.vanBanChapThuanVO.vb_So.split('/')[0] + '/',''));
                        $('#btnSaveVBCT').addClass('hidden');
                    }
                    else {
                        $('#kyHieu').val('SGTVT-QLKCHTGT');
                    }
                    $('#btnReportVBCT').removeClass('hidden');
                }
                else {
                    loadDefault(data);
                }
            }
        });
        $('#chapThuanCTTY').addClass('active');
        $('#tabttctthietyeu').addClass('hidden');
        $('#thongTinCTTY').removeClass('active');
        $('#tabchapthuanct').removeClass('hidden');
        $('#tabgiayphepctty').addClass('hidden');
        $('#giayPhepTCTY').removeClass('active');
        $('#thuPhiKyQuy').removeClass('active');
        $('#tabthuphikyquy').addClass('hidden');
    };
    let loadDefault = function (data) {
        let veViec = 'V/v chấp thuận XDCTTY trong phạm vi đất của đường bộ các tuyến đường ' + data.diaDiem_DiaChi + '.';
        $('#veViec').val(veViec);
        let phamVi_CapPhep = '';
        for (let i = 0; i < data.phamVi_CapPhep.trim().split('\n').length; i++){
            phamVi_CapPhep += '\t' + data.phamVi_CapPhep.split('\n')[i];
        }
        let noiDung = '';
        let phamVi_ChapThuan = '';
        if (data.congTrinhChiTietVOS[0].nhieuDuong === '1'){
            for (let i = 0; i < data.congTrinhChiTietVOS.length; i++){
                let dienGiai = '';
                if (data.congTrinhChiTietVOS[i].dienGiai !== '' && data.congTrinhChiTietVOS[i].dienGiai !== undefined){
                    for (let j = 0; j < data.congTrinhChiTietVOS[i].dienGiai.split('\n').length; j++){
                        dienGiai += '\t' + data.congTrinhChiTietVOS[i].dienGiai.split('\n')[j];
                    }
                }
                phamVi_ChapThuan +=
                    '\t' + '* Đường ' + data.congTrinhChiTietVOS[i].tenDuong + ':' + '\n'
                    + (dienGiai===''?'':dienGiai + '\n');
            }
            noiDung =
                '\t' + 'Sở Giao thông vận tải nhận được Hồ sơ đề nghị chấp thuận xây dựng công trình thiết yếu kèm theo Đơn số ' + data.donXinCP + ' của ' + data.tenDoanhNghiep + '.'
                + ' Nội dung Đơn, ' + data.tenDoanhNghiep + ' đề nghị Sở GTVT chấp thuận lắp đặt tuyến ống cáp quang ngầm trong phạm vi đất dành cho đường bộ của các tuyến đường ' + data.diaDiem_DiaChi + '.' + '\n'
                + '\t' + 'Căn cứ Quyết định số 40/2012/QĐ-UBND ngày 05/12/2012 của UBND tỉnh Khánh Hòa về việc ban hành Quy định về việc cấp phép thi công công trình trong phạm vi đất dành cho đường bộ và đấu nối đường nhánh vào hệ thống đường tỉnh, đường đô thị, đường huyện, đường xã trên địa bàn tỉnh Khánh Hòa.' + '\n'
                + '\t' + 'Sau khi kiểm tra hồ sơ và khảo sát hiện trường, Sở Giao thông vận tải có ý kiến chấp thuận như sau:' + '\n'
                + '\t' + '1. Chấp thuận cho ' + data.tenDoanhNghiep + ' lắp đặt xây dựng công trình thiết yếu trong phạm vi đất của đường bộ, cụ thể như sau:' + '\n'
                + '\t' + '- Loại công trình thiết yếu: ' + data.tenLoai + ';' + '\n'
                + '\t' + '- Tên công trình: ' + data.tenCongTrinh + ';' + '\n'
                + '\t' + '- Phạm vi chấp thuận:' + '\n'
                + phamVi_ChapThuan
                + '\t' + '2. Căn cứ các nội dung chấp thuận nêu trên, ' + data.tenDoanhNghiep + ' lập hồ sơ đề nghị Sở GTVT cấp phép thi công, thủ tục hồ sơ theo Khoản 3, điều 4 Quyết định số 40/2012/QĐ-UBND ngày 05/12/2012 của UBND tỉnh Khánh Hòa.' + '\n'
                + '\t' + '3. Hồ sơ đề nghị cấp phép thi công phải kèm theo dự toán ký quỹ bảo hành chất lượng bồi hoàn được quy định theo Quyết định số 960/QĐ-UBND ngày 13/4/2017 của UBND tỉnh Khánh Hòa và Thông báo số 754/TB-SGTVT  ngày 21/4/2017 của Sở Giao thông vận tải tỉnh Khánh Hòa./.';
        }
        else {
            noiDung =
                '\t' + 'Sở Giao thông vận tải nhận được Hồ sơ đề nghị chấp thuận xây dựng công trình thiết yếu kèm theo Đơn số ' + data.donXinCP + ' của ' + data.tenDoanhNghiep + '.'
                + ' Nội dung Đơn, ' + data.tenDoanhNghiep + ' đề nghị Sở GTVT chấp thuận thi công xây dựng đấu nối đường ống thoát nước mưa trong phạm vi bảo vệ kết cấu hạ tầng giao thông đường ' + data.diaDiem_DiaChi + '.' + '\n'
                + '\t' + 'Căn cứ Quyết định số 40/2012/QĐ-UBND ngày 05/12/2012 của UBND tỉnh Khánh Hòa về việc ban hành Quy định về việc cấp phép thi công công trình trong phạm vi đất dành cho đường bộ và đấu nối đường nhánh vào hệ thống đường tỉnh, đường đô thị, đường huyện, đường xã trên địa bàn tỉnh Khánh Hòa.' + '\n'
                + '\t' + 'Sau khi kiểm tra hồ sơ và khảo sát hiện trường, Sở Giao thông vận tải có ý kiến chấp thuận như sau:' + '\n'
                + '\t' + '1. Chấp thuận cho ' + data.tenDoanhNghiep + ' lắp đặt xây dựng công trình thiết yếu trong phạm vi đất của đường bộ, cụ thể như sau:' + '\n'
                + '\t' + '- Loại công trình thiết yếu: ' + data.tenLoai + ';' + '\n'
                + '\t' + '- Tên công trình: ' + data.tenCongTrinh + ';' + '\n'
                + '\t' + '- Lý trình chấp thuận: ' + data.congTrinhChiTietVOS[0].tenDuong + '.' + '\n'
                + '\t' + '- Phạm vị chấp thuận cụ thể như sau: ' + '\n'
                + phamVi_CapPhep + '\n'
                + '\t' + '2. Căn cứ nội dung chấp thuận nêu trên, ' + data.tenDoanhNghiep + '  lập hồ sơ đề nghị Sở Giao thông vận tải cấp phép thi công, thủ tục hồ sơ theo Khoản 3, điều 4 Quyết định số 40/2012/QĐ-UBND ngày 05/12/2012 của UBND tỉnh Khánh Hòa.' + '\n'
                + '\t' + 'Yêu cầu lưu ý các vấn đề sau:' + '\n' + '\t'
                + '\n'
                + '\t' + '- Hồ sơ đề nghị cấp phép thi công phải kèm theo dự toán ký quỹ bảo hành chất lượng bồi hoàn được quy định theo Quyết định số 960/QĐ-UBND ngày 13/4/2017 của UBND tỉnh Khánh Hòa và Thông báo số 754/TB-SGTVT ngày 21/4/2017 của Sở Giao thông vận tải tỉnh Khánh Hòa./.';
        }
        $('#noiDung').val(noiDung);
        let tenVietTat = '';
        if (data.tenVietTat !== null && data.tenVietTat !== '' && data.tenVietTat !== undefined)
            tenVietTat = '(' + data.tenVietTat + ')';
        let noiNhan =
            '- Như trên;' + '\n'
            + '- Lưu: VT, QLHT' + tenVietTat + '.';
        $('#noiNhan').val(noiNhan);
        $('#uyQuyen').val('KT GIÁM ĐỐC');
        $('#kyHieu').val('SGTVT-QLCL&ATGT')
    };
    let loatFormGPCTTY = function() {
        let idCongTrinh = parseInt($('#tabgiayphepctty input[name="idCongTrinh"]').val());
        let idHoSo = parseInt($('input[name="idHoSo"]').val());
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getgiayphep.do',
            type: 'post',
            data: {idHoSo: idHoSo, idCongTrinh: idCongTrinh, idLoaiHoSo: idLoaiHoSo},
            success: function (data) {
                if (data.giayPhepChapThuanVO !== null){
                    $.each(data.giayPhepChapThuanVO, function (key, val) {
                        $('#' + key).val(val);
                    });
                    if (data.giayPhepChapThuanVO.gp_So !== null && data.giayPhepChapThuanVO.gp_So !== '' && data.giayPhepChapThuanVO.gp_So !== undefined) {
                        $('#gp_So').val(data.giayPhepChapThuanVO.gp_So.split('/')[0]);
                        $('#kyHieuGP').val(data.giayPhepChapThuanVO.gp_So.replace(data.giayPhepChapThuanVO.gp_So.split('/')[0] + '/',''));
                        $('#btnSaveGP').addClass('hidden');
                    }
                    else {
                        $('#kyHieuGP').val('SGTVT-QLKCHTGT');
                    }
                    $('#btnReportGP').removeClass('hidden');
                }
                else {
                    loadDefaultGP(data);
                }
            }
        });
        $('#giayPhepTCTY').addClass('active');
        $('#chapThuanCTTY').removeClass('active');
        $('#tabttctthietyeu').addClass('hidden');
        $('#thongTinCTTY').removeClass('active');
        $('#tabchapthuanct').addClass('hidden');
        $('#tabgiayphepctty').removeClass('hidden');
        $('#thuPhiKyQuy').removeClass('active');
        $('#tabthuphikyquy').addClass('hidden');
    };
    let loadFormThuPhiKyQuy = function() {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
        let idHoSo = parseInt($('input[name="idHoSo"]').val());
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpctthietyeu/getthongbao.do',
            type: 'post',
            data: {idHoSo: idHoSo, idCongTrinh: idCongTrinh, idLoaiHoSo: idLoaiHoSo},
            success: function (data) {
                if (data.thuPhiCongTrinhVO !== null){
                    if (data.thuPhiCongTrinhVO.thuPhiCongThucVOS !== null && data.thuPhiCongTrinhVO.thuPhiCongThucVOS.length > 0){
                        tableCongThucThuPhi.clear().draw();
                        for (let index = 0; index < data.thuPhiCongTrinhVO.thuPhiCongThucVOS.length; index++){
                            let rowHtml = [
                                '<input type="checkbox" class="i-checks isCheckedCT" value="0" />',
                                '<input type="text" class="form-control" name="thuPhiCongThucVOS['+index+'].congThuc" value="'+data.thuPhiCongTrinhVO.thuPhiCongThucVOS[index].congThuc+'" style="width: 100%">'
                                + '<input type="hidden" class="form-control" name="thuPhiCongThucVOS['+index+'].idctct" value="'+data.thuPhiCongTrinhVO.thuPhiCongThucVOS[index].id+'">',
                                '<input type="text" class="form-control" name="thuPhiCongThucVOS['+index+'].dienTich" value="'+data.thuPhiCongTrinhVO.thuPhiCongThucVOS[index].dienTich+'">',
                            ];
                            tableCongThucThuPhi.row.add(rowHtml).draw();
                            tableCongThucThuPhi.draw(false);
                            tableCongThucThuPhi.page('first').draw('page');
                        }
                        tableCongThucThuPhi.page.len(5).draw();
                        utils.initIChecks('i-checks');
                        datatableFactory.checkCheckBox('checkAllCT', 'isCheckedCT');
                        datatableFactory.checkBoxOnSelect('checkAllCT', 'isCheckedCT');
                    }
                    $.each(data.thuPhiCongTrinhVO, function (key, val) {
                        $('#' + key).val(val);
                    });
                    if (data.thuPhiCongTrinhVO.tb_So !== null && data.thuPhiCongTrinhVO.tb_So !== '' && data.thuPhiCongTrinhVO.tb_So !== undefined) {
                        $('#tb_So').val(data.thuPhiCongTrinhVO.tb_So.split('/')[0]);
                        $('#kyHieuTB').val(data.thuPhiCongTrinhVO.tb_So.replace(data.thuPhiCongTrinhVO.tb_So.split('/')[0] + '/',''));
                        $('#btnSaveTB').addClass('hidden');
                    }
                    else {
                        $('#kyHieuTB').val('TB-SGTVT');
                    }
                    $('#btnReportTB').removeClass('hidden');
                }
                else {
                    loadDefaultTB(data);
                }
            }
        });
        $('#giayPhepTCTY').removeClass('active');
        $('#chapThuanCTTY').removeClass('active');
        $('#tabttctthietyeu').addClass('hidden');
        $('#thongTinCTTY').removeClass('active');
        $('#tabchapthuanct').addClass('hidden');
        $('#tabgiayphepctty').addClass('hidden');
        $('#thuPhiKyQuy').addClass('active');
        $('#tabthuphikyquy').removeClass('hidden');
    };
    let loadDefaultTB = function(data){
        $('#idPhi').val(-1);
        let tieuDeTB =
            '\t' + 'Công trình:' + '\t' + data.tenCongTrinh + '\n'
            + '\t' + 'Hạng mục:' + '\t' + data.tenHangMuc + '\n'
            + '\t' + 'Địa điểm:' + '\t' + data.diaDiem_DiaChi;
        $('#tieuDeTB').val(tieuDeTB);
        let kinhGui =
            'Kính gửi: ' + data.tenDoanhNghiep + '\n'
            + 'Địa chỉ: ' + data.diaChi_DN;
        $('#kinhGui').val(kinhGui);
        let noiDungCC = '';
        for (let i = 0; i < data.dmCanCuPhapLyVO.noiDung.split('\n').length; i++){
            noiDungCC += '\t' + data.dmCanCuPhapLyVO.noiDung.split('\n')[i];
        }
        let canCuTB =
            noiDungCC + '\n'
            + '\t' + 'Căn cứ Giấy phép thi công số ' + data.giayPhepChapThuanVO.gp_So + ' ngày ' + data.giayPhepChapThuanVO.gp_Ngay + ' của Sở GTVT Khánh Hòa cấp cho ' + data.tenDoanhNghiep + ' về việc ' + data.noiDung_CapPhep + ';'
            + '\t';
        $('#canCuTB').val(canCuTB);
    };
    let loadDefaultGP = function(data) {
        let tieuDe =
            '\t' + 'Công trình:' + '\t' + data.tenCongTrinh + '\n'
            + '\t' + 'Hạng mục:' + '\t' + data.tenHangMuc + '\n'
            + '\t' + 'Địa điểm:' + '\t' + data.diaDiem_DiaChi;
        $('#tieuDe').val(tieuDe);
        let noiDungCC = '';
        for (let i = 0; i < data.dmCanCuPhapLyVO.noiDung.split('\n').length; i++){
            noiDungCC += '\t' + data.dmCanCuPhapLyVO.noiDung.split('\n')[i];
        }
        let canCu =
            noiDungCC + '\n'
            + '\t' + 'Căn cứ Văn bản số ' + data.vanBanChapThuanVO.vb_So + ' ngày ' + data.vanBanChapThuanVO.vb_Ngay + ' của Sở Giao thông vận tải Khánh Hòa v/v ' + data.noiDung_CapPhep + '.';
        $('#canCu').val(canCu);
        let phamVi_CongTrinh = '';
        if (data.congTrinhChiTietVOS[0].nhieuDuong === '1') {
            for (let i = 0; i < data.congTrinhChiTietVOS.length; i++) {
                let dienGiai = '';
                if (data.congTrinhChiTietVOS[i].dienGiai !== '' && data.congTrinhChiTietVOS[i].dienGiai !== undefined) {
                    for (let j = 0; j < data.congTrinhChiTietVOS[i].dienGiai.split('\n').length; j++) {
                        dienGiai += '\t' + data.congTrinhChiTietVOS[i].dienGiai.split('\n')[j];
                    }
                }
                phamVi_CongTrinh +=
                    '\t' + '* Đường ' + data.congTrinhChiTietVOS[i].tenDuong + ':' + '\n'
                    + (dienGiai === '' ? '' : dienGiai + '\n');
            }
        }
        else {
            let dienGiai = '';
            if (data.congTrinhChiTietVOS[0].dienGiai !== '' && data.congTrinhChiTietVOS[0].dienGiai !== undefined) {
                for (let j = 0; j < data.congTrinhChiTietVOS[0].dienGiai.split('\n').length; j++) {
                    dienGiai += '\t' + data.congTrinhChiTietVOS[0].dienGiai.split('\n')[j];
                }
            }
            phamVi_CongTrinh +=
                (dienGiai === '' ? '' : dienGiai + '\n');
        }
        let noiDungCauMauGP = '';
        let noiDung = data.noiDungCauMauGP.replace(/Phòng Quản lý đô thị huyện Diên Khánh/g, data.tenDoanhNghiep);
        for (let i = 0; i < noiDung.split('\n').length; i++){
            noiDungCauMauGP += '\t' + noiDung.split('\n')[i];
        }
        let phamVi_CapPhep = '';
        for (let i = 0; i < data.phamVi_CapPhep.trim().split('\n').length; i++){
            phamVi_CapPhep += '\t' + data.phamVi_CapPhep.split('\n')[i];
        }
        let noiDungGP =
            '\t' + 'Xét Hồ sơ đề nghị cấp phép thi công kèm theo Đơn số ' + data.donXinCP + ' của ' + data.tenDoanhNghiep + '.' + '\n'
            + '\t' + 'Sở Giao thông vận tải Khánh Hòa cấp phép thi công các nội dung sau:' + '\n'
            + '\t' + 'I. Đơn vị được cấp phép thi công:' + '\n'
            + '\t' + '- Tên đơn vị: ' + data.tenDoanhNghiep + '\n'
            + '\t' + '- Trụ sở làm việc: ' + data.diaChi_DN + '\n'
            + '\t' + '- Đại diện: ' + data.daiDien + ' - Số điện thoại: ' + data.dienThoai + '\n'
            + '\t' + 'II. Được phép thi công công trình: ' + data.noiDung_CapPhep + '.' + ' Cụ thể như sau:' + '\n'
            + '\t' + '1. Loại công trình đường bộ: ' + data.tenLoai + ';' + '\n'
            + '\t' + '2. Tên công trình: ' + data.tenCongTrinh + ';' + '\n'
            + '\t' + '3. Phạm vi cấp phép:' + '\n'
            + phamVi_CongTrinh
            + '\t' + '4. Kích thước hố đào:' + '\n'
            + phamVi_CapPhep + '\n'
            + '\t' + '5. Biện pháp thi công đảm bảo an toàn giao thông:' + '\n' + '\t'
            + '\n'
            + '\t' + 'III. Các yêu cầu đối với chủ đầu tư và đơn vị thi công công trình:' + '\n'
            + noiDungCauMauGP
            + 'IV. Thời hạn thi công:' + '\n'
            + '\t' + '- Giấy phép thi công này có thời hạn ' + data.thoiHan + '  ngày từ ngày ' + data.tuNgay + ' đến ngày ' + data.denNgay + (data.ghiChu_ThoiHan===null||data.ghiChu_ThoiHan===''?'./.':', ' + data.ghiChu_ThoiHan + './.');
        $('#noiDungGP').val(noiDungGP);
        let ubnd = '';
        if ($('#nhieuDuong').val() === ''){
            let loai = '';
            if ($('#idHuyen option:selected').attr('loai') === '1')
                loai = ' thành phố ';
            else if ($('#idHuyen option:selected').attr('loai') === '2')
                loai = ' huyện ';
            else
                loai = ' thị xã ';
            ubnd = '- UBND' + loai + $('#idHuyen option:selected').text() + ';' + '\n';
        }
        else {
            for (let i = 0; i < $('#tableNhieuTD tbody tr').length; i++){
                if ($('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').attr('loai') === '1')
                    loai = ' thành phố ';
                else if ($('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').attr('loai') === '2')
                    loai = ' huyện ';
                else
                    loai = ' thị xã ';
                ubnd += '- UBND' + loai + $('select[name="congTrinhChiTietVOS['+i+'].idHuyen"] option:selected').text() + ';' + '\n'
            }
        }
        let tenVietTat = '';
        if (data.tenVietTat !== null && data.tenVietTat !== '' && data.tenVietTat !== undefined)
            tenVietTat = '(' + data.tenVietTat + ')';
        let noiNhanGP =
            '- ' + data.tenDoanhNghiep + ';' + '\n'
            + ubnd
            + '- Thanh tra Sở GTVT;' + '\n'
            + '- Ban QLDA GTNT;' + '\n'
            + '- Cty CP QL&XDGT KH;' + '\n'
            + '- Lưu: VT, QLHT ' + tenVietTat;
        $('#noiNhanGP').val(noiNhanGP);
        $('#uyQuyenGP').val('KT GIÁM ĐỐC');
        $('#kyHieuGP').val('SGTVT-QLKCHTGT');
    };
    let btnSaveVBCT = function () {
        let form = $('#formVanBanCTTY');
        let fd = new FormData($('#formVanBanCTTY')[0]);
        if ($('#vb_So').val() !== null && $('#vb_So').val() !== '')
            fd.set('vb_So',$('#vb_So').val() + '/' + $('#kyHieu').val());
        if (form.valid()){
            $.ajax({
                url: url + "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/saveFormVBCT.do",
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data !== null){
                        $.each(data, function (key, val) {
                            $('#' + key).val(val);
                        });
                        if (data.vb_So !== null && data.vb_So !== '' && data.vb_So !== undefined) {
                            $('#vb_So').val(data.vb_So.split('/')[0]);
                            $('#kyHieu').val(data.vb_So.replace(data.vb_So.split('/')[0] + '/',''));
                            $('#btnSaveVBCT').addClass('hidden');
                        }
                        else {
                            $('#kyHieu').val('SGTVT-QLCL&ATGT');
                        }
                        swal({
                            title: "Thông báo",
                            text: "Lưu dữ liệu thành công",
                            type: "success",
                            confirmButtonText: "Đồng ý"
                        });
                        $('#btnReportVBCT').removeClass('hidden');
                    }
                    else {
                        swal({
                            title: "Thông báo",
                            text: "Lưu dữ liệu thất bại",
                            type: "warning",
                            confirmButtonText: "Đồng ý"
                        });
                    }
                }
            })
        }
    };
    let btnSaveGP = function() {
        let form = $('#giayPhepCTTY');
        let fd = new FormData($('#giayPhepCTTY')[0]);
        if ($('#gp_So').val() !== null && $('#gp_So').val() !== '')
            fd.set('gp_So',$('#gp_So').val() + '/' + $('#kyHieuGP').val());
        if (form.valid()){
            $.ajax({
                url: url + "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/saveFormGP.do",
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data !== null){
                        $.each(data, function (key, val) {
                            $('#' + key).val(val);
                        });
                        $('input[name="idgp"]').val(data.idgp);
                        if (data.gp_So !== null && data.gp_So !== '' && data.gp_So !== undefined) {
                            $('#gp_So').val(data.gp_So.split('/')[0]);
                            $('#kyHieuGP').val(data.gp_So.replace(data.gp_So.split('/')[0] + '/',''));
                            $('#btnSaveGP').addClass('hidden');
                        }
                        else {
                            $('#kyHieuGP').val('SGTVT-QLKCHTGT');
                        }
                        swal({
                            title: "Thông báo",
                            text: "Lưu dữ liệu thành công",
                            type: "success",
                            confirmButtonText: "Đồng ý"
                        });
                        $('#btnReportGP').removeClass('hidden');
                    }
                    else {
                        swal({
                            title: "Thông báo",
                            text: "Lưu dữ liệu thất bại",
                            type: "warning",
                            confirmButtonText: "Đồng ý"
                        });
                    }
                }
            })
        }
    };
    let btnReportVBCT = function () {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        window.open(url + "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/reportexport.do?idCongTrinh=" + idCongTrinh + "&idLoaiHoSo=" + idLoaiHoSo);
    };
    let layLaiND = function () {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getvanbanchapthuan.do',
            type: 'post',
            data: {idCongTrinh: idCongTrinh, idLoaiHoSo: idLoaiHoSo},
            success: function (data) {
                loadDefault(data);
            }
        })
    };
    let layLaiNDCP = function() {
        let idCongTrinh = parseInt($('#tabgiayphepctty input[name="idCongTrinh"]').val());
        let idHoSo = parseInt($('input[name="idHoSo"]').val());
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getgiayphep.do',
            type: 'post',
            data: {idCongTrinh: idCongTrinh, idHoSo: idHoSo, idLoaiHoSo: idLoaiHoSo},
            success: function (data) {
                loadDefaultGP(data);
            }
        })
    };
    let btnReportGP = function() {
        let idCongTrinh = parseInt($('#tabgiayphepctty input[name="idCongTrinh"]').val());
        window.open(url + "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/reportgiayphep.do?idCongTrinh=" + idCongTrinh);
    };
    let initTableCongThucThuPhi = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isCheckedCT"/>';
                }
            },
            {"targets": 1, class: "text-center", width: "55%"},
            {"targets": 2, class: "text-center", width: "40%"}
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
        return datatableFactory.initDataSourceDataTableNonLoad('tableCongThucThuPhi', colDefs, opts, 1);
    };
    let btnAddCT = function () {
        let index = $('#tableCongThucThuPhi').DataTable().rows().count();
        let rowHtml = [
            '<input type="checkbox" class="i-checks isCheckedCT" value="0" />',
            '<input type="text" class="form-control" name="thuPhiCongThucVOS['+index+'].congThuc" onchange="formManager.congThucDT(this,' + index + ')" style="width: 100%">'
            + '<input type="hidden" class="form-control" name="thuPhiCongThucVOS['+index+'].id" value="-1">',
            '<input type="text" class="form-control" name="thuPhiCongThucVOS['+index+'].dienTich" style="width: 100%">'
        ];
        tableCongThucThuPhi.row.add(rowHtml).draw();
        datatableFactory.indexing('tableCongThucThuPhi', index);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAllCT', 'isCheckedCT');
        datatableFactory.checkBoxOnSelect('checkAllCT', 'isCheckedCT');
    };
    let btnDelCT = function () {
        datatableFactory.removeRowByHoan("id", tableCongThucThuPhi, url + "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/deleteCT.do", "checkAll", refeshTableCT);
    };
    let refeshTableCT = function () {
        datatableFactory.resetIndex(tableCongThucThuPhi, "congTrinhChiTietVOS");
    };
    let initDonGia = function () {
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpctthietyeu/dongia.do',
            type: 'post',
            data: {idLoaiHoSo: idLoaiHoSo},
            success: function (data) {
                if (data != null){
                    $('#donGia_Thang').val(data.donGia_Thang);
                    $('#donGia_Ngay').val(data.donGia_Ngay);
                }
            }
        })
    };
    return{
        init: function () {
            return setup();
        },
        changeHuyen: function (element, index) {
            let idHuyen = $(element).val();
            if (idHuyen === undefined || idHuyen === null)
                idHuyen = -1;
            $.ajax({
                url: url + '/worklife/user/quanlytuyenduong/dmtdthuoctinh/getxabyidhuyen.do',
                type: "POST",
                data: {idHuyen: idHuyen},
                success: function (data) {
                    if (data !== null) {
                        let options = '<option value="-1"></option>';
                        for (let i = 0; i < data.length; i++){
                            options += '<option value="'+data[i].iDDmXa+'">'+data[i].tenXa+'</option>';
                        }
                        $(element).parent().next().find('select[name="congTrinhChiTietVOS['+index+'].idXa"]').html(options);
                    }
                }
            });
        },
        createSelX: function(element, idHuyen, idXa) {
            $.ajax({
                url: url + '/worklife/user/quanlytuyenduong/dmtdthuoctinh/getxabyidhuyen.do',
                type: "POST",
                data: {idHuyen: idHuyen},
                success: function (data) {
                    if (data !== null) {
                        let options = '<option value="-1"></option>';
                        for (dat of data) {
                            let selected = '';
                            if (idXa !== undefined && idXa !== null) {
                                if (dat.iDDmXa === idXa)
                                    selected = 'selected ';
                            }
                            options += '<option {2} value="{0}">{1}</option>'.f(dat.iDDmXa, dat.tenXa, selected);
                        }
                        $('select[name="'+element+'"]').html(options);
                    }
                }
            })
        },
        eventUploadDocumentFile: function (element) {
            let currentRow = $(element).closest('tr');
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
                        } else {
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
                            let idTL = $(element).closest("tr").find("input[name*='idTL']").val();
                            $.ajax({
                                type: "POST",
                                url: url + "/worklife/qlctgt/user/doccumentfile/file/json/delete.do?" + $("meta[name='_csrf_name']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'),
                                data: {'idTL': idTL},
                                success: function (data) {
                                    $(divFile).find("label").text(multiLanguage.attackfile);
                                    $(divFile).find("label").attr("data-original-title", "");
                                    let currentRow = $(element).closest('tr');
                                    $(currentRow).find("input[type='file']").val(null);
                                    /*$(currentRow).find('input[name*="fileUploadVO.ten"]').val('');*/
                                    $(currentRow).find('input[name*="id"]').not('input[name*="idTL"]').val(0);
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
                        } catch (e) {

                        }
                    }

                });

            }
        },
        downloadTaiLieuFile: function (element) {
            let idTL = $(element).closest("tr").find("td:eq(2)").find('input[type="hidden"]').val();
            window.location = url + "/worklife/qlctgt/user/file/json/downloadfiletailieu.do?idTL=" + parseInt(idTL);
        },
        congThucDT: function (element, index) {
            let $this = $(element);
            let result = 0;
            eval('result=' + $this.val() + ';');
            $('input[name="thuPhiCongThucVOS[' + index + '].dienTich"]').val(result);
            let sumDT = 0;
            for (let i = 0; i < $('#tableCongThucThuPhi tbody tr').length; i++){
                if ($('input[name="thuPhiCongThucVOS[' + i + '].dienTich"]').val() === '')
                    dt = 0;
                else
                    dt = parseInt($('input[name="thuPhiCongThucVOS[' + i + '].dienTich"]').val());
                sumDT += dt;
            }
            $('#tongDT').val(utils.initCommaSeparateNumber(sumDT));
            $('#congThuc').val($('#donGia_Ngay').val() + '*' + utils.initCommaSeparateNumber(sumDT) + '*' + $('input[name="thoiHan"]').val());
            $('#tienNop').val(utils.initCommaSeparateNumber(parseInt($('#donGia_Ngay').val())*sumDT*parseInt($('input[name="thoiHan"]').val())));
        }
    }
})();