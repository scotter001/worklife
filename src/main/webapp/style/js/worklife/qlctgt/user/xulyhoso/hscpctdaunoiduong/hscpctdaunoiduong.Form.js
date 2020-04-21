formManager = (function () {
    let tableHoSo;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        loadDatePicker();
        utils.initIChecks('i-checks');
        initHuyen();
        initXa();
        $('#idHuyen').on('change', initXa);
        tableHoSo = initTableHoSo();
        $('#btnAddHS').on('click', btnAddHS);
        $('#btnSaveTTCT').on('click', btnSaveTTCT);
        loadTableTaiLieu();
        $('#btnDeleteHS').on('click', btnDeleteHS);
        $('#thoiHan,#tuNgay').on('change', changeTuNgay);
        $('#chapThuanCT').on('click', loadFormChapThuan);
        $('#giayPhepTC').on('click', loadFormGiayPhep);
        $('#thongTinCT').on('click', function () {
            $('#chapthuanchutruong').addClass('hidden');
            $('#thongtincongtrinh').removeClass('hidden');
            $('#tabgiayphepct').addClass('hidden');
            $('#thongTinCT').addClass('active');
            $('#chapThuanCT').removeClass('active');
            $('#giayPhepTC').removeClass('active');
        });
        eventUtils.initNguoiKyVB();
        eventUtils.initNguoiKyGP();
        $('#nguoiKy').on('change', function () {
            $('#chucVu').val($('#nguoiKy option:selected').attr('chucvu'));
            if ($('#nguoiKy option:selected').attr('uyquyen') === '0'){
                $('#uyQuyen').attr('disabled', true);
            }
        });
        $('#nguoiKyGP').on('change', function () {
            $('#chucVuGP').val($('#nguoiKyGP option:selected').attr('chucvu'));
        });
        $('#btnSaveVBCT').one('click', btnSaveVBCT);
        $('#layLaiND').on('click', layLaiND);
        $('#btnReportVBCT').on('click', btnReportVBCT);
        $('#btnSaveGP').on('click', btnSaveGP);
        $('#layLaiNDCP').on('click', layLaiNDCP);
        $('#btnReportGP').on('click', btnReportGP);
        $('#vb_So').on('change', function () {
            $('#vb_Ngay').attr('disabled', false);
        });
        $('#gp_So').on('change', function () {
            $('#gp_Ngay').attr('disabled', false);
        });
        $('#thongTinCT').on('click', function () {
            let idHoSo = parseInt($('input[name="idHoSo"]').val());
           window.location = url + '/worklife/qlctgt/user/danhsachhs/xulyhoso/hosocpctdnd.do?idHoSo=' + idHoSo;
        });
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
                        options += '<option {2} value="{0}">{1}</option>'.f(dat.idHuyen, dat.tenHuyen, selected);
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
                        options += '<option {2} value="{0}">{1}</option>'.f(dat.iDDmXa, dat.tenXa, selected);
                    }
                    $('#idXa').html(options);
                }
            }
        })
    };
    let initTableHoSo = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isChecked"/>';
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
                utils.initIChecks('i-checks');
            },
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableHoSo', colDefs, opts, 1);
    };
    let btnAddHS = function () {
        let index = $('#tableHoSo').DataTable().rows().count();
        let rowHTML = [
            '<input type="checkbox" class="i-checks isChecked" value="0" />',
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
        tableHoSo.row.add(rowHTML).draw();
        datatableFactory.indexing('tableHoSo', index);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAllHoSo', 'isChecked');
        datatableFactory.checkBoxOnSelect('checkAllHoSo', 'isChecked');
    };
    let btnSaveTTCT = function () {
        let form = $('#formThongTinCT');
        if (tableHoSo.data().count() !== 0) {
            tableHoSo.page.len(tableHoSo.data().count()).draw();
        }
        let method = "POST";
        let modelAttribute = "congTrinhVO";
        form.attr("method", method);
        form.attr("action", url + "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/saveForm.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        form.attr("modelAttribute", modelAttribute);
        form.attr("enctype", "multipart/form-data");
        form.submit();
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
                            '<input type="checkbox" class="i-checks isChecked" value="0" />',
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
                        tableHoSo.row.add(rowHTML).draw();
                        tableHoSo.draw(false);
                        tableHoSo.page('first').draw('page');
                    }
                    tableHoSo.page.len(5).draw();
                    utils.initIChecks('i-checks');
                    datatableFactory.checkCheckBox('checkAll', 'isChecked');
                    datatableFactory.checkBoxOnSelect('checkAll', 'isChecked');
                }
            }
        })
    };
    let btnDeleteHS = function () {
        datatableFactory.removeRowByHoan("idTL", tableHoSo, url + "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/deleteTLCT.do", "checkAll", refeshTable);
    };
    let refeshTable = function () {
        datatableFactory.refreshPagination("tableHoSo");
        datatableFactory.resetIndex(tableHoSo, "taiLieuCongTrinhVOS");
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
    let loadFormChapThuan = function () {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
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
                        $('#kyHieu').val('SGTVT-QLCL&ATGT');
                    }
                    $('#btnReportVBCT').removeClass('hidden');
                }
                else {
                    loadDefault(data);
                }
            }
        });
        $('#chapthuanchutruong').removeClass('hidden');
        $('#thongtincongtrinh').addClass('hidden');
        $('#tabgiayphepct').addClass('hidden');
        $('#thongTinCT').removeClass('active');
        $('#chapThuanCT').addClass('active');
        $('#giayPhepTC').removeClass('active');
    };
    let loadFormGiayPhep = function() {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
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
        $('#giayPhepTC').addClass('active');
        $('#chapThuanCT').removeClass('active');
        $('#thongTinCT').removeClass('active');
        $('#tabgiayphepct').removeClass('hidden');
        $('#chapthuanchutruong').addClass('hidden');
        $('#thongtincongtrinh').addClass('hidden');
    };
    let loadDefaultGP = function(data) {
        let diaDiemXa = '';
        if (data.diaDiem_DiaChi !== '' && data.diaChi_Xa !== ''){
            diaDiemXa = data.diaDiem_DiaChi + ', ' + data.diaChi_Xa;
        }
        else {
            diaDiemXa = data.diaDiem_DiaChi + data.diaChi_Xa;
        }
        let diaDiem = '';
        if (diaDiemXa !== '' && data.diaChi_Huyen !== ''){
            diaDiem = diaDiemXa + ', ' + data.diaChi_Huyen;
        }
        else {
            diaDiem = diaDiemXa + data.diaChi_Huyen;
        }
        let tieuDe =
            '\t' + 'Công trình:' + '\t' + data.tenCongTrinh + '\n'
            + '\t' + 'Hạng mục:' + '\t' + data.tenHangMuc + '\n'
            + '\t' + 'Địa điểm:' + '\t' + diaDiem;
        $('#tieuDe').val(tieuDe);
        let noiDungCC = '';
        for (let i = 0; i < data.dmCanCuPhapLyVO.noiDung.split('\n').length; i++){
            noiDungCC += '\t' + data.dmCanCuPhapLyVO.noiDung.split('\n')[i];
        }
        let canCu = noiDungCC + '\n'
        + '\t' + 'Căn cứ Quyết định số ' + data.qd_ctdt + ' của UBND tỉnh Khánh Hòa về việc Quyết định chủ trương đầu tư cho phép ' + data.tenDoanhNghiep + ' được thưc hiện dự án ' + data.tenDuAn + ';' + '\n'
        + '\t' + 'Căn cứ Giấy phép xây dựng số ' + data.gpxd + ' của Sở Xây Dựng Khánh Hòa cấp cho ' + data.tenDoanhNghiep + ' xây dựng công trình ' + data.tenDuAn + ';' + '\n'
        + '\t' + 'Căn cứ Văn bản số ' + data.vanBanChapThuanVO.vb_So +' ngày ' + data.vanBanChapThuanVO.vb_Ngay + ' của Sở GTVT Khánh Hoà v/v chấp thuận thiết kế kỹ thuật nút giao đường nhánh đấu nối tại ' + diaDiem + ';';
        $('#canCu').val(canCu);
        let noiDungCauMauGP = '';
        let noiDung = data.noiDungCauMauGP.replace(/Công ty TNHH Thương mại Vinh Phát/g, data.tenDoanhNghiep);
        for (let i = 0; i < noiDung.split('\n').length; i++){
            noiDungCauMauGP += '\t' + noiDung.split('\n')[i];
        }
        let noiDungGP =
            '\t' + 'Xét Hồ sơ đề nghị cấp phép ' + data.noiDung_CapPhep + ', đính kèm Văn bản số ' + data.donXinCP + ' của ' + data.tenDoanhNghiep + '.' + '\n'
            + '\t' + 'Sở Giao Thông vận tải cấp phép thi công các nội dung sau:' + '\n'
            + '\t' + 'I. Đơn vị được cấp phép thi công:' + '\n'
            + '\t' + '- Tên đơn vị: ' + data.tenDoanhNghiep + '\n'
            + '\t' + '- Trụ sở làm việc: ' + data.diaChi_DN + '\n'
            + '\t' + '- Đại diện: ' + data.daiDien + ' - SĐT: ' + data.dienThoai + '\n'
            + '\t' + 'II. Được phép thi công: ' + data.noiDung_CapPhep + '.' + ' Cụ thể như sau:' + '\n'
            + '\t' + '1. Vị trí đấu nối: ' + data.diaDiem_DiaChi + ';' + '\n'
            + '\t' + '2. Thiết kế kỹ thuật đấu nối và phương án tổ chức giao thông của nút giao  theo hồ sơ thiết đấu nối nút giao công trình do ' + data.donViTK + ' lập và được Sở GTVT có ý kiến chấp thuận tại Văn bản số '
            + data.vanBanChapThuanVO.vb_So + ' ngày ' + data.vanBanChapThuanVO.vb_Ngay + '.' + '\n'
            + '\t' + 'Khối lượng cụ thể như sau: ' + '\n' + '\t'
            + '\n'
            + '\t' + 'III. Các yêu cầu đối với đơn vị thi công công trình:' + '\n'
            + noiDungCauMauGP
            + 'IV. Thời gian thi công:' + '\n'
            + '\t' + '- Giấy phép thi công này có thời hạn ' + data.thoiHan + '  ngày từ ngày ' + data.tuNgay + ' đến ngày ' + data.denNgay + (data.ghiChu_ThoiHan===null||data.ghiChu_ThoiHan===''?'./.':', ' + data.ghiChu_ThoiHan + './.');
        $('#noiDungGP').val(noiDungGP);
        let tenVietTat = '';
        if (data.tenVietTat !== null && data.tenVietTat !== '' && data.tenVietTat !== undefined)
            tenVietTat = '(' + data.tenVietTat + ')';
        let noiNhanGP =
            '- ' + data.tenDoanhNghiep + ';' +'\n'
            + '- UBND ' + data.diaChi_Huyen + ';' + '\n'
            + '- Thanh tra Sở GTVT;' + '\n'
            + '- Ban QLDA GTNT;' + '\n'
            + '- Cty CP QL&XDGT KH;' + '\n'
            + '- Lưu: VT, QLKCHTGT' + tenVietTat + ';';
        $('#noiNhanGP').val(noiNhanGP);
        $('#uyQuyenGP').val('KT GIÁM ĐỐC');
        $('#kyHieuGP').val('SGTVT-QLKCHTGT');
    };
    let loadDefault = function(data) {
        let diaDiemXa = '';
        if (data.diaDiem_DiaChi !== '' && data.diaChi_Xa !== ''){
            diaDiemXa = data.diaDiem_DiaChi + ', ' + data.diaChi_Xa;
        }
        else {
            diaDiemXa = data.diaDiem_DiaChi + data.diaChi_Xa;
        }
        let diaDiem = '';
        if (diaDiemXa !== '' && data.diaChi_Huyen !== ''){
            diaDiem = diaDiemXa + ', ' + data.diaChi_Huyen;
        }
        else {
            diaDiem = diaDiemXa + data.diaChi_Huyen;
        }
        let veViec= 'V/v chấp thuận thiết kế kỹ thuật nút giao đường ra vào ' + data.tenDuAn + ' đấu nối tại ' + diaDiem;
        $('#veViec').val(veViec);
        let noiDungCauMauVB = '';
        for (let i = 0; i < data.noiDungCauMau.trim().split('\n').length; i++){
            if (i === 0)
                noiDungCauMauVB += data.noiDungCauMau.split('\n')[i];
            else
                noiDungCauMauVB += '\t' + data.noiDungCauMau.split('\n')[i];
        }
        let noiDung =
            '\t' + 'Ngày ' + data.ngayNhan + ', Sở Giao thông vận tải nhận được Đơn đề nghị số ' + data.donXinCP + ' của ' + data.tenDoanhNghiep
            + ' V/v chấp thuận thiết kế và phương án tổ chức giao thông của nút giao đường nhánh đấu nối tại ' + data.diaDiem_DiaChi
            + ' và hồ sơ đề nghị chấp thuận đấu nối đính kèm do ' + data.donViTK + ' thiết kế.' + ' Sau khi tổ chức kiểm tra hiện trường vào ngày ' + data.bbkt
            + ' và xem xét hồ sơ liên quan, Sở Giao thông vận tải có một số ý kiến như sau:'+'\n'
            + '\t' + '1. Chấp thuận đấu nối và các nội dung cần hoàn thiện trước khi trình hồ sơ thực hiện thủ tục đề nghị cấp phép thi công nút giao đấu nối' + '\n'
            + '\t' + '- Căn cứ Quyết định chủ trương đầu tư số ' + data.qd_ctdt + ' của UBND tỉnh V/v chấp thuận ' + data.tenDoanhNghiep + ' là Nhà đầu tư thực hiện dự án '
            + data.tenDuAn + ';' + '\n'
            + '\t' + 'Căn cứ Giấy phép xây dựng số ' + data.gpxd + ' của Sở Xây dựng Khánh Hòa;' + '\n'
            + '\t' + 'Căn cứ Biên bản kiểm tra hiện trường ngày ' + data.bbkt + ' V/v đấu nối đường ra vào ' + data.tenDuAn + ' tại ' + diaDiem + '.' + '\n'
            + '\t' + 'Để phục vụ hoạt động dự án, Sở Giao thông vận tải chấp thuận vị trí nút giao đường ra vào ' + data.tenDuAn + ' đấu nối tại ' + diaDiem + '.' + '\n'
            + '\t' + '- Nội dung hồ sơ đề nghị chấp thuận đấu nối cần hoàn thiện một số nội dung sau trước khi trình hồ sơ thực hiện thủ tục cấp phép thi công nút giao đấu nối:' + '\n' + '\t'
            + '\n'
            + '\t' + '2. Các nội dung lưu ý khác:' + '\n'
            + '\t' + noiDungCauMauVB + '\n'
            + '(đính kèm Biên bản kiểm tra hiện trường ngày ' + data.bbkt + ')';
        $('#noiDung').val(noiDung);
        let tenVietTat = '';
        if (data.tenVietTat !== null && data.tenVietTat !== '' && data.tenVietTat !== undefined)
            tenVietTat = '(' + data.tenVietTat + ')';
        let noiNhan =
            '- Như trên;' + '\n'
            + '- Phòng QLKCHTGT (để p/hợp); (VBĐT)' + '\n'
            + '- Lưu: VT, QLCL&ATGT' + tenVietTat + '.';
        $('#noiNhan').val(noiNhan);
        $('#uyQuyen').val('KT GIÁM ĐỐC');
        $('#kyHieu').val('SGTVT-QLCL&ATGT');
    };
    let btnSaveVBCT = function () {
        let form = $('#vanBanChapThuan');
        let fd = new FormData($('#vanBanChapThuan')[0]);
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
        let form = $('#giayPhepCT');
        let fd = new FormData($('#giayPhepCT')[0]);
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
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
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
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
        window.open(url + "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/reportgiayphep.do?idCongTrinh=" + idCongTrinh);
    };
    let btnReportVBCT = function () {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        window.open(url + "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/reportexport.do?idCongTrinh=" + idCongTrinh + "&idLoaiHoSo=" + idLoaiHoSo);
    };
    return {
        init: function () {
            return setup();
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
    }
    }
})();