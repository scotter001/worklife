/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */
formManager = (function () {
    let dmCtscTable = undefined;
    let dmVttdCtscTable = undefined;
    let dmScdkTable = undefined;
    let dmCtscTableDatas = [
        {chon:"1",viTri:"Km 100 + 1 - 132 + 2",ngaySuCo:"20/05/2018",suaChuLanCuoi:"20/05/2018",tinhTrang:"Hoàn thành"}
        ,{chon:"2",viTri:"Km 102 - 102",ngaySuCo:"21/5/2018",suaChuLanCuoi:"",tinhTrang:"Đang sửa chữa"}
        ,{chon:"3",viTri:"Km 120 + 1 - 152 + 92",ngaySuCo:"25/12/2014",suaChuLanCuoi:"20/08/2018",tinhTrang:"Hoàn thành"}
    ];
    let dmVttdCtscTableDatas = [
        {viTri:"Km 100 + 1 - 132 + 2",traiPhai:"Trái",ngaySuCo:"20/05/2018",diaDiem:"25/7 Hoàng hoa Thám, P13, Quận 1",suaChuLanCuoi:"20/05/2018",tinhTrang:"Hoàn thành"}
        ,{viTri:"Km 102 - 102",traiPhai:"Phải",ngaySuCo:"21/5/2018",diaDiem:"110 Phan Văn Thuận, P2, Quận 11",suaChuLanCuoi:"",tinhTrang:"Đang sửa chữa"}
        ,{viTri:"Km 120 + 1 - 152 + 92",traiPhai:"Trái + Phải",ngaySuCo:"25/12/2014",diaDiem:"95 Ngô tất tố, P9, Quận Tân Bình",suaChuLanCuoi:"20/08/2018",tinhTrang:"Hoàn thành"}
    ];
    let dmScdkTableDatas = [
        {tenCongTrinh:"Cầu hoàng hoa thám",viTri:"Km 100 + 1 - 132 + 2",diaDiem:"25/7 Hoàng hoa Thám, P13, Quận 1",kinhPhiDuToan:"100,000,000",nguonVon:"Đầu tư",tuVanKhaoSat:"Giá vật tư"}
        ,{tenCongTrinh:"Cầu phan văn thuận",viTri:"Km 102 - 102",diaDiem:"110 Phan Văn Thuận, P2, Quận 11",kinhPhiDuToan:"200,000,000",nguonVon:"Huy Động",tuVanKhaoSat:"Tiền lương nhân công"}
        ,{tenCongTrinh:"Cầu ngô tất tố",viTri:"Km 120 + 1 - 152 + 92",diaDiem:"95 Ngô tất tố, P9, Quận Tân Bình",kinhPhiDuToan:"300,000,000",nguonVon:"Đầu tư",tuVanKhaoSat:"Tiền lương nhân công"}
    ];
    const col1 = '<input type="checkbox" class="i-checksTD isCheckedFile text-center" value="1" />';
 /*   let GET_DMSCTX_TRACUU_URL = utils.getSafePath('/worklife/user/suachuathuongxuyen/getdmsctxtracuu.do');
    let GET_DETAIL_DMSCTX_TRACUU_URL = utils.getSafePath('/worklife/user/suachuathuongxuyen/getdetaildmsctxtracuu.do');
    let EXPORT_DMSCTX_TRACUU_TO_EXCEL = utils.getSafePath('/worklife/user/suachuathuongxuyen/exportdmsctxtracuutoexcel.do');*/
    let setup = function () {
        init();
        clickTable();
       /* showQueryConditionByTieuChi();
        loadLyTrinhTheoTuyenDuong();
        $('#selTieuChi').trigger('change');
        loadDmKhSctxTheoQueryCondition();
        loadDetailDmKhSctx();
        exportDmKhSctxTraCuuToExcel();*/
        //validation();
    };
    let init=function(){
       //utils.loadDatePicker();
        let ngayHienTai = new Date() ;
        getYears(1900,ngayHienTai.getFullYear());
        dmCtscTable = generateDemoTableFactory('#dmCtscTable',[
                        {   "data": "chon",
                            class:"text-center",
                            "render": function (data) {
                                return col1;
                            }
                        },
                        { class:"text-center",
                            "data": "viTri" },
                        { class:"text-center",
                            "data": "ngaySuCo" },
                        { class:"text-center",
                            "data": "suaChuLanCuoi" },
                        { class:"text-center",
                            "data": "tinhTrang" }
                    ],dmCtscTableDatas);
        dmVttdCtscTable = generateDemoTableFactory('#dmVttdCtscTable',[
            {   class: "text-center",
                render: function (data, type, row, meta) {
                    let rowIndex = parseInt(meta.row);
                    let startAt = parseInt(meta.settings._iDisplayStart);
                    return rowIndex + startAt + 1;
                }
            },
            { class:"text-center",
                "data": "viTri" },
            { class:"text-center",
                "data": "traiPhai" },
            { class:"text-center",
                "data": "ngaySuCo" },
            { class:"text-center",
                "data": "diaDiem" },
            { class:"text-center",
                "data": "suaChuLanCuoi" },
            { class:"text-center",
                "data": "tinhTrang" }
        ],dmVttdCtscTableDatas);
        dmScdkTable = generateDemoTableFactory('#dmScdkTable',[
            {   class: "text-center",
                render: function (data, type, row, meta) {
                    let rowIndex = parseInt(meta.row);
                    let startAt = parseInt(meta.settings._iDisplayStart);
                    return rowIndex + startAt + 1;
                }
            },
            { class:"text-center",
                "data": "tenCongTrinh" },
            { class:"text-center",
                "data": "viTri" },
            { class:"text-center",
                "data": "diaDiem" },
            { class:"text-center",
                "data": "kinhPhiDuToan" },
            { class:"text-center",
                "data": "nguonVon" },
            { class:"text-center",
                "data": "tuVanKhaoSat" }
        ],dmScdkTableDatas);
        utils.initIChecks('i-checksTD');
    };
    let clickTable = function(){
        $('#dmCtscTable').find('tbody').on('click', 'tr', function () {
            $('#dmCtscTable').find('tr.selected').removeClass('selected');
            if (!$(this).hasClass('selected')) {
                $('#dmCtscTable tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
        $('#dmVttdCtscTable').find('tbody').on('click', 'tr', function () {
            $('#dmVttdCtscTable').find('tr.selected').removeClass('selected');
            if (!$(this).hasClass('selected')) {
                $('#dmVttdCtscTable tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
        $('#dmScdkTable').find('tbody').on('click', 'tr', function () {
            $('#dmScdkTable').find('tr.selected').removeClass('selected');
            if (!$(this).hasClass('selected')) {
                $('#dmScdkTable tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }

/*    let showQueryConditionByTieuChi = function(){
        $('#selTieuChi').on('change',function(){
            let val=$(this).val();
            if(val==1){
                $(".tieuchi_2").hide();// Phai hide truoc
                $("#divTieuChiTraCuu").removeClass("col-md-offset-1")
                $(".tieuchi_1").show();
                $("#divTieuChiTraCuu").addClass("col-md-offset-2")
            }else{
                $(".tieuchi_1").hide();// Phai hide truoc
                $("#divTieuChiTraCuu").removeClass("col-md-offset-2")
                $(".tieuchi_2").show();
                $("#divTieuChiTraCuu").addClass("col-md-offset-1")
            }

        });
    };
    let loadLyTrinhTheoTuyenDuong = function(){
        $('#selTuyenDuong').on('change',function(){
            if(parseInt($(this).val()) === -1){
                $('#selLyTrinh').html('');
                return;
            }
            let jsData = $(this).find('option:selected').prop('jsData');
            let options="";

            for(let i = jsData.extendCol1; i<= jsData.extendCol2;i++ ){
                options += "<option value='" + i + "'>" + i + "</option>";
            }
            $('#selLyTrinh').html(options);
        });
    };
    let loadDmKhSctxTheoQueryCondition = function(){
        $('#btnTraCuu').on('click',function(){
            dmSctxTable.ajax.reload();
        });
    };
    let loadDetailDmKhSctx = function(){
        $('#dmSctxTable').find('tbody').on('click', 'tr', function () {
            if (!$(this).hasClass('selected')) {
                $('#dmSctxTable tr.selected').removeClass('selected');
                $(this).addClass('selected');
                clearDetailDmKhSctxTraCuu();
                let data = dmSctxTable.row(this).data();
                let idDmSctx = data.idDmSctx;
                $.ajax({
                    url:  GET_DETAIL_DMSCTX_TRACUU_URL
                    , data: {idDmSctx: idDmSctx}
                    , type: "POST"
                    , success: function (responce) {
                        //console.log(responce);
                        // Nếu có số liệu thì lấy theo số liệu
                        // Ngược lại lấy theo sự cố
                        if(responce!= "" && responce != null){
                            $("#tenDuong").val(responce.suCoVo.tenDuong);
                            $("#viTri").val(responce.suCoVo.viTri);
                            $("#tenHuyen").val(responce.suCoVo.tenHuyen);
                            $("#tenXa").val(responce.suCoVo.tenXa);
                            $("#khoiLuongDvt").val(responce.khoiLuongDvt);
                            $("#kinhPhiDuyet").val(utils.initCommaSeparateNumber(responce.kinhPhiDuyet));
                            $("#noiDungSuaChua").val(responce.noiDungSuaChua);
                            $("#keHoachThucHien").val(responce.sctxThucHienVO.keHoachThucHien);
                            $("#thoiGianThucHien").val(responce.sctxThucHienVO.thoiGianThucHien);
                            $("#ghiChuKh").val(responce.sctxThucHienVO.ghiChuTh);
                            $("#ngayKiemTra").val(responce.sctxThucHienVO.ngayKiemTra);
                            $("#thucHien").val(responce.sctxThucHienVO.ketQua);
                            $("#danhGia").val(responce.sctxThucHienVO.danhGia);
                        }
                    }
                });
            }
        });
    };
    let dmSctxTableFactory = {
        initTable:function () {
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
                    "sWidth": "10%",
                    "targets": 1,
                    "mData": "suCoVo.tenDuong",
                    class: "text-center"
                }, {
                    "sWidth": "10%",
                    "targets": 2,
                    class: "text-center",
                    "mData": "suCoVo.viTri"
                }, {
                    "sWidth": "30%",
                    "targets": 3,
                    "mData": "noiDungSuaChua",
                    class: "text-left"
                },  {
                    "sWidth": "10%",
                    "targets": 4,
                    class: "text-center",
                    "mData": "sctxThucHienVO.keHoachThucHien"
                },  {
                    "sWidth": "10%",
                    "targets": 5,
                    class: "text-center",
                    "mData": "sctxThucHienVO.thoiGianThucHien"
                },  {
                    "sWidth": "10%",
                    "targets": 6,
                    class: "text-center",
                    "render": function (data, type, row) {
                        let returnVal="";
                        if (row.sctxThucHienVO.ngayKiemTra !== null && row.sctxThucHienVO.ngayKiemTra !== "") {
                            returnVal = row.sctxThucHienVO.ngayKiemTra;
                        }
                        return returnVal;
                    }
                }, {
                    "sWidth": "10%",
                    "targets": 7,
                    class: "text-center",
                    "mData": "sctxThucHienVO.ketQua"
                }
            ];
            let opts = {
                'deferLoading': null
                ,'order': [[1, 'desc']]
            };
            return datatableFactory.initAjaxDataSourceDataTable('dmSctxTable', colDefs, GET_DMSCTX_TRACUU_URL, function (settings) {
                let obj = {
                    "optional": {
                        "thuocQuy": $('#selQuy').val(),
                        "nam": $('#selNam').val(),
                        "groupId":$('#selGroup').val(),
                        "tieuChi": $('#selTieuChi').val() ,
                        "idTuyenDuong": $('#selTuyenDuong').val(),
                        "tuNam": $('#tuNam').val()
                    }
                };
                return JSON.stringify(Object.assign(obj, settings));
            }, opts, 1, 1);
        }
    };
    let exportDmKhSctxTraCuuToExcel = function(){
        $('#btnExportDmSctxTableToExcel').on('click', function(){
            let thuocQuy = $('#selQuy').val();
            let nam = $('#selNam').val();
            let groupId =$('#selGroup').val();
            let groupName = $('#selGroup').find('option:selected').text().trim();
            let tieuChi = $('#selTieuChi').val();
            let idTuyenDuong = $('#selTuyenDuong').val();
            let tuNam = $('#tuNam').val();
            let param = $.param({
                thuocQuy:thuocQuy,
                nam:nam,
                groupId:groupId,
                groupName:groupName,
                tieuChi:tieuChi,
                idTuyenDuong:idTuyenDuong,
                tuNam:tuNam
            });
            //"?thuocQuy="+thuocQuy+"&nam="+nam+"&groupId="+groupId+"&groupName="+groupName
            window.open(EXPORT_DMSCTX_TRACUU_TO_EXCEL +'?'+param );
        });
    };
    let clearDetailDmKhSctxTraCuu = function(){
        $('#detailDmSctxTable').find('input').val('');
    };
    let setSelectValByDate = function(ngay){
        let momentTmp = moment(ngay, "dd/MM/yyyy");
        let quyTmp = momentTmp.quarter();
        let namTmp = momentTmp.year();
        $('#selQuy').val(quyTmp);
        $('#selNam').val(namTmp );
    };*/
    let generateDemoTableFactory  = function(tableId,columnSetup, datas){
        $(tableId).DataTable( {
            data: datas,
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": true,
            "bInfo": false,
            "searching": false,
            columns: columnSetup
        } );
    }
    let getYears = function (fromYear, toYear) {
        let options = "";
        for (let year = toYear; year >= fromYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $('#selNamDsCtsc').html(options);
        $('#selNamDmScdk').html(options);
    };
    return {
        init: function () {
            return setup();
        },
    }
})();
