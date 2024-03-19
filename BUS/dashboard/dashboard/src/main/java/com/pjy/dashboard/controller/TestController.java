package com.pjy.dashboard.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.pjy.dashboard.core.dao.jpa.h2.FileRepository;
import com.pjy.dashboard.core.domain.security.FileEntity;
import com.pjy.dashboard.core.domain.security.MemberVo;
import com.pjy.dashboard.core.domain.security.UserCustomVo;
import com.pjy.dashboard.core.util.ServletUtil;
import com.pjy.dashboard.domain.AttendanceInfoVo;
import com.pjy.dashboard.domain.CommonCodeVo;
import com.pjy.dashboard.domain.HolidayInfoVo;
import com.pjy.dashboard.domain.MessageVO;
import com.pjy.dashboard.service.DynamicSqlService;
import com.pjy.dashboard.service.FileService;
import com.pjy.dashboard.service.MemberService;
import com.pjy.dashboard.util.HolidayApiUtil;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
/*
	@RestController annotation을 붙여주면 그대로 Restful API 를 사용하는 Controller 가 되고, 
	따라서 각 Request Mapping 에 적어준 url 이 호출될 때 마다 Return 으로 적어준 내용이 반환된다. 여기서는 String 으로 return 해 주므로, 그대로 내용이 보이고, 
	만약 method 에 return 이 List<String> 과 같은 형태라면 json 배열 형태의 내용이 화면에 보일 것이다. 
	
	이 부분은 Response body 를 알아서 handle해 주는 것이 Spring에 포함되어 있다. 
	또한 String 앞에 @ResponseBody 를 명시하지 않아도 정상 동작하는 이유는 @RestController 에 @ResponseBody 가 포함되어 있기 때문이다. 
	
	이 부분은 다음으로 설명할 @Controller 에서는 반드시 명시해주어야 하는 것과 일맥하여 중요하게 알아 두어야 할 부분이다. 
	(즉, @Controller 에서는 일반 String 을 return 하기 위해서(ajax 에 대한 응답)는 반드시 @ResponseBody 를 적어 주어야 한다)
	
	출처: https://4urdev.tistory.com/45?category=761752 [Simplify]
	
	@Controller 와 @RestController 의 차이
	@Controller
		API와 view를 동시에 사용하는 경우에 사용
		대신 API 서비스로 사용하는 경우는 @ResponseBody를 사용하여 객체를 반환한다.
		view(화면) return이 주목적
	@RestController
		view가 필요없는 API만 지원하는 서비스에서 사용 (Spring 4.0.1부터 제공)
	
	@RequestMapping 메서드가 기본적으로 @ResponseBody 의미를 가정한다.
		data(json, xml 등) return이 주목적
		즉, @RestController = @Controller + @ResponseBody

	https://gmlwjd9405.github.io/2018/12/02/spring-annotation-types.html
	
*/	

public class TestController {

    @Autowired
    private MemberService memberService;

    @Autowired
    DynamicSqlService dynamicSqlService;
    
    @Autowired 
    FileService fileService;
    @Autowired 
    FileRepository fileRepository;

    @Value("${file.output.dir}")
    private String fileOutputDir;
    
    @Value("${file.templete.dir}")
    private String fileTempleteDir;    
    /*
	 * redis server install : https://github.com/MicrosoftArchive/redis/releases
	 * 설치 후 명령어 실행  :  C:\Program Files\Redis\redis-cli.exe 
	 */
    @GetMapping("hello")
    public String hello(HttpSession session) {
	    session.setAttribute("hello", "eric");
	    return "hello eric!";
    }


