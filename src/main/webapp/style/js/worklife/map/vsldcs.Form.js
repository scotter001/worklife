formManager = (function () {
    const URL_GET_BY_GEOID = '/user/yteduphong/vesinhlaodong/getbygeoid.do';
    const URL_GET_BY_ID = '/user/occupational/health/update/get-lasted.do';
    const URL_GET_TABLE_DATA='/user/yteduphong/json/vesinhlaodongmap.do';
    /******************************variables*******************************/
    let mapOptions = undefined;
    let dataTable = undefined;
    let selectedObjectInfo = undefined;
    let selDistrict = $('#selDistrict');
    let initMapOptions = function () {
        mapOptions = mapManager.createMapOptions();
        mapOptions.currentForm= mapConfig.YTE.VeSinhCoSoLaoDong;
        mapOptions.layerCreated = mapRuntimeOptions.layerCreated;
        mapOptions.layerStyling =  mapConfig.MapDefault.layerStyling;
    };
    let inSetup = function () {
        $('#btnSearch').on('click', onSearch);
        jqUtils.districtSelectReady(selDistrict);
        dataTable = inSetupTable();
        onSearch('#btnSearch');
        selDistrict.on('change', onChangeDistrict);
        $('#tblSearchResult').find('tbody').on('click', 'tr', onClickRowTable);
        initMapOptions();
    };
    let onChangeDistrict = function () {
        dataTable.ajax.reload();
        if($(this).val() ==='-1') {
            mapManager.clear();
            return;
        }
        let item = $(this).find('option:selected').prop('jsData');
        mapOptions.district = selDistrict.val();
        mapOptions.baseLayers = item.baseLayers;
        mapOptions.specializedLayers = item.specializedLayers;
        mapManager.loadMap(mapOptions);
    };
    let inSetupTable = function () {
        let colDefs = [
        	{
				"sWidth" : "10%",
				"targets" : 0,
				"searchable": false,
	            "orderable": false,
	            class : "text-center",
	            "data" : "idYTeDoanhNghiep",
	            render: function (data, type, row, meta) {
	                return meta.row + meta.settings._iDisplayStart + 1;
	            }
			},
			{
				"sWidth" : "40%",
				"targets" : 1,
				"data" : "tenCoSo"
			},
			{
				"sWidth" : "50%",
				"targets" : 2,
				"data": function (data, type, dataToSet) {
                    return jqUtils.createAddress(data);
                }
			},
        ];
        return jqUtils.initAjaxDataSourceDataTable('tblSearchResult', colDefs, jqUtils.getFullUrlPath(URL_GET_TABLE_DATA), function (settings) {
            let obj = {
                "maHuyen": $("#selDistrict").val(),
            };
            return Object.assign(settings, obj);
        });
    };

    /** **********************Event************************** */

    //on click search
    let onSearch = function (evt) {
        dataTable.ajax.reload();
    };
    let onClickRowTable = function () {
        let occupationalHygiene = $('#tblSearchResult').DataTable().row($(this)).data();
        let idYTeDoanhNghiep = occupationalHygiene.idYTeDoanhNghiep;
        formManager.fillInfoById(idYTeDoanhNghiep);
    };
    let inFillInfo = function (obj,notZoomTo) {
        selectedObjectInfo = obj;
        if (obj) {
            selectedObjectInfo = obj;

        	$('#tenCoSo').text(obj.tenCoSo);
        	$('#diaChi').text(jqUtils.createFullAddress(obj.soNha,obj.tenDuong,obj.loaiXa,obj.tenXa,obj.loaiHuyen,obj.tenHuyen));
        	$('#dienThoai').text(obj.dienThoai);
			$('#nganhNgheKinhDoanhChinh').text(obj.loaiNganhNgheChinh);
			$('#nguoiPhuTrach').text(obj.nguoiPhuTrach);
			$('#diDong').text(obj.diDong);
			if(obj.update !== null){
			    if(obj.update.labor !== null){
                    $('#tongSoLaoDong').text(obj.update.labor.tongSoLaoDong);
                    $('#tongSoLaoDongTrucTiep').text(obj.update.labor.tongSoLaoDongTrucTiep);
                    $('#soTiepXucNguyHai').text(obj.update.labor.soTiepXucNguyHai);
                    $('#tongSoLamViecNguyHiem').text(obj.update.labor.tongSoNguyHiemDocHai);
                    $('#xayDungKeHoach').text(obj.update.labor.keHoach === 1 ? "Có" : "Không");
                }
            }
            jqUtils.activeTab(0);
            jqUtils.switchGeoMode(selectedObjectInfo);
            if (!(notZoomTo === true))
                mapManager.zoomTo(formManager.getSelectedObjectInfo().geoId);
        }
    };
    /******************************return******************************/
    return {
        init: function () {
            return inSetup();
        },
        fillInfoByGeometry: function (geom, notZoomTo) {
            let url = jqUtils.getFullUrlPath(URL_GET_BY_GEOID);
            return $.ajax({
                url: url,
                type: 'POST',
                data: {
                    'id': geom.attributes['OBJECTID']
                },
                success: function (obj) {
                    inFillInfo(obj, notZoomTo);
                }
            });
        },
        fillInfoById: function (id) {
            return $.ajax({
                type: "POST",
                data: {"id": id},
                url: jqUtils.getFullUrlPath(URL_GET_BY_ID),
                success: function (data) {
                    inFillInfo(data);
                }
            })
        },
        getSelectedObjectId: function () {
            return selectedObjectInfo['idYTeDoanhNghiep'];
        },
        getSelectedObjectInfo: function () {
            return selectedObjectInfo;
        },
        openForm:function () {
            if(jqUtils.isNull(selectedObjectInfo))
                return;
            let url = jqUtils.getFullUrlPath('/user/occupational/health/display.do')+ '?id='+this.getSelectedObjectId();
            window.open(url,InformationWndHandler);
        },
    };
})();