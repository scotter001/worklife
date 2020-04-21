package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;

@Alias("SuCoVO")
public class SuCoVO implements Serializable {
    private static final long serialVersionUID = 3240462664816863518L;
    private int idSuCo;
    private int idTuyenDuong;
    private String ngay;
    private int idGroup;
    private String taiNan;
    private String huHong;
    private String xuLy;
    private String khacPhuc;
    private int chuyenSCTX;
    private String tenDuong;

    List<ChuyenSCTXVO> chuyenSCTXVOS;

    private int recordTotals;
    private MultipartFile attachedFile;

    public MultipartFile getAttachedFile() {
        return attachedFile;
    }

    public void setAttachedFile(MultipartFile attachedFile) {
        this.attachedFile = attachedFile;
    }

    public int getIdSuCo() {
        return idSuCo;
    }

    public void setIdSuCo(int idSuCo) {
        this.idSuCo = idSuCo;
    }

    public String getNgay() {
        return ngay;
    }

    public void setNgay(String ngay) {
        this.ngay = ngay;
    }

    public int getIdGroup() {
        return idGroup;
    }

    public void setIdGroup(int idGroup) {
        this.idGroup = idGroup;
    }

    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public String getTaiNan() {
        return taiNan;
    }

    public void setTaiNan(String taiNan) {
        this.taiNan = taiNan;
    }

    public String getHuHong() {
        return huHong;
    }

    public void setHuHong(String huHong) {
        this.huHong = huHong;
    }

    public String getXuLy() {
        return xuLy;
    }

    public void setXuLy(String xuLy) {
        this.xuLy = xuLy;
    }

    public String getKhacPhuc() {
        return khacPhuc;
    }

    public void setKhacPhuc(String khacPhuc) {
        this.khacPhuc = khacPhuc;
    }

    public int getChuyenSCTX() {
        return chuyenSCTX;
    }

    public void setChuyenSCTX(int chuyenSCTX) {
        this.chuyenSCTX = chuyenSCTX;
    }

    public String getTenDuong() {
        return tenDuong;
    }

    public void setTenDuong(String tenDuong) {
        this.tenDuong = tenDuong;
    }

    public List<ChuyenSCTXVO> getChuyenSCTXVOS() {
        return chuyenSCTXVOS;
    }

    public void setChuyenSCTXVOS(List<ChuyenSCTXVO> chuyenSCTXVOS) {
        this.chuyenSCTXVOS = chuyenSCTXVOS;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }

    /*public String getViTri(){
        NumberFormat numberFormatter = new DecimalFormat("#,###,###");
        if(loaiSuCo == 1)
            return "Km " + numberFormatter.format(lyTrinhKmDiemDau) + " + " + numberFormatter.format(lyTrinhMDiemDau) + " - " + numberFormatter.format(lyTrinhKmDiemCuoi) + " + " + numberFormatter.format(lyTrinhMDiemCuoi);
        else
            return "Km " + numberFormatter.format(lyTrinhKmDiemDau) + " + " + numberFormatter.format(lyTrinhMDiemDau);
    }
    public String getViTriTaiNan(){
        String returnVal = "Không";
        if (loaiSuCo == 3) {
            returnVal = tenXa + ", " + tenHuyen + "; " + getViTri();
        }
        return returnVal;
    }
    public String getViTriHuHong(){
        if (tinhHinhHuHong== null) return "";
        return getViTri() + (!tinhHinhHuHong.equals("")?" : " + tinhHinhHuHong:"");
    }
    public String getDiaDiem(){
        if(tenHuyen!=null && tenXa!=null)
            return "Huyện " + tenHuyen + " & Thị xã" + tenXa;
        else
            return "";
    }*/
}
