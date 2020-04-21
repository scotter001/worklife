formManager = ( function () {
    let tableQLThietBiBienBao;
    let listTuyenDuong = [];

    $(document).ready(function () {
        formManager.init();
    });
    let setup = function(){
        tableQLThietBiBienBao = inittableQLThietBiBienBao();
        $('#tableQLThietBiBienBao tbody').on('click', 'tr',selected );
        initTuyenDuong();
        initLoaiThietBi();
        initListHuyen();
        initHatQuanLy();
        initPhuongXa();
        $('#btnTim').on('click', btnTim);
        $('#btnThemMoi').on('click', btnThemMoi);
        $('#btnSave').on('click', btnSave);
        /*btnTim();*/
        loadScreenOnSelChange();
        utils.initNotifyMessageBox();
    };
    let initTuyenDuong = function(){
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/gettuyenduong.do",
            type:"POST",
            success: function(data){
                if (data !== null ){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++){
                        options +='<option value="'+data[i].idTuyenDuong+'">'+data[i].tenDuong+'</option>';
                    }
                    $('#tuyenDuong').html(options);
                    $('#idTuyenDuong').html(options);
                }
            }
        })
    };
    let loadScreenOnSelChange = function(){
        $('#tuyenDuong').on('change',function(){
            tableQLThietBiBienBao.ajax.reload();
        });
        $('#idhuyen').on('change',initPhuongXa);
        $('#ngaybtsc_cuoi').on('change',channgels);
        $('#thoiHanBaoTri').on('change',channgels);
        $('#namHoatDong').on('change',channgels);
    };
    let  channgels = function(){
        let ngaybtsc_cuoi =   $('#ngaybtsc_cuoi').val();
        let thoiHanBaoTri =   $('#thoiHanBaoTri').val();
        let namHoatDong =   $('#namHoatDong').val();

        let a = datengaybtsc_cuois(ngaybtsc_cuoi,thoiHanBaoTri,namHoatDong);
        if(a == null){
            a = '';
        }
        $('#hanBaoTri').val(a);
    };
    let datengaybtsc_cuois = function (ngaybtsc_cuoi,thoiHanBaoTri,namHoatDong) {
        if (namHoatDong !== ''){
            if(thoiHanBaoTri == ''&&namHoatDong!== ''){
                return '';
            }else
            if (thoiHanBaoTri !==''&&namHoatDong!== ''){
                if (ngaybtsc_cuoi == '') {
                    let abc = parseInt(namHoatDong) + parseInt(thoiHanBaoTri);
                    if (abc == 0) {
                        abc = '';
                        return abc;
                    }
                    return abc;
                } else if(ngaybtsc_cuoi !== ''){
                    let tt = new Date(ngaybtsc_cuoi);
                    let yyyy = tt.getFullYear() + parseInt(thoiHanBaoTri);
                    let dd = tt.getDate() < 10 ? '0' + (tt.getDate()) : tt.getDate();
                    let MM = (tt.getMonth() + 1) < 10 ? '0' + (tt.getMonth() + 1) : (tt.getMonth() + 1);
                    let abc = dd + '/' + MM + '/' + yyyy;
                    return abc;
                }
                return abc;
            }
            return '';
        }
        return '';
    };

    let  initLoaiThietBi = function(){
        $.ajax({
            url: url+'/worklife/user/quanlytuyenduong/getloaithietbi.do',
            type:"POST",
            success: function(data){
                if (data !== null ){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++){
                        options +='<option value="'+data[i].id+'">'+data[i].ten+'</option>';
                    }
                    $('#loaiThietBi').html(options);
                    $('#idLoaiTB').html(options);
                }
            }
        })
    };

    let  initHatQuanLy = function(){
        $.ajax({
            url: url+'/worklife/user/quanlytuyenduong/dmtdtheohat/gethatquanly.do',
            type:"POST",
            success: function(data){
                if (data !== null ){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++){
                        options +='<option value="'+data[i].group_Id+'">'+data[i].group_Name+'</option>';
                    }
                    $('#idGroup').html(options);
                    $('#hatQuanLy').html(options);

                }
            }
        })
    };

    let  initListHuyen = function(){
        $.ajax({
            url: url+'/worklife/user/quanlytuyenduong/dmtdtheohat/getlisthuyen.do',
            type:"POST",
            success: function(data){
                if (data !== null ){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++){
                        options +='<option value="'+data[i].idHuyen+'">'+data[i].tenHuyen+'</option>';
                    }
                    $('#idhuyen').html(options);
                }
            }
        })
    };
    let datengaybtsc_cuoi = function (ngaybtsc_cuoi,thoiHanBaoTri,namHoatDong) {
        if (namHoatDong !== null){
            if(thoiHanBaoTri == null&&namHoatDong!== null){
                return '';
            }else
            if (thoiHanBaoTri !==null&&namHoatDong!== null){
                if (ngaybtsc_cuoi == null) {
                    let abc = parseInt(namHoatDong) + parseInt(thoiHanBaoTri);
                    if (abc == 0) {
                        abc = '';
                        return abc;
                    }
                    return abc;

                } else if(ngaybtsc_cuoi !== null){
                    let tt = new Date(ngaybtsc_cuoi);
                    let yyyy = tt.getFullYear() + parseInt(thoiHanBaoTri);
                    let dd = tt.getDate() < 10 ? '0' + (tt.getDate()) : tt.getDate();
                    let MM = (tt.getMonth() + 1) < 10 ? '0' + (tt.getMonth() + 1) : (tt.getMonth() + 1);
                    let abc = dd + '/' + MM + '/' + yyyy;
                    return abc;
                }
                return '';
            }
            return '';
        }
        return '';
    };

    let FormatsNBTC = function (abc) {
        if (abc ===  0){
            abc = "";
            return abc;
        }
        return abc;
    };
    let  initPhuongXa = function(){
        let idHuyen = $('#idhuyen').val();
        if (idHuyen === undefined || idHuyen === null)
            idHuyen = -1;
        $.ajax({
            url: url+'/worklife/user/quanlytuyenduong/dmtdthuoctinh/getxabyidhuyen.do',
            type:"POST",
            data: {idHuyen: idHuyen },
            success: function(data){
                if (data !== null ){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++){
                        options +='<option value="'+data[i].iDDmXa+'">'+data[i].tenXa+'</option>';
                    }
                    $('#idxa').html(options);
                }
            }
        })
    };
    let inittableQLThietBiBienBao = function () {
        let colDefs = [
            {
                "sWidth": "10%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {

                    return meta.row + meta.settings._iDisplayStart + 1 +'<input type="hidden" value="' + row.idtb + '">';
                }
            },
            {"targets": 1, class:"text-left", width: "15%", "mData": "ten", "orderable": false},
            {"targets": 2, class:"text-left", width: "15%", "mData": "tenTB", "orderable": false},
            {"targets": 3, class:"text-center", width: "10%",
                render: function (data, type, row, meta) {
                    return 'Km' + row.lyTrinhkm +'+' +row.lyTrinhm ;
                }
                , "orderable": false},
            {"targets": 4, class:"text-center", width: "20%", "mData": "tenDuong", "orderable": false},
            {"targets": 5, class:"text-center", width: "20%", "mData": "group_Name", "orderable": false},
            {"targets": 6, class:"text-center", width: "10%",
                render: function (data, type, row, meta) {
                    return datengaybtsc_cuoi(row.ngaybtsc_cuoi, row.thoiHanBaoTri, row.namHoatDong)
                }
                , "orderable": false},
        ];
        let opts = {
            'deferLoading' : null,
            "fnDrawCallback": function () {
                let row = null;
                let idtb = parseInt($("#idtb").val());
                if (idtb !== -1) {
                    tableQLThietBiBienBao.$("tr").each(function() {
                        let data = tableQLThietBiBienBao.row($(this)).data();
                        if (data.idtb === idtb) {
                            row = $(this);
                        }
                    });
                    if ($(row) != null) {
                        $(row).trigger('click');
                    }
                }
            },
            'displayStart': $('#startAt').val()?parseInt($('#startAt').val()):0,
        };

        return datatableFactory.initAjaxDataSourceDataTable("tableQLThietBiBienBao", colDefs, url + "/worklife/user/quanlytuyenduong/getlistthietbibienbao.do", function (settings) {
            let idTuyenDuong = $('#tuyenDuong').val();
            let id = $('#loaiThietBi').val();
            let group_Id = $('#hatQuanLy').val();
            let obj = {
                "optional": {
                    "idTuyenDuong": !idTuyenDuong ? -1 : idTuyenDuong,
                    "id": !id ? -1 : id,
                    "group_Id": !group_Id ? -1 : group_Id,
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);

        }, opts, 1, 1);
    };

    let btnTim = function () {
        tableQLThietBiBienBao.ajax.reload();
    };
    let tooltipa = function(data){
        $('#moTa').attr('data-original-title', data).removeClass('data-original-title');
        if(data === null || data.length <=100){
            $('#moTa').attr('data-original-title', '');
            return '';
        }
        else if (data !== '' && data.length > 100 ){
            $('#moTa').attr('data-original-title', data);
            return;
        }
    };

    let selected = function () {
        let idtb= tableQLThietBiBienBao.row(this).data().idtb;
        $('#tableQLThietBiBienBao').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        getInfoRow(idtb);
    };
    let getInfoRow = function (idtb) {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/dmtdthuoctinh/getthietbibyid.do",
            type: "POST",
            data: {idtb: idtb},
            success: function (data) {
                if (data !== null) {
                    $('#idtb').val(data.idtb);
                    $('#idTuyenDuong').val(data.idTuyenDuong);
                    $('#idLoaiTB').val(data.idLoaiTB);
                    $('#tenTB').val(data.tenTB);
                    $('#lyTrinhkm').val(data.lyTrinhkm);
                    $('#lyTrinhm').val(data.lyTrinhm);
                    $('#idTuyenDuong').val(data.idTuyenDuong);
                    $('#idhuyen').val(data.idhuyen);
                    $('#idxa').val(data.idxa);
                    $('#idGroup').val(data.group_Id);
                    $('#namHoatDong').val(FormatsNBTC(data.namHoatDong));
                    $('#thoiHanBaoTri').val(FormatsNBTC(data.thoiHanBaoTri));
                    $('#ngaybtsc_cuoi').val(data.ngaybtsc_cuoi);
                    let hanbt = datengaybtsc_cuoi(data.ngaybtsc_cuoi, data.thoiHanBaoTri, data.namHoatDong);
                    $('#hanBaoTri').val(hanbt);
                    $('#moTa').val(data.moTa);
                    tooltipa(data.moTa);
                    //$('#moTa').tooltip();
                }
                utils.initDecimal(".decimal", true, 0);
                utils.initIChecks('i-checks');

            }
        })
    };
    let btnThemMoi = function () {
        $('input[type="text"]').val('');
        $('input[type="hidden"]').val(-1);
        $('input[type="date"]').val("");
        $('select').val(-1);
        $('#tableQLThietBiBienBao').find('tbody tr.selected').removeClass('selected');
        $('#moTa').attr('data-original-title','' );
    };
    let btnSave = function () {
         if (validateForm() == true) {
            let form = $('#formDmQLThietBiBienBao');
            /*let fd = new FormData(form[0]);
            if (validateForm() == true){
                $.ajax({
                    url: url + "/worklife/user/quanlytuyenduong/dmqlthietbi/saveForm.do",
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
                            tableQLThietBiBienBao.ajax.reload();
                        } else{
                            swal({
                                title: "Thông báo",
                                text: "Lưu dữ liệu thất bại",
                                type: "warning",
                                confirmButtonText: "Đồng ý"
                            });
                        }
                    },
                    error:function () {
                        swal({
                            title: "Thông báo",
                            text: "Vui lòng nhập đầy đử dữ liệu",
                            type: "warning",
                            confirmButtonText: "Đồng ý"
                        });
                    }
                })}*/
            /*let form = $('#formDmTuyenDuongTheoHat');*/
            let method = "POST";
            let modelAttribute = "thietBiVO";
            /*let fd = new FormData($('#formDmTuyenDuongTheoHat')[0]);
            fd.set('listDoanDuongVOs.iddh', iddh);*/
            form.attr("method", method);
            form.attr("action", url + "/worklife/user/quanlytuyenduong/dmqlthietbi/saveForm.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
            form.attr("modelAttribute", modelAttribute);
            form.attr("enctype", "multipart/form-data");
            form.submit();
        }
    };
    let validateForm = function ()  {
        var u = document.getElementById("tenTB").value;
        var p = document.getElementById("idLoaiTB").value;
        var h = document.getElementById("idGroup").value;
        var q = document.getElementById("namHoatDong").value;
        var e = document.getElementById("ngaybtsc_cuoi").value;
        if( u == "") {
            swal({
                title: "Thông báo",
                text: "Vui lòng nhập đầy đủ trường dữ liệu 'Tên thiết bị, loại thiết bị, hạt quản lý'",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
            return false;
        }
        if(p ==  - 1) {
            swal({
                title: "Thông báo",
                text: "Vui lòng nhập đầy đử dữ liệu trước khi lưu",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
            return false;
        }
        if(h ==  - 1) {
            swal({
                title: "Thông báo",
                text: "Vui lòng nhập đầy đử dữ liệu trước khi lưu",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
            return false;
        }
        if(q!==""){
            if( isNaN(q) || q < 999 || q > 10000) {
                swal({
                    title: "Thông báo",
                    text: "Vui lòng nhập năm đầy đủ 4 số",
                    type: "warning",
                    confirmButtonText: "Đồng ý"
                });
                return false;
            }
        }
        if(e!==''){
            if(q=="") {
                swal({
                    title: "Thông báo",
                    text: "Vui lòng nhập năm hoạt động trước khi có ngày bảo trì",
                    type: "warning",
                    confirmButtonText: "Đồng ý"
                });
                return false;
            }
        }
        return true;
    };
    return{
        init: function (){
            return setup();
        },
    }
})();


