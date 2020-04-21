$(document).ready(function() {
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeSystemManager').addClass('active');
	
	dataTable.initDataTable('tableRoleUserList', url + 'worklife/manager/roleuser/getListRoleUser.do');
	dataTable.initPageHolder('tableRoleUserList', 'pageNumber');
	
	//MULTI LEVEL DROPDOWNLIST
	$('#listGroup').menu({
		content: $('#listGroup').next().html(),
		flyOut: true,
		functionChooseItem: function(item) {
			$('#lblGroupName').text($(item).text());
			$('#groupName').text($(item).text());
			$('#groupId').val(item.id);
			$('#tableRoleUserList').DataTable().ajax.reload();
		}
	});
	
	$('#btnNew').click(function() {
		var groupId = $('#groupId').val();
		if (groupId == '' || Number(groupId) <= 0) {
			 swal({
			       title: "Lỗi xử lý",
			       text: "Chưa chọn nhóm người dùng",
			       type: "error"
			 });
		} else {
			$('#roleGroupManager').submit();
		}
	});
	
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
		            'targets':   [0, 1, 2, 3, 4]
		        }],
		        'processing': true,
		        'serverSide': true,
		        'ajax': {
		            'contentType': 'application/json; charset=utf-8',
		            'url': urlJson,
		            'data': function(d) {
		            	try{
		            		d.groupId = $('#groupId').val();
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
				                		case 1: columnName = "username"; break;
				                	}
				                	if (columnName != "") {
					            		d.column = columnName;
					                	d.sortType = setting[0][1];
				                	}
			                	} else {
				                	switch(setting[0]) {
				                		case 1: columnName = "username"; break;
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
			                	
			            	} else {
			            		//Sorting
			                	d.column = "username";
			                	d.sortType = "asc";
				                d.recordPerPage = 10;
			            	}
		            	} catch(e) {}
		            	
		                d.pageNumber = $('#pageNumber').val();
		    		},
		            'dataSrc': function(json) {
		    			if (json != undefined && json != null && json.data != undefined && json.data != null) {
		    				for (var i = 0, ien = json.data.length; i < ien; i++) {
		    					json.data[i][3] = '<a target="_blank" href="' + url + 'worklife/manager/user/modify/modifyUser.do?userId=' + json.data[i][1] + '" >' + json.data[i][3] + '</a>';
		    					json.data[i][6] = '<a href="' + url + 'worklife/manager/roleuser/newRoleUser.do?userId=' + json.data[i][1] + '&groupId=' + json.data[i][0] + '" class="btn btn-white btn-sm">Chỉnh sửa</a>';
		    					json.data[i].splice(0, 1);
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