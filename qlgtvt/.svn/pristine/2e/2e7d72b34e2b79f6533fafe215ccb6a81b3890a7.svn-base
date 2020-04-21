package vn.worklife.qlctgt.user.danhsachhoso.web;

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
import vn.worklife.manager.user.service.impl.WorklifeUserServiceImpl;
import vn.worklife.qlctgt.user.danhsachhoso.model.*;
import vn.worklife.qlctgt.user.danhsachhoso.service.impl.DanhSachHoSoImpl;
import vn.worklife.security.util.WorklifeUserManager;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Controller
public class DanhSachHoSoController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    DanhSachHoSoImpl danhSachHoSoImpl;

    @Autowired
    WorklifeUserServiceImpl worklifeUserServiceImpl;

    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhoso/danhsachhs.do")
    public String index(Model model){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            List<WorklifeUserVO> users = worklifeUserServiceImpl.selectUsersByGroupId(worklifeUserVO.getGroupId(),worklifeUserVO.getUserId());
            model.addAttribute("user_Nhan", worklifeUserVO.getUserId());
            model.addAttribute("user_FullName", worklifeUserVO.getRealName());
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            model.addAttribute("group_Name", worklifeUserVO.getGroup().getGroupName());
            model.addAttribute("users", users);
            return "worklife/qlctgt/user/DanhSachHoSo/danhsachhoso";
        }
    }
    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhoso/getlistloaihs.do", method = RequestMethod.POST)
    public @ResponseBody
    List<DmLoaiHoSoVO> getListLoaiHS(){
        List<DmLoaiHoSoVO> listData = new ArrayList<>();
        try{
            listData = this.danhSachHoSoImpl.selectListLoaiHS();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhoso/danhsachdn/getlistdn.do", method = RequestMethod.POST)
    public @ResponseBody List<DmDoanhNghiepVO> getListDN(@RequestParam("tenDoanhNghiep") String tenDoanhNghiep){
        List<DmDoanhNghiepVO> listData = new ArrayList<>();
        try{
            listData = this.danhSachHoSoImpl.selectListDoanhNghiep(tenDoanhNghiep);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhoso/danhsachdn/save.do", method = RequestMethod.POST)
    public @ResponseBody
    DmDoanhNghiepVO save(@ModelAttribute("dmDoanhNghiepVO") DmDoanhNghiepVO dmDoanhNghiepVO){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            List<DmDoanhNghiepVO> dmDoanhNghiepVOList = dmDoanhNghiepVO.getDmDoanhNghiepVOS();
            if (dmDoanhNghiepVOList != null && dmDoanhNghiepVOList.size() > 0){
                for (DmDoanhNghiepVO doanhNghiepVo: dmDoanhNghiepVOList){
                    if (doanhNghiepVo.getIdDMDN() == -1){
                        this.danhSachHoSoImpl.insertDoanhNhiep(doanhNghiepVo);
                    }
                    else {
                        this.danhSachHoSoImpl.updateDoanhNghiep(doanhNghiepVo);
                    }
                }
            }
            transactionManager.commit(status);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
        }
        return  dmDoanhNghiepVO;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/danhsachdn/deletedn.do", method = RequestMethod.POST)
    public @ResponseBody boolean deleteDN(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idDMDN = 0;
                try {
                    idDMDN = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idDMDN = 0;
                    e.printStackTrace();
                }
                this.danhSachHoSoImpl.deleteSDN(idDMDN);
            }
            transactionManager.commit(status);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);

        } finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return true;
    }
    @RequestMapping(value="/worklife/qlctgt/user/file/receptionnumber.do",method = RequestMethod.POST)
    public @ResponseBody boolean getReceiptionNumber(@RequestParam("soBienNhan")String soBienNhan){
        try {
            boolean flag = this.danhSachHoSoImpl.selectReceptionNumber(soBienNhan);
            return flag;
        }catch(Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhs/kths/saveForm.do", method = RequestMethod.POST)
    public String saveFormKTHS(@ModelAttribute("hoSoVO")HoSoVO hoSoVO, RedirectAttributes rm){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            Calendar cal = Calendar.getInstance();
            int date = cal.get(Calendar.DATE);
            int month = cal.get(Calendar.MONTH) +1;
            int year = cal.get(Calendar.YEAR);
            /*String ngayChuyenDen = String.valueOf(date)+'/'+ (month)+'/'+ (year);
            hoSoVO.setNgayChuyenDen(ngayChuyenDen);*/
            this.danhSachHoSoImpl.insertHoSo(hoSoVO);
            this.danhSachHoSoImpl.insertDanhSachHoSo(hoSoVO);
            transactionManager.commit(status);
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message", 3);
        }
        return "redirect:/worklife/qlctgt/user/danhsachhoso/danhsachhs.do";
    }
    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhoso/getlisttrangthai.do", method = RequestMethod.POST)
    public @ResponseBody List<DmTrangThaiVO> getListTrangThai(){
        List<DmTrangThaiVO> listData = new ArrayList<>();
        try{
            listData = this.danhSachHoSoImpl.selectListTrangThai();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhs/kths/getlisthsbuoc1.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListHSB1(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List<DoanhNghiepVO> listData = null;
        try {
            listData = this.danhSachHoSoImpl.selectListHSBuoc1(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), listData);
    }
    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhs/getlisthoso.do", method = RequestMethod.POST)
    public @ResponseBody DatatableResponseCriteriasVO<HoSoVO> getListHoSo(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List<HoSoVO> listData = null;
        try{
            listData = this.danhSachHoSoImpl.selectListHoSo(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), listData);
    }
    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhs/chuyenhoso/saveFormCHS.do", method = RequestMethod.POST)
    public String saveFormCHS(@ModelAttribute("danhSachHoSoVO") DanhSachHoSoVO danhSachHoSoVO, RedirectAttributes rm){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            Calendar cal = Calendar.getInstance();
            int date = cal.get(Calendar.DATE);
            int month = cal.get(Calendar.MONTH) +1;
            int year = cal.get(Calendar.YEAR);
            String ngayChuyenDen = String.valueOf(date)+'/'+ (month)+'/'+ (year);
            danhSachHoSoVO.setNgayChuyenDen(ngayChuyenDen);
            this.danhSachHoSoImpl.insertDSHoSoChuyen(danhSachHoSoVO);
            this.danhSachHoSoImpl.updateDSHoSoParent(danhSachHoSoVO);
            transactionManager.commit(status);
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            rm.addFlashAttribute("message", 3);
            transactionManager.rollback(status);
        }
        return "redirect:/worklife/qlctgt/user/danhsachhoso/danhsachhs.do";
    }
}
