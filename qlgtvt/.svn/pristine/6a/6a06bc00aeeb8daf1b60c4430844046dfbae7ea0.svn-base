/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.user.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Year;
import java.util.Calendar;
import java.util.Date;

public abstract class DateUtils {
    private static final String dmy = "dd/MM/yyyy";
    private static final String hhdmy = "HH:mm:ss dd/MM/yyyy";

    public static String getCurrent(String pattern) {
        return new SimpleDateFormat(pattern).format(Calendar.getInstance().getTime());
    }

    public static String getCurrentDateDefault() {
        return getCurrent(dmy);
    }

    public static int getCurrentYear() {
        return Year.now().getValue();
    }

    public static String getCurrentDateTimeDefault() {
        return getCurrent(hhdmy);
    }

    public static String convertLineBreakToSlash(String value) {
        String[] arrSlash = value.split("-");
        if (arrSlash.length > 0) {
            return arrSlash[0] + "/" + arrSlash[1] + "/" + arrSlash[2];
        }
        return "";
    }

    public static String parse(Date value, String pattern) {
        return new SimpleDateFormat(pattern).format(value);
    }

    public static String parseDefault(Date value) {
        return parse(value, dmy);
    }

    public static boolean isValidDate(String value, String pattern, String regexType) {

        if ("1".equals(regexType)) {
            regexType = "([0-9]{1,2})/([0-9]{1,2})/([0-9]{4})";
        }
        if ("2".equals(regexType)) {
            regexType = "([0-9]{1,2})/([0-9]{1,2})/([0-9]{4})";
        }
        Date date = null;
        if (value.matches(regexType)) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(pattern);
                date = sdf.parse(value);
            } catch (ParseException ex) {
                ex.printStackTrace();
            }
        }
        return date != null;
    }

    public static boolean isValidDateDefault(String dateToValidate) {
        return isValidDate(dateToValidate, dmy, "1");
    }
}
