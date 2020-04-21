formManager = (function () {
    let tableHoSo;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        loadDatePicker();
        utils.initIChecks('i-checks');
        utils.initHuyenSelect2();
        tableHoSo = initTableHoSo();
        $('#btnAddHS').on('click', btnAddHS);
        $('#btnSaveTTCT').on('click', btnSaveTTCT);
        loadTableTaiLieu();
        $('#btnDeleteHS').on('click', btnDeleteHS);
        $('#tabGiayPhep').on('click', loadFormGiayPhep);
        $('#thongTinCT').on('click', function () {
            $('#giayPhepCongTrinh').addClass('hidden');
            $('#thongtincongtrinh').removeClass('hidden');
            $('#thongTinCT').addClass('active');
            
            $('#tabGiayPhep').removeClass('active');
        });
        initListHuyen();
        initNguoiKy();
        initPhuongXa();
        loadScreenOnSelChange();
        $('#btnSaveGP').on('click', btnSaveGP);
        $('#layLaiGP').on('click', layLaiND);
        $('#btnReportGP').on('click', btnReportGP);
        utils.initDecimal('.decimalNumber', true, 0);
        utils.initNotifyMessageBox();
        $('#thoiHan,#tuNgay').on('change', changeTuNgay);
        $('#nguoiKyGP').on('change', function () {
            $('#chucVuGP').val($('#nguoiKyGP option:selected').attr('chucvuGP'));
        });
        $('#idHuyen').on('change',initPhuongXa);
        $('#tenDuong,#idHuyen').on('change', changeH);
    };
    let loadScreenOnSelChange = function () {

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
            + ($('#idHuyen option:selected').text()===''?'':', ' + loai + $('#idHuyen option:selected').text());
        diaDiem = $('#tenDuong').val()
            + ($('#idHuyen option:selected').text()===''?'':', ' + loai + $('#idHuyen option:selected').text());
        $('#noiDung_CapPhep').val(noiDung_CapPhep);
        $('#diaDiem_DiaChi').val(diaDiem);
    };
        let initListHuyen = function () {
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
    let  initPhuongXa = function(){
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
                    return meta.row + 1;
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
        if (form.valid()) {
            let method = "POST";
            let modelAttribute = "congTrinhVO";
            form.attr("method", method);
            form.attr("action", url + "/worklife/qlctgt/user/xulyhoso/hscpdnhttthoatnuoctthai/saveFormTTCT.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
            form.attr("modelAttribute", modelAttribute);
            form.attr("enctype", "multipart/form-data");
            form.submit();
        }
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
    let initNguoiKy = function() {
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/getnguoiky.do',
            type: 'post',
            success: function (data) {
                if (data != null){
                    let options = '<option value="" chucvu = ""></option>';
                    for (let i = 0; i < data.length; i++){
                        options += '<option value="'+data[i].nguoiKy+'" chucvuGP = "'+data[i].chucVu+'">'+data[i].nguoiKy+'</option>';
                    }
                    $('#nguoiKyGP').html(options);
                }
            }
        })
    };
    let loadFormGiayPhep = function() {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
        let idHoSo = parseInt($('input[name="idHoSo"]').val());
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        $.ajax({
            url: url + '/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/getgiayphep.do',
            type: 'post',
            data: {idHoSo: idHoSo, idCongTrinh: idCongTrinh, idLoaiHoSo: idLoaiHoSo},
            success: function (data) {
                if(data.congTrinhVO === null){

                }else{
                    if (data.giayPhepChapThuanVO !== null){
                        $.each(data.giayPhepChapThuanVO, function (key, val) {
                            $('#' + key).val(val);
                        });
                        if (data.giayPhepChapThuanVO.gp_So !== null && data.giayPhepChapThuanVO.gp_So !== '' && data.giayPhepChapThuanVO.gp_So !== undefined) {
                            $('#gp_So').val(data.giayPhepChapThuanVO.gp_So.split('/')[0]);
                            $('#kyHieuGP').val(data.giayPhepChapThuanVO.gp_So.replace(data.giayPhepChapThuanVO.gp_So.split('/')[0] + '/',''));
                            $('#btnSaveGP').addClass('hidden');
                            $('#btnReportGP').removeClass('hidden');
                        }
                        else {
                            $('#kyHieuGP').val('/SGTVT-QLKCHTGT');
                        }
                    }
                    else {
                        loadDefaultGP(data);
                    }
                }
            }
        });
        let valSoSP =   $('#gp_So').val();
        if (valSoSP ===""){
            $('#gp_Ngay').attr('disabled', true);
        }else{
            $('#gp_Ngay').attr('disabled', false);
        }
        $('#tabGiayPhep').addClass('active');
        $('#thongTinCT').removeClass('active');
        $('#giayPhepCongTrinh').removeClass('hidden');
        $('#thongtincongtrinh').addClass('hidden');
    };
    let loadDefaultGP = function(data) {
         let loaiHuyen = '';
         if (data.congTrinhVO.loai = 1){
             loaiHuyen = 'Thành phố '
         }
         else if(data.congTrinhVO.diachi_huyen = 2) {
             loaiHuyen = 'Huyện '
         }else if(data.congTrinhVO.loai = 3) {
             loaiHuyen = 'Thị xã '
         }
        let tieuDe =
            '\t' + 'Công trình: ' + data.congTrinhVO.tenCongTrinh + '\n'
            + '\t' + 'Hạng mục: ' + data.congTrinhVO.tenHangMuc + '\n'
            + '\t' + 'Địa điểm: ' + data.congTrinhChiTietVO.lyTrinh  + ' ' + data.congTrinhChiTietVO.tenDuong + ' ' + loaiHuyen + data.congTrinhChiTietVO.tenHuyen;
        $('#tieuDe').val(tieuDe);
        let NDCC = '';
        let noiDungCC = data.dmCanCuPhapLyVO.noiDung;
        for (let i = 0; i < noiDungCC.split('\n').length; i++){
            NDCC += '\t' + noiDungCC.split('\n')[i];
        }
        let canCu = NDCC + '\n'
        + '\t' + 'Phối hợp Văn bản số   /UBND-QLĐT ngày     của UBND     v/v thỏa thuận vị trí ' + data.congTrinhVO.tenCongTrinh + '.';
        $('#canCu').val(canCu);
        let phamViCP = '';
        let nDungPV = data.congTrinhVO.phamVi_CapPhep;
        for (let i = 0; i < nDungPV.split('\n').length; i++){
            phamViCP += '\t' + nDungPV.split('\n')[i];
        }
        let noiDungCauMauGP = '';
        let noiDung = data.congTrinhVO.noiDungCauMauGP;
        for (let i = 0; i < noiDung.split('\n').length; i++){
            noiDungCauMauGP += '\t' + noiDung.split('\n')[i];
        }
        let noiDungGP =
             '\t' + 'I. Cấp phép thi công: '  + '\n'
            + '\t' + '- Đơn vị được cấp phép: ' + data.congTrinhVO.tenDoanhNghiep + '\n'
            + '\t' + '- Trụ sở: ' + data.congTrinhVO.diaChi_DN + '\n'
            + '\t' + '- Đại diện: ' + data.congTrinhVO.daiDien + ' - ' + data.congTrinhVO.chucVu +  ' - Số điện thoại: ' +data.congTrinhVO.dienThoai  + '\n'
            + '\t' + 'II. Được phép thi công công trình: ' + data.congTrinhVO.noiDung_CapPhep + '. Cụ thể như sau: '+' \n'
            + '\t' + '1. Loại công trình: ' + data.dmLoaiCTVO.ten + ';'  + '\n'
            + '\t' + '2. Tên công trình: ' + data.congTrinhVO.tenCongTrinh + ';'  + '\n'
            + '\t' + '3. Phạm vi cấp phép: ' + '\n'
            /* + '\t' +  data.congTrinhVO.phamVi_CapPhep + ' \n'*/
            + phamViCP + '\n'
            + '\t' + 'III. Các yêu cầu đối với chủ đầu tư và đơn vị thi công công trình: '  + '\n'
            //+ '\t' +  data.congTrinhVO.noiDungCauMauGP  + '\n'
            + noiDungCauMauGP
            +   '- Sau khi thi công xong, ' +data.congTrinhVO.tenDoanhNghiep + ' phải tổ chức bàn giao mặt bằng lại cho Sở GTVT và Công ty CP Quản lý & XDGT Khánh Hòa, kèm theo nộp bản vẽ hoàn công để cập nhật công trình thiết yếu vào hồ sơ quản lý đường.' + '\n'
            + 'IV. Thời gian thi công: '  + '\n'
            + '\t' + '- Giấy phép thi công này có thời hạn ' + data.congTrinhVO.thoiHan + ' ngày, kể từ ngày ' + data.congTrinhVO.tuNgay + ' đến hết ngày '  + data.congTrinhVO.denNgay + '. Quá thời gian quy định, chủ đầu tư phải đề nghị cấp gia hạn./.' + '\n';

        $('#noiDungGP').val(noiDungGP);
        let tenVietTat = '';
        if (data.congTrinhVO.tenVietTat !== null && data.congTrinhVO.tenVietTat !== '' && data.congTrinhVO.tenVietTat !== undefined)
            tenVietTat = '(' + data.congTrinhVO.tenVietTat
                + ')';
        let noiNhanGP =
            '- Phòng QLĐT '+ loaiHuyen + ' ' + data.congTrinhChiTietVO.tenHuyen + ';' + '\n'
            + '- UBND ' + loaiHuyen + ' ' + data.congTrinhChiTietVO.tenHuyen + ';' + '\n'
            + '- Thanh tra Sở GTVT;' + '\n'
            + '- Ban QLDA GTNT;' + '\n'
            + '- Cty CP QL&XDGT KH;' + '\n'
            + '- Lưu: VT, QLKCHTGT' + tenVietTat + ';';
        $('#noiNhanGP').val(noiNhanGP);
        $('#kyHieuGP').val('SGTVT-QLKCHTGT');
        $('#uyQuyenGP').val('KT GIÁM ĐỐC');
    };
    let layLaiND = function () {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
        let idHoSo = parseInt($('input[name="idHoSo"]').val());
        let idLoaiHoSo = parseInt($('input[name="idLoaiHoSo"]').val());
        if(idCongTrinh ===-1||idCongTrinh=== null){
            swal({
                title: "Thông báo",
                text: "Dữ liệu trống, Thông tin công trình không có dữ liệu",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        }else {
            $.ajax({
                url: url + '/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/getgiayphep.do',
                type: 'post',
                data: {idHoSo: idHoSo, idCongTrinh: idCongTrinh, idLoaiHoSo: idLoaiHoSo},
                success: function (data) {
                    loadDefaultGP(data);
                }
            })
        }
    };
    let btnSaveGP = function() {
        let form = $('#formgiayPhepThiCong');
        let fd = new FormData($('#formgiayPhepThiCong')[0]);
        if ($('#gp_So').val() !== null && $('#gp_So').val() !== '')
            fd.set('gp_So',$('#gp_So').val() + '/' + $('#kyHieuGP').val());
        if (form.valid()){
            $.ajax({
                url: url + "/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/saveFormGP.do",
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data !== null){
                        $.each(data, function (key, val) {
                            $('#' + key).val(val);
                        });
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
    let btnReportGP = function () {
        let idCongTrinh = parseInt($('input[name="idCongTrinh"]').val());
        window.open(url + "/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/reportgiayphep.do?idCongTrinh=" + idCongTrinh);
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
            window.location = url + "/worklife/user/file/json/downloadfilecongtrinh.do?idTL=" + parseInt(idTL);
        },

    }
})();
