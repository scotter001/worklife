/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.web;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.service.impl.DanhMucSCTXServiceImpl;

import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
public class TraCuuSCTXController {
    private static final Logger logger = Logger.getLogger(TraCuuSCTXController.class);
    @Autowired
    DanhMucSCTXServiceImpl danhMucSCTXService;
    /*@Autowired
    SctxThucHienServiceImpl sctxThucHienService;*/
    @Autowired
    WorklifeGroupServiceImpl worklifeGroupService;

    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/tracuusuachuathuongxuyen.do", method = RequestMethod.GET)
    public String TraCuuSuaChuaThuongXuyen(Model model){
        List<WorklifeGroupVO> worklifeGroupVOList = worklifeGroupService.selectAllGroupName();
        model.addAttribute("worklifeGroup",worklifeGroupVOList);
        return "/worklife/user/SuaChuaThuongXuyen/TraCuuSuaChuaThuongXuyen";
    }

    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/getdmsctxtracuu.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> getDmSctxTraCuu(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<DanhMucSCTXVO> dataList = null;
        try {
                dataList = this.danhMucSCTXService.selectAllDmSctxTraCuu(criterias);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/exportdmsctxtracuutoexcel.do", method = RequestMethod.GET)
    public void exportDanhMucSctxToExcel(@RequestParam final Map<String, String> optional, HttpServletRequest request, HttpServletResponse response) {
        danhMucSCTXService.exportDanhMucSctxTraCuuToExcel(optional,"TraCuuDanhMucSctxTemp.xlsx","TraCuuDanhMucSctx.xlsx",request,response);
    }

}