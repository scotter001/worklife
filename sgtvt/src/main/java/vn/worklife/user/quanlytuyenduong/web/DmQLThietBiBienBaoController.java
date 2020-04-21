package vn.worklife.user.quanlytuyenduong.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.user.quanlytuyenduong.model.DmXaVO;
import vn.worklife.user.quanlytuyenduong.service.impl.DmQLThietBiBienBaoImpl;
import vn.worklife.user.quanlytuyenduong.model.ThietBiVO;
import vn.worklife.user.quanlytuyenduong.model.QLThietBiVO;
import vn.worklife.user.quanlytuyenduong.model.LoaiTBVO;


import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class DmQLThietBiBienBaoController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;
    @Autowired
    DmQLThietBiBienBaoImpl dmQLThietBiBienBaoImpl;


    @RequestMapping(value ="/worklife/user/quanlttuyenduong/dmqlthietbibienbao.do")
    public String index(Model model){
        return "worklife/user/QuanLyTuyenDuong/dmqlthietbibienbao";
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getlistthietbibienbao.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListBaoCaoCau(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List<ThietBiVO> dataList = null;
        try{
            dataList = this.dmQLThietBiBienBaoImpl.selectListThietBiBienBao(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), dataList);
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getloaithietbi.do", method = RequestMethod.POST)
    public @ResponseBody List<LoaiTBVO> getListLoaiTB(){
        List<LoaiTBVO> listData = new ArrayList<>();
        try{
            listData = this.dmQLThietBiBienBaoImpl.selectListLoaiThietBi();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getlistthietbi.do", method = RequestMethod.POST)
    public @ResponseBody List<QLThietBiVO> getListThietBi(){
        List<QLThietBiVO> listData = new ArrayList<>();
        try{
            listData = this.dmQLThietBiBienBaoImpl.selectListThietBi();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdthuoctinh/getthietbibyid.do", method = {RequestMethod.POST,RequestMethod.GET})
    public @ResponseBody QLThietBiVO getListthietbi(HttpServletRequest request){
        int idtb = Integer.parseInt(request.getParameter("idtb"));
        QLThietBiVO qlThietBiVO = new QLThietBiVO();
        try{
            qlThietBiVO = this.dmQLThietBiBienBaoImpl.selectListThietBiByid(idtb);
        }catch (Exception e){
            e.printStackTrace();
        }
        return qlThietBiVO;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdthuoctinh/getxabyidhuyen.do", method = {RequestMethod.POST,RequestMethod.GET})
    public @ResponseBody List<DmXaVO> getListXaByidHuyen(HttpServletRequest request){
        int idHuyen = Integer.parseInt(request.getParameter("idHuyen"));
        List<DmXaVO> dataList = new ArrayList<>();
        try{
            dataList = this.dmQLThietBiBienBaoImpl.selectDmXaByIdHuyen(idHuyen);

        }catch (Exception e){
            e.printStackTrace();
        }
        return dataList;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmqlthietbi/saveForm.do", method = RequestMethod.POST)
    public
    String saveForm(HttpServletRequest request, @ModelAttribute("thietBiVO") ThietBiVO thietBiVO,Model model,BindingResult bindingResult, RedirectAttributes rm){
        //Transaction
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
                if (thietBiVO.getIdtb() == -1){
                    this.dmQLThietBiBienBaoImpl.insertThietBi(thietBiVO);
                }
                else {
                    this.dmQLThietBiBienBaoImpl.updateThietBi(thietBiVO);
                }
            transactionManager.commit(status);
            int position = 0;
            try {
                position = this.dmQLThietBiBienBaoImpl.getPositionSeaShoe(thietBiVO.getIdtb());
            } catch (Exception e) {
                position = 0;
                e.printStackTrace();
            }
            rm.addFlashAttribute("startAt", ((position - 1) / 5 * 5));
            /*request.setAttribute("startAt",((position - 1) / 5 * 5));
            request.setAttribute("idtb", thietBiVO.getIdtb());*/
            rm.addFlashAttribute("idtb", thietBiVO.getIdtb());
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            rm.addFlashAttribute("message", 3);
            transactionManager.rollback(status);
        }finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return "redirect:/worklife/user/quanlttuyenduong/dmqlthietbibienbao.do";
    }

}
