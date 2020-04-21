$(document).ready(function() {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
		xhr.setRequestHeader(header, token);
	});
	
	FORMSTATISTICAL_PUBLIC_FILE.initInputFile();
	FORMSTATISTICAL_PUBLIC.initPublic();
	//DataTable
	ListFormStatisticalDataTable.initTable();
	/*ListFormStatisticalDataTable.initSelectRowDataTable();*/
});