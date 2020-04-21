formManager = (function () {
    let tableDSBaoCaoTTCau;
    /*let listTTDuong = [];*/
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        let ngayHienTai = new Date();
        initNam();
        setSelectValByDate(ngayHienTai);
        utils.initHatQuanLy();
        /*initTinhTrangDuong();*/
        tableDSBaoCaoTTCau = initTableDSBaoCaoTTCau();
        /*tableDSBaoCaoTTCau.ajax.reload();*/
        btnTim();
        $('#quy, #nam, #hatQuanLy').on('change', btnTim);
        $('#btnSave').on('click', btnSave);
        $('#btnReportExcel').on('click', btnReportExcel);
    };
    let initNam = function () {
        let date = new Date();
        let year = date.getFullYear();
        let options = '';
        for (let i = year; i >= 2019; i--){
            options += '<option value="'+i+'">'+i+'</option>'
        }
        $('#nam').html(options);
    };
    let setSelectValByDate = function(ngay){
        let momentTmp = moment(ngay, "dd/MM/yyyy");
        moment().quarter();
        let quyTmp = momentTmp.quarter();
        $('#quy').val(quyTmp);
    };
    let initTinhTrangDuong = function() {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/ttchitietduong/getlistttduong.do",
            type: "POST",
            async: false,
            success: function (data) {
                if (data !== null){
                    listTTDuong = data;
                }
            }
        })
    };
    let initTableDSBaoCaoTTCau = function () {
        let colDefs = [
            {
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false},
            {"targets": 1, class: "text-center","orderable": false},
            {"targets": 2, class: "text-center","orderable": false},
            {"targets": 3, class: "text-center","orderable": false},
            {"targets": 4, class: "text-center","orderable": false},
            {"targets": 5, class: "text-center","orderable": false},
            {"targets": 6, class: "text-center","orderable": false},
            {"targets": 7, class: "text-center","orderable": false},
            {"targets": 8, class: "text-center","orderable": false},
            {"targets": 9, class: "text-center","orderable": false},
            {"targets": 10, class: "text-center","orderable": false},
            {"targets": 11, class: "text-center","orderable": false},
            {"targets": 12, class: "text-center","orderable": false},
            {"targets": 13, class: "text-center","orderable": false},
            {"targets": 14, class: "text-center","orderable": false},
            {"targets": 15, class: "text-center","orderable": false},
            {"targets": 16, class: "text-center","orderable": false},
            {"targets": 17, class: "text-center","orderable": false},
            {"targets": 18, class: "text-center","orderable": false},
            {"targets": 19, class: "text-center","orderable": false},
            {"targets": 20, class: "text-center","orderable": false},
            {"targets": 21, class: "text-center","orderable": false},
            {"targets": 22, class: "text-center","orderable": false},
            {"targets": 23, class: "text-center","orderable": false},
            {"targets": 24, class: "text-center","orderable": false},
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
        return datatableFactory.initDataSourceDataTableNonLoad('tableDSBaoCaoTTCau', colDefs, opts, 1);
    };
    let btnTim = function () {
        let quy = $('#quy').val();
        let nam = $('#nam').val();
        let idGroup = $('#group_Id').val();
        if (idGroup === '1')
            idGroup = $('#hatQuanLy').val();
        $.ajax({
            url: url + '/worklife/user/baocaotinhtrangcau/getlisttinhtrangcau.do',
            type: 'post',
            data: {idGroup: !idGroup?2:idGroup, quy: quy, nam: nam},
            success: function (data) {
                if (data != null && data.length > 0) {
                    tableDSBaoCaoTTCau.clear().draw();
                    for (let i = 0; i < data.length; i++) {
                        let chieuDai = data[i].chieuDai;
                        if (chieuDai.split(".")[1]==="0")
                            chieuDai = chieuDai.split(".")[0];
                        let rowHtml = [
                            i + 1
                            + '<input type="hidden" name="tinhTrangCauVOS['+i+'].id" value="'+data[i].id+'">'
                            + '<input type="hidden" name="tinhTrangCauVOS['+i+'].idCau" value="'+data[i].idCau+'">'
                            + '<input type="hidden" name="tinhTrangCauVOS['+i+'].quy" value="'+data[i].quy+'">'
                            + '<input type="hidden" name="tinhTrangCauVOS['+i+'].nam" value="'+data[i].nam+'">',
                            data[i].tenCau,
                            data[i].tenDuong,
                            data[i].tenSongVuot,
                            data[i].tenHuyen,
                            data[i].lyTrinhKm,
                            createSelDGMD('tinhTrangCauVOS['+i+'].tinhTrang',data[i].tinhTrang),
                            '<textarea style="width: 100%; resize: none" rows="3" cols="3" name="tinhTrangCauVOS['+i+'].ghiChu">'+data[i].ghiChu+'</textarea>',
                            chieuDai,
                            data[i].chieuRong,
                            data[i].beRong_XeChay,
                            data[i].tinhKhong,
                            data[i].soNhip,
                            data[i].soDoNhip,
                            data[i].daiNhip,
                            data[i].tenDangCau,
                            data[i].tenKCMo_Mong,
                            data[i].tenKCMo_Than,
                            data[i].tenKCTru_Mong,
                            data[i].tenKCTru_Than,
                            data[i].taiTrong_TK,
                            data[i].taiTrong_KT,
                            data[i].namXD,
                            data[i].namKT,
                            data[i].tenDonViQL
                        ];
                        tableDSBaoCaoTTCau.row.add(rowHtml).draw();
                        tableDSBaoCaoTTCau.draw(false);
                        tableDSBaoCaoTTCau.page('first').draw('page');
                    }
                    tableDSBaoCaoTTCau.page.len(10).draw();
                }
            }
        });
        $.ajax({
            url: url + "/worklife/user/baocaotinhtrangcau/getngaybaocao.do",
            type: "POST",
            data: {quy: quy, nam: nam, idGroup: !idGroup?2:idGroup},
            success: function (data) {
                if (data !== null && data !== ''){
                    if (data.ngayBaoCao !== null && data.ngayBaoCao !== ""){
                        $('#htbaocao').iCheck('check');
                        $('#ngayBaoCao').val(data.ngayBaoCao);
                    }else {
                        $('#htbaocao').iCheck('uncheck');
                        $('#ngayBaoCao').val('');
                    }
                }
                else {
                    $('#htbaocao').iCheck('uncheck');
                    $('#ngayBaoCao').val('');
                }
            }
        })
    };
    let createSelDGMD = function (selName, tinhTrang) {
        let selHtml = '<select class="form-control" name="'+selName+'" style="width: 100%">';
        selHtml += '<option value="-1"></option>';
        listTTDuong.forEach(function (item, index) {
            selHtml += '<option ' + (parseInt(tinhTrang) === item.idTinhTrang ? 'selected' : '') + ' value="' + item.idTinhTrang + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let btnSave = function () {
        if (tableDSBaoCaoTTCau.data().count() !== 0) {
            tableDSBaoCaoTTCau.page.len(tableDSBaoCaoTTCau.data().count()).draw();
        }
        let form = $('#formBCTTCau');
        let fd = new FormData($('#formBCTTCau')[0]);
        let date = new Date();
        let today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        if($('#htbaocao').is(':checked')){
            for (let i = 0; i < $('#tableDSBaoCaoTTCau tbody tr').length; i++){
                fd.set('tinhTrangCauVOS['+i+'].ngayBC', today);
            }
            fd.set('ngayBaoCao', today);
        }
        if (form.valid()){
            $.ajax({
                url: url + "/worklife/user/baocaotinhtrangcau/saveForm.do",
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data !== null){
                        swal({
                            title: "Thông báo",
                            text: "Lưu dữ liệu thành công",
                            type: "success",
                            confirmButtonText: "Đồng ý"
                        });
                        if (data.ngayBaoCao !== null)
                            $('#ngayBaoCao').val(data.ngayBaoCao);
                        else {
                            $('#ngayBaoCao').val('');
                        }
                        if (tableDSBaoCaoTTCau.data().count() !== 0) {
                            tableDSBaoCaoTTCau.page.len(tableDSBaoCaoTTCau.data().count()).draw();
                        }
                        let tinhTrangCauVOS = data.tinhTrangCauVOS;
                        if (tinhTrangCauVOS !== null && tinhTrangCauVOS.length > 0){
                            for (let i = 0; i < tinhTrangCauVOS.length; i++){
                                $('input[name="tinhTrangCauVOS['+i+'].id"]').val(tinhTrangCauVOS[i].id);
                                $('input[name="tinhTrangCauVOS['+i+'].quy"]').val(tinhTrangCauVOS[i].quy);
                                $('input[name="tinhTrangCauVOS['+i+'].nam"]').val(tinhTrangCauVOS[i].nam);
                                createSelDGMD('tinhTrangCauVOS['+i+'].tinhTrang',tinhTrangCauVOS[i].tinhTrang);
                                $('textarea[name="tinhTrangCauVOS['+i+'].ghiChu"]').val(tinhTrangCauVOS[i].ghiChu);
                            }
                        }
                        tableDSBaoCaoTTCau.page.len(10).draw();
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
    let btnReportExcel = function () {
        let quy = parseInt($('#quy').val());
        let nam = parseInt($('#nam').val());
        let idGroup = parseInt($('#hatQuanLy').val());
        window.location = url + "/worklife/user/baocaotinhtrangcau/report.do?quy=" + quy + "&nam=" + nam + "&idGroup=" + idGroup;
    };
    return{
        init: function () {
            return setup();
        }
    }
})();