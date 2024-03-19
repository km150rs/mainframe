package com.pjy.dashboard.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Map;

import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.pjy.dashboard.core.util.ServletUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MailService {
	@Autowired
	private JavaMailSender sender;

    @Autowired
    DynamicSqlService dynamicSqlService;
    
	private String m_strTrDate;
    private String UPLOADED_FOLDER = "D:\\81.java_sample\\workspace-spring-tool-suite-4-4.5.1.RELEASE\\pjy\\aplog\\";

    public String saveExcel(Workbook wb,String gubun){
        String strFileName = "tax_" + m_strTrDate + ".xlsx";
        try {
            log.debug("create output file : " + UPLOADED_FOLDER + strFileName);
            File xlsFile = new File(UPLOADED_FOLDER + strFileName);
            log.debug("output end : " + UPLOADED_FOLDER + strFileName);

            FileOutputStream fileOut = new FileOutputStream(xlsFile);
            wb.write(fileOut);
            fileOut.close();
        } catch (FileNotFoundException e) {
        	log.error("saveExcel exception: " + e.getMessage());
            e.printStackTrace();
        } catch (IOException e) {
        	log.error("saveExcel exception: " + e.getMessage());
            e.printStackTrace();
        }
        return strFileName;
    }

    public String sendTaxMail(String trDate,boolean bSchedule)    {
    	// scheduler 호출인면 월말 check
    	if (bSchedule) {
    		if (!ServletUtil.isLastDate(trDate)) return "pass";
    	}

    	try {
        	String fileName = makeExcel(trDate);
        	sendMail(fileName);		
		} catch (Exception e) {
			log.error(e.getMessage());
			return "error";
		}
    	return "ok";
    }

    public String makeExcel(String trDate)    throws  IOException {
        this.m_strTrDate     = trDate;
        log.info(m_strTrDate);
        
        String fileName = "";
        fileName = UPLOADED_FOLDER + "tax_template.xlsx";
        log.info(fileName);

        try {
            XSSFWorkbook book = new XSSFWorkbook(new FileInputStream(new File(fileName)));
            XSSFSheet sheet1 = book.getSheetAt(0);
            
            createSheet_Variable_1(book,sheet1);
            
            book.setForceFormulaRecalculation(true);
            fileName = saveExcel(book,fileName);
            book.close();
        } catch(IOException e){
            log.error("Server exception:: " + e.getMessage());
            e.printStackTrace();
        } finally{
        }        
        return fileName;

    }

    public void createSheet_Variable_1(XSSFWorkbook xlsWb,XSSFSheet sheet)    throws  IOException {

        try {
            Cell cell = null;
            
            cell = sheet.getRow(38).getCell(1);
            cell.setCellValue(m_strTrDate.substring(0,4));

            cell = sheet.getRow(38).getCell(3);
            cell.setCellValue(m_strTrDate.substring(4,6));

            cell = sheet.getRow(38).getCell(4);
            cell.setCellValue(m_strTrDate.substring(6,8));
        } catch(Exception e){
            log.error("Server exception:: " + e.getMessage());
            e.printStackTrace();
        } finally{
        }        
    }
    
    public void sendMail(String fileName) {
        Path path = null;	
        try {

            // Get the file and save it somewhere
            path = Paths.get(UPLOADED_FOLDER + fileName);

        } catch (Exception e) {
            e.printStackTrace();
        }

        MimeMessage message = sender.createMimeMessage();
        try {
          MimeMessageHelper helper = new MimeMessageHelper(message,true);
          
          helper.setTo("magi.mtr.dev4@miraeasset.com");
          helper.setSubject("tax");
          helper.setText("안녕하세요 박준영입니다. \n\n" +
        		  m_strTrDate.substring(0,4) + "년 " +	
        		  m_strTrDate.substring(4,6) + "월분 세금계산서 입니다. \n\n수고하세요" );
          
          FileSystemResource file2 = new FileSystemResource(new File(path.toString()));
          helper.addAttachment(MimeUtility.encodeText(fileName, "UTF-8", "B"), file2);
        } catch (MessagingException e) {
          e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (javax.mail.MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
        sender.send(message);        	
    }
    public String sendComplianceResult() 
	{
    	String body = null;
    	try {
    		//Collection<Map<String, Object>> rec  = (Collection<Map<String, Object>>) dynamicSqlService.getSqlFilterNoHeader("172.29.41.102","getComplianceResult","a");
	
			//for (Map<String, Object> map : rec) {
			//	body = (String) map.get("text");
			//	log.info("{}", map.get("text"));
			//}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
    	MimeMessage message = sender.createMimeMessage();
    	try {
    		MimeMessageHelper helper = new MimeMessageHelper(message,true);
	
    		helper.setTo("magi.mtr.dev4@miraeasset.com");
    		helper.setSubject("compliance Result");
    		helper.setText(body,true);
	
    		//	FileSystemResource file2 = new FileSystemResource(new File(path.toString()));
    		//		helper.addAttachment(MimeUtility.encodeText(file.getOriginalFilename(), "UTF-8", "B"), file2);
    	} catch (MessagingException e) {
    		e.printStackTrace();
    	} catch (javax.mail.MessagingException e) {
    		// 	TODO Auto-generated catch block
    		e.printStackTrace();
    	}
	
    	sender.send(message);
    	return "ok";
	}
    
}
