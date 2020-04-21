/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.web;

import org.apache.log4j.Logger;
import vn.worklife.manager.category.model.ListTableVO;
import vn.worklife.manager.category.model.TableVO;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.util.List;

public class ConfigurationCategory {
    private static ListTableVO categoryTbl;

    private ConfigurationCategory() {
        ClassLoader classLoader = getClass().getClassLoader();
        String configRootFolder = classLoader.getResource("worklife/category/config.xml").getPath();
        try {
            JAXBContext jc = JAXBContext.newInstance(ListTableVO.class);
            Unmarshaller unmarshaller = jc.createUnmarshaller();
            File xml = new File(configRootFolder);
            categoryTbl = (ListTableVO) unmarshaller.unmarshal(xml);
        } catch (JAXBException e) {
            Logger logger = Logger.getLogger(this.getClass());
            logger.error(e.getMessage());
        }
    }

    public static List<TableVO> getCategoryTbl(){
        return categoryTbl.getTable();
    }
}
