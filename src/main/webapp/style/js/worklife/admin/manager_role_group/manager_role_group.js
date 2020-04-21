var idrole = null;
$(document).ready(function() {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
	 xhr.setRequestHeader(header, token);
	});
	
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeSystemManager').addClass('active');
	
	dataTable.initDataTable('tableRoleGroupList', url + 'worklife/manager/role/getListGroupRole.do');
	dataTable.initPageHolder('tableRoleGroupList', 'pageNumber');
	
	//MULTI LEVEL DROPDOWNLIST
	$('#listGroup').menu({
		content: $('#listGroup').next().html(),
		flyOut: true,
		functionChooseItem: function(item) {
			$('#lblGroupName').text($(item).text());
			$('#groupName').text($(item).text());
			$('#groupId').val(item.id);
			$('#tableRoleGroupList').DataTable().ajax.reload();
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
	
	/*$('#tableRoleGroupList_length').find('select[name=tableRoleGroupList_length]').change(function() {
		var table = $('#tableRoleGroupList').DataTable();
		table.page( 0 ).draw( false );
		 $('#pageNumber').val(0);
	});*/
	
	clickRowDataTable();
	//deleteRole();
	
	$('#deleterole').click(function() {
		//alert(idrole);
		if (idrole != undefined && idrole != null ) {
			$.ajax({
    			url : url + "worklife/manager/role/json/checkroleusing.do",
    			type : 'POST',
    			contextType : "aplication/json;charset=utf-8",
    			dataType : "json",
    			data : {
    				idrole 	:	idrole
    			},
    			success : function(jSon) {
    				var ok = jSon.ok;
    				var message = jSon.message;
    				
    				if (ok == true) {// Nếu vai trò đã được sử dụng
    					swal({
    	     		       	title: notify,
    	     		       	text:  message,
    	     		       	type: "error",						     		    	
    	     		       	confirmButtonText: accept
    					});
    				} else {// Vai trò chưa được sử dụng: Cho phép xóa
    					swal({
    			            title: notify,
    			            text: askdelete,
    			            type: "warning",
    			            confirmButtonText: accept,
    			            cancelButtonText: cancel,
    			            showCancelButton: true,
    			            closeOnConfirm: false
    			        },
    			        function(isConfirm) {
    			        	if (isConfirm) {
    			        		$.ajax({
    			        			url : url + "worklife/manager/role/json/deleteRole.do",
    			        			type : 'POST',
    			        			contextType : "aplication/json;charset=utf-8",
    			        			dataType : "json",
    			        			data : {
    			        				idrole 	:	idrole
    			        			},
    			        			success : function(jSon) {
    			        				var ok = jSon.ok;
    			        				var message = jSon.message;
    			        				
    			        				if (ok == true) {
    			        					//reload
    			        					$('#tableRoleGroupList').DataTable().ajax.reload();
    			        					swal({
    			        	     		       	title: notify,
    			        	     		       	text:  message,
    			        	     		       	type: "success",						     		    	
    			        	     		       	confirmButtonText: accept
    			        					});
    			        				} else {
    			        					swal({
    			        	    			 	title: notify,
    			        	    			 	text:  message,
    			        				 		type: "error",						     		    	
    			        				 		confirmButtonText: accept
    			        					});
    			        				}
    			        			},
    			        			error : function(jSon) {
    			        				swal({
    			        				 	title: notify,
    			        				 	text:  deletefalse,
    			        			 		type: "error",						     		    	
    			        			 		confirmButtonText: accept
    			        				});
    			        			}
    			        		});
    			        	}
    			        });
    				}
    			},
    			error : function(jSon) {
    				swal({
    				 	title: notify,
    				 	text:  deletefalse,
    			 		type: "error",						     		    	
    			 		confirmButtonText: accept
    				});
    			}
    		});
			
	} else {
		//thông báo
		swal({
		 	title: notify,
		 	text:  notchange,
	 		type: "warning",						     		    	
	 		confirmButtonText: accept
		});
	}
});
});

function clickRowDataTable() {
	$('#tableRoleGroupList tbody').on('click', 'tr', function () {
		var tableBlur = $('#tableRoleGroupList').DataTable();
		$('tr').css("background-color","white");
		$(this).css("background-color","#E0E0D6");
		var data = tableBlur.rows( this ).data();
		var indexA = data.selector.rows._DT_RowIndex;
		
		var listA = $('#tableRoleGroupList tbody tr td a');
		//var idrole = 0;
		$.each(listA, function(index, value2) {
			if (indexA == index) {
				idrole = $(value2).attr('href').split("=")[2];
				//deleteRole(idrole);
				return false;
			}
		});
	});
}

/*function deleteRole(idrole) {
		$('#deleterole').click(function() {
			//alert(idrole);
			if (idrole != undefined && idrole != null) {
				$.ajax({
        			url : url + "worklife/manager/role/json/checkroleusing.do",
        			type : 'POST',
        			contextType : "aplication/json;charset=utf-8",
        			dataType : "json",
        			data : {
        				idrole 	:	idrole
        			},
        			success : function(jSon) {
        				var ok = jSon.ok;
        				var message = jSon.message;
        				
        				if (ok == true) {// Nếu vai trò đã được sử dụng
        					swal({
        	     		       	title: notify,
        	     		       	text:  message,
        	     		       	type: "error",						     		    	
        	     		       	confirmButtonText: accept
        					});
        				} else {// Vai trò chưa được sử dụng: Cho phép xóa
        					swal({
        			            title: notify,
        			            text: askdelete,
        			            type: "warning",
        			            confirmButtonText: accept,
        			            cancelButtonText: cancel,
        			            showCancelButton: true,
        			            closeOnConfirm: false
        			        },
        			        function(isConfirm) {
        			        	if (isConfirm) {
        			        		$.ajax({
        			        			url : url + "worklife/manager/role/json/deleteRole.do",
        			        			type : 'POST',
        			        			contextType : "aplication/json;charset=utf-8",
        			        			dataType : "json",
        			        			data : {
        			        				idrole 	:	idrole
        			        			},
        			        			success : function(jSon) {
        			        				var ok = jSon.ok;
        			        				var message = jSon.message;
        			        				
        			        				if (ok == true) {
        			        					//reload
        			        					$('#tableRoleGroupList').DataTable().ajax.reload();
        			        					swal({
        			        	     		       	title: notify,
        			        	     		       	text:  message,
        			        	     		       	type: "success",						     		    	
        			        	     		       	confirmButtonText: accept
        			        					});
        			        				} else {
        			        					swal({
        			        	    			 	title: notify,
        			        	    			 	text:  message,
        			        				 		type: "error",						     		    	
        			        				 		confirmButtonText: accept
        			        					});
        			        				}
        			        			},
        			        			error : function(jSon) {
        			        				swal({
        			        				 	title: notify,
        			        				 	text:  deletefalse,
        			        			 		type: "error",						     		    	
        			        			 		confirmButtonText: accept
        			        				});
        			        			}
        			        		});
        			        	}
        			        });
        				}
        			},
        			error : function(jSon) {
        				swal({
        				 	title: notify,
        				 	text:  deletefalse,
        			 		type: "error",						     		    	
        			 		confirmButtonText: accept
        				});
        			}
        		});
				
		} else {
			//thông báo
			swal({
			 	title: notify,
			 	text:  notchange,
		 		type: "error",						     		    	
		 		confirmButtonText: accept
			});
		}
	});
}*/

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
				'order': [ 2, 'asc' ],
				'columnDefs': [ {
		            'orderable': false,
		            'targets':   [0, 3, 4]
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
				                		case 1: columnName = "role_code"; break;
				                		case 2: columnName = "role_name"; break;
				                	}
				                	if (columnName != "") {
					            		d.column = columnName;
					                	d.sortType = setting[0][1];
				                	}
			                	} else {
				                	switch(setting[0]) {
				                		case 1: columnName = "role_code"; break;
				                		case 2: columnName = "role_name"; break;
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
			                	d.column = "role_name";
			                	d.sortType = "asc";
				                d.recordPerPage = 10;
			            	}
		            	} catch(e) {}
		            	
		    		},
		            'dataSrc': function(json) {
		    			if (json != undefined && json != null && json.data != undefined && json.data != null) {
		    				for (var i = 0, ien = json.data.length; i < ien; i++) {
		    					json.data[i][3] = '<a href="' + url + 'worklife/manager/role/modify/modifyRole.do?groupId=' + json.data[i][0] + '&roleId=' + json.data[i][1] + '" >' + json.data[i][3] + '</a>';
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
					"paginate": {
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