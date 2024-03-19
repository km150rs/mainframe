package com.pjy.dashboard;

import org.springframework.boot.context.event.ApplicationStartingEvent;
import org.springframework.context.ApplicationListener;

public class AppStartingListener implements ApplicationListener<ApplicationStartingEvent> {

	@Override
	public void onApplicationEvent(ApplicationStartingEvent event) {
	System.out.println("=====================");
	System.out.println("Application starting");
	System.out.println("==================== =") ;
	}

	

}
