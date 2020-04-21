/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

let leftMenuManager = (function(){
    let setup= function(){
        managerCategory.getList(handleData);
    };

    let handleData = function(data){
        let menuList = '';
        $.each(data,function(index,value){
            let urlPage = url + "worklife/manager/category/"+value.url+"/form.do";
            let li = "<li><a href='"+urlPage+"'>Danh mục "+(value.title).toLowerCase()+"</a></li>";
            menuList += li;
        });
        $('#menuList').append(menuList);
    };

    return {
        init : function(){
            return setup();
        },
    }
})();
$(document).ready(function() {
    leftMenuManager.init();
});