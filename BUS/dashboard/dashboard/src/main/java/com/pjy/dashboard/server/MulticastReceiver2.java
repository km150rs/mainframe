package com.pjy.dashboard.server;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.net.UnknownHostException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
@Component
public class MulticastReceiver2  {
	    protected MulticastSocket socket = null;
	    protected byte[] buf = new byte[256];
		Logger logger = LoggerFactory.getLogger(this.getClass());

	    public void start() {
			new Thread(()->{
	            logger.info("run...MulticastSocket");
		        try {
					socket = new MulticastSocket(6000);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		        InetAddress group = null;
				try {
					group = InetAddress.getByName("224.0.0.2");
				} catch (UnknownHostException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		        try {
					socket.joinGroup(group);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		        while (true) {
		            logger.info("wait...");
		            DatagramPacket packet = new DatagramPacket(buf, buf.length);
		            try {
						socket.receive(packet);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		            String received = new String(packet.getData(), 0, packet.getLength());
		            logger.info(received);
		            if ("end".equals(received)) {
		                break;
		            }
		        }
		        try {
					socket.leaveGroup(group);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		        socket.close();
		    }).start();			
	    }
	}
