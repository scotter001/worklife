$(document).ready(function() {
	var token = $("meta[name='_csrf']").attr("content");
	 var header = $("meta[name='_csrf_header']").attr("content");
	 $(document).ajaxSend(function(e, xhr, options) {
	  xhr.setRequestHeader(header, token);
	 });
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeSystemManager').addClass('active');
	
	worklifeAdminUtil.numericInputById('listPermissionNo');
	worklifeAdminUtil.notAllowSpaceInputById('rolePattern');
	
	var listPermissionName = $('#selectRoleGroupName').selectize({
		create: true,
		sortField: {
			field: 'text',
			direction: 'asc'
		},
		dropdownParent: 'body',
		render: {
		    option_create: function(data, escape) {
		      return '<div class="create">'+multiLanguage.addcommobox+' <strong>' + escape(data.input) + '</strong>&hellip;</div>';
		    }
	    }
	}).on('change', function() {
		var selectedOption = $('#selectRoleGroupName option:selected');
		$('#listPermissionName').val(selectedOption.text());
		if (selectedOption.val() == '' || !$.isNumeric(selectedOption.val())) {
			$('#listPermissionNo').attr('readonly', 'readonly');
			$.ajax({
				url : url + "worklife/manager/permission/findPermissionNo.do",
				type : 'POST',
				contextType : "aplication/json;charset=utf-8",
				dataType : "json",
				success : function(jSon) {
					var mes = jSon.message;
					$('#listPermissionNo').val(mes);
				},
				error : function(jSon) {
					$('#listPermissionNo').val('');
				}
			});
		} else {
			$('#listPermissionNo').attr('readonly', 'readonly');
			$('#listPermissionNo').val(selectedOption.val());
		}
		//Nhat fix
		var valueNo = $('#listPermissionNo').val();
		if (valueNo != "") {
			$('#listPermissionNo').removeClass('error');
			$('#listPermissionNo-error').remove();
		}
	});
	
	// BUTTONS
	$('.fg-button').hover(
		function() { $(this).removeClass('ui-state-default').addClass('ui-state-focus'); },
		function() { $(this).removeClass('ui-state-focus').addClass('ui-state-default'); }
	);
	//Nhat fix
	$('.selectize-input').on('click keyup', function() {
		$('.selectize-input').removeAttr('style');
		$('#selectRoleGroupName-error').remove();
	});
	
	/*$('.selectize-input').on('keyup', function() {
		var text = $('.selectize-dropdown-content .create').text();
		text = text.replace("Add", multiLanguage.addcommobox);
		$('.selectize-dropdown-content .create').text(text);
	});*/
	
	$("#createRole").validate({
		errorPlacement: function (error, element){
    		//Nhat fix
    		var select = $(element);
    		if (select.is('select')) {
    			var abbr = $('.selectize-input');
    			abbr.css("border","1px dotted #cc5965");
    			error.insertAfter(abbr);
    		} else {
				error.insertAfter(element);
    		}
        }, 
		rules: {
			permissionName: {
				required: true
			},
			permissionPattern: {
				required: true
			},
			selectRoleGroupName: {
				required: true
			}
		},
		messages: {
			permissionName: {
				required: multiLanguage.permissionName
			},
			permissionPattern: {
				required: multiLanguage.permissionPattern
			},
			selectRoleGroupName: {
				required: multiLanguage.selectRoleGroupName
			}
		},
		ignore: ':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input'
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