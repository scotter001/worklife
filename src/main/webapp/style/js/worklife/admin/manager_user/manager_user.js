$(document).ready(function() {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
	 xhr.setRequestHeader(header, token);
	});
	
	$('.i-checks').iCheck({
        checkboxClass : 'icheckbox_square-green',
        radioClass : 'iradio_square-green',
    });
	
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeSystemManager').addClass('active');
	dataTable.initDataTable('tableUserList', url + 'worklife/manager/user/getListUser.do');
	dataTable.initPageHolder('tableUserList', 'pageNumber');
	
	if ($('#error').val() != '') {
		 swal({
		       title: "Error",
		       text: $('#error').val(),
		       type: "error"
		 });
	} else if ($('#success').val() != '') {
		 swal({
		       title: "Success",
		       text: $('#success').val(),
		       type: "success"
		 });
	}
	clickRowDataTable();
	deleteUser();
});

function createAdmin(){
    document.userManager.action= url + '/worklife/manager/adminUser/create/createAdminUser.do';
    document.userManager.submit();
}
function clickRowDataTable() {
	$('#tableUserList tbody').on('click', 'tr', function () {
		var tableBlur = $('#tableUserList').DataTable();
		$('tr').css("background-color","white");
		$(this).css("background-color","#E0E0D6");
		var data = tableBlur.rows( this ).data();
		var indexA = data.selector.rows._DT_RowIndex;
		
		var listA = $('#tableUserList tbody tr td a');
		var idUser = 0;
		$.each(listA, function(index, value2) {
			if (indexA == index) {
				idUser = $(value2).attr('href').split("=")[1];
				deleteUser(idUser);
				return false;
			}
		});
	});
}

function deleteUser(idUser) {
		$('#deleteuser').click(function() {
			if (idUser != undefined && idUser != null) {
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
		        			url : url + "worklife/manager/user/json/deleteUser.do",
		        			type : 'POST',
		        			contextType : "aplication/json;charset=utf-8",
		        			dataType : "json",
		        			data : {
		        				idUser 	:	idUser
		        			},
		        			success : function(jSon) {
		        				var ok = jSon.ok;
		        				var message = jSon.message;
		        				
		        				if (ok == true) {
		        					//reload
		        					$('#tableUserList').DataTable().ajax.reload();
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
		} else {
			//thông báo
			swal({
			 	title: notify,
			 	text:  nochangeuser,
		 		type: "error",						     		    	
		 		confirmButtonText: accept
			});
		}
	});
}

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
		        },{
		            'orderable': false,
		            'targets':   3
		        },{
		            'orderable': false,
                    'targets':   4
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
	            	
	            	//Draw i-checks again
	            	$('.i-checks').iCheck({
	                    checkboxClass : 'icheckbox_square-green',
	                    radioClass : 'iradio_square-green',
	                });
	            	
	            	$.each($( "[type=checkbox]" ), function(index, element){
	            	   var parent = $(element).parent().parent(); 
	            	   $(parent).addClass("text-center");
	            	});
	    		},
		        'ajax': {
		            'contentType': 'application/json; charset=utf-8',
		            'url': urlJson,
		            'data': function(d) {
		            	try{
			            	if(tableSetting != undefined) {
			            		//Sorting
			                	var setting = tableSetting.fnSettings().aaSorting;
			                	var displayLength = tableSetting.fnSettings()._iDisplayLength;
			                	var columnName = "";
			                	
			                	if(displayLength != undefined) {
			                		d.recordPerPage = displayLength;
			                	}
			                	
			                	if(setting[0][0] != undefined) {
				                	switch(setting[0][0]) {
				                		case 1: columnName = "username"; break;
				                		case 2: columnName = "email"; break;
				                		case 3: columnName = "group_name"; break;
				                	}
				                	if(columnName != "") {
					            		d.column = columnName;
					                	d.sortType = setting[0][1];
				                	}
			                	}else{
				                	switch(setting[0]) {
					                	case 1: columnName = "username"; break;
				                		case 2: columnName = "email"; break;
				                		case 3: columnName = "group_name"; break;
				                	}
				                	if(columnName != "") {
					            		d.column = columnName;
					                	d.sortType = setting[1];
				                	}
			                	}
			                	
			                	//Filtered
			                	try{
				                	var search = tableSetting.fnSettings().oPreviousSearch;
				                	if(search != undefined) {
				                		d.search = encodeURIComponent(search.sSearch);
			                		}
			                	}catch(e) {}
			                	
			                	d.pageNumber = tableSetting.api().page.info().page;
			            	} else {
			            		//Sorting
			                	d.column = "username";
			                	d.sortType = "asc";
				                d.recordPerPage = 10;
			            	}
		            	}catch(e) {}
		            	
		    		},
		            'dataSrc': function(json) {
		    			if (json != undefined && json != null && json.data != undefined && json.data != null) {
		    				for ( var i = 0, ien = json.data.length; i < ien; i++) {
		    					json.data[i][2] = '<a href="' + url + 'worklife/manager/user/modify/modifyUser.do?userId=' + json.data[i][0] + '" >' + json.data[i][2] + '</a>';
		    					if(json.data[i][5] == 1)
		    					    json.data[i][5] = '<input type="checkbox" disabled="" checked="" class="i-checks" style="position: absolute; opacity: 0;" >';
	    					    else json.data[i][5] = '<input type="checkbox" disabled="" class="i-checks" style="position: absolute; opacity: 0;" >';
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