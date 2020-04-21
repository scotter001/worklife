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

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class DmTuyenDuongTheoHatController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    DmTuyenDuongTheoHatImpl dmTuyenDuongTheoHatImpl;

    private static final String RETURN = "/worklife/user/quanlytuyenduong/dmtuyenduongtheohat.do";

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtuyenduongtheohat.do")
    public String index(Model model){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            return "worklife/user/QuanLyTuyenDuong/dmtuyenduongtheohat";
        }
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/gethatquanly.do", method = RequestMethod.POST)
    public @ResponseBody
    List<GroupVO> getListHatQL(){
        List<GroupVO> listData = new ArrayList<>();
        try{
            listData = this.dmTuyenDuongTheoHatImpl.selectListHatQL();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/getloaiduong.do", method = RequestMethod.POST)
    public @ResponseBody List<DmLoaiDuongVO> getListLoaiDuong(){
        List<DmLoaiDuongVO> listData = new ArrayList<>();
        try{
            listData = this.dmTuyenDuongTheoHatImpl.selectListLoaiDuong();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/gettuyenduong.do", method = RequestMethod.POST)
    public @ResponseBody List<TuyenDuongHatVO> getListTuyenDuong(){
        List<TuyenDuongHatVO> listData = new ArrayList<>();
        try{
            listData = this.dmTuyenDuongTheoHatImpl.selectListTuyenDuong();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/getlisthuyen.do", method = RequestMethod.POST)
    public @ResponseBody List<DmHuyenVO> getListHuyen(){
        List<DmHuyenVO> listData = new ArrayList<>();
        try{
            listData = this.dmTuyenDuongTheoHatImpl.selectHuyen();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/getuser.do", method = {RequestMethod.POST,RequestMethod.GET})
    public @ResponseBody List<UsersVO> getListUser(HttpServletRequest request){
        int idGroup = Integer.parseInt(request.getParameter("idGroup"));
        List<UsersVO> dataList = new ArrayList<>();
        try{
            dataList = this.dmTuyenDuongTheoHatImpl.selectListUsers(idGroup);
        }catch (Exception e){
            e.printStackTrace();
        }
        return dataList;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/getlistduonghat.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListDuongHat(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List <DuongTheoHatVO> dataList = null;
        try{
            dataList = this.dmTuyenDuongTheoHatImpl.selectListDuongHat(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), dataList);
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/getdatabyiddn.do", method = RequestMethod.POST)
    public @ResponseBody DuongHatVO getDataByIddh(HttpServletRequest request){
        DuongHatVO duongHatVO = new DuongHatVO();
        int iddh = Integer.parseInt(request.getParameter("iddh"));
        try{
            duongHatVO = this.dmTuyenDuongTheoHatImpl.selectDataByIddh(iddh);
            if (duongHatVO.getChieuDai().split("\\.")[1].equals("0")){
                duongHatVO.setChieuDai(duongHatVO.getChieuDai().split("\\.")[0]);
            }
            duongHatVO.setListDoanDuongVOs(this.dmTuyenDuongTheoHatImpl.selectListDoanDuong(iddh));
            for (DoanDuongVO doanDuongVO: duongHatVO.getListDoanDuongVOs()){
                if (doanDuongVO.getChieuDai().split("\\.")[1].equals("0")){
                    doanDuongVO.setChieuDai(doanDuongVO.getChieuDai().split("\\.")[0]);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return duongHatVO;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/gettelephone.do", method = RequestMethod.POST)
    public @ResponseBody UsersVO getTelePhone(HttpServletRequest request){
        int idUser = Integer.parseInt(request.getParameter("idUser"));
        UsersVO usersVO = new UsersVO();
        try{
            usersVO = this.dmTuyenDuongTheoHatImpl.selectTelePhoneByIdUser(idUser);
        }catch (Exception e){
            e.printStackTrace();
        }
        return usersVO;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/saveForm.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("duongHatVO") DuongHatVO duongHatVO, RedirectAttributes rm){
        /** TRANSACTION */
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);

        try{
            if (duongHatVO.getIddh() == -1){
                this.dmTuyenDuongTheoHatImpl.insertDuongHat(duongHatVO);
            }
            else {
                this.dmTuyenDuongTheoHatImpl.updateDuongHat(duongHatVO);
            }
            List<DoanDuongVO> doanDuongVOS = duongHatVO.getListDoanDuongVOs();
            if (doanDuongVOS != null && doanDuongVOS.size() > 0){
                for (DoanDuongVO doanDuongVO: doanDuongVOS){
                    doanDuongVO.setIddh(duongHatVO.getIddh());
                    if (doanDuongVO.getIdDoan() == -1)
                        this.dmTuyenDuongTheoHatImpl.insertDoanDuong(doanDuongVO);
                    else
                        this.dmTuyenDuongTheoHatImpl.updateDoanDuong(doanDuongVO);
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
            rm.addFlashAttribute("startAt", ((position - 1) / 15 * 15));
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
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtheohat/deleteDoanDuong.do", method = RequestMethod.POST)
    public @ResponseBody boolean deleteDoanDuong(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idDoan = 0;
                try {
                    idDoan = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idDoan = 0;
                    e.printStackTrace();
                }
                this.dmTuyenDuongTheoHatImpl.deleteDoanDuong(idDoan);
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