    /*
     * nav.js에서 timer로 session check
     */
    @GetMapping("/proxy_check-session")
    @ResponseBody
    //public ResponseEntity<String> checkSession(@AuthenticationPrincipal UserCustomVo loginAccount, HttpSession session,ModelAndView  model) {
    public ModelAndView checkSession(@AuthenticationPrincipal UserCustomVo loginAccount, HttpSession session,ModelAndView  model) {
        if(loginAccount == null) {
            //return ResponseEntity.badRequest().build();
        	return null;
        }
        
        // 세션의 남은 시간을 초 단위로 가져옵니다.
        //log.info("sessionId = {}", session.getId());
        //log.info("getMaxInactiveInterval={}", session.getMaxInactiveInterval());
        //log.info("creationTime={}", new Date(session.getCreationTime()));
        //log.info("lastAccessTime={}", new Date(session.getLastAccessedTime()));
        long creationTime = new Date(session.getCreationTime()).getTime();
        long lastAccessedTime = new Date(session.getLastAccessedTime()).getTime();
        // 비교 
		long diff = lastAccessedTime - creationTime;
		long diffSec = diff / 1000;
		
		// server.servlet.session.timeout(초) 초과여부 check
		if (diffSec > session.getMaxInactiveInterval()) {
			model.addObject("data", new MessageVO("session이 종료되었습니다.", "/expired"));
		} else {
			return  null;
		}
		//model.setViewName("thymeleaf/message.html");
        
        return model;
    }    
		/*
		 * // 비밀번호 변경 페이지 JSP에서 처리 /modify
		 * 
		 * @GetMapping("/modifyPassword") public String moldifyPassword(String username,
		 * HttpSession session) { Map<String, Object> authStatus = (Map<String, Object>)
		 * session.getAttribute("authStatus");
		 * 
		 * if(authStatus == null || !username.equals(authStatus.get("username"))) {
		 * return "redirect:/find/password"; }
		 * 
		 * // 페이지에 왔을때 인증이 안되있다면 if(!(boolean) authStatus.get("status")) { return
		 * "redirect:/find/password"; } return "userInfo/modify"; }
		 */
	  
	// 비밀번호 변경
    // 호출안됨 jspController에서 처리
    @PatchMapping("/modifyPassword")
    public ResponseEntity<String> modifyPassword(String password, HttpSession session,@AuthenticationPrincipal UserCustomVo principalDetail) throws Exception {
    	Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
	    	
    	String id = ahAuthentication.getName();

    	MemberVo vo =  memberService.readMember(id,principalDetail.getCompanyNo());
    	// 비밀번호 암호화
    	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    	vo.setPassword(passwordEncoder.encode(password));

    	memberService.updatePassword(vo);
	        
    	session.setMaxInactiveInterval(0);
    	session.setAttribute("authStatus", null);
    	return new ResponseEntity<String>("비밀번호를 변경했습니다",HttpStatus.OK);
    }
	// 비밀번호 확인
    @RequestMapping("/checkPassword")
    public String checkPassword(@RequestParam ("pwd") String pwd, HttpSession session,@AuthenticationPrincipal UserCustomVo principalDetail) throws Exception {
    	Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
	    	
    	String id = ahAuthentication.getName();
    	boolean ret = memberService.checkPassword(id,pwd,principalDetail.getCompanyNo());

    	if (ret) {
    		return "ok";
    	} else return "error";
    }
	  
    @ResponseBody
    @RequestMapping("/adminOnly")
    public String adminOnly() {
      return "Secret Page";
    }
    @RequestMapping("/demo")
    public String demo_test(HttpServletRequest request) throws Exception{
    	String pathSet = request.getSession().getServletContext().getRealPath("/");
    	log.info(">> Join request. session id : {}", ServletUtil.getIpAddr());
    	log.info(pathSet);	
    	
    	return pathSet;
    }
    @RequestMapping("/getIp")
    public String getMyIp(HttpServletRequest request) throws Exception{
    	Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
    	
    	String id = ahAuthentication.getName();
    	return ServletUtil.getIpAddr() + "/" + id;
    }	    

    @RequestMapping("/DynamicSqlFilterMybatis")
    public @ResponseBody String DynamicSqlFilterMybatis(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

		Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	ObjectMapper mapper = new ObjectMapper();
    	//if (filterText.equals("@USER_ID") ) {
    		//Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
    		//filterText = ahAuthentication.getName();	    		
    	//}
    	log.info(vo.toString());
    	
        String jsonStr = mapper.writeValueAsString(dynamicSqlService.getSqlFilterMybatis(vo));
        return jsonStr;
    }
    @RequestMapping("/DynamicSqlFilter")
    public @ResponseBody String dynamicSqlFilter(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

		Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	ObjectMapper mapper = new ObjectMapper();
    	//if (filterText.equals("@USER_ID") ) {
    		//Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
    		//filterText = ahAuthentication.getName();	    		
    	//}
    	log.info(vo.toString());
    	
        String jsonStr = mapper.writeValueAsString(dynamicSqlService.getSqlFilter(vo));
        return jsonStr;
    }

