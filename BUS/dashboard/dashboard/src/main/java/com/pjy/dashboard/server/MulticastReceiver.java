package com.pjy.dashboard.server;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import com.pjy.dashboard.core.util.UserBeanUtils;
import com.pjy.dashboard.koscomVo.KoscomCommonVo;
import com.pjy.dashboard.service.DynamicSqlService;
@Component
@PropertySource(value = "classpath:/pjy.properties")
public class MulticastReceiver extends Thread {
	    protected MulticastSocket socket = null;
	    protected byte[] buf = new byte[2000];
	    private boolean running;
		private Thread messageHandlerThread;

	    @Value("${mtr.koscomSise.port}")
		private int port ; 
	    @Value("${mtr.koscomSise.batchCommitCount}")
		private int batchCommitCount ; 
	    @Value("${mtr.koscomSise.multicast}")
		private String multicast_ip; 

		@Autowired
	    DynamicSqlService dynamicSqlService;
		
		Logger logger = LoggerFactory.getLogger(this.getClass());
		
		LinkedBlockingQueue<String> LBQ = new LinkedBlockingQueue<String>();

		Runnable handler = new Runnable() {
			@Override
			public void run() {
				ArrayList<String> sqlList = new ArrayList<>();
				
				while (running) {
					if (batchCommitCount == 1) {
						try {
							String recvPacket = LBQ.take();
							KoscomCommonVo commVo = new KoscomCommonVo();
							KoscomCommonVo vo = null;
							try {
								vo = (KoscomCommonVo) commVo.getClassVo(recvPacket);
							} catch (Exception e) {
								e.printStackTrace();
								continue;
							}

							if (vo != null) {
								//logger.info(recvPacket);
								//String sql = vo.getInsertQueryNew(recvPacket);
								//dynamicSqlService.excuteKoscomData(sql);
								//vo.convStringToVo(recvPacket);
								//logger.info(vo.getInitQuery());
							}
						} catch (Exception e) {
							continue;
						}
					} else {
						try {
							String recvPacket = LBQ.poll(100000,TimeUnit.MICROSECONDS);
							if (recvPacket == null) {
				                if( sqlList.size() > 0) {
									logger.info("timeout commit");
									try {
										//dynamicSqlService.BatchInsertKoscomData(sqlList.toArray(new String[sqlList.size()]));
									} catch (Exception e1) {
										e1.printStackTrace();
									}
									sqlList.clear();								
				                }
								continue;							
							}
							//logger.info("take : " + recvPacket);
							KoscomCommonVo commVo = new KoscomCommonVo();
							
							KoscomCommonVo vo = null;
							try {
								vo = (KoscomCommonVo) commVo.getClassVo(recvPacket);
							} catch (Exception e) {
								e.printStackTrace();
							}
	
							if (vo != null) {
								//String sql = vo.getInsertQueryNew(recvPacket);
								//sqlList.add(sql);
								
								// batchCommitCount 단위로 커밋
				                if( (sqlList.size() % batchCommitCount) == 0){
									logger.info("commit");
									try {
										//dynamicSqlService.BatchInsertKoscomData(sqlList.toArray(new String[sqlList.size()]));
									} catch (Exception e1) {
										e1.printStackTrace();
									}
									sqlList.clear();								
				                }
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		};
	    public void run() {
			logger.info("run...MulticastSocket:"+multicast_ip + port);
	        try {
				socket = new MulticastSocket(port);
			} catch (IOException e) {
				e.printStackTrace();
			}
	        InetAddress group = null;
			try {
				group = InetAddress.getByName(multicast_ip);
			} catch (UnknownHostException e) {
				e.printStackTrace();
			}
	        try {
				socket.joinGroup(group);
			} catch (IOException e) {
				e.printStackTrace();
			}
	        running = true;
			messageHandlerThread = new Thread(handler);
			messageHandlerThread.start();
			
			dynamicSqlService = (DynamicSqlService) UserBeanUtils.getBean("dynamicSqlService");
			
	        while (true) {
	            //logger.info("wait...");
	            DatagramPacket packet = new DatagramPacket(buf, buf.length);
	            try {
					socket.receive(packet);
				} catch (IOException e) {
					e.printStackTrace();
					break;
				}
	            String received = "";
				try {
					received = new String(packet.getData(),"EUC-KR");
	                LBQ.put(received);

				} catch (UnsupportedEncodingException | InterruptedException e) {
					e.printStackTrace();
					break;
				} 
	        }
	        running = false;
	        try {
				socket.leaveGroup(group);
			} catch (IOException e) {
				e.printStackTrace();
			}
	        socket.close();
            logger.info("close...");
	    }
	}
