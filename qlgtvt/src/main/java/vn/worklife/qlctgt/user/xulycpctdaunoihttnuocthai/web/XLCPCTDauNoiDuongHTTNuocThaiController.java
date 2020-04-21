package vn.worklife.qlctgt.user.xulycpctdaunoihttnuocthai.web;

import org.apache.log4j.Logger;
import org.apache.poi.xwpf.usermodel.*;
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
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.qlctgt.user.danhsachhoso.model.HoSoVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.*;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.sevice.impl.XLCPCTDauNoiDuongImpl;
import vn.worklife.qlctgt.user.xulycpctdaunoihttnuocthai.service.Impl.XLCPCTDauNoiDuongHTTNuocThaiImpl;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.CongTrinhChiTietVO;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.DmLoaiCongTrinhVO;
import vn.worklife.qlctgt.user.xulycpctthietyeu.service.impl.XLCPCTThietYeuImpl;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.util.DateUtils;
import vn.worklife.user.util.ReportUtils;
import vn.worklife.user.util.UploadFileUtil;

import javax.annotation.Resource;
import javax.mail.internet.MimeUtility;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Controller
public class XLCPCTDauNoiDuongHTTNuocThaiController {
    private Logger logger = Logger.getLogger(this.getClass());
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    XLCPCTThietYeuImpl xlcpctThietYeuImpl;

    @Autowired
    XLCPCTDauNoiDuongImpl xlcpctDauNoiDuongImpl;
    @Autowired
    XLCPCTDauNoiDuongHTTNuocThaiImpl xLCPCTDauNoiDuongHTTNuocThaiImpl;

    @Autowired
    private UploadFileUtil uploadFileUtil;

    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhs/xulyhoso/hscpdnhttthoatnuoctthai.do")
    public String index(Model model, @RequestParam("idHoSo") int idHoSo){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        HoSoVO hoSoVO = new HoSoVO();
        CongTrinhVO congTrinhVO = new CongTrinhVO();
        CongTrinhChiTietVO congTrinhChiTietVO = new CongTrinhChiTietVO();
        try {
            hoSoVO = this.xlcpctDauNoiDuongImpl.selectDataHoSo(idHoSo);
            congTrinhVO = this.xlcpctDauNoiDuongImpl.selectDataCongTrinh(idHoSo);
            congTrinhChiTietVO = this.xLCPCTDauNoiDuongHTTNuocThaiImpl.selectListChiTietCTNT(congTrinhVO.getIdCongTrinh()
            );
        }catch (Exception e){
            e.printStackTrace();
        }
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("idHoSo", idHoSo);
            model.addAttribute("idLoaiHoSo", hoSoVO.getIdLoaiHoSo());
            model.addAttribute("user_Nhan", worklifeUserVO.getUserId());
            model.addAttribute("idCongTrinh", congTrinhVO == null?-1:congTrinhVO.getIdCongTrinh());
            model.addAttribute("idDoanhNghiep", congTrinhVO == null?-1:congTrinhVO.getIdDoanhNghiep());
            model.addAttribute("idgp", congTrinhVO == null?-1:congTrinhVO.getIdgp());
            model.addAttribute("idctct", congTrinhChiTietVO == null?-1:congTrinhChiTietVO.getIdctct());
            model.addAttribute("idXa", congTrinhChiTietVO == null?-1:congTrinhChiTietVO.getIdXa());
            model.addAttribute("idHuyen", congTrinhChiTietVO == null?-1:congTrinhChiTietVO.getIdHuyen());
            model.addAttribute("hoSoVO", hoSoVO);
            model.addAttribute("congTrinhVO", congTrinhVO);
            model.addAttribute("congTrinhChiTietVO", congTrinhChiTietVO);
            return "worklife/qlctgt/user/XuLyHoSo/HSCPCTDauNoiHTTNuocThai/hscpctdaunoihttnuocthai";
        }
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/hscpdnhttthoatnuoctthai/saveFormTTCT.do", method = {RequestMethod.POST,RequestMethod.GET})
    public String saveFormCTTY(@ModelAttribute("congTrinhVO") CongTrinhVO congTrinhVO, BindingResult bindingResult, RedirectAttributes rm){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            if (congTrinhVO.getIdCongTrinh() == -1) {
                this.xlcpctDauNoiDuongImpl.insertCongTrinh(congTrinhVO);
                this.xlcpctDauNoiDuongImpl.updateIdParentCT(congTrinhVO.getIdCongTrinh());
            }
            else {
                this.xlcpctDauNoiDuongImpl.updateCongTrinh(congTrinhVO);
            }

            if (congTrinhVO.getIdDoanhNghiep() == -1)
                this.xlcpctDauNoiDuongImpl.insertDoanhNghiep(congTrinhVO);
            else
                this.xlcpctDauNoiDuongImpl.updateDoanhNghiep(congTrinhVO);

            if (congTrinhVO.getIdLoaiHoSo() == 6) {
                if (congTrinhVO.getIdgp() == -1 || congTrinhVO.getIdgp() == 0) {
                    this.xlcpctDauNoiDuongImpl.insertGiayPhep(congTrinhVO);
                    this.xlcpctDauNoiDuongImpl.updateIdParentGP(congTrinhVO.getIdgp());
                } else {
                    this.xlcpctDauNoiDuongImpl.updateGiayPhep(congTrinhVO);
                }
            }
                this.xlcpctThietYeuImpl.deleteCongTrinhChiTiet(congTrinhVO.getIdCongTrinh());
                CongTrinhChiTietVO congTrinhChiTietVO = congTrinhVO.getCongTrinhChiTietVO();
                congTrinhChiTietVO.setIdCongTrinh(congTrinhVO.getIdCongTrinh());
                this.xlcpctThietYeuImpl.insertCongTrinhChiTiet(congTrinhChiTietVO);

            this.xlcpctDauNoiDuongImpl.updateHoSo(congTrinhVO);
            List<TaiLieuCongTrinhVO> listTaiLieu = congTrinhVO.getTaiLieuCongTrinhVOS();
            if (listTaiLieu != null && listTaiLieu.size() > 0){
                for (TaiLieuCongTrinhVO taiLieuCongTrinhVO: listTaiLieu){
                    taiLieuCongTrinhVO.setIdCongTrinh(congTrinhVO.getIdCongTrinh());
                    if (taiLieuCongTrinhVO.getIdTL() == -1)
                        this.xlcpctDauNoiDuongImpl.insertTaiLieu(taiLieuCongTrinhVO);
                    else {
                        this.xlcpctDauNoiDuongImpl.updateTaiLieu(taiLieuCongTrinhVO);
                    }
                    if (taiLieuCongTrinhVO.getFile() != null && !taiLieuCongTrinhVO.getFile().isEmpty()){
                        this.uploadFileUtil.updateTaiLieuCongTrinh(taiLieuCongTrinhVO, taiLieuCongTrinhVO.getFile(), true);
                    }
                }
            }
            rm.addFlashAttribute("message", 1);
            transactionManager.commit(status);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message", 3);
        }
        return "redirect:/worklife/qlctgt/user/danhsachhs/xulyhoso/hscpdnhttthoatnuoctthai.do?idHoSo=" + congTrinhVO.getIdHoSo();
    }
}
