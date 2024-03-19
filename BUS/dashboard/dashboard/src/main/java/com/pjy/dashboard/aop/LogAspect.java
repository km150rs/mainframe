package com.pjy.dashboard.aop;

import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import com.pjy.dashboard.core.common.MtrProperties;
import com.pjy.dashboard.core.error.exception.ApiSessionExpiredException;
import com.pjy.dashboard.core.error.exception.BusinessException;
import com.pjy.dashboard.core.error.exception.ErrorCode;
import com.pjy.dashboard.service.DynamicSqlService;
 /*
  * 특정 메소드 실행 전, 실행 후, exception발생시 등 메소드 전 후의 특정 로직을 수행해야 할 경우
  * 활용할 수 있습니다.
  * 
  * controller, service, dao, mapper 등 모든곳에 적용가능
  * 
  * ex) 소스 변경으로 인한 영향도 없이 전체 페이지 진입로그를 저장해야할 경우
  * https://congsong.tistory.com/25?category=749196
  */
@Aspect
@Component
public class LogAspect {
    Logger logger =  LoggerFactory.getLogger(LogAspect.class);
    
    @Autowired
    private MtrProperties properties;
    
    @Autowired
    DynamicSqlService sqlService;
    /*
    @Pointcut("within(com.pjy.dashboard.controller.*)")
    private void componentMethodPointcut() {}
    
    @Before("componentMethodPointcut()")
    public void beforeComponentMethod(JoinPoint jp) {
      System.out.println("beforeComponentMethod " + jp.getSignature());
      for (Object parameter : jp.getArgs()) {
        System.out.println(parameter);
      }
    }
    @AfterReturning(value = "componentMethodPointcut()", returning = "obj")
    public void afterReturningComponentMethod(JoinPoint jp, Object obj) {
      System.out.println("afterAllMethod " + jp.getSignature());
      System.out.println("return: " + obj);
    }    
    
    @Around("componentMethodPointcut()")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
    	String inTime   = new java.text.SimpleDateFormat("HH:mm:ss").format(new java.util.Date());
    	
    	if (inTime.compareTo("07:40:00") < 0 || inTime.compareTo("20:00:00") > 0 ) {
    		throw new BusinessException("[시간확인]",ErrorCode.INVALID_TIME);
    	}
    	
        long start = System.nanoTime();
        try {
            Object result = joinPoint.proceed();
            return result;
        } finally {
            long finish = System.nanoTime();
            Signature sig = joinPoint.getSignature();
            
            logger.info("{}.{}({}) 실행 시간 : {} ns\n", joinPoint.getTarget().getClass().getSimpleName(), sig.getName(), Arrays.toString(joinPoint.getArgs()), (finish - start));
            logger.info(joinPoint.getTarget().getClass().getSimpleName());
            logger.info(sig.getName());
            logger.info(Arrays.toString(joinPoint.getArgs()));
            
            sqlService.insertLogAspect(inTime, joinPoint.getTarget().getClass().getSimpleName(), sig.getName(), Arrays.toString(joinPoint.getArgs()));
        }
    }
    */
    @Around("within(com.pjy.dashboard2.controller.*)")
    public Object  logging(ProceedingJoinPoint joinPoint) throws Throwable {
// 	   try {
// 			if (!sqlService.checkBackDate(0)) return "휴일";
// 		} catch (Exception e2) {
// 			// TODO Auto-generated catch block
// 			e2.printStackTrace();
// 			throw new BusinessException("[휴일체크]",ErrorCode.INVALID_TIME);
// 		}
    	
    	String inTime   = new java.text.SimpleDateFormat("HH:mm:ss").format(new java.util.Date());
    	
		String strTimeCheck = properties.getString("mtr.logAsspect.ControllerTimeCheck");
		String startTime = properties.getString("mtr.logAsspect.ControllerStartTime");
		String endTime   = properties.getString("mtr.logAsspect.ControllerEndTime");

		if (strTimeCheck.equals("true") == true ) {
	    	if (inTime.compareTo(startTime) < 0 || inTime.compareTo(endTime) > 0 ) {
	    		//mav = new ModelAndView("jsonView");
	    		//mav.addObject("data", new MessageVO(ErrorCode.INVALID_TIME, "/"));
	    		//mav.setViewName("thymeleaf/message.html");
	    		//return mav;
	    		throw new BusinessException("[시간확인]",ErrorCode.INVALID_TIME);
	    	}	
		}	
		
	    long start = System.nanoTime();
        try {
        	  Object result = joinPoint.proceed();
            return result;
        } finally {
        	try {
    			String strCheck = properties.getString("mtr.logAsspect.InsertLog");
	    		if (strCheck.equals("true") == true ) {
		            Signature sig = joinPoint.getSignature();
		            /*
		            logger.info("{}.{}({}) 실행 시간 : {} ns\n", joinPoint.getTarget().getClass().getSimpleName(), sig.getName(), Arrays.toString(joinPoint.getArgs()), (finish - start));
		            logger.info(joinPoint.getTarget().getClass().getSimpleName());
		            logger.info(sig.getName());
		            logger.info(Arrays.toString(joinPoint.getArgs()));
		
					// log 길이기 길면 오류날수 있음.
		            */
		            if (sig.getName().indexOf("dynamic") >= 0) {
		            	//sqlService.insertLogAspect(inTime, joinPoint.getTarget().getClass().getSimpleName(), sig.getName(), null);
		            } else {
		            	//sqlService.insertLogAspect(inTime, joinPoint.getTarget().getClass().getSimpleName(), sig.getName(), Arrays.toString(joinPoint.getArgs()));
		            }
	    		}
    	    } catch (Exception e) {
    			logger.error("properties error: " + e.getMessage());	    	
    	    }
        }
        /*
    	logger.info("start - " + pjp.getSignature().getDeclaringTypeName() + " / " + pjp.getSignature().getName());
        Object result = pjp.proceed();
        logger.info("finished - " + pjp.getSignature().getDeclaringTypeName() + " / " + pjp.getSignature().getName());
        return result;
        */
    }
    
    
    @Around("execution(public void org.springframework.security.web.FilterChainProxy.doFilter(..))")
    public void handleRequestRejectedException (ProceedingJoinPoint pjp) throws Throwable {
        try {
            pjp.proceed();
        } catch (RequestRejectedException e) {
        	//logger.error("RequestRejectedException error: " + e.getMessage());
            HttpServletResponse response = (HttpServletResponse) pjp.getArgs()[1];
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } catch (Exception e1) {
            HttpServletResponse response = (HttpServletResponse) pjp.getArgs()[1];
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    } 
 
}


