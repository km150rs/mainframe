package com.pjy.dashboard.core.common;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.PropertiesConfiguration;
import org.apache.commons.configuration2.builder.ReloadingFileBasedConfigurationBuilder;
import org.apache.commons.configuration2.builder.fluent.Parameters;
import org.apache.commons.configuration2.ex.ConfigurationException;
import org.apache.commons.configuration2.reloading.PeriodicReloadingTrigger;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Component  
public class MtrProperties {
    private ReloadingFileBasedConfigurationBuilder<PropertiesConfiguration> builder;
	
    @PostConstruct
    void init() {
        Parameters params = new Parameters();
        builder = new ReloadingFileBasedConfigurationBuilder<>(PropertiesConfiguration.class)
        		.configure(params.fileBased().setFile(new File("mtr.properties")));
        // property 요구시 event필요하면
//        builder.addEventListener(ConfigurationBuilderEvent.CONFIGURATION_REQUEST,new EventListener<Event>() {
//        	@Override
//        	public void onEvent(Event event) {
//        		log.info("properties event...");
//        	}
//        });
        
        PeriodicReloadingTrigger configReloadingTrigger = new PeriodicReloadingTrigger(
        builder.getReloadingController(), null, 3, TimeUnit.SECONDS); // 변경 감지를 시간을 설정
        configReloadingTrigger.start();
    }
    
    public Configuration getCompositeConfiguration() {
        try {
            return builder.getConfiguration();
        } catch (ConfigurationException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<String> getKeys() {
       Iterator<String> keys = getCompositeConfiguration().getKeys();
       List<String> keyList = new ArrayList<String>();
       while(keys.hasNext()) {
           keyList.add(keys.next());
       }
       return keyList;
    }
    public String getString(String key) throws UnsupportedEncodingException {
    	String a = getCompositeConfiguration().getString(key);
    	/*
    	String originalStr = a; 
    	String [] charSet = {"utf-8","euc-kr","ksc5601","iso-8859-1","x-windows-949"};
    	  
    	for (int i=0; i<charSet.length; i++) {
    		for (int j=0; j<charSet.length; j++) {
    			try {
    				log.info("[" + charSet[i] +"," + charSet[j] +"] = " + new String(originalStr.getBytes(charSet[i]), charSet[j]));
    			} catch (UnsupportedEncodingException e) {
    				e.printStackTrace();
    			}
    		}	  
    	}
    	*/
    	return new String(a.getBytes("ISO-8859-1"),"UTF-8");
    }

    public int getInt(String key) {
       return getCompositeConfiguration().getInt(key);
    }

    public void setProperty(String key, Object value) {
    	getCompositeConfiguration().setProperty(key, value);
    }

    
}