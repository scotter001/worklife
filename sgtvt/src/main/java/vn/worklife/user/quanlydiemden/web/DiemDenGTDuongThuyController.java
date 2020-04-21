package vn.worklife.user.quanlydiemden.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.user.quanlydiemden.model.DiemDenVO;
import vn.worklife.user.quanlydiemden.model.DmTieuChiDiemDenVO;
import vn.worklife.user.quanlydiemden.service.impl.DiemDenGTDuongBoImpl;
import vn.worklife.user.quanlydiemden.service.impl.DiemDenGTDuongThuyImpl;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class DiemDenGTDuongThuyController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    DiemDenGTDuongThuyImpl diemDenGTDuongThuyImpl;

    @Autowired
    DiemDenGTDuongBoImpl diemDenGTDuongBoImpl;

    @RequestMapping(value = "/worklife/user/diemdenduongthuy/index.do")
    public String index(){
        return "worklife/user/QLDiemDen/diemdenduongthuy";
    }
    @RequestMapping(value = "/worklife/user/diemdenduongthuy/getlisttieuchi.do", method = RequestMethod.POST)
    public @ResponseBody
    List<DmTieuChiDiemDenVO> getListTieuChi(HttpServletRequest request){
        int phanLoai = Integer.parseInt(request.getParameter("phanloai"));
        List<DmTieuChiDiemDenVO> listData = new ArrayList<>();
        try{
            listData = this.diemDenGTDuongThuyImpl.selectListTieuChi(phanLoai);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/diemdenduongthuy/getlistdiemden.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListDiemDenDT(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List<DiemDenVO> listData = null;
        try{
            listData = this.diemDenGTDuongThuyImpl.selectListDiemDenDT(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), listData);
    }
    @RequestMapping(value = "/worklife/user/diemdenduongthuy/saveForm.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("diemDenVO") DiemDenVO diemDenVO, @RequestParam(value = "nhieuHuyen",required = false) String[] idHuyenList, HttpServletRequest request, RedirectAttributes rm ){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            if(diemDenVO.getIdDiemDen() == -1){
                this.diemDenGTDuongThuyImpl.insertDiemDenDuongThuy(diemDenVO);
            }
            else {
                this.diemDenGTDuongThuyImpl.updateDiemDenDuongThuy(diemDenVO);
            }
            if (idHuyenList != null){
                this.diemDenGTDuongBoImpl.deleteDiemDenById(diemDenVO.getIdDiemDen());
                for (String idHuyenString: idHuyenList){
                    int idHuyen = Integer.parseInt(idHuyenString);
                    if (idHuyen != -1){
                        this.diemDenGTDuongBoImpl.insertDiemDenHuyen(diemDenVO.getIdDiemDen(), idHuyen);
                    }
                }
            }
            transactionManager.commit(status);
            int position;
            try {
                position = this.diemDenGTDuongBoImpl.getPosition(diemDenVO.getIdDiemDen());
            } catch (Exception e) {
                position = 0;
                e.printStackTrace();
            }
            rm.addFlashAttribute("startAt", ((position - 1) / 30 * 30));
            rm.addFlashAttribute("idDiemDen", diemDenVO.getIdDiemDen());
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message", 3);
        }
        return "redirect:/worklife/user/diemdenduongthuy/index.do";
    }
}
