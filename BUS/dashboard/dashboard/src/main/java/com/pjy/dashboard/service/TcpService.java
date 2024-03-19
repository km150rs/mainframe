package com.pjy.dashboard.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class TcpService {
    @Value("${mtr.spLogServer.port}")
    private int spLogServerPort;
    @Value("${mtr.logChecker.port}")
    private int mtrLogCheckerPort;


	public String sendToLogServer(@RequestParam("server_ip") String server_ip
			,@RequestParam("key") String key
			,@RequestParam("value") String value) 
		throws IOException 
	{
		String sendData = key + ";;;" + value;
		String hostname = server_ip;
		String recvData = "";
		int port = mtrLogCheckerPort;
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
			//log.info("Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
			//log.info("I/O error: " + ex.getMessage());
		} 
		return recvData;	
	}
	
	public String sendToSpLogServer(@RequestParam("server_ip") String server_ip
									,@RequestParam("title") String title
									,@RequestParam("body") String body) 
			throws IOException 
	{
		String sendData = title + ";;;" + body;
		String hostname = server_ip;
	    String recvData = "";
		int port = spLogServerPort;
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
		    //log.info("Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
		    //log.info("I/O error: " + ex.getMessage());
		} 
        return recvData;	
	}

	
	public String viewLauncherDetail(@RequestParam("server_ip") String server_ip
											,@RequestParam("logFile") String logFile
											,@RequestParam("proc_ymd") String proc_ymd
											,@RequestParam("colCount") int colCount) 
			throws IOException 
	{
		String sendData = null;
		
		if (proc_ymd == null || proc_ymd.isEmpty())
			sendData = "dashboard;;;" + logFile ;
		else
			sendData = "dashboard;;;" + logFile + ";;;" + proc_ymd;
		
		String hostname = server_ip;
	    String recvData = "";
		int port = mtrLogCheckerPort;
		
		//log.info("sendData:[" + sendData+"]");
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
		    //log.info("Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
		    //log.info("I/O error: " + ex.getMessage());
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
	
	public boolean isWorkingTime() {
		String inTime   = new java.text.SimpleDateFormat("HH:mm:ss").format(new java.util.Date());
		
		if (inTime.compareTo("08:10:00") < 0 && inTime.compareTo("18:00:00") >= 0 ) { 
			return false;
		}		
		return true;
	}
	// runShell
	public String runShell(@RequestParam("server_ip") String server_ip
											,@RequestParam("proc_ymd") String proc_ymd
											,@RequestParam("logFile") String logFile) 
			throws IOException 
	{
		String sendData = null;
		if (proc_ymd == null || proc_ymd.isEmpty())
			sendData = "dashboard;;;" + logFile ;
		else
			sendData = "dashboard;;;" + logFile + ";;;" + proc_ymd;
			
		String hostname = server_ip;
	    String recvData = "";
		int port = mtrLogCheckerPort;
		
		try (Socket socket = new Socket(hostname, port)) { 
		    OutputStream output = socket.getOutputStream();
		    PrintWriter writer = new PrintWriter(output, true);
		    
		    writer.println(sendData);
		    InputStream input = socket.getInputStream();
		    BufferedReader reader = new BufferedReader(new InputStreamReader(input,Charset.forName("UTF-8")));
		    while ((recvData = reader.readLine()) != null) { 
		        break;
		    } 
		} catch (UnknownHostException ex) { 
		    //log.info("Server not found: " + ex.getMessage());
		} catch (IOException ex) { 
		    //log.info("I/O error: " + ex.getMessage());
		    return "error";
		} 
		return recvData;	
	}		
}
