formManager = (function() {
	let tableDuyetSCTX;
	$(document).ready(function () {
		formManager.init();
	});
	let setup = function() {
        iniYear();
        init3Month();
		let ngayHienTai = new Date();
		setSelectValByDate(ngayHienTai);
	    utils.initHatQuanLyFormBC();
		tableDuyetSCTX = initTableDuyetSCTX();
		utils.initIChecks('i-checks');
		datatableFactory.checkCheckBox('checkAll', 'isChecked');
		datatableFactory.checkBoxOnSelect('checkAll', 'isChecked');
		utils.initNotifyMessageBox();
        btnTim();
		$('#quy,#nam,#hatQuanLy').on('change', function(){
            btnTim();
		});
		$('#btnSave').on('click', btnSave);
		$('#btnExcell').on('click', btnExcell);
		$('#btnDel').on('click', btnDel);
		utils.initIChecks('i-checksTD');
		utils.initNotifyMessageBox();
		utils.initDecimal(".decimalNumber", 3, 0);
		$('.decimalNumber').trigger('blur');
		/*$.when(
		eventUtils.getAllCategory("dmdonviql")).done(function(data1) {
			eventUtils.selOption("donViQuanLy", "id", "name", data1);
			iniYear();
			init3Month();
		});*/
	};
	let initTableDuyetSCTX = function(){
		let colDefs = [
			{
				"sWidth": "5%",
				"targets": 0,
				"className": "text-center",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					return '<input type="checkbox" class="i-checks isChecked" id="checkDSCTX"/>';
				}
			},
			{"targets": 1, class: "text-center", "orderable": false, "sWidth": "8%"},
			{"targets": 2, class: "text-center", "orderable": false, "sWidth": "6%"},
			{"targets": 3, class: "text-center", "orderable": false, "sWidth": "16%"},
			{"targets": 4, class: "text-center", "orderable": false, "sWidth": "6%"},
			{"targets": 5, class: "text-center", "orderable": false, "sWidth": "6%"},
			{"targets": 6, class: "text-center", "orderable": false, "sWidth": "6%"},
			{"targets": 7, class: "text-center", "orderable": false, "sWidth": "6%"},
			{"targets": 8, class: "text-center", "orderable": false, "sWidth": "6%"},
			{"targets": 9, class: "text-center", "orderable": false, "sWidth": "6%"},
			{"targets": 10, class: "text-center", "orderable": false, "sWidth": "6%"},
			{"targets": 11, class: "text-center", "orderable": false, "sWidth": "15%"},
			{"targets": 12, class: "text-center", "orderable": false, "sWidth": "8%"}
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
            "scrollX" : true
		};
		return datatableFactory.initDataSourceDataTableNonLoad('tableDuyetSCTX', colDefs, opts, 1);
	};
	let iniYear = function() {
		/*let year = $('#year').val();
		year = parseInt(year) + 1;
		let option = "";
		for (let i = year; i > 1990; i--) {
			option += "<option value=" + i + ">" + i + "</option>"
		}*/
        let date = new Date();
        let year = date.getFullYear();
        let options = '<option value="-1"></option>';
        for (let i = year; i >= 2019; i--) {
            options += '<option value="' + i + '">' + i + '</option>'
        }
		$('#nam').append(options);
	};
	let init3Month = function() {
		let month = $('#month').val();
		let year = $('#year').val();
		month = parseInt(month);
		year = parseInt(year);
		let threeMonth = 1;
		if (month < 4)
			threeMonth = 2;
		else if (3 < month < 7)
			threeMonth = 3;
		else if (6 < month < 10)
			threeMonth = 5;
		else {
			threeMonth = 1;
			year += 1;
		}
		/*$('#quy').val(threeMonth);*/
		$('#nam').val(year);
	};
	let setSelectValByDate = function(ngay){
		let momentTmp = moment(ngay, "dd/MM/yyyy");
		moment().quarter();
		let quyTmp = momentTmp.quarter();
		$('#quy').val(quyTmp);
	};
	let btnTim = function () {
        let quy = parseInt($('#quy').val());
        let nam = parseInt($('#nam').val());
        let idGroup = parseInt($('#group_Id').val());
        if (idGroup === 1)
            idGroup = -1;
        $.ajax({
            url: url + '/worklife/user/comfirmcategoryupdate/getlist.do',
            method: 'POST',
            data: {quy: quy, nam: nam, idGroup: idGroup},
            success: function (data) {
                if (data !== null){
                    tableDuyetSCTX.clear().draw();
                    for (let i = 0; i < data.danhMucSCTXVOS.length; i++) {
                    	let congThucDuyet = data.danhMucSCTXVOS[i].congThucDuyet;
                    	let klDuyet_CT = data.danhMucSCTXVOS[i].klDuyet_CT;
                    	let klDuyet_Tong = data.danhMucSCTXVOS[i].klDuyet_Tong;
                    	if (congThucDuyet === undefined || congThucDuyet === null || congThucDuyet === '')
                    		congThucDuyet = data.danhMucSCTXVOS[i].congThucLap;
						if (klDuyet_CT === undefined || klDuyet_CT === null || klDuyet_CT === '0.0')
							klDuyet_CT = data.danhMucSCTXVOS[i].klLap_CT;
						if (klDuyet_Tong === undefined || klDuyet_Tong === null || klDuyet_Tong === '0.0')
							klDuyet_Tong = data.danhMucSCTXVOS[i].klLap_Tong;
						if (klDuyet_CT.split('.')[1] === '0')
							klDuyet_CT = klDuyet_CT.split('.')[0];
						if (klDuyet_Tong.split('.')[1] === '0')
							klDuyet_Tong = klDuyet_Tong.split('.')[0];
						let klLap_CT = data.danhMucSCTXVOS[i].klLap_CT;
						if (klLap_CT.split('.')[1] === '0')
							klLap_CT = klLap_CT.split('.')[0];
						let klLap_Tong = data.danhMucSCTXVOS[i].klLap_Tong;
						if (klLap_Tong.split('.')[1] === '0')
							klLap_Tong = klLap_Tong.split('.')[0];
                        let rowHtml = [
                            '<input type="checkbox" class="i-checks isChecked" id="checkSCTX"/>',
                            createSel('danhMucSCTXVOS[' + i + '].idTuyenDuong', data.danhMucSCTXVOS[i].idTuyenDuong),
                            '<input type="text" name="danhMucSCTXVOS[' + i + '].lyTrinh" value="' + data.danhMucSCTXVOS[i].lyTrinh + '" disabled/>',
                            '<textarea rows="2" class="form-control" name="danhMucSCTXVOS[' + i + '].noiDungSuaChua" style="width: 100%">' + data.danhMucSCTXVOS[i].noiDungSuaChua + '</textarea>'
                            + '<input type="hidden" name="danhMucSCTXVOS[' + i + '].idDmSctx" value="' + data.danhMucSCTXVOS[i].idDmSctx + '"/>'
                            + '<input type="hidden" name="danhMucSCTXVOS[' + i + '].idSuCo" value="' + data.danhMucSCTXVOS[i].idSuCo + '"/>',
							createSelDVT('danhMucSCTXVOS[' + i + '].iddvt', data.danhMucSCTXVOS[i].iddvt),
                            '<input type="text" class="form-control" name="danhMucSCTXVOS[' + i + '].congThucLap" value="' + data.danhMucSCTXVOS[i].congThucLap + '" style="width: 100%" disabled/>',
                            '<input type="text" class="form-control" name="danhMucSCTXVOS[' + i + '].klLap_CT" value="' + (klLap_CT === '0' ? '' : utils.initCommaSeparateNumber(klLap_CT)) + '" style="width: 100%" disabled/>',
                            '<input type="text" class="form-control" name="danhMucSCTXVOS[' + i + '].klLap_Tong" value="' + (klLap_Tong === '0' ? '' : klLap_Tong) + '" style="width: 100%" disabled/>',
                            '<input type="text" class="form-control" name="danhMucSCTXVOS[' + i + '].congThucDuyet" value="' + congThucDuyet + '" onchange="formManager.congthucDuyet(this,' + i + ')" style="width: 100%"/>',
                            '<input type="text" class="form-control" name="danhMucSCTXVOS[' + i + '].klDuyet_CT" value="' + (klDuyet_CT === '0' ? '' : utils.initCommaSeparateNumber(klDuyet_CT)) + '" style="width: 100%" disabled/>',
                            '<input type="text" class="form-control" name="danhMucSCTXVOS[' + i + '].klDuyet_Tong" value="' + (klDuyet_Tong === '0' ? '' : utils.initCommaSeparateNumber(klDuyet_Tong)) + '" style="width: 100%"/>',
                            '<input type="text" class="form-control decimalNumber" name="danhMucSCTXVOS[' + i + '].kinhPhi" value="' + utils.initCommaSeparateNumber((data.danhMucSCTXVOS[i].kinhPhi).split('.')[0]) + '" style="width: 100%"/>',
                            '<textarea rows="2" class="form-control" style="width: 100%">' + data.danhMucSCTXVOS[i].huHong + '</textarea>',
                            data.danhMucSCTXVOS[i].ngay
                        ];
                        tableDuyetSCTX.row.add(rowHtml).draw();
                        tableDuyetSCTX.draw(false);
                        tableDuyetSCTX.page('first').draw('page');
                    }
                    tableDuyetSCTX.page.len(10).draw();
                    utils.initIChecks('i-checks');
                    datatableFactory.checkCheckBox('checkAll', 'isChecked');
                    datatableFactory.checkBoxOnSelect('checkAll', 'isChecked');
					utils.initDecimal(".decimalNumber", 3, 0);
					$('.decimalNumber').trigger('blur');
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
	let createSelDVT = function (selName, iddvt) {
		let selHtml = '<select class="form-control" name="' + selName + '" style="width:100%;" disabled>';
		selHtml += '<option value="-1"></option>';
		listIdDVT.forEach(function (item, index) {
			selHtml += '<option ' + (iddvt == item.iddvt ? 'selected' : '') + ' value="' + item.iddvt + '">' + item.ten + '</option>';
		});
		selHtml += '</select>';
		return selHtml;
	};
	let btnSave = function () {
		let form = $("#formDuyetSCTX");
		let quy = $('#quy').val();
		let nam = $('#nam').val();
		if (quy === '-1' && nam === '-1') {
			swal({
				title: "Thông báo",
				text: "Vui lòng chọn quý và năm để lưu",
				type: "warning",
				confirmButtonText: "Đồng ý"
			});
		} else {
			if (tableDuyetSCTX.data().count() !== 0) {
				tableDuyetSCTX.page.len(tableDuyetSCTX.data().count()).draw();
			}
			let method = "POST";
			let modelAttribute = "danhMucSCTXVO";
			for (let i = 0; i < $('#tableDuyetSCTX tbody tr').length; i++) {
				$('input[name="danhMucSCTXVOS['+i+'].klDuyet_CT"]').attr('disabled', false);
			}
			form.attr("method", method);
			form.attr("action", url + "/worklife/user/comfirmcategoryupdate/saveForm.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
			form.attr("modelAttribute", modelAttribute);
			form.attr("enctype", "multipart/form-data");
			form.submit();
		}
	};
	let btnExcell = function () {
		let quy = $('#quy').val();
		let nam = $('#nam').val();
		let idGroup = $('#hatQuanLy').val();
		window.location = url + '/worklife/user/comfirmcategoryupdate/reportExcel.do?quy=' + quy + '&nam=' + nam + '&idGroup=' + idGroup;
	};
	let btnDel = function () {
		datatableFactory.removeRowByHoan("idDmSctx", tableDuyetSCTX, rootPath + "/worklife/user/suachuathuongxuyen/deleteSCTX.do", "checkAll", refeshTable);
	};
	let refeshTable = function () {
		datatableFactory.refreshPagination("tableDuyetSCTX");
		datatableFactory.resetIndex(tableDuyetSCTX, "danhMucSCTXVOS");
	};
	return {
		init : function() {
			return setup();
		},
		congthucDuyet: function (element, index) {
			let $this = $(element);
			let result = 0;
			eval('result=' + $this.val() + ';');
			$('input[name="danhMucSCTXVOS[' + index + '].klDuyet_CT"]').val(result);
			$('input[name="danhMucSCTXVOS[' + index + '].klDuyet_Tong"]').val(result);
		}
	}
})();
