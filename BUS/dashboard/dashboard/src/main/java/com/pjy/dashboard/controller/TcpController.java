package com.pjy.dashboard.controller;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.nio.charset.Charset;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.service.TcpService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@PropertySource(value = "classpath:/pjy.properties")
public class TcpController {
    @Value("${mtr.logChecker.port}")
    private int logCheckerPort;

    @Value("${netty.koscomApi.port}")
    private int koscomApiPort;
    private static final int BUFF_SIZE = 4 * 1024 * 1024;
    
    @Autowired
    TcpService tcpService;
    
	public TcpController() {
	}

	// viewLauncherInfo
	@RequestMapping("/loginTestAD")
	public String loginTestAD() 
			throws IOException 
	{
		 return tcpService.sendToSpLogServer("172.21.12.117", "adAuth", "ldap://172.21.12.201:389;mtr.rpa;F9AAC81755B183DF8507F6B377D20885");
	}
	
	@RequestMapping("/viewSendToLogServer")
	public String sendToLogServer(@RequestParam("server_ip") String server_ip
			,@RequestParam("key") String key,@RequestParam("value") String value) 
	throws IOException 
	{
		 return tcpService.sendToLogServer(server_ip, key, value);	
	}
	@RequestMapping("/viewLauncherInfo")
	public String viewLauncherInfo(@RequestParam("server_ip") String server_ip
											,@RequestParam("logFile") String logFile) 
			throws IOException 
	{
		if (!tcpService.isWorkingTime())
			return "error";

		String sendData ="lancherInfo;;;" + logFile;
		String hostname = server_ip;
	    String recvData = "";
		int port = logCheckerPort;
		try (Socket socket = new Socket(hostname, port)) { 
		    OutputStream output = socket.getOutputStream();
		    PrintWriter writer = new PrintWriter(output, true);
		    
		    writer.println(sendData);
		    InputStream input = socket.getInputStream();
		    BufferedReader reader = new BufferedReader(new InputStreamReader(input));
		    while ((recvData = reader.readLine()) != null) { 
		        //log.info(recvData);
		        break;
		    } 
		} catch (UnknownHostException ex) { 
		    log.error("viewLauncherInfo Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
		    //log.error("viewLauncherInfo I/O error: " + ex.getMessage());
		} 
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm");
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy/MM/dd HH:mm");
		try {
			Date date = sdf.parse(recvData);
			recvData = sdf2.format(date);
		} catch (ParseException e) {
			log.info("I/O error: " + e.getMessage());
		}
        return recvData;	
	}

	// viewLauncherInfo
	@RequestMapping("/runShellGrid")
	public String viewLauncherDetail(@RequestParam("server_ip") String server_ip
											,@RequestParam("logFile") String logFile
											,@RequestParam("proc_ymd") String proc_ymd
											,@RequestParam("colCount") int colCount) 
			throws IOException 
	{
		if (!tcpService.isWorkingTime())
			return "error";
		
		String sendData = null;
		
		if (proc_ymd.isEmpty())
			sendData = "dashboard;;;" + logFile ;
		else
			sendData = "dashboard;;;" + logFile + ";;;" + proc_ymd;
		
		String hostname = server_ip;
	    String recvData = "";
		int port = logCheckerPort;
		
		log.info("sendData:[" + sendData+"]");
		List<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();

		try (Socket socket = new Socket(hostname, port)) { 
		    OutputStream output = socket.getOutputStream();
		    PrintWriter writer = new PrintWriter(output, true);
		    
		    writer.println(sendData);
		    InputStream input = socket.getInputStream();
		    BufferedReader reader = new BufferedReader(new InputStreamReader(input,Charset.forName("UTF-8")));
		    while ((recvData = reader.readLine()) != null) { 
		        //log.info(recvData);
		        break;
		    } 
		} catch (UnknownHostException ex) { 
		    log.error("runShellGrid Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
		    //log.error("runShellGrid I/O error: " + ex.getMessage());
		    return "error";
		} 
		//log.info("recv:[" + recvData + "]");

		if (recvData.isEmpty()) {
/*	    	HashMap<String, String> map = new HashMap<String,String>();
		    for(int j=0;j<colCount;j++) {
		    	map.put("data"+j, "");
		    }
	    	list.add(map);
	        ObjectMapper mapper = new ObjectMapper();
			String jsonStr = mapper.writeValueAsString(list);
			return jsonStr;
*/			
			return "[]";
		}
		
		String[] array = recvData.split(";");
		//String yy,mm,dd,tt = "";
		//String today = new java.text.SimpleDateFormat("yyyy").format(new java.util.Date());

		//log.info("length", array.length);
		
	    for(int i=0;i<array.length;i++) {
	    	HashMap<String, String> map = new HashMap<String,String>();
	    	String[] resultSet = array[i].split(" ");	
		    for(int j=0;j<colCount;j++) {
		    	if (resultSet.length > j)
		    		map.put("data"+j, resultSet[j]);
		    	else 
		    		map.put("data"+j, "");
		    }
/*	    	
	    	mm = array[i].split(" ")[1].replace("월","");
   	    	dd = array[i].split(" ")[2].replace("일","");
   	    	yy = array[i].split(" ")[3];
	    			
   	    	if (yy.indexOf(":") > 0 ) {
   	    		tt = yy;
   	    		yy = today;
   	    	} else {
   	    		tt = "00:00";
   	    	}
   	    			
   	    	map.put("data1", String.format("%s/%02d/%02d %s", yy,Integer.parseInt(mm),Integer.parseInt(dd),tt));
   	    	*/
	    	list.add(map);
	    }
        ObjectMapper mapper = new ObjectMapper();
		String jsonStr = mapper.writeValueAsString(list);
		 //log.info("I/O error: " + jsonStr);
		
        return jsonStr;	
	}	

	// viewLauncherInfo
	@RequestMapping("/runShell")
	public String runShell(@RequestParam("server_ip") String server_ip
											,@RequestParam("proc_ymd") String proc_ymd
											,@RequestParam("logFile") String logFile) 
			throws IOException 
	{
		if (!tcpService.isWorkingTime())
			return "error";
					
		
		String sendData = null;
		if (proc_ymd.isEmpty())
			sendData = "dashboard;;;" + logFile ;
		else
			sendData = "dashboard;;;" + logFile + ";;;" + proc_ymd;
			
		String hostname = server_ip;
	    String recvData = "";
		int port = logCheckerPort;
		
		//List<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();

		try (Socket socket = new Socket(hostname, port)) { 
		    OutputStream output = socket.getOutputStream();
		    PrintWriter writer = new PrintWriter(output, true);
		    
		    writer.println(sendData);
		    InputStream input = socket.getInputStream();
		    BufferedReader reader = new BufferedReader(new InputStreamReader(input,Charset.forName("UTF-8")));
		    while ((recvData = reader.readLine()) != null) { 
		        //log.info(recvData);
		        break;
		    } 
		} catch (UnknownHostException ex) { 
		    log.error("runShell Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
		    //log.error("runShell I/O error: " + ex.getMessage());
		    return "error";
		} 
		//log.info("recv:[" + recvData + "]");
		//recvData = recvData.replaceAll(";", "<br>");
		return recvData;	
		//return recvData.replace(";", "");
	}	

	@RequestMapping("/textfile")
    public StreamingResponseBody handleRequest (@RequestParam("server_ip") String server_ip
			,@RequestParam("proc_ymd") String proc_ymd
			,@RequestParam("logFile") String logFile) 
		throws IOException 
	{

        return new StreamingResponseBody() {
            @Override
            public void writeTo (OutputStream out) throws IOException {
    			String sendData = null;
    			if (proc_ymd.isEmpty())
    				sendData = "dashboardFile;;;" + logFile ;
    			else
    				sendData = "dashboardFile;;;" + logFile + ";;;" + proc_ymd;
    				
    			String hostname = server_ip;
    		    String recvData = "";
    			int port = logCheckerPort;
    			
    			//List<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();
    			log.info("send:[" + sendData + "]");

    			try (Socket socket = new Socket(hostname, port)) { 
    			    OutputStream output = socket.getOutputStream();
    			    PrintWriter writer = new PrintWriter(output, true);
    			    
    			    writer.println(sendData);
    			    InputStream input = socket.getInputStream();
    			    BufferedReader reader = new BufferedReader(new InputStreamReader(input,Charset.forName("UTF-8")));
    			    recvData = reader.readLine();
    			    StringTokenizer st = new StringTokenizer(recvData,"\n");
    			    while(st.hasMoreTokens()) { 
    			    	out.write(st.nextToken().getBytes());
    			    	//out.flush();
                        try {
                            Thread.sleep(1);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
    			    }
//    			    while ((recvData = reader.readLine()) != null) { 
//    			        log.info("receive len:{}",recvData.length());
//    			        break;
//    			    }
    			} catch (UnknownHostException ex) { 
    			    log.error("textfile Server not found: " + ex.getMessage());
    			} catch (IOException ex) { 
    			    log.error("textfile I/O error: " + ex.getMessage());
    			} 
    			log.info("recv:[" + recvData.length() + "]");		  
            }
        };
    }	
	@GetMapping("/textfile2")
	public ResponseEntity<StreamingResponseBody> streamContentAsFile(@RequestParam("server_ip") String server_ip
			,@RequestParam("proc_ymd") String proc_ymd
			,@RequestParam("logFile") String logFile) 
		throws IOException 
	{

		
	  StreamingResponseBody responseBody = response -> {
			String sendData = null;
			if (proc_ymd.isEmpty())
				sendData = "dashboardFile;;;" + logFile ;
			else
				sendData = "dashboardFile;;;" + logFile + ";;;" + proc_ymd;
				
			String hostname = server_ip;
		    String recvData = "";
			int port = logCheckerPort;
			
			//List<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();
			log.info("send:[" + sendData + "]");

			try (Socket socket = new Socket(hostname, port)) { 
			    OutputStream output = socket.getOutputStream();
			    PrintWriter writer = new PrintWriter(output, true);
			    
			    writer.println(sendData);
			    InputStream input = socket.getInputStream();
			    BufferedReader reader = new BufferedReader(new InputStreamReader(input,Charset.forName("UTF-8")));
			    recvData = reader.readLine();
			    StringTokenizer st = new StringTokenizer(recvData,"\n");
			    while(st.hasMoreTokens()) { 
			        response.write(st.nextToken().getBytes());
			        response.flush();
			    }
//			    while ((recvData = reader.readLine()) != null) { 
//			        log.info("receive len:{}",recvData.length());
//			        break;
//			    }
			} catch (UnknownHostException ex) { 
			    log.error("textfile2 Server not found: " + ex.getMessage());
			} catch (IOException ex) { 
			    log.error("textfile2 I/O error: " + ex.getMessage());
			} 
			log.info("recv:[" + recvData.length() + "]");		  
//	        response.write(recvData.getBytes());
	        //response.flush();
	  };
	  return ResponseEntity.ok()
	        //.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=test_data.txt")
	        .contentType(MediaType.TEXT_PLAIN)
	        .body(responseBody);
	}	
	// viewLauncherInfo
	@RequestMapping("/runShellFile")
	public String runShellFile(@RequestParam("server_ip") String server_ip
											,@RequestParam("proc_ymd") String proc_ymd
											,@RequestParam("logFile") String logFile) 
			throws IOException 
	{
		if (!tcpService.isWorkingTime())
			return "error";
		
		String sendData = null;
		if (proc_ymd.isEmpty())
			sendData = "dashboardFile;;;" + logFile ;
		else
			sendData = "dashboardFile;;;" + logFile + ";;;" + proc_ymd;
			
		String hostname = server_ip;
	    String recvData = "";
		int port = logCheckerPort;
		
		//List<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();
		log.info("send:[" + sendData + "]");

		try (Socket socket = new Socket(hostname, port)) { 
		    OutputStream output = socket.getOutputStream();
		    PrintWriter writer = new PrintWriter(output, true);
		    
		    writer.println(sendData);
		    InputStream input = socket.getInputStream();
		    BufferedReader reader = new BufferedReader(new InputStreamReader(input,Charset.forName("UTF-8")));
		    while ((recvData = reader.readLine()) != null) { 
		        //log.info(recvData);
		        break;
		    }
		} catch (UnknownHostException ex) { 
		    log.error("runShellFile Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
		    //log.error("runShellFile I/O error: " + ex.getMessage());
		    return "error";
		} 
		log.info("recv:[" + recvData.length() + "]");
		//recvData = recvData.replaceAll(";", "<br>");
		return recvData;	
		//return recvData.replace(";", "");
	}		
	// viewLauncherInfo
	@RequestMapping("/runShellFile2")
	public String runShellFile2(@RequestParam("server_ip") String server_ip
											,@RequestParam("proc_ymd") String proc_ymd
											,@RequestParam("logFile") String logFile) 
			throws IOException 
	{
		if (!tcpService.isWorkingTime())
			return "error";
		
		String sendData = null;
		if (proc_ymd.isEmpty())
			sendData = "dashboardFile2;;;" + logFile ;
		else
			sendData = "dashboardFile2;;;" + logFile + ";;;" + proc_ymd;
			
		String hostname = server_ip;
	    String recvData = "";
		int port = logCheckerPort;
		
		//List<HashMap<String,String>> list = new ArrayList<HashMap<String,String>>();

		try (Socket socket = new Socket(hostname, port)) { 
		    OutputStream output = socket.getOutputStream();
		    PrintWriter writer = new PrintWriter(output, true);
		    
		    writer.println(sendData);
		    InputStream in = socket.getInputStream();

		    ByteArrayOutputStream baos = new ByteArrayOutputStream();
		    byte[] buffer = new byte[BUFF_SIZE];
            int len;
            while ((len = in.read(buffer)) == 0)  { // calls SocketInputStream.read(byte[], int, int);
            	log.info("len:{}",len);
            	baos.write(buffer, 0, len);
            }
            
            log.info("size{},{}", baos.size(),baos.toString());
		} catch (UnknownHostException ex) { 
		    log.error("runShellFile2 Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
		    //log.error("runShellFile2 I/O error: " + ex.getMessage());
		    return "error";
		} 
		//log.info("recv:[" + recvData + "]");
		//recvData = recvData.replaceAll(";", "<br>");
		return recvData;	
		//return recvData.replace(";", "");
	}			
	// koscomApiInfo
	@RequestMapping("/koscomApiInfo")
	public String koscomApiInfo(@RequestParam("server_ip") String server_ip,
								@RequestParam("port") int server_port) 
			throws IOException 
	{
		if (!tcpService.isWorkingTime())
			return "breakTime";		
		
		String sendData ="ORACLE&bond_cd=KR101501D843&settle_date=20200812&bond_rate=000.868&data_gubun=3";
		String hostname = server_ip;
	    String recvData = "";
		int port = server_port;
		
		if (server_ip.equals("127.0.0.1"))
			port = koscomApiPort;
		
		try (Socket socket = new Socket(hostname, port)) { 
		    OutputStream output = socket.getOutputStream();
		    PrintWriter writer = new PrintWriter(output, true);
		    
		    writer.println(sendData);
		    InputStream input = socket.getInputStream();
		    BufferedReader reader = new BufferedReader(new InputStreamReader(input));
		    while ((recvData = reader.readLine()) != null) { 
		        //log.info(recvData);
		        break;
		    } 
		} catch (UnknownHostException ex) { 
		    log.error("koscomApiInfo Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
		    //log.error("koscomApiInfo I/O error: " + ex.getMessage());
		} 

        return recvData;	
	}	
}
