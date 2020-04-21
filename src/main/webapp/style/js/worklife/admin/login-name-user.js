jQuery(document).ready(function($) {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	$(document).ajaxSend(function(e, xhr, options) {
	 xhr.setRequestHeader(header, token);
	});
	 getUserLogin();
	
});

$(document).ready(function(){
		keyEvent();
});

function getUserLogin() {
	$.ajax({
		url : url + "/worklife/basicinfomation/login/json/getUserLogin.do",
		type : 'POST',
		contextType : "aplication/json;charset=utf-8",
		dataType : "json",
		success : function(worklifeUserVO) {
			var name = worklifeUserVO.realName;
			if (name != null) name = $.trim(name);
			else name = "";
			$('#nameuser').text(name);
			
//			console.log(worklifeUserVO.password);
			var userName = worklifeUserVO.username;
			$('#userName').val(userName);
		},
		error : function(worklifeUserVO) {
		}
	});
}
function changePassword(){
	var data = {};
	data["userNameID"] = $("#userName").val();
	data["newPassword"] = $("#newPassword").val();
	data["confirmPassword"] = $("#confirmPassword").val();
	data["password"] = $("#oldPassword").val();
	if(!validation())
		return false;
	$.ajax({
		url : url + "/worklife/user/changepassword.do",
		type : 'POST',
		headers: { 
			'Accept': 'application/json',
			'Content-Type': 'application/json' 
			},
		data: JSON.stringify(data),
        dataType: 'json',
		contextType : "aplication/json",
		success : function(data) {
			if(data==1){
				$("#oldPasswordVali").text(validNotMatch);
				$("#oldPassword").addClass("borderRed");
				$("#oldPassword").val("");
			}
			if(data==2){
				swal({
		     		title: validMessage,
		     		text: validFail,
		     		type: "error",
	        		confirmButtonText: "Đóng"
		     	});
			}
			if(data==0){
				swal({
		     		title: validMessage,
		     	    text: validSuccess +'\n'+ validSuccessMessege ,
		     		type: "success",
	        		confirmButtonText: "Đóng"
		     	});
				$('#closeModel').click();
			}
		},
		error : function(worklifeUserVO) {
		}
	});
}

// Validated
function validation() {
	userNameID = $("#userName").val();
	newPassword = $("#newPassword").val();
	confirmPassword = $("#confirmPassword").val();
	password = $("#oldPassword").val();
	vCheck = true;
	
	if(userNameID == ''){
		 $("#userNameVali").text("Bạn chưa nhập tên đăng nhập");
		 $("#userName").addClass("borderRed");
		 vCheck = false;
	}
	
	if(newPassword.length < 8){
		 $("#newPasswordVali").text(validlength);
		 $("#newPassword").val("");
		 $("#newPassword").addClass("borderRed");
		 vCheck = false;
	}
	
	if(confirmPassword.length < 8){
		 $("#confirmPasswordVali").text(validlength);
		 $("#confirmPassword").addClass("borderRed");
		 $("#confirmPassword").val("");
		 vCheck = false;
	}
	
	if(password == ''){
		 $("#oldPasswordVali").text(validOLdPassWordRequired);
		 $("#oldPassword").addClass("borderRed");
		 vCheck = false;
	}
	
	if(confirmPassword != newPassword){
		 $("#confirmPasswordVali").text(validNotSamePassword);
		 $("#newPasswordVali").text(validNotSamePassword);
		 $("#confirmPassword").addClass("borderRed");
		 $("#newPassword").addClass("borderRed");
		 $("#confirmPassword").val("");
		 $("#newPassword").val("");
		 vCheck = false;
	}
	
	destroyVali($("#userName"));
	destroyVali($("#newPassword"));
	destroyVali($("#oldPassword"));
	destroyVali($("#confirmPassword"));
	
	return vCheck;
}

function destroyVali($this){
	$this.focus(function(){
		$('#'+$this.attr("id")+'Vali').text("");
		$($this).removeClass('borderRed');
	});
}

function destroyValiCancel($this){
	$('#'+$this.attr("id")+'Vali').text("");
	$($this).removeClass('borderRed');
	$($this).val("");
}

// Xóa dữ liệu
function emptValue(){
	destroyValiCancel($("#newPassword"));
	destroyValiCancel($("#oldPassword"));
	destroyValiCancel($("#confirmPassword"));
	$('#myModal').modal('hide');
}

// Key code
function keyEvent(){
    $('#myModal').keyup(function(e){
        if(e.keyCode=='13'){
        	 changePassword();
        }       
    })
}
