/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.user.util;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;

public class FileFactory {
    public static String getFileTpl(String fileName) {
        String path = FileFactory.class.getProtectionDomain().getCodeSource().getLocation().getFile()+"../views/tpl/"+fileName+".tpl";
        File file = new File(path);
        try {
            return (FileUtils.readFileToString(file,"UTF-8")).replaceAll("\\r\\n|\\r|\\n", " ");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "error";
    }
    
    
}
