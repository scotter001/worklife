package vn.worklife.user.mockup.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.model.NhapKiemTraSCTXVO;
import vn.worklife.user.mockup.service.impl.NhapKiemTraSCTXImpl;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class NhapKiemTraSCTXController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    NhapKiemTraSCTXImpl nhapKiemTraSCTXImpl;

    @Autowired
    WorklifeGroupServiceImpl worklifeGroupService;

    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/nhapkiemtrasctx.do")
    public String nhapKiemTraSCTX(Model model) {
        WorklifeUserVO user = WorklifeUserManager.getLoginUser();
        List<WorklifeGroupVO> worklifeGroupVOList;
        if (user.getGroup().getMaHuyen().equals("")) {
            worklifeGroupVOList = worklifeGroupService.selectAllGroupName();
        } else {
            worklifeGroupVOList = new ArrayList<>();
            worklifeGroupVOList.add(user.getGroup());
        }
        model.addAttribute("worklifeGroup", worklifeGroupVOList);
        model.addAttribute("group_Id", user.getGroupId());
        return "worklife/user/SuaChuaThuongXuyen/NhapKiemTraSuaChuaThuongXuyen";
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/select-all-nhapkiemtra-sctx.do", method = RequestMethod.POST)
    @ResponseBody
    public DanhMucSCTXVO selectNhapKiemTraSCTX(HttpServletRequest request) {
        int quy = Integer.parseInt(request.getParameter("quy"));
        int nam = Integer.parseInt(request.getParameter("nam"));
        int tinhTrang = Integer.parseInt(request.getParameter("tinhTrang"));
        int idGroup = Integer.parseInt(request.getParameter("idGroup"));
        DanhMucSCTXVO danhMucSCTXVO = new DanhMucSCTXVO();
        try {
            danhMucSCTXVO.setDanhMucSCTXVOS(this.nhapKiemTraSCTXImpl.selectNhapKiemTraSCTX(quy, nam, tinhTrang, idGroup));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return danhMucSCTXVO;
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/nhapkiemtrasctx/save.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("danhMucSCTXVO") DanhMucSCTXVO danhMucSCTXVO, RedirectAttributes ra){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            /*regularRepairVO.setNgaykiemtra(DateUtils.getCurrentDateDefault());*/
            for (DanhMucSCTXVO danhMucSCTXVo: danhMucSCTXVO.getDanhMucSCTXVOS()) {
                if (danhMucSCTXVo.getIdSctx() == 0) {
                    this.nhapKiemTraSCTXImpl.insertNhapKiemTraSCTX(danhMucSCTXVo);
                } else {
                    this.nhapKiemTraSCTXImpl.updateNhapKiemTraSCTX(danhMucSCTXVo);
                }
            }
            ra.addFlashAttribute("message",1);
            transactionManager.commit(status);
        }catch(Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            ra.addFlashAttribute("message",3);
        }
        return "redirect:/worklife/user/suachuathuongxuyen/nhapkiemtrasctx.do";
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/exportexcel.do")
    public void exportExcel(@RequestParam Map<String, String> params, HttpServletRequest request, HttpServletResponse response) {
        try {
            nhapKiemTraSCTXImpl.exportExcel(params, "KiemTraSuaChuaThuongXuyenTemp.xlsx", "KiemTraSuaChuaThuongXuyen.xlsx", request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
