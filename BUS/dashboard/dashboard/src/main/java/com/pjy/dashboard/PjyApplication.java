package com.pjy.dashboard;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionListener;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.listener.SessionListener;
@EnableAspectJAutoProxy
@SpringBootApplication
@Configuration
@EnableTransactionManagement(proxyTargetClass = true) 
@EnableScheduling
@ComponentScan(basePackages = {"com.pjy.dashboard","com.pjy.dashboard.core"})
//@EnableRedisHttpSession
//@MapperScan(basePackages="com.mtp.pjy.mapper", sqlSessionFactoryRef="nfossSqlSessionFactory")
//@EnableConfigurationProperties({AppProperties.class, CorsProperties.class})
//@MapperScan(basePackages="com.mtp.pjy.mapper")
@ServletComponentScan // @WebListener 스캔을 가능하도록
public class PjyApplication {  

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(PjyApplication.class);
		application.addListeners(new AppStartingListener());
 		application.addListeners(new AppStartedListener());
 		//application.addListeners(new SessionDestroyListener());
 		//application.addListeners(new SessionCreateListener());
 		application.run("args");
 		//ConfigurableApplicationContext context = application.run(args);
 		//NettyServer nettyServer = context.getBean(NettyServer.class);
        //nettyServer.start();

	}
	/*
	 * SpringBoot 세션타임 관리하는 방법
	 * server.session.timeout=(설정시간) not working
	 * 	@Bean
	public HttpSessionListener httpSessionListener(){
	    return new SessionListener();
	}	

	 */
	@Bean
	public ObjectMapper mapper() {
	  return new ObjectMapper();
	}
	@Bean
	public HttpSessionListener httpSessionListener(){
	    return new SessionListener();
	}	
    @GetMapping("/")
    @ResponseBody
    public String index(HttpSession session) {
        session.setAttribute("name", "sup2is");
        return session.getId() + "\nHello " + session.getAttribute("name");
    }
}

