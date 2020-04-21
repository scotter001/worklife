$(document).ready(function() {
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeSystemManager').addClass('active');
	
	dataTable.initDataTable('tableGroupList', url + 'worklife/manager/permissiongroup/getListPermissionGroup.do');
	dataTable.initPageHolder('tableGroupList', 'pageNumber');
	
	if ($('#error').val() != '') {
		 swal({
		       title: "Lỗi xử lý",
		       text: $('#error').val(),
		       type: "error"
		 });
	} else if ($('#success').val() != '') {
		 swal({
		       title: "Thành công",
		       text: $('#success').val(),
		       type: "success"
		 });
	}
});

var dataTable = {
		initDataTable: function(tableName, urlJson) {
			var tableSetting = $('#' + tableName).dataTable({
				'responsive': true,
				'responsive': {
					'details': {
						'type': 'column',
						'target': 'tr'
					}
				},
				'order': [ 1, 'asc' ],
				'columnDefs': [ {
		            'orderable': false,
		            'targets':   0
		        }],
		        'processing': true,
		        'serverSide': true,
		        "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		        	var no =  $(nRow).children().first();
		        	if (no != undefined) {
		        		 $(no).addClass('text-center');
		        	} 
		        	return nRow;
		        },
		        "drawCallback": function(settings) {
		        	var total = $('#'+tableName+'_length').find('select[name='+tableName+'_length]').val();
		        	if ($('#' + tableName).DataTable().page.info().recordsTotal > total) {
		        		$('#'+tableName+'_paginate').show();
		        	} else {
		        		$('#'+tableName+'_paginate').hide();
		        	}
	            	//reset lại paging khi chang số dòng
		        	var table = $(tableName).DataTable();
	            	$('#'+tableName+'_length').find('select[name='+tableName+'_length]').change(function() {
	            		table.page( 0 ).draw( false );
	            		$('#pageNumber').val(tableSetting.api().page.info().page);
	            	});
	    		},
		        'ajax': {
		            'contentType': 'application/json; charset=utf-8',
		            'url': urlJson,
		            'data': function(d) {
		            	try {
			            	if (tableSetting != undefined) {
			            		//Sorting
			                	var setting = tableSetting.fnSettings().aaSorting;
			                	var displayLength = tableSetting.fnSettings()._iDisplayLength;
			                	var columnName = "";
			                	if (displayLength != undefined) {
			                		d.recordPerPage = displayLength;
			                	}
			                	if (setting[0][0] != undefined) {
				                	switch(setting[0][0]) {
				                		case 1: columnName = "group_name"; break;
				                		case 2: columnName = "list_name_of_parent"; break;
				                		case 3: columnName = "list_permission_of_group"; break;
				                	}
				                	if (columnName != "") {
					            		d.column = columnName;
					                	d.sortType = setting[0][1];
				                	}
			                	} else{
				                	switch(setting[0]) {
				                		case 1: columnName = "group_name"; break;
				                		case 2: columnName = "list_name_of_parent"; break;
				                		case 3: columnName = "list_permission_of_group"; break;
				                	}
				                	if (columnName != "") {
					            		d.column = columnName;
					                	d.sortType = setting[1];
				                	}
			                	}
			                	//Filtered
			                	try {
				                	var search = tableSetting.fnSettings().oPreviousSearch;
				                	if (search != undefined) {
				                		d.search = encodeURIComponent(search.sSearch);
			                		}
			                	} catch(e) {}
			                	
			                	d.pageNumber = tableSetting.api().page.info().page;
			            	} else {
			            		//Sorting
			                	d.column = "group_name";
			                	d.sortType = "asc";
				                d.recordPerPage = 10;
			            	}
		            	} catch(e) {}
		            	
		    		},
		            'dataSrc': function(json) {
		    			if (json != undefined && json != null && json.data != undefined && json.data != null) {
		    				for ( var i = 0, ien = json.data.length; i < ien; i++) {
		    					json.data[i][2] = '<a href="' + url + 'worklife/manager/permissiongroup/modify/modifyPermissionGroup.do?groupId=' + json.data[i][0] + '" >' + json.data[i][2] + '</a>';
		    					json.data[i].splice(0, 1);
		    				}
		    				return json.data;
		    			}
		    		}
		        },
				'language': {
					'lengthMenu': lengthmenu,
					'search': search,
					'sInfo': info,
					'sInfoEmpty': infoempty,
					'zeroRecords': zerorecord,
					'sInfoFiltered': infofiltered,
					'paginate': {
		    	          "sFirst": '',
		    	          "previous":		next,
		    	          "sNext":			prev,
		    	          "sLast": ''
		    	    },
				}
			});
		},
		
		initPageHolder: function(tableName, pageNumberNm) {
			var table = $('#' + tableName).DataTable();
			
			$('#' + tableName).on('page.dt', function() {
			    var info = table.page.info();
			    $('#' + pageNumberNm).val(info.page);
			});
		}
};