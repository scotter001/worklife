package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("UsersVO")
public class UsersVO {
    private int id_User;
    private String password;
    private int group_Id;
    private String fullName;
    private String address;
    private String birthday;
    private String cellphone;
    private String landline;
    private String identity_card;
    private String idnum_date;
    private String idnum_agency;
    private String avatar;
    private String username;
    private String email;
    private String active_flag;
    private String update_at;
    private String create_at;
    private String chucvu;
    private int gender;
    private String mahuyen;
    private String ky_giayto;
    private String is_admin;

    public int getId_User() {
        return id_User;
    }

    public void setId_User(int id_User) {
        this.id_User = id_User;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getGroup_Id() {
        return group_Id;
    }

    public void setGroup_Id(int group_Id) {
        this.group_Id = group_Id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getLandline() {
        return landline;
    }

    public void setLandline(String landline) {
        this.landline = landline;
    }

    public String getIdentity_card() {
        return identity_card;
    }

    public void setIdentity_card(String identity_card) {
        this.identity_card = identity_card;
    }

    public String getIdnum_date() {
        return idnum_date;
    }

    public void setIdnum_date(String idnum_date) {
        this.idnum_date = idnum_date;
    }

    public String getIdnum_agency() {
        return idnum_agency;
    }

    public void setIdnum_agency(String idnum_agency) {
        this.idnum_agency = idnum_agency;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getActive_flag() {
        return active_flag;
    }

    public void setActive_flag(String active_flag) {
        this.active_flag = active_flag;
    }

    public String getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(String update_at) {
        this.update_at = update_at;
    }

    public String getCreate_at() {
        return create_at;
    }

    public void setCreate_at(String create_at) {
        this.create_at = create_at;
    }

    public String getChucvu() {
        return chucvu;
    }

    public void setChucvu(String chucvu) {
        this.chucvu = chucvu;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public String getMahuyen() {
        return mahuyen;
    }

    public void setMahuyen(String mahuyen) {
        this.mahuyen = mahuyen;
    }

    public String getKy_giayto() {
        return ky_giayto;
    }

    public void setKy_giayto(String ky_giayto) {
        this.ky_giayto = ky_giayto;
    }

    public String getIs_admin() {
        return is_admin;
    }

    public void setIs_admin(String is_admin) {
        this.is_admin = is_admin;
    }
}
