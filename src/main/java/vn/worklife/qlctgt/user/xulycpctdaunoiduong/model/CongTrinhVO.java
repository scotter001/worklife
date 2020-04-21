package vn.worklife.qlctgt.user.xulycpctdaunoiduong.model;

import org.apache.ibatis.type.Alias;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.DmLoaiCTVO;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.CongTrinhChiTietVO;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.ThuPhiCongTrinhVO;

import java.util.List;

@Alias("CongTrinhVO")
public class CongTrinhVO {
    private int idCongTrinh;
    private int idHoSo;
    private int idLoaiHoSo;
    private int user_Nhan;
    private String tenCongTrinh;
    private String tenHangMuc;
    private String diaDiem_DiaChi;
    private int diaDiem_Huyen;
    private int diaDiem_Xa;
    private int idDoanhNghiep;
    private String noiDung_CapPhep;
    private String luuy;
    private String phamVi_CapPhep;
    private int dieuChinh;
    private int idParent;
    private String tenDuAn;
    private String qd_ctdt;
    private String gpxd;
    private String donViTK;
    private String bbkt;
    private String donXinCP;
    private int idLoaiCongTrinh;
    private String tenLoai;

    //Doanh nghiep
    private String tenDoanhNghiep;
    private String diaChi_DN;
    private String daiDien;
    private String chucVu;
    private String dienThoai;

    //Diachict huyen
    private int idct_Huyen;
    private int idHuyen;
    private int idXa;

    //Giay phep
    private int idgp;
    private String gp_So;
    private String thoiHan;
    private String tuNgay;
    private String denNgay;
    private String ghiChu_ThoiHan;

    private String soBienNhan;
    private String ngayNhan;
    private String ngayHenTra;
    private String tenLoaiHS;

    private String diaChi_Huyen;
    private String diaChi_Xa;
    private String noiDungCauMau;
    private String tenVietTat;
    private String noiDungCauMauGP;

    // dmloaict

    private int id;
    private String ten;
    private int idLoaiHS;

    //nhieuuyen
    private String nhieuHuyen;
    private String listIdHuyen;

    private String nhieuDuong;


    List<TaiLieuCongTrinhVO> taiLieuCongTrinhVOS;

    VanBanChapThuanVO vanBanChapThuanVO;

    GiayPhepChapThuanVO giayPhepChapThuanVO;

    DmCanCuPhapLyVO dmCanCuPhapLyVO;

    List<CongTrinhChiTietVO> congTrinhChiTietVOS;

    CongTrinhChiTietVO congTrinhChiTietVO;

    ThuPhiCongTrinhVO thuPhiCongTrinhVO;


    public String getNhieuHuyen() {
        return nhieuHuyen;
    }

    public void setNhieuHuyen(String nhieuHuyen) {
        this.nhieuHuyen = nhieuHuyen;
    }

    public String getListIdHuyen() {
        return listIdHuyen;
    }

