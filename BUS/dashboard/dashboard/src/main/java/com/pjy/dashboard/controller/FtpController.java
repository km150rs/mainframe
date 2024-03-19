package com.pjy.dashboard.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.SocketException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController

public class FtpController {
	 
	protected static String FTP_IP   = "172.21.12.117"; // FTP 접속지 IP
	protected static int    FTP_PORT = 21;             // FTP 접속지 Port
	protected static String FTP_ID1   = "kfoss1";        // ID
	protected static String FTP_PWD1  = "kfoss1";        // PASSWORD
	protected static String FTP_ID2   = "kfoss2";        // ID
	protected static String FTP_PWD2  = "kfoss2";        // PASSWORD
	protected static String FTP_PATH = "";

	protected static String DEV_FTP_IP   = "172.21.12.116"; // FTP 접속지 IP
	protected static int    DEV_FTP_PORT = 21;             // FTP 접속지 Port
	protected static String DEV_FTP_ID   = "kfoss";        // ID
	protected static String DEV_FTP_PWD  = "kfoss";        // PASSWORD
	
	FTPClient ftpclient          = null;
  
	public FtpController() {
	    ftpclient = new FTPClient();
	}

	// error log 파일 download
	@RequestMapping("/viewLog")
	public ResponseEntity<Resource> viewLog(@RequestParam("server_ip") String server_ip
											,@RequestParam("proc_ymd") String proc_ymd
											,@RequestParam("logFile") String logFile) 
			throws IOException 
	{
		String retFile="";
		boolean bRet = false;
    	if (server_ip.equals(FTP_IP)) {
    		bRet = connectFtp(server_ip,FTP_PORT,FTP_ID1, FTP_PWD1);     // FTP 로그인 
    	} else {
    		bRet = connectFtp(server_ip,FTP_PORT,FTP_ID2, FTP_PWD2);     // FTP 로그인 
    	}

    	
		if (bRet) {
			String remotePath = "/apframe/mtr/LOG/" + proc_ymd +"/" + logFile;
			String localPath = "aplog/" + logFile;
			
			retFile = downloadFile(remotePath,localPath);
			ftpclient.disconnect();
		} else {
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);			
		}
		  
		Path path = Paths.get(retFile);
		String contentType = Files.probeContentType(path);
			
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_TYPE, contentType);
		headers.add("Set-Cookie","fileDownload=true; path=/");
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + path.getFileName().toString());
			
		Resource resource = new InputStreamResource(Files.newInputStream(path));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}

	// Source 파일 download
	@RequestMapping("/viewSource")
	public ResponseEntity<Resource> viewSource(@RequestParam("svc_id") String svc_id
											,@RequestParam("log_id") String log_id) 
			throws IOException 
	{
		String retFile="";
		  
		if (connectFtp(DEV_FTP_IP,DEV_FTP_PORT,DEV_FTP_ID,DEV_FTP_PWD)) {
			
			String path1 = "kfoss";
			String path2 = "service";
			
			if (log_id.indexOf("gft") >= 0 || svc_id.indexOf("GSL") >= 0) {
				path1 = "gfoss";
			} 
			if (svc_id.indexOf("FSL") >= 0 || svc_id.indexOf("GSL") >= 0) {
				path2 = "library/src/" + svc_id.substring(0,5) + "/" + svc_id;
			} else {
				path2 = "service/" + svc_id.substring(1,3) + "/" + svc_id;
			}
				
			String remotePath = "/apframe/" + path1 + "/" + path2;
			String localPath = "aplog/" + path1 + "_" + svc_id;

			retFile = downloadFile(remotePath,localPath);
			ftpclient.disconnect();
		} else {
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);			
		}
		  
		Path path = Paths.get(retFile);
		String contentType = Files.probeContentType(path);
			
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_TYPE, contentType);
		headers.add("Set-Cookie","fileDownload=true; path=/");
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + path.getFileName().toString());
			
		Resource resource = new InputStreamResource(Files.newInputStream(path));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}	  
	public boolean connectFtp(String ip,int port,String id,String pwd) {
	    try {
	    	ftpclient.connect(ip, port);  // FTP 연결
    		ftpclient.login(id, pwd);     // FTP 로그인 
	    	log.info("FTP 연결 시도중");
			 
	    	int reply = ftpclient.getReplyCode(); // 연결후 응답확인
			 
	    	if(!FTPReply.isPositiveCompletion(reply)) {
	    		log.info("FTP 연결거부");
	    	} else {
	    		log.info("FTP 연결됨");
	    	}
	    } catch (SocketException e) {
	    	e.printStackTrace();
	    	return false;
	    } catch (IOException e) {
	    	if(ftpclient.isConnected()) {
	    		try {
		          ftpclient.disconnect();
		        } catch (IOException e1) {
		          e1.printStackTrace();
		        }
	    	}
	    	log.info("연결실패");
	    	e.printStackTrace();
	    	return false;
	    }
	    return true;
	  }	  
	  
	  public String downloadFile(String remotePath, String localPath) {
		  FileOutputStream out = null;
		  InputStream in = null;
		  File file = new File(localPath);
		  ftpclient.setBufferSize(1024000);
		  log.info("localPath   : " +  localPath);
		  log.info("remotePath  : " +  remotePath);
		  log.info("download : " +  file.getAbsolutePath());
		    
		  try {
			  in = ftpclient.retrieveFileStream(remotePath);  
		      out = new FileOutputStream(file);
			  byte[] bytesIn = new byte[1024*8];

		      int i;
			  while((i = in.read(bytesIn)) != -1) {
				  out.write(bytesIn, 0, i);
			  }
		  } catch (IOException e) {
		      log.info("파일 가져오기 실패");
		      e.printStackTrace();
		      return "파일 가져오기 실패";
		  } finally {
		      try {
		        out.close();
		        in.close();
		      } catch (IOException e) {
		        e.printStackTrace();
		      }
		  }
		  log.info("파일 가져오기 성공");
		   
		  return file.getAbsolutePath();
	  }	  
}
