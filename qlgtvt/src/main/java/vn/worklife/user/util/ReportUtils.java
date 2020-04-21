/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.util;


import org.apache.log4j.Logger;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;
import org.apache.xmlbeans.XmlCursor;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTPPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTR;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTSpacing;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.STLineSpacingRule;
import org.springframework.util.StringUtils;
import vn.worklife.user.util.model.MappingFieldVO;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigInteger;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;

public class ReportUtils {
    private static final Logger logger = Logger.getLogger(ReportUtils.class);
    private static final String resource = "/worklife/reports/";
    public static void printReportDefaultWord(String fileName, XWPFDocument doc, HttpServletRequest request, HttpServletResponse response){
        String mimetype = "application/x-msdownload";
        response.setContentType(mimetype);
        String user_agent = request.getHeader("user-agent");
        boolean isInternetExplorer = (user_agent.contains("MSIE"));
        try {
            if (isInternetExplorer) {
                response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(fileName, "utf-8") + "\"");
            }
            else {
                response.addHeader("Content-disposition","attachment; filename=\"" + MimeUtility.encodeWord(fileName)  + "\"");
            }
            doc.write(response.getOutputStream());
            doc.close();
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
    }
    public static void changeText(XWPFParagraph p, String textScan,String newText) {
        List<XWPFRun> runs = p.getRuns();
        for (XWPFRun run:runs) {
            if(run.getText(0).contains(textScan)){
                p.removeRun(run.getTextPosition());
                XWPFRun var4 = runs.get(0);
                var4.setText(newText, 0);
            }
        }
    }
    public static void changeText(XWPFParagraph p, String textScan,Map<String,MappingFieldVO> mappingField) {
        List<XWPFRun> runs = p.getRuns();
        for (XWPFRun run:runs) {
            if(run.getText(0).contains(textScan)){
                p.removeRun(run.getTextPosition());
                XWPFRun var4 = runs.get(0);
                System.out.println(var4.getText(0));
                /*var4.setText(newText, 0);*/
            }
        }
    }
    public static void addParaGraphTblCell(XWPFTableCell cell, String text, boolean isBold, boolean isIstalic) {
        XWPFRun run = cell.addParagraph().createRun();
        run.setFontFamily("Times New Roman");
        run.setFontSize(14);
        run.setBold(isBold);
        run.setText(text);
        run.setItalic(isIstalic);
    }
    public static void splitTextTbl(String arrText, XWPFTableCell cell, boolean isBold, boolean isItalic){
        if(!arrText.isEmpty()){
            String[] formatText = arrText.split("\r\n");
            for (String aFormatText : formatText) {
                addParaGraphTblCell(cell, aFormatText, isBold,isItalic);
            }
            cell.removeParagraph(1);
        }
    }
    public static void replaceTextInTbl(XWPFDocument doc,Map<String,MappingFieldVO> mappingField){
        try {
            int tblS = doc.getTables().size() - 1;
            while(tblS >= 0) {
                int rowS = doc.getTables().get(tblS).getRows().size() - 1;
                while(rowS >= 0) {
                    int cellsS = doc.getTables().get(tblS).getRows().get(rowS).getTableCells().size() - 1;
                    while(cellsS >= 0) {
                        int pSize =  doc.getTables().get(tblS).getRow(rowS).getTableCells().get(cellsS).getParagraphs().size() - 1;
                        while(pSize >= 0) {
                            XWPFParagraph p = doc.getTables().get(tblS).getRow(rowS).getTableCells().get(cellsS).getParagraphs().get(pSize);
                            String text = p.getParagraphText();
                            if(mappingField.get(text) != null){
                                MappingFieldVO mapping = mappingField.get(p.getParagraphText());
                                if(mapping.isHaveNewLine()){
                                    ReportUtils.splitTextTbl(mapping.getData(), doc.getTables().get(tblS).getRow(rowS).getTableCells().get(cellsS),mapping.isBold(),mapping.isItalic());
                                    ReportUtils.deleteParagraph(p);
                                    ReportUtils.toMultiline(p,mapping.getData());
                                }else{
                                    changeText(p,p.getParagraphText(),mapping.getData());
                                    if(mapping.isRemoveIfEmpty()){
                                        if(StringUtils.isEmpty(mapping.getData())){
                                            doc.getTables().get(tblS).getRow(rowS).getTableCells().get(cellsS).removeParagraph(0);
                                        }
                                    }
                                }
                            }else{
                                List<XWPFRun> runs = p.getRuns();
                                for (XWPFRun run:runs) {
                                    mappingField.forEach((key, value) -> {
                                        String rText = run.getText(0);
                                        if (rText != null && !rText.equals("")) {
                                            if (run.getText(0).contains(key)) {
                                                rText = rText.replace(key, value.getData());
                                                run.setText(rText, 0);
                                                if (value.isRemoveIfEmpty()) {
                                                    if (StringUtils.isEmpty(value.getData())) {
                                                        p.removeRun(run.getTextPosition());
                                                    }
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                            pSize--;
                        }
                        cellsS--;
                    }
                    rowS--;
                }
                tblS--;
            }
        }catch(Exception e){
            logger.error(e.getMessage());
        }
    }
    public static FileInputStream fileFromServer(String fileName){
        try {
            URL url = ReportUtils.class.getResource(resource+fileName);
            File fileServer = new File(url.toURI());
            return new FileInputStream(fileServer);
        } catch (URISyntaxException | FileNotFoundException e) {
            logger.error(e.getMessage());
        }
        return null;
    }
    public static <V> void replace(XWPFDocument document, Map<String, V> map) {
        List<XWPFParagraph> paragraphs = document.getParagraphs();
        for (XWPFParagraph paragraph : paragraphs) {
            replace(paragraph, map);
        }
    }
    public static <V> void replace(XWPFParagraph p, String searchText, V replacement) {
        for (XWPFRun r : p.getRuns()) {
            String text = r.getText(0);
            if (text != null && !text.equals("")) {
                if (text.contains(searchText)) {
                    text = text.replace(searchText,  replacement.toString());
                    r.setText(text, 0);
                }
            }
        }
       /* boolean found = true;
        while (found) {
            found = false;
            int pos = paragraph.getText().indexOf(searchText);
            if (pos >= 0) {
                found = true;
                Map<Integer, XWPFRun> posToRuns = getPosToRuns(paragraph);
                XWPFRun run = posToRuns.get(pos);
                run.setText(paragraph.getText().replace(searchText,replacement.toString()), 0);
            }
        }*/
    }

    public static <V> void replace(XWPFDocument document, String searchText, V replacement) {
        List<XWPFParagraph> paragraphs = document.getParagraphs();
        for (XWPFParagraph paragraph : paragraphs) {
            replace(paragraph, searchText, replacement);
        }
    }

    private static <V> void replace(XWPFParagraph paragraph, Map<String, V> map) {
        for (Map.Entry<String, V> entry : map.entrySet()) {
            replace(paragraph, entry.getKey(), entry.getValue());
        }
    }
    public static void replaceTextArr(XWPFDocument doc,Map<String,MappingFieldVO> mappingField){
        try {
            int pNumber = doc.getParagraphs().size() - 1;
            while (pNumber >= 0) {
                XWPFParagraph p = doc.getParagraphs().get(pNumber);
                if(mappingField.get(p.getParagraphText()) != null){
                    ReportUtils.splitTextArr(mappingField.get(p.getParagraphText()).getData(), p,mappingField.get(p.getParagraphText()).isBold(),mappingField.get(p.getParagraphText()).isItalic());
                    ReportUtils.deleteParagraph(p);
                }
                pNumber--;
            }
        }catch(Exception e){
            logger.error(e.getMessage());
        }
    }
    public static void setSingleLineSpacing(XWPFParagraph para) {
        CTPPr ppr = para.getCTP().getPPr();
        if (ppr == null)
            ppr = para.getCTP().addNewPPr();
        CTSpacing spacing = ppr.isSetSpacing() ? ppr.getSpacing() : ppr.addNewSpacing();
        spacing.setAfter(BigInteger.valueOf(120));
        spacing.setBefore(BigInteger.valueOf(120));
        spacing.setLineRule(STLineSpacingRule.AUTO);
        spacing.setLine(BigInteger.valueOf(240));
    }
    public static XWPFParagraph createNewParaGraph(XWPFParagraph p){
        XmlCursor cursor = p.getCTP().newCursor();
        XWPFParagraph newpar = p.getDocument().insertNewParagraph(cursor);
        newpar.setFirstLineIndent(p.getFirstLineIndent());
        setSingleLineSpacing(newpar);
        return newpar;
    }

    public static void addRun(XWPFParagraph para, String text, boolean isBold) {
        addParaGraph(para, text, isBold, false,false);
    }
    public static void notAddNewPara(XWPFParagraph para, String text, boolean isBold) {
        addParaGraph(para, text, isBold, false,true);
    }

    public static void addParaGraph(XWPFParagraph par, String text, boolean isBold, boolean isIstalic,boolean justRun) {
        XWPFRun run;
        if(justRun){
            run = par.createRun();
        }else{
            XWPFParagraph para =  createNewParaGraph(par);
            para.setAlignment(par.getAlignment());
            run = para.createRun();
        }
        run.setFontFamily("Times New Roman");
        run.setFontSize(14);
        run.setBold(isBold);
        run.setText(text);
        run.setItalic(isIstalic);
    }
    public static void deleteParagraph(XWPFParagraph p) {
        XWPFDocument doc = p.getDocument();
        int pPos = doc.getPosOfParagraph(p);
        doc.removeBodyElement(pPos);
    }
    public static void splitTextArr(String arrText,XWPFParagraph p,boolean isBold){
        if(!arrText.isEmpty()){
            String[] formatText = arrText.split("\r\n");
            for (String aFormatText : formatText) {
                addParaGraph(p, aFormatText, isBold,false,false);
            }
        }
    }
    public static void splitTextArr(String arrText,XWPFParagraph p,boolean isBold,boolean isItalic){
        if(!arrText.isEmpty()){
            String[] formatText = arrText.split("\r\n");
            for (String aFormatText : formatText) {
                addParaGraph(p, aFormatText, isBold,isItalic,false);
            }
        }
    }

    // Format number with decimal
    public static String formatNumberDecimal(double number, int decimal) {
        String resulf = "";
        DecimalFormat dfNone = new DecimalFormat("#,###,###,##0.00");
        DecimalFormat dfOne = new DecimalFormat("#,###,###,##0.0");
        DecimalFormat dfTwo = new DecimalFormat("#,###,###,##0.00");
        DecimalFormat dfThree = new DecimalFormat("#,###,###,##0.000");
        DecimalFormat df = null;
        switch (decimal) {
            case 0:
                df = dfNone;
                break;
            case 1:
                df = dfOne;
                break;
            case 2:
                df = dfTwo;
                break;
            case 3:
                df = dfThree;
                break;
            default:
                break;
        }
        if (df != null) {
            String str = df.format(number);
            if (str.contains(",")) {
                str = str.replace(",", "+");
            }
            if (str.contains(".")) {
                str = str.replace(".", ",");
            }
            if (str.contains("+")) {
                str = str.replace("+", ".");
            }
            resulf = str;
        } else {
            resulf = "";
        }
        return resulf;
    }

    //Format number two
    public static String formatNumber(double number) {
        DecimalFormat df = new DecimalFormat("#,###,###,##0.00");
        String str = df.format(number);
        if (str.contains(",")) {
            str = str.replace(",", "+");
        }
        if (str.contains(".")) {
            str = str.replace(".", ",");
        }
        if (str.contains("+")) {
            str = str.replace("+", ".");
        }
        return str;
    }

    //Format number one
    public static String formatNumberOne(double number) {
        DecimalFormat df = new DecimalFormat("#,###,###,##0.0");
        String str = df.format(number);
        if (str.contains(",")) {
            str = str.replace(",", "+");
        }
        if (str.contains(".")) {
            str = str.replace(".", ",");
        }
        if (str.contains("+")) {
            str = str.replace("+", ".");
        }
        return str;
    }

    //Format formula
    public static String formatFormula(String formula) {
        String resulf = "";
        if (formula.contains("*")) {
            resulf = formula.replace("*", "x");
        } else {
            resulf = formula;
        }
        if (resulf.contains(".")) {
            resulf = resulf.replace(".", ",");
        }
        return resulf;
    }
    public static void toMultiline(XWPFParagraph xwpfParagraph, String mText) {
        try {
            if (mText == null || mText.equals("")) {
                xwpfParagraph.getRuns().get(0).setText("", 0);
                return;
            }
            String[] txts = mText.replace("\r\n", "\n").split("\n");
            XWPFDocument doc = xwpfParagraph.getDocument();
            XmlCursor cursor = xwpfParagraph.getCTP().newCursor();
            for (String txt : txts) {
                XWPFParagraph newP = doc.createParagraph();
                newP.getCTP().setPPr(xwpfParagraph.getCTP().getPPr());
                String[] tabs = txt.split("\t");
                for(int i=0;i<tabs.length;i++){
                    XWPFRun newR = newP.createRun();
                    newR.getCTR().setRPr(xwpfParagraph.getRuns().get(0).getCTR().getRPr());
                    if(i>0)
                    {
                        CTR ctr = newR.getCTR();
                        ctr.addNewTab();
                    }
                    newR.setText(tabs[i]);
                }
                /*if (tabs.length > 1)
                    for (String tab : tabs) {
                        XWPFRun newR = newP.createRun();
                        newR.getCTR().setRPr(xwpfParagraph.getRuns().get(0).getCTR().getRPr());
                        newR.setText(tab);
                    }
                else {
                    XWPFRun newR = newP.createRun();
                    newR.getCTR().setRPr(xwpfParagraph.getRuns().get(0).getCTR().getRPr());
                    newR.setText(txt);
                }*/
                XmlCursor c2 = newP.getCTP().newCursor();
                c2.moveXml(cursor);
                c2.dispose();
            }
            cursor.removeXml();
            cursor.dispose();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