    public void setListIdHuyen(String listIdHuyen) {
        this.listIdHuyen = listIdHuyen;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public int getIdLoaiHS() {
        return idLoaiHS;
    }

    public void setIdLoaiHS(int idLoaiHS) {
        this.idLoaiHS = idLoaiHS;
    }

    public int getIdLoaiCongTrinh() {
        return idLoaiCongTrinh;
    }

    public void setIdLoaiCongTrinh(int idLoaiCongTrinh) {
        this.idLoaiCongTrinh = idLoaiCongTrinh;
    }

    public String getTenLoai() {
        return tenLoai;
    }

    public void setTenLoai(String tenLoai) {
        this.tenLoai = tenLoai;
    }

    public int getIdCongTrinh() {
        return idCongTrinh;
    }

    public void setIdCongTrinh(int idCongTrinh) {
        this.idCongTrinh = idCongTrinh;
    }

    public int getIdHoSo() {
        return idHoSo;
    }

    public void setIdHoSo(int idHoSo) {
        this.idHoSo = idHoSo;
    }

    public int getIdLoaiHoSo() {
        return idLoaiHoSo;
    }

    public void setIdLoaiHoSo(int idLoaiHoSo) {
        this.idLoaiHoSo = idLoaiHoSo;
    }

    public int getUser_Nhan() {
        return user_Nhan;
    }

    public void setUser_Nhan(int user_Nhan) {
        this.user_Nhan = user_Nhan;
    }

    public String getTenCongTrinh() {
        return tenCongTrinh;
    }

    public void setTenCongTrinh(String tenCongTrinh) {
        this.tenCongTrinh = tenCongTrinh;
    }

    public String getTenHangMuc() {
        return tenHangMuc;
    }

    public void setTenHangMuc(String tenHangMuc) {
        this.tenHangMuc = tenHangMuc;
    }

    public String getDiaDiem_DiaChi() {
        return diaDiem_DiaChi;
    }

    public void setDiaDiem_DiaChi(String diaDiem_DiaChi) {
        this.diaDiem_DiaChi = diaDiem_DiaChi;
    }

    public int getDiaDiem_Huyen() {
        return diaDiem_Huyen;
    }

    public void setDiaDiem_Huyen(int diaDiem_Huyen) {
        this.diaDiem_Huyen = diaDiem_Huyen;
    }

    public int getDiaDiem_Xa() {
        return diaDiem_Xa;
    }

    public void setDiaDiem_Xa(int diaDiem_Xa) {
        this.diaDiem_Xa = diaDiem_Xa;
    }

    public int getIdDoanhNghiep() {
        return idDoanhNghiep;
    }

    public void setIdDoanhNghiep(int idDoanhNghiep) {
        this.idDoanhNghiep = idDoanhNghiep;
    }

    public String getNoiDung_CapPhep() {
        return noiDung_CapPhep;
    }

    public void setNoiDung_CapPhep(String noiDung_CapPhep) {
        this.noiDung_CapPhep = noiDung_CapPhep;
    }

    public String getLuuy() {
        return luuy;
    }

    public void setLuuy(String luuy) {
        this.luuy = luuy;
    }

    public String getPhamVi_CapPhep() {
        return phamVi_CapPhep;
    }

    public void setPhamVi_CapPhep(String phamVi_CapPhep) {
        this.phamVi_CapPhep = phamVi_CapPhep;
    }

    public int getDieuChinh() {
        return dieuChinh;
    }

    public void setDieuChinh(int dieuChinh) {
        this.dieuChinh = dieuChinh;
    }

    public int getIdParent() {
        return idParent;
    }

    public void setIdParent(int idParent) {
        this.idParent = idParent;
    }

    public String getTenDuAn() {
        return tenDuAn;
    }

    public void setTenDuAn(String tenDuAn) {
        this.tenDuAn = tenDuAn;
    }

    public String getQd_ctdt() {
        return qd_ctdt;
    }

    public void setQd_ctdt(String qd_ctdt) {
        this.qd_ctdt = qd_ctdt;
    }

    public String getGpxd() {
        return gpxd;
    }

    public void setGpxd(String gpxd) {
        this.gpxd = gpxd;
    }

    public String getDonViTK() {
        return donViTK;
    }

    public void setDonViTK(String donViTK) {
        this.donViTK = donViTK;
    }

    public String getBbkt() {
        return bbkt;
    }

    public void setBbkt(String bbkt) {
        this.bbkt = bbkt;
    }

    public String getDonXinCP() {
        return donXinCP;
    }

    public void setDonXinCP(String donXinCP) {
        this.donXinCP = donXinCP;
    }

    public String getTenDoanhNghiep() {
        return tenDoanhNghiep;
    }

    public void setTenDoanhNghiep(String tenDoanhNghiep) {
        this.tenDoanhNghiep = tenDoanhNghiep;
    }

    public String getDiaChi_DN() {
        return diaChi_DN;
    }

    public void setDiaChi_DN(String diaChi_DN) {
        this.diaChi_DN = diaChi_DN;
    }

    public String getDaiDien() {
        return daiDien;
    }

    public void setDaiDien(String daiDien) {
        this.daiDien = daiDien;
    }

    public String getChucVu() {
        return chucVu;
    }

    public void setChucVu(String chucVu) {
        this.chucVu = chucVu;
    }

    public String getDienThoai() {
        return dienThoai;
    }

    public void setDienThoai(String dienThoai) {
        this.dienThoai = dienThoai;
    }

    public int getIdct_Huyen() {
        return idct_Huyen;
    }

    public void setIdct_Huyen(int idct_Huyen) {
        this.idct_Huyen = idct_Huyen;
    }

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }

    public int getIdXa() {
        return idXa;
    }

    public void setIdXa(int idXa) {
        this.idXa = idXa;
    }

    public String getThoiHan() {
        return thoiHan;
    }

    public void setThoiHan(String thoiHan) {
        this.thoiHan = thoiHan;
    }

    public String getTuNgay() {
        return tuNgay;
    }

    public void setTuNgay(String tuNgay) {
        this.tuNgay = tuNgay;
    }

    public String getDenNgay() {
        return denNgay;
    }

    public void setDenNgay(String denNgay) {
        this.denNgay = denNgay;
    }

    public String getGhiChu_ThoiHan() {
        return ghiChu_ThoiHan;
    }

