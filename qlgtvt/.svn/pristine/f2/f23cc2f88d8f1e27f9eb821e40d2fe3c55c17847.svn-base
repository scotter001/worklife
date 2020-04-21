package vn.worklife.user.mockup.web;

import org.springframework.util.StringUtils;
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
import vn.worklife.manager.category.service.impl.CategoryServiceImpl;
import vn.worklife.user.mockup.model.TuyenDuongVO;
import vn.worklife.user.mockup.service.impl.TuyenDuongImpl;
import vn.worklife.user.util.FileType;
import vn.worklife.user.util.UploadFileUtil;

import javax.lang.model.element.Element;
import java.util.List;

@Controller
public class TuyenDuongController {

    @Autowired
    TuyenDuongImpl tuyenDuongImpl;

    @Autowired
    CategoryServiceImpl categoryService;

    @Autowired
    UploadFileUtil uploadFileUtil;

    @Autowired
    PlatformTransactionManager transactionManager;

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getdata.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> selectShowTuyenDuong(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<TuyenDuongVO> dataList = null;
        try {
            dataList = this.tuyenDuongImpl.selectShowTuyenDuong(criterias);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getTuyenDuongById.do", method = RequestMethod.POST)
    @ResponseBody
    public TuyenDuongVO getTuyenDuongById(@RequestParam("idTuyenDuong") int idTuyenDuong) {
        try {
            return tuyenDuongImpl.selectTuyenDuongByTuyenDuongId(idTuyenDuong);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/postTuyenDuong.do", method = RequestMethod.POST)
    public String insertTuyenDuong(@ModelAttribute final TuyenDuongVO tuyenDuongVO, RedirectAttributes rm) {
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            if (tuyenDuongVO.getIdTuyenDuong() == -1) {
                this.tuyenDuongImpl.insertTuyenDuong(tuyenDuongVO);
            } else {
                this.tuyenDuongImpl.updateTuyenDuong(tuyenDuongVO);
            }
            if (tuyenDuongVO.getFiles() != null) {
                tuyenDuongVO.getFiles().forEach(item -> {
                    if (!StringUtils.isEmpty(item.getTenTaiLieu())) {
                        item.setIdTuyenDuongFile(tuyenDuongVO.getIdTuyenDuong());
                        if (item.getIdTaiLieu() == -1) {
                            this.tuyenDuongImpl.insertFile(item);
                        } else {
                            this.tuyenDuongImpl.updateFile(item);
                        }
                        if (!item.getFile().isEmpty()) {
                            uploadFileUtil.insertUpdateFile(item.getIdTaiLieu(), FileType.tailieu_tuyenduong.getIdLoaiHoSo(), item.getFile());
                        }
                    }
                });
            }
            rm.addFlashAttribute("message", 1);
            transactionManager.commit(status);
        } catch (Exception e) {
            rm.addFlashAttribute("message", 3);
            e.printStackTrace();
            transactionManager.rollback(status);
        }
        return "redirect:/worklife/user/quanlyduong/quanlyduong.do";
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/delFileAttach.do", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteDocumentAttach(@RequestBody int id[]) {
        try {
            for (int i : id) {
                this.tuyenDuongImpl.deleteDocumentAttach(i);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
