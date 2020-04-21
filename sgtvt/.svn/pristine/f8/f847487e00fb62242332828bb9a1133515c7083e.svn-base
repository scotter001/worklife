package vn.worklife.security.util;

import org.apache.log4j.Logger;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class WorklifePropertiesGetter {
    private static final String RELATIVE_PATH_PREFIX = WorklifePropertiesGetter.class.getResource("").getPath().substring(0, WorklifePropertiesGetter.class.getResource("").getPath().lastIndexOf("vn"));
    private static final String GLOBALS_PROPERTIES_FILE = RELATIVE_PATH_PREFIX + "worklife/properties" + System.getProperty("file.separator");
    private static Logger logger = Logger.getLogger(WorklifePropertiesGetter.class);

    public static String getProperty(String keyName, String propertiesName) {
        FileInputStream fis = null;
        String value = "";
        try {
            Properties props = new Properties();
            fis = new FileInputStream(filePathBlackList(GLOBALS_PROPERTIES_FILE + propertiesName));
            props.load(new java.io.BufferedInputStream(fis));
            value = props.getProperty(keyName).trim();
        } catch (FileNotFoundException fne) {
            logger.error(fne);
        } catch (IOException ioe) {
            logger.error(ioe);
        } catch (Exception e) {
            logger.error(e);
        } finally {
            try {
                if (fis != null) fis.close();
            } catch (Exception ex) {
                logger.error(ex);
            }

        }
        return value;
    }

    private static String filePathBlackList(String value) {
        String returnValue = value;
        if (returnValue == null || returnValue.trim().equals("")) {
            return "";
        }

        returnValue = returnValue.replaceAll("\\.\\./", "");
        returnValue = returnValue.replaceAll("\\.\\.\\\\", "");

        return returnValue;
    }
}