    public void setGhiChu_ThoiHan(String ghiChu_ThoiHan) {
        this.ghiChu_ThoiHan = ghiChu_ThoiHan;
    }

    public int getIdgp() {
        return idgp;
    }

    public void setIdgp(int idgp) {
        this.idgp = idgp;
    }

    public String getGp_So() {
        return gp_So;
    }

    public void setGp_So(String gp_So) {
        this.gp_So = gp_So;
    }

    public String getSoBienNhan() {
        return soBienNhan;
    }

    public void setSoBienNhan(String soBienNhan) {
        this.soBienNhan = soBienNhan;
    }

    public String getNgayNhan() {
        return ngayNhan;
    }

    public void setNgayNhan(String ngayNhan) {
        this.ngayNhan = ngayNhan;
    }

    public String getNgayHenTra() {
        return ngayHenTra;
    }

    public void setNgayHenTra(String ngayHenTra) {
        this.ngayHenTra = ngayHenTra;
    }

    public String getTenLoaiHS() {
        return tenLoaiHS;
    }

    public void setTenLoaiHS(String tenLoaiHS) {
        this.tenLoaiHS = tenLoaiHS;
    }

    public String getDiaChi_Huyen() {
        return diaChi_Huyen;
    }

    public void setDiaChi_Huyen(String diaChi_Huyen) {
        this.diaChi_Huyen = diaChi_Huyen;
    }

    public String getDiaChi_Xa() {
        return diaChi_Xa;
    }

    public void setDiaChi_Xa(String diaChi_Xa) {
        this.diaChi_Xa = diaChi_Xa;
    }

    public String getNoiDungCauMau() {
        return noiDungCauMau;
    }

    public void setNoiDungCauMau(String noiDungCauMau) {
        this.noiDungCauMau = noiDungCauMau;
    }

    public String getTenVietTat() {
        return tenVietTat;
    }

    public void setTenVietTat(String tenVietTat) {
        this.tenVietTat = tenVietTat;
    }

    public List<TaiLieuCongTrinhVO> getTaiLieuCongTrinhVOS() {
        return taiLieuCongTrinhVOS;
    }

    public void setTaiLieuCongTrinhVOS(List<TaiLieuCongTrinhVO> taiLieuCongTrinhVOS) {
        this.taiLieuCongTrinhVOS = taiLieuCongTrinhVOS;
    }

    public VanBanChapThuanVO getVanBanChapThuanVO() {
        return vanBanChapThuanVO;
    }

    public void setVanBanChapThuanVO(VanBanChapThuanVO vanBanChapThuanVO) {
        this.vanBanChapThuanVO = vanBanChapThuanVO;
    }

    public GiayPhepChapThuanVO getGiayPhepChapThuanVO() {
        return giayPhepChapThuanVO;
    }

    public void setGiayPhepChapThuanVO(GiayPhepChapThuanVO giayPhepChapThuanVO) {
        this.giayPhepChapThuanVO = giayPhepChapThuanVO;
    }

    public String getNoiDungCauMauGP() {
        return noiDungCauMauGP;
    }

    public void setNoiDungCauMauGP(String noiDungCauMauGP) {
        this.noiDungCauMauGP = noiDungCauMauGP;
    }

    public DmCanCuPhapLyVO getDmCanCuPhapLyVO() {
        return dmCanCuPhapLyVO;
    }

    public void setDmCanCuPhapLyVO(DmCanCuPhapLyVO dmCanCuPhapLyVO) {
        this.dmCanCuPhapLyVO = dmCanCuPhapLyVO;
    }

    public List<CongTrinhChiTietVO> getCongTrinhChiTietVOS() {
        return congTrinhChiTietVOS;
    }

    public void setCongTrinhChiTietVOS(List<CongTrinhChiTietVO> congTrinhChiTietVOS) {
        this.congTrinhChiTietVOS = congTrinhChiTietVOS;
    }

    public CongTrinhChiTietVO getCongTrinhChiTietVO() {
        return congTrinhChiTietVO;
    }

    public void setCongTrinhChiTietVO(CongTrinhChiTietVO congTrinhChiTietVO) {
        this.congTrinhChiTietVO = congTrinhChiTietVO;
    }

    public String getNhieuDuong() {
        return nhieuDuong;
    }

    public void setNhieuDuong(String nhieuDuong) {
        this.nhieuDuong = nhieuDuong;
    }

    public ThuPhiCongTrinhVO getThuPhiCongTrinhVO() {
        return thuPhiCongTrinhVO;
    }

    public void setThuPhiCongTrinhVO(ThuPhiCongTrinhVO thuPhiCongTrinhVO) {
        this.thuPhiCongTrinhVO = thuPhiCongTrinhVO;
    }
}
