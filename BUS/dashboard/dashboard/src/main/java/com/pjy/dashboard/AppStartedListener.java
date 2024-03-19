package com.pjy.dashboard;

import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;

import lombok.extern.slf4j.Slf4j;
@Slf4j
public class AppStartedListener implements ApplicationListener<ApplicationStartedEvent> {

	@Override
	public void onApplicationEvent(ApplicationStartedEvent event) {
		log.info("=====================");
		log.info("Application started");
		log.info("=====================");

		ConfigurableApplicationContext context = event.getApplicationContext();

		//log.info("KoscomSiseBroker(koscom 시세수신 후 DB/memory 처리) init =====================");
		//KoscomSiseBroker.getInstance().init();
		
		//log.info("MtrErrorLogServer(mtr service log DB 처리) =====================");
		//MtrErrorLogBroker.getInstance().init();

		//log.info("Mtr NFOSS DB 쿼리  (속도향상을위해 주기적으로 query) =====================");
		//보성막음
		//MtrQueryBroker.getInstance().init();

		//log.info("MtrErrorLogServer(mtr service log 수신처리) =====================");
 		//MtrErrorLogServer nettyServer = context.getBean(MtrErrorLogServer.class);
        //nettyServer.start();

		//log.info("KoscomApiServer(koscom 채권단가 api) =====================");
        //KoscomApiServer koscomServer = context.getBean(KoscomApiServer.class);
 		//koscomServer.start();
 		
		//log.info("koscom 시세수신(udp 수신 처리) =====================");
 		// Unicast로는 udp 수신가능
 		//new BootNettyUdpServer().bind();
 		/*
        new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    new BootNettyUdpServer().bind();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

        }).start();
        */
 		/*
 		 * 224.0.1.x 는 router setting 해야만 수신가능
 		 * */
/*
 		MulticastReceiver multicastReceiver = context.getBean(MulticastReceiver.class);
 		Thread multicastThread = new Thread(multicastReceiver);
 		multicastThread.start();
*/ 		
 		/*
 		Thread thread;
 		thread = new MulticastReceiver();
 		thread.start();
		*/
 		
 		
		/* 사용안함
		SessionBroker.getInstance().init();
		try {
			EventMaker.getInstance().init();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace() ;
		}
		*/
	}

 
	

}
