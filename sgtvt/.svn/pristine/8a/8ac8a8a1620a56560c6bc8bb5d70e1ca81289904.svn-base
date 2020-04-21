package vn.worklife.security.util;

import java.util.Date;

public class WorklifeCodeManager {
    @SuppressWarnings("deprecation")
    public static String getDoctorCode() {
        return Integer.toString(new Date().getMonth()) +
                Integer.toString(new Date().getDate()) +
                Integer.toString(new Date().getDay()) +
                Integer.toString(new Date().getHours()) +
                Integer.toString(new Date().getMinutes()) +
                Integer.toString(new Date().getSeconds());
    }
    
    @SuppressWarnings("deprecation")
	public static String getFacilityCode() {
        return "CS" + Integer.toString(new Date().getMonth()) +
                Integer.toString(new Date().getDate()) +
                Integer.toString(new Date().getDay()) +
                Integer.toString(new Date().getHours()) +
                Integer.toString(new Date().getMinutes()) +
                Integer.toString(new Date().getSeconds());
    }
}
