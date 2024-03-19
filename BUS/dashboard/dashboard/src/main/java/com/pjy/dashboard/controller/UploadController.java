package com.pjy.dashboard.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Map;

import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.pjy.dashboard.service.MailService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Controller
public class UploadController {
	@Autowired
	private JavaMailSender sender;
    @Autowired
    MailService mailService;

 
    //Save the uploaded file to this folder
    private static String UPLOADED_FOLDER = "D:\\81.java_sample\\workspace-spring-tool-suite-4-4.5.1.RELEASE\\pjy\\aplog\\";
/*
    @GetMapping("/")
    public String index() {
        return "upload";
    }
*/
    @PostMapping("/upload") // //new annotation since 4.3
    @ResponseBody
    public ResponseEntity<Void> singleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return ResponseEntity.badRequest().build();
        }

        Path path = null;	
        try {

            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            e.printStackTrace();
        }
        MimeMessage message = sender.createMimeMessage();
        try {
          MimeMessageHelper helper = new MimeMessageHelper(message,true);
          
          helper.setTo("km150rs@kakao.com");
          helper.setSubject("test");
          helper.setText("test");
          
          FileSystemResource file2 = new FileSystemResource(new File(path.toString()));
          helper.addAttachment(MimeUtility.encodeText(file.getOriginalFilename(), "UTF-8", "B"), file2);
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
        
        return ResponseEntity.ok().build();
    }
    @ResponseBody
    @RequestMapping("/sendComplianceResult")
    public String sendComplianceResult() 
    {
    	mailService.sendComplianceResult();
        return "ok";
    }
    
    @GetMapping("/uploadStatus")
    public String uploadStatus() {
        return "uploadStatus";
    }



}