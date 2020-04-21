package vn.worklife.user.quanlycau.web;

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
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.quanlycau.model.*;
import vn.worklife.user.quanlycau.service.impl.QuanLyCauImpl;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import java.util.ArrayList;
import java.util.List;

@Controller
public class QuanLyCauController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    QuanLyCauImpl quanLyCauImpl;

    @RequestMapping(value = "/worklife/user/quanlycau/quanlycau.do")
    public String index(Model model){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            return "worklife/user/QuanLyTuyenDuong/quanlycau";
        }
    }
    @RequestMapping(value = "/worklife/user/quanlycau/getlistkeucau.do", method = RequestMethod.POST)
    public @ResponseBody
    List<DmKetCauVO> getListDmKetCau(){
        List<DmKetCauVO> listData = new ArrayList<>();
        try {
            listData = this.quanLyCauImpl.selectListDmKetCau();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlycau/getlistdangcau.do", method = RequestMethod.POST)
    public @ResponseBody List<DmDangCauVO> getListDangCau(){
        List<DmDangCauVO> listData = new ArrayList<>();
        try{
            listData = this.quanLyCauImpl.selectListDangCau();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlycau/getlistdonviql.do", method = RequestMethod.POST)
    public @ResponseBody List<DmDonViQLVO> getListDVQL(){
        List<DmDonViQLVO> listData = new ArrayList<>();
        try{
            listData = this.quanLyCauImpl.selectListDonViQL();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlycau/getlistcau.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListCau(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List<CauVO> listData = null;
        try{
            listData = this.quanLyCauImpl.selectListCau(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), listData);
    }
    @RequestMapping(value = "/worklife/user/quanlycau/saveForm.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("cauVO") CauVO cauVO, RedirectAttributes rm){
        /** TRANSACTION */
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            if (cauVO.getIdCau() == 0){
                this.quanLyCauImpl.insertCau(cauVO);
            }
            else {
                this.quanLyCauImpl.updateCau(cauVO);
            }
            if (cauVO.getId() == 0){
                this.quanLyCauImpl.insertTinhTrangCau(cauVO.getIdCau(), cauVO.getTinhTrang());
            }else {
                this.quanLyCauImpl.updateTinhTrangCau(cauVO.getIdCau(), cauVO.getTinhTrang());
            }
            transactionManager.commit(status);
            int position = 0;
            try {
                position = this.quanLyCauImpl.getPosition(cauVO.getIdCau());
            } catch (Exception e) {
                position = 0;
                e.printStackTrace();
            }
            rm.addFlashAttribute("startAt", ((position - 1) / 10 * 10));
            rm.addFlashAttribute("idCau", cauVO.getIdCau());
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message", 3);
        }finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return "redirect:/worklife/user/quanlycau/quanlycau.do";
    }
}