    /* 배차초기화
     * - 기존자료삭제
     * - step 0~4번까지수행
     * */
    @RequestMapping("/BUS_monthArrangeInit")
    public @ResponseBody String BUS_monthArrangeInit(@RequestParam ("strData") String strData) throws Exception{
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		Gson gson = new Gson();
	    	CommonCodeVo vo = gson.fromJson(strData, CommonCodeVo.class);
	    	vo.init();
	    	vo.setInitSeq(0);
	    	dynamicSqlService.initMONTH_ARRANGE(vo);
	    	
	    	
    		//String jsonStr = mapper.writeValueAsString(dynamicSqlService.BUS_monthArrangeBasic(vo));
	        return "ok";
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }
    
    @RequestMapping("/BUS_addSPDriver_Other")
    public @ResponseBody String BUS_addSPDriver_Other(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		Gson gson = new Gson();
	    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
	    	vo.init();
	    	vo.setInitSeq(0);
	    	
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.insertStep_5_SP_other(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }	    
    /* 배차검토
     * 
     * - step 5~6번까지수행
     * */	    
    @RequestMapping("/BUS_monthArrangeMake")
    public @ResponseBody String BUS_monthArrangeMake(@RequestParam ("strData") String strData) throws Exception{
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		Gson gson = new Gson();
	    	CommonCodeVo vo = gson.fromJson(strData, CommonCodeVo.class);
	    	vo.init();
	    	vo.setInitSeq(0);
	    	dynamicSqlService.makeMONTH_ARRANGE(vo);
    		//String jsonStr = mapper.writeValueAsString(dynamicSqlService.makeMONTH_ARRANGE(vo));
	        return "ok";
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }	    
    /* 배차확정
     * 
     * - step 9번 수행	init_seq = 1로 update
     * */	    
    @RequestMapping("/BUS_monthArrangeFinish")
    public @ResponseBody String BUS_monthArrangeFinish(@RequestParam ("strData") String strData) throws Exception{
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		Gson gson = new Gson();
	    	CommonCodeVo vo = gson.fromJson(strData, CommonCodeVo.class);
	    	vo.init();
	    	//vo.setInitSeq(1);
	    	
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.finishMONTH_ARRANGE(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }	 	    
    /*
    *  해당월 노선의 배차정보 삭제
	*  month_arrange_basic,detail,status table 정보 모두 삭제
    */	    
    @RequestMapping("/BUS_ViewMonthArrange")
    public @ResponseBody String BUS_ViewMonthArrange(@RequestParam ("strData") String strData) throws Exception{
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		Gson gson = new Gson();
	    	CommonCodeVo vo = gson.fromJson(strData, CommonCodeVo.class);
	    	vo.init();
	    	//vo.setInitSeq(0);	    		
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.BUS_ViewMonthArrange(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }
    @RequestMapping("/BUS_DeleteMonthArrange")
    public @ResponseBody String BUS_DeleteMonthArrange(@RequestParam ("strData") String strData) throws Exception{
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		Gson gson = new Gson();
	    	CommonCodeVo vo = gson.fromJson(strData, CommonCodeVo.class);
	    	vo.init();
	    	vo.setInitSeq(0);	    		
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.BUS_DeleteMonthArrange(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }
    @RequestMapping("/BUS_ViewMonthArrange_attendOnly")
    public @ResponseBody String BUS_ViewMonthArrange_attendOnly(@RequestParam ("strData") String strData) throws Exception{
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		Gson gson = new Gson();
	    	CommonCodeVo vo = gson.fromJson(strData, CommonCodeVo.class);
	    	vo.init();
	    	//vo.setInitSeq(0);	    		
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.BUS_ViewMonthArrange_atttendOnly(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }
    @RequestMapping("/BUS_ViewMonthArrange_ampm")
    public @ResponseBody String BUS_ViewMonthArrange_ampm(@RequestParam ("strData") String strData) throws Exception{
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		Gson gson = new Gson();
	    	CommonCodeVo vo = gson.fromJson(strData, CommonCodeVo.class);
	    	vo.init();
	    	//vo.setInitSeq(0);	    		
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.BUS_ViewMonthArrange_ampm(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }

    @RequestMapping("/BUS_viewDailyArrangeOrderAll")
    public @ResponseBody String BUS_viewDailyArrangeOrderAll(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		Gson gson = new Gson();
	    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
	    	vo.init();
	    	//vo.setInitSeq(0);	    		
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.viewDailyArrangeOrderAll(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }
    
    @RequestMapping("/BUS_getRouteNmInfo")
    public @ResponseBody String BUS_getRouteNmInfo(@RequestParam ("strData") String strData) throws Exception{
		Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(strData, CommonCodeVo.class);
    	vo.init();

    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.BUS_getRouteNmInfo(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }
    @RequestMapping("/proxy_getCompanyInfo")
    public @ResponseBody String BUS_getCompanyInfo(@RequestParam ("strData") String strData) throws Exception{
		//Gson gson = new Gson();
    	//CommonCodeVo vo = gson.fromJson(strData, CommonCodeVo.class);
    	//vo.init();

    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.BUS_getCompanyInfo());
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null;
    }
    @RequestMapping("/BUS_insertInfo")
    public @ResponseBody ResponseEntity  BUS_insertInfo(
    		@RequestParam ("commonVoStr") String commonVoStr,@RequestParam ("jsonDataStr") String jsonDataStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	//log.info("strData data :{}",jsonDataStr );
        List<Map<String, Object>> myPushList = null;
        myPushList = gson.fromJson(jsonDataStr, new TypeToken<List<Map<String, Object>>>() {}.getType());

        dynamicSqlService.validationCheck(vo, myPushList,vo.getTargetTable());

        if (vo.getErrorMsg() != null && !vo.getErrorMsg().equals(""))
        	return ResponseEntity.ok().body(vo.getErrorMsg());

        dynamicSqlService.deleteInfoTable(vo, vo.getTargetTable());
        dynamicSqlService.insertInfo(vo, myPushList,vo.getTargetTable());

        if (vo.getErrorMsg() == null || vo.getErrorMsg().equals(""))
        	return ResponseEntity.ok().body("정상처리되었습니다");
        else 
        	return ResponseEntity.ok().body(vo.getErrorMsg());
    } 	

    @RequestMapping("/BUS_validationCheck")
    public @ResponseBody ResponseEntity  BUS_validationCheck(
    		@RequestParam ("commonVoStr") String commonVoStr,@RequestParam ("jsonDataStr") String jsonDataStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();

        List<Map<String, Object>> myPushList = null;
        myPushList = gson.fromJson(jsonDataStr, new TypeToken<List<Map<String, Object>>>() {}.getType());

        dynamicSqlService.validationCheck(vo, myPushList,vo.getTargetTable());

        if (vo.getErrorMsg() == null || vo.getErrorMsg().equals(""))
        	return ResponseEntity.ok().body("점검 특이사항 없습니다.");
        else 
        	return ResponseEntity.ok().body(vo.getErrorMsg());
    } 	

    @RequestMapping("/BUS_getAccidentInputOption")
    public @ResponseBody String  BUS_getAccidentInputOption(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.getAccidentInputOption(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null; 	
    }     

    @RequestMapping("/BUS_getEmpWorkingLogInputOption")
    public @ResponseBody String  BUS_getEmpWorkingLogInputOption(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.getEmpWorkingLogInputOption(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null; 	
    }     
    @RequestMapping("/BUS_getEmpWorkingTimeView")
    public @ResponseBody String  BUS_getEmpWorkingTimeView(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.getEmpWorkingTimeView(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null; 	
    }     

    @RequestMapping("/BUS_getEmpWorkingKMView")
    public @ResponseBody String  BUS_getEmpWorkingKMView(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.getEmpWorkingKMView(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null; 	
    }     
    
    @RequestMapping("/BUS_getPrimaryKey")
    public @ResponseBody String  BUS_getPrimaryKey(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	ObjectMapper mapper = new ObjectMapper();
    	try {
    		String jsonStr = mapper.writeValueAsString(dynamicSqlService.getPrimaryColumns(vo));
	        return jsonStr;
    	} catch (Exception e) {
    		log.error(e.getMessage());
		}
        return null; 	
    }     
    @RequestMapping("/BUS_mergeInfo")
    public @ResponseBody ResponseEntity  BUS_mergeInfo(
    		@RequestParam ("commonVoStr") String commonVoStr,@RequestParam ("jsonDataStr") String jsonDataStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	//log.info("strData data :{}",jsonDataStr );
        List<Map<String, Object>> myPushList = null;
        myPushList = gson.fromJson(jsonDataStr, new TypeToken<List<Map<String, Object>>>() {}.getType());
        
        
        dynamicSqlService.validationCheck(vo, myPushList,vo.getTargetTable());

        if (vo.getErrorMsg() != null && !vo.getErrorMsg().equals(""))
        	return ResponseEntity.ok().body(vo.getErrorMsg());
        
        int ret = dynamicSqlService.mergeInfo(vo, myPushList,vo.getTargetTable());

        if (ret == 1)
        	return ResponseEntity.ok().body("정상처리되었습니다");
        else 
        	return ResponseEntity.ok().body("check");
    } 	  

    @RequestMapping("/BUS_updateTBM_DRIVERINFO_DETAIL")
    public @ResponseBody Object  BUS_updateTBM_DRIVERINFO_DETAIL(
    		@RequestParam ("commonVoStr") String commonVoStr,@RequestParam ("jsonDataStr") String jsonDataStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	//log.info("strData data :{}",jsonDataStr );
        List<Map<String, Object>> myPushList = null;
        myPushList = gson.fromJson(jsonDataStr, new TypeToken<List<Map<String, Object>>>() {}.getType());
        
        dynamicSqlService.updateTBM_DRIVERINFO_DETAIL(vo, myPushList,vo.getTargetTable());

        return "정상 처리되었습니다.";
    } 	    

    @RequestMapping("/BUS_modifyPunctualityEmpNm")
    public @ResponseBody Object  BUS_modifyPunctualityEmpNm(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
        dynamicSqlService.modifyPunctualityEmpNm(vo);

        return "정상 처리되었습니다.";
    } 	    

    @RequestMapping("/BUS_create_EMP_POINT_INFO")
    public @ResponseBody Object  BUS_create_EMP_POINT_INFO(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
        dynamicSqlService.createEmpPointInfo(vo);

        return "정상 처리되었습니다.";
    } 	    
    
    
    @RequestMapping("/BUS_updateTBM_ROUTE_WEEKSEQ_INFO")
    public @ResponseBody Object  BUS_updateTBM_ROUTE_WEEKSEQ_INFO(
    		@RequestParam ("commonVoStr") String commonVoStr,@RequestParam ("jsonDataStr") String jsonDataStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	//log.info("strData data :{}",jsonDataStr );
        List<Map<String, Object>> myPushList = null;
        myPushList = gson.fromJson(jsonDataStr, new TypeToken<List<Map<String, Object>>>() {}.getType());
        
        dynamicSqlService.updateTBM_ROUTEWEEKSEQ_INFO(vo, myPushList,vo.getTargetTable());

        return "정상 처리되었습니다.";
    } 	    
    @RequestMapping("/BUS_updateTBM_routeReduction_Info")
    public @ResponseBody Object  BUS_updateTBL_routeReduction_info(
    		@RequestParam ("commonVoStr") String commonVoStr,@RequestParam ("jsonDataStr") String jsonDataStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	log.info("strData data :{}",jsonDataStr );
        List<Map<String, Object>> myPushList = null;
        myPushList = gson.fromJson(jsonDataStr, new TypeToken<List<Map<String, Object>>>() {}.getType());
        
        dynamicSqlService.updateTBM_ROUTEREDUCTION_INFO(vo, myPushList,vo.getTargetTable());

        return "정상 처리되었습니다.";
    } 	    
    @RequestMapping("/BUS_monthArrangeReview")
    public @ResponseBody Object  BUS_monthArrangeReview(
    		@RequestParam ("commonVoStr") String commonVoStr,@RequestParam ("jsonDataStr") String jsonDataStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	//log.info("strData data :{}",jsonDataStr );
        List<Map<String, Object>> myPushList = null;
        myPushList = gson.fromJson(jsonDataStr, new TypeToken<List<Map<String, Object>>>() {}.getType());
        
        dynamicSqlService.monthArrangeReview(vo, myPushList,vo.getTargetTable());

        return "정상 처리되었습니다.";
    } 	    
    @RequestMapping("/BUS_monthArrangeSPDelete")
    public @ResponseBody Object  BUS_monthArrangeSPDelete(
    		@RequestParam ("commonVoStr") String commonVoStr,@RequestParam ("jsonDataStr") String jsonDataStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
    	//log.info("strData data :{}",jsonDataStr );
        List<Map<String, Object>> myPushList = null;
        myPushList = gson.fromJson(jsonDataStr, new TypeToken<List<Map<String, Object>>>() {}.getType());
        
        dynamicSqlService.monthArrangeSPDelete(vo, myPushList,vo.getTargetTable());

        return "정상 처리되었습니다.";
    } 	    

    //분석결과에 기사명 재 맵핑
    @RequestMapping("/BUS_batchUpdateArrangePunctualityAnalEmpNm")
    public @ResponseBody ResponseEntity  BUS_updateArrangePunctualityEmpNm(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
        dynamicSqlService.batchUpdateArrangePunctualityAnalEmpNm(vo);

        return ResponseEntity.ok().body("정상처리되었습니다");   
    } 	  

    
    @RequestMapping("/loginError")
    public @ResponseBody String insertMtrServiceLog() throws Exception{
    	//MtrErrorLogVo message = new MtrErrorLogVo("kft_15 start 18:14:08:604 172016117214 KFT15107","testip");
    	//mtrServiceLogService.insert(message);

    	
        return "처리오류";
    }

    @RequestMapping("/loginError2")
    public @ResponseBody String loginError2() throws Exception{
    	//MtrErrorLogVo message = new MtrErrorLogVo("kft_15 start 18:14:08:604 172016117214 KFT15107","testip");
    	//mtrServiceLogService.insert(message);

    	
        return "사용권한이 없습니다.2";
    }
    
    @RequestMapping("/DynamicSqlFilterNoHeader")
    public String selectOracelSessionUserDetail(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{
        ObjectMapper mapper = new ObjectMapper();
    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
        
    	String jsonStr = mapper.writeValueAsString(dynamicSqlService.getSqlFilterNoHeader(vo));

        return jsonStr;
    }	    
	    
    @RequestMapping("/DeleteAttendanceInfo")
    public String deleteAttendanceInfo(@RequestParam ("strData") String strData
	) throws Exception{
    	Gson gson = new Gson();
    	AttendanceInfoVo vo = gson.fromJson(strData, AttendanceInfoVo.class);
    	vo.init();
		/* delete cti info */	
    	dynamicSqlService.deleteAttendanceInfo(vo);
        return "ok";
    }	    
    //근태수정불가(사용안함) : 신규나 삭제만 가능
    @RequestMapping("/UpdateAttendanceInfo")
    public String updateAttendanceInfo(@RequestParam ("strData") String strData
	) throws Exception{
    	Gson gson = new Gson();
    	AttendanceInfoVo vo = gson.fromJson(strData, AttendanceInfoVo.class);
    	vo.init();
    	dynamicSqlService.updateAttendanceInfo(vo);
        return "ok";
    }	    
    @RequestMapping("/InsertAttendanceInfo")
    public String insertAttendanceInfo(@RequestParam ("strData") String strData
	) throws Exception{
    	Gson gson = new Gson();
    	AttendanceInfoVo vo = gson.fromJson(strData, AttendanceInfoVo.class);
    	vo.init();
    	dynamicSqlService.insertAttendanceInfo(vo);
        return "ok";
    }

    @RequestMapping("/insertTBM_ROUTE_COMMON_INFO")
    public String insertTBM_ROUTE_COMMON_INFO(@RequestParam ("strData") String strData
	) throws Exception{
    	Gson gson = new Gson();
    	AttendanceInfoVo vo = gson.fromJson(strData, AttendanceInfoVo.class);
    	vo.init();
    	dynamicSqlService.insertTBM_ROUTE_COMMON_INFO(vo);
        return "ok";
    }
    
    @RequestMapping("/InsertAttendanceInfo_after")
    public String insertAttendanceInfo_after(@RequestParam ("strData") String strData
	) throws Exception{
    	Gson gson = new Gson();
    	AttendanceInfoVo vo = gson.fromJson(strData, AttendanceInfoVo.class);
    	vo.init();
    	//dynamicSqlService.insertAttendanceInfo_after(vo);
        return dynamicSqlService.insertAttendanceInfo_after(vo);
    }

    @RequestMapping("/DeleteHolidayInfo")
    public String deleteHolidayInfo(@RequestParam ("strData") String strData
	) throws Exception{
    	Gson gson = new Gson();
    	HolidayInfoVo vo = gson.fromJson(strData, HolidayInfoVo.class);
    	vo.init();
		/* delete cti info */	
    	dynamicSqlService.deleteHolidayInfo(vo);
        return "ok";
    }	    
    @RequestMapping("/UpdateHolidayInfo")
    public String updateHolidayInfo(@RequestParam ("strData") String strData
	) throws Exception{
    	Gson gson = new Gson();
    	HolidayInfoVo vo = gson.fromJson(strData, HolidayInfoVo.class);
    	vo.init();
    	dynamicSqlService.updateHolidayInfo(vo);
        return "ok";
    }	    
    @RequestMapping("/InsertHolidayInfo")
    public String insertHolidayInfo(@RequestParam ("strData") String strData
	) throws Exception{
    	Gson gson = new Gson();
    	HolidayInfoVo vo = gson.fromJson(strData, HolidayInfoVo.class);
    	vo.init();
    	dynamicSqlService.insertHolidayInfo(vo);
        return "ok";
    }
    
    @RequestMapping("/holidayInfoAPI")
    public @ResponseBody ResponseEntity holidayInfoAPI(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{

    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();

    	String year = vo.getWorkDate().substring(0, 4);
    	log.info(year);
    	
    	 List<Map> responseHolidayArr = new ArrayList<>();

         try {
             Map<String, Object> holidayMap = HolidayApiUtil.holidayInfoAPI(year, "");
             Map<String, Object> response = (Map<String, Object>) holidayMap.get("response");
             Map<String, Object> body = (Map<String, Object>) response.get("body");
             log.info("body = " + body);

             int totalCount = (int) body.get("totalCount");
             if (totalCount <= 0) {
            	 log.info("공휴일 없음");
             }
             if (totalCount == 1) {
                 Map<String, Object> items = (Map<String, Object>) body.get("items");
                 Map<String, Object> item = (Map<String, Object>) items.get("item");
                 responseHolidayArr.add(item);
                 log.info("item = " + item);
             }
             if (totalCount > 1) {
                 Map<String, Object> items = (Map<String, Object>) body.get("items");
                 List<Map<String, Object>> item = (List<Map<String, Object>>) items.get("item");
                 for (Map<String, Object> itemMap : item) {
                	 log.info("itemMap = " + itemMap);
                     responseHolidayArr.add(itemMap);
                 }
                 dynamicSqlService.insertApiHolidayInfo(vo,item);
             }
         } catch (IOException e) {
             e.printStackTrace();
         }
         return ResponseEntity.ok().body(responseHolidayArr);
    }
/*	    
	    @GetMapping("/oauth/loginInfo")
	    @ResponseBody
	    public String oauthLoginInfo(Authentication authentication, @AuthenticationPrincipal OAuth2User oAuth2UserPrincipal){
	        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
	        Map<String, Object> attributes = oAuth2User.getAttributes();
	        System.out.println(attributes);
	        // PrincipalOauth2UserService의 getAttributes내용과 같음

	        Map<String, Object> attributes1 = oAuth2UserPrincipal.getAttributes();
	        // attributes == attributes1

	       return attributes.toString();     //세션에 담긴 user가져올 수 있음음
	    }
	    
	    
	    @GetMapping("/loginInfo")
	    @ResponseBody
	    public String loginInfo(Authentication authentication, @AuthenticationPrincipal PrincipalDetails principalDetails){
	        String result = "";

	        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
	       // if(principal.getUser().getProvider() == null) {
	        //    result = result + "Form 로그인 : " + principal;
	       // }else{
	       //     result = result + "OAuth2 로그인 : " + principal;
	        //}
	        return result; 
	    }
	    //@RequestMapping(value="login/oauth2/code/naver", method=RequestMethod.GET)
	    public String loginPOSTNaver(HttpSession session) {
	        log.info("callback controller");
	        return "callback";
	    }

	    @RequestMapping(value="/login/oauth2/code/naver", method=RequestMethod.GET)
	    public ResponseEntity naverCallback(String code, String state) throws IOException {
	        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	        params.add("grant_type","authorization_code");
	        params.add("client_id","6tBTRMNAn86FypvJ2bS0");
	        params.add("client_secret", "vSJokjSsZF");
	        params.add("code", code);
	        params.add("state", state);
	    		// Parameter로 전달할 속성들 추가

	        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = makeTokenRequest(params);
	    		// Http 메시지 생성

	        RestTemplate rt = new RestTemplate();
	        ResponseEntity<String> tokenResponse = rt.exchange(
	                "https://nid.naver.com/oauth2.0/token",
	                HttpMethod.POST,
	                naverTokenRequest,
	                String.class
	        );
	    		// TOKEN_REQUEST_URL로 Http 요청 전송

	    		ObjectMapper objectMapper = new ObjectMapper();
	        NaverOAuthToken naverToken = objectMapper.readValue(tokenResponse.getBody(), NaverOAuthToken.class);
	    		// ObjectMapper를 통해 NaverOAuthToken 객체로 매핑
	        
	        return ResponseEntity.ok().body(naverToken);
	        
	    }

	    private HttpEntity<MultiValueMap<String, String>> makeTokenRequest(MultiValueMap<String, String> params) {
	        HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
	        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(params, headers);
	        return naverTokenRequest;
	    }	   
*/	     
    
    @PostMapping("/upload_file")
    public String upload_file(@RequestParam ("commonVoStr") String commonVoStr,@RequestParam("images") MultipartFile file) throws IOException {
    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
    	
   		fileService.saveFile(vo,file);

        //for (MultipartFile multipartFile : files) {
        //    fileService.saveFile(multipartFile);
        //}

        return "ok";
    }

    @PostMapping("/delete_file")
    public String delete_file(@RequestParam ("commonVoStr") String commonVoStr	) throws Exception{
    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();

    	return fileService.deleteFile(vo);
    }    

    //   기사사진 이미지 출력
    @GetMapping("/images/{file_id}")
    @ResponseBody
    public Resource downloadImage(@PathVariable("file_id") String file_id, Model model) throws IOException{
    	CommonCodeVo vo = new CommonCodeVo();
    	vo.init();
    	vo.setFileGb("empImage");
        FileEntity file = fileRepository.findByEmpNm(vo.getCompanyNo(),vo.getFileGb(),file_id);
        if (file == null) {
        	String fileDir = fileService.getFileImageDir() + "default.JPG" ;
            return new UrlResource("file:" + fileDir);
        }
        return new UrlResource("file:" + file.getSavedPath());
    }
    @RequestMapping("/excel_makeDrivingOrder")
    public String excel_makeDrivingOrder(@RequestParam ("commonVoStr") String commonVoStr) throws Exception{
        ObjectMapper mapper = new ObjectMapper();
    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();
        
    	fileService.createExcel_Normal(vo);

        return "ok";
    }	    
    @RequestMapping("/viewFileList")
    public @ResponseBody String viewFileList(@RequestParam ("commonVoStr") String commonVoStr) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
    	Gson gson = new Gson();
    	CommonCodeVo vo = gson.fromJson(commonVoStr, CommonCodeVo.class);
    	vo.init();

//    	String ret = fileService.viewFileList(vo);
   		return fileService.viewFileList(vo);
    }
    
    // 승무지시서 파일 다운로드
    @GetMapping("/attach/{date}/{fileName}")
    public ResponseEntity<Resource> downloadAttach(@PathVariable String date,@PathVariable String fileName) throws MalformedURLException {
        UrlResource resource = new UrlResource("file:" + fileOutputDir + date + "/" + fileName);

        String encodedFileName = UriUtils.encode(fileName, StandardCharsets.UTF_8);

        // 파일 다운로드 대화상자가 뜨도록 하는 헤더를 설정해주는 것
        // Content-Disposition 헤더에 attachment; filename="업로드 파일명" 값을 준다.
        String contentDisposition = "attachment; filename=\"" + encodedFileName + "\"";

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,contentDisposition).body(resource);
    }
    // templete 승무지시서 파일 다운로드
    @GetMapping("/attach/templete/{fileName}")
    public ResponseEntity<Resource> downloadAttach(@PathVariable String fileName) throws MalformedURLException {
        UrlResource resource = new UrlResource("file:" + fileTempleteDir + fileName);

        String encodedFileName = UriUtils.encode(fileName, StandardCharsets.UTF_8);

        // 파일 다운로드 대화상자가 뜨도록 하는 헤더를 설정해주는 것
        // Content-Disposition 헤더에 attachment; filename="업로드 파일명" 값을 준다.
        String contentDisposition = "attachment; filename=\"" + encodedFileName + "\"";

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,contentDisposition).body(resource);
    }    
    
}
