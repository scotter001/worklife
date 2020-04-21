formManager = (function () {
    let dmSctxTable = undefined;
    let GET_DMSCTX_TRACUU_URL = utils.getSafePath('/worklife/user/suachuathuongxuyen/getdmsctxtracuu.do');
    let GET_DETAIL_DMSCTX_TRACUU_URL = utils.getSafePath('/worklife/user/suachuathuongxuyen/getdetaildmsctxtracuu.do');
    let EXPORT_DMSCTX_TRACUU_TO_EXCEL = utils.getSafePath('/worklife/user/suachuathuongxuyen/exportdmsctxtracuutoexcel.do');
    let setup = function () {
        init();
        showQueryConditionByTieuChi();
        loadLyTrinhTheoTuyenDuong();
        $('#selTieuChi').trigger('change');
        loadDmKhSctxTheoQueryCondition();
        loadDetailDmKhSctx();
        exportDmKhSctxTraCuuToExcel();
        utils.initTuyenDuong();
        //validation();
    };
    let init=function(){
       //utils.loadDatePicker();
        let ngayHienTai = new Date() ;
        getYears(2019,ngayHienTai.getFullYear());
        setSelectValByDate(ngayHienTai);
        $.when(
            eventUtils.getAllCategory("tuyenduong")

        ).done(
            function (tenduong) {
                eventUtils.selOption("selTuyenDuong", "id", "name", tenduong);
            });
        dmSctxTable = dmSctxTableFactory.initTable();
        utils.initIntegerNumber();
        $('#detailDmSctxTable').find('input,textarea').not('input[type="checkbox"]').prop("disabled",true);
    };
    let showQueryConditionByTieuChi = function(){
        $('#selTieuChi').on('change',function(){
            let val=$(this).val();
            if(val==1){
                $(".tieuchi_2").hide();// Phai hide truoc
                $("#divTieuChiTraCuu").removeClass("col-md-offset-3");

                $("#divTieuChiTraCuu").addClass("col-md-offset-2");
                $(".tieuchi_1").show();
            }else{
                $(".tieuchi_1").hide();// Phai hide truoc
                $("#divTieuChiTraCuu").removeClass("col-md-offset-2");

                $("#divTieuChiTraCuu").addClass("col-md-offset-3");
                $(".tieuchi_2").show();

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
            if (dmSctxTable.rows().count()<=0 ) return false;
            if (!$(this).hasClass('selected')) {
                $('#dmSctxTable tr.selected').removeClass('selected');
                $(this).addClass('selected');
                clearDetailDmKhSctxTraCuu();
                let data = dmSctxTable.row(this).data();
                if (data != null){
                    $.each(data, function (key, value) {
                        $("#" + key).val(value);
                    });
                    if (data.thucHien === null || data.thucHien === '0') {
                        $('#chuaTH').iCheck('check');
                        $('#daTH').iCheck('uncheck');
                    }
                    else if (data.thucHien === '1') {
                        $('#chuaTH').iCheck('uncheck');
                        $('#daTH').iCheck('check');
                    }
                    else {
                        $('#chuaTH').iCheck('uncheck');
                        $('#daTH').iCheck('uncheck');
                    }
                    utils.initDecimal(".decimalNumber", 3, 0);
                    $('.decimalNumber').trigger('blur');
                }
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
                    "mData": "tenDuong",
                    "orderable": false,
                    class: "text-center"
                }, {
                    "sWidth": "10%",
                    "targets": 2,
                    class: "text-center",
                    "orderable": false,
                    "mData": "lyTrinh"
                }, {
                    "sWidth": "30%",
                    "targets": 3,
                    "mData": "noiDungSuaChua",
                    "orderable": false,
                    class: "text-left"
                },  {
                    "sWidth": "10%",
                    "targets": 4,
                    class: "text-center",
                    "orderable": false,
                    "mData": "klDuyet_Tong",
                    render: function (data, type, row, meta) {
                        return utils.initCommaSeparateNumber(row.klDuyet_Tong);
                    }
                },  {
                    "sWidth": "10%",
                    "targets": 5,
                    class: "text-center",
                    "orderable": false,
                    "mData": "thoiGian_TH"
                },  {
                    "sWidth": "10%",
                    "targets": 6,
                    "orderable": false,
                    class: "text-center",
                    "mData": "ngayKT"
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
                'deferLoading': null,
                /*'order': [[1, 'desc']]*/
            };
            return datatableFactory.initAjaxDataSourceDataTable('dmSctxTable', colDefs, GET_DMSCTX_TRACUU_URL, function (settings) {
                let obj = {
                    "optional": {
                        "thuocQuy": $('#selQuy').val(),
                        "groupId":$('#selGroup').val(),
                        "nam": $('#selNam').val(),
                        "tieuChi": $('#selTieuChi').val() ,
                        "idTuyenDuong": $('#idTuyenDuong').val(),
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
            let idTuyenDuong = $('#idTuyenDuong').val();
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
    };
    let getYears = function (fromYear, toYear) {
        let options = "";
        for (let year = toYear; year >= fromYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $('#selNam').html(options);
    };
    return {
        init: function () {
            return setup();
        },
    }
})();
