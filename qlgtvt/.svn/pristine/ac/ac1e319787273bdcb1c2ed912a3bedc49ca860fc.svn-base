package vn.worklife.user.quanlytuyenduong.web;

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
import vn.worklife.user.quanlytuyenduong.model.*;
import vn.worklife.user.quanlytuyenduong.service.impl.DmTuyenDuongTheoHatImpl;
import vn.worklife.user.quanlytuyenduong.service.impl.TTChiTietTuyenDuongTheoHatImpl;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class TTChiTietDuongTheoHatController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    DmTuyenDuongTheoHatImpl dmTuyenDuongTheoHatImpl;
    @Autowired
    TTChiTietTuyenDuongTheoHatImpl ttChiTietTuyenDuongTheoHatImpl;

    private static final String RETURN = "/worklife/user/quanlytuyenduong/ttchitietduongtheohat.do";

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/ttchitietduongtheohat.do")
    public String index(Model model){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            return "worklife/user/QuanLyTuyenDuong/ttchitiettuyenduongtheohat";
        }
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/ttchitietduong/getlistduong.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListDuong(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List<DuongTheoHatVO> dataList = null;
        try{
            dataList = this.dmTuyenDuongTheoHatImpl.selectListDuongHat(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), dataList);
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/ttchitietduong/getdatabyiddn.do", method = RequestMethod.POST)
    public @ResponseBody
    DuongHatVO getDataByIddh(HttpServletRequest request){
        DuongHatVO duongHatVO = new DuongHatVO();
        List<LyTrinhVO> lyTrinhVOS;
        int iddh = Integer.parseInt(request.getParameter("iddh"));
        try{
            duongHatVO = this.dmTuyenDuongTheoHatImpl.selectDataByIddh(iddh);
            lyTrinhVOS = this.ttChiTietTuyenDuongTheoHatImpl.selectListLyTrinhByIddh(iddh);
            duongHatVO.setLyTrinhVOS(lyTrinhVOS);
            if (lyTrinhVOS != null && lyTrinhVOS.size() > 0){
                for (LyTrinhVO lyTrinhVO: lyTrinhVOS) {
                    if (lyTrinhVO.getChieuDai() != null) {
                        if (lyTrinhVO.getChieuDai().split("\\.")[1].equals("0")) {
                            lyTrinhVO.setChieuDai(lyTrinhVO.getChieuDai().split("\\.")[0]);
                        }
                    }
                    lyTrinhVO.setTinhTrangDuongVO(this.ttChiTietTuyenDuongTheoHatImpl.selectTTDuong(lyTrinhVO.getIdLyTrinh()));
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return duongHatVO;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/ttchitietduong/getlistketcaumatdg.do", method = RequestMethod.POST)
    public @ResponseBody List<DmKetCauMatDuongVO> getListKetCau(){
        List<DmKetCauMatDuongVO> listData = new ArrayList<>();
        try{
            listData = this.ttChiTietTuyenDuongTheoHatImpl.selectListKetCauMD();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/ttchitietduong/getlistcapql.do", method = RequestMethod.POST)
    public @ResponseBody List<DmCapQLVO> getListCapQL(){
        List<DmCapQLVO> listData = new ArrayList<>();
        try{
            listData = this.ttChiTietTuyenDuongTheoHatImpl.selectListCapQL();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/ttchitietduong/getlistttduong.do", method = RequestMethod.POST)
    public @ResponseBody List<DmTinhTrangDuongVO> getListTTDuong(){
        List<DmTinhTrangDuongVO> listData = new ArrayList<>();
        try{
            listData = this.ttChiTietTuyenDuongTheoHatImpl.selectListTTDuong();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/ttchitietduong/saveForm.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("duongHatVO") DuongHatVO duongHatVO, RedirectAttributes rm){
        //Transaction
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);

        try{
            this.ttChiTietTuyenDuongTheoHatImpl.updateChiTietDuong(duongHatVO);
            List<LyTrinhVO> lyTrinhVOS = duongHatVO.getLyTrinhVOS();
            if (lyTrinhVOS != null && lyTrinhVOS.size() > 0){
                for (LyTrinhVO lyTrinhVO: lyTrinhVOS){
                    TinhTrangDuongVO tinhTrangDuongVO = lyTrinhVO.getTinhTrangDuongVO();
                    lyTrinhVO.setIddh(duongHatVO.getIddh());
                    if (lyTrinhVO.getIdLyTrinh() == -1){
                        this.ttChiTietTuyenDuongTheoHatImpl.insertLyTrinh(lyTrinhVO);
                    }
                    else {
                        this.ttChiTietTuyenDuongTheoHatImpl.updateLyTrinh(lyTrinhVO);
                    }
                    tinhTrangDuongVO.setIdLyTrinh(lyTrinhVO.getIdLyTrinh());
                    if (tinhTrangDuongVO.getId() == -1){
                        this.ttChiTietTuyenDuongTheoHatImpl.insertTTDuong(tinhTrangDuongVO);
                    }
                    else {
                        this.ttChiTietTuyenDuongTheoHatImpl.updateTTDuong(tinhTrangDuongVO);
                    }
                }
            }
            transactionManager.commit(status);
            int position = 0;
            try {
                position = this.dmTuyenDuongTheoHatImpl.getPositionSeaShoe(duongHatVO.getIddh());
            } catch (Exception e) {
                position = 0;
                e.printStackTrace();
            }
            rm.addFlashAttribute("startAt" , (position - 1) / 10 * 10);
            rm.addFlashAttribute("iddh", duongHatVO.getIddh());
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            rm.addFlashAttribute("message", 3);
            transactionManager.rollback(status);
        }finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return "redirect:" + RETURN;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/ttchitietduong/deletelytrinh.do", method = RequestMethod.POST)
    public @ResponseBody boolean deleteLyTrinh(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idLyTrinh = 0;
                try {
                    idLyTrinh = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idLyTrinh = 0;
                    e.printStackTrace();
                }
                this.ttChiTietTuyenDuongTheoHatImpl.deleteLyTrinh(idLyTrinh);
                this.ttChiTietTuyenDuongTheoHatImpl.deleteTTDuong(idLyTrinh);
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
}
