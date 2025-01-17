package com.pjy.dashboard.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.core.domain.security.MemberVo;
import com.pjy.dashboard.core.domain.security.UserCustomVo;
import com.pjy.dashboard.core.error.exception.ApiSessionExpiredException;
import com.pjy.dashboard.domain.MenuVo;
import com.pjy.dashboard.domain.MessageVO;
import com.pjy.dashboard.service.DynamicSqlService;
import com.pjy.dashboard.service.MemberService;
import com.pjy.dashboard.service.MemberServiceImpl;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Controller
public class JspController {
 
    @Autowired
    private MemberService memberService;
    @Autowired
    PersistentTokenBasedRememberMeServices persistentTokenBasedRememberMeServices;
    @Autowired
    DynamicSqlService dynamicSqlService;
    /*
     * 초기화면
     */
    @RequestMapping("/")
    public ModelAndView in( ) throws Exception {
    	MenuVo menuVO = null;
    	menuVO = dynamicSqlService.getMainFramMenuInfo(null);
    	
    	Map<String, Object> menuMap = new HashMap<String, Object>();
    	List<Map<String, Object>> optionList = dynamicSqlService.getMenuInfo(null);
    	for (Map<String, Object> map : optionList) { 
    		menuMap.put((String) map.get("MENU_ID"),map.get("MENU_NM"));
    	}
    	ObjectMapper mapper = new ObjectMapper();
    	String jsonStr = mapper.writeValueAsString(menuMap);
    	
    	
    	ModelAndView mav = new ModelAndView();
    	
    	mav.addObject("menuVO", menuVO );
    	mav.addObject("menuMap", jsonStr );
    	mav.setViewName("MDI_FRAME");
    	return mav;
    }
    @RequestMapping("/error2")
    public String error2() throws Exception {
    	return "error";
    }
    @RequestMapping("/mdiFrame")
    public String mdiFrame( ModelMap model) throws Exception {
    	MenuVo menuVO = null;
    	menuVO = dynamicSqlService.getMainFramMenuInfo(null);
    	model.addAttribute("menuVO", menuVO);
    	model.addAttribute("menuMap", dynamicSqlService.getMenuInfo(null) );
    	
    	return "MDI_FRAME";
    }    
    /*
     * 로그인 화면
     */
    @RequestMapping("/login2")
    public String login() throws Exception {
    	return "login";
    }
 
    @RequestMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response,HttpSession session) {
    	log.info("logout " );
    	//Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
    	//ahAuthentication.getName();
    	//persistentTokenBasedRememberMeServices.logout(request,response,ahAuthentication);
        return "logout";
    }
    @GetMapping("/expired")
    public String expiredPage() {
    	//return "error";
        throw new ApiSessionExpiredException();
    }   
    /*
     * 회원가입 입력 화면
     */
    @PreAuthorize("hasRole('ROLE_ADMIN')")    
    @RequestMapping("/join2")
    public String in3() throws Exception {
    	return "join";
    }
    
    /*
     * 회원가입 저장 화면, 저장후 로그인화면으로 이동
     */
    @PostMapping("/join")
    public String signup(MemberVo member) {
        memberService.save(member);
        return "redirect:/login2";
    }
    
    /* 회원정보 수정 */
    @RequestMapping(value="/updateInfo", method = RequestMethod.GET)
    public String updateGET(HttpSession session, Model model,@AuthenticationPrincipal UserCustomVo principalDetail) throws Exception{

    	Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
    	
    	String id = ahAuthentication.getName();
    	
    	//세션 객체 안에 있는 ID정보 저장
    	//String id = (String) session.getAttribute("userId");
    	log.info("C: 회원정보수정 GET의 아이디 "+id);

    	//서비스안의 회원정보보기 메서드 호출
    	//MemberVo vo = memberService.readMember(id);

    	//정보저장 후 페이지 이동
    	//model.addAttribute("memVO", vo);

    	//위의 3단계를 한 줄에 작성 가능
    	model.addAttribute("memberVo", memberService.readMember(id,principalDetail.getCompanyNo()));
    	//log.info(model.toString());
    	return "updateInfo";
    }    
    /* 회원정보 수정 */
    @RequestMapping(value="/updateInfo", method = RequestMethod.POST)
    public ModelAndView  updatePOST(MemberVo vo, ModelAndView  model,@AuthenticationPrincipal UserCustomVo principalDetail) throws Exception{
    	vo.setCompanyNo(principalDetail.getCompanyNo());
    	boolean bResult = memberService.updateUserInfo(vo);
    	if (!bResult) {
    		model.addObject("data", new MessageVO("비밀번호가 틀립니다", "/updateInfo"));
    		model.setViewName("thymeleaf/message.html");
    	} else {
    		model.addObject("data", new MessageVO("변경이 완료되었습니다.", "/"));
    		model.setViewName("thymeleaf/message.html");
    		
    	}
    	principalDetail.setDisplayName(vo.getUserName()); //추가
        return model;
    }

	// 비밀번호 변경
    //@PatchMapping("/modifyPassword")
    @RequestMapping(value="/modifyPassword", method = RequestMethod.POST)
    public ModelAndView modifyPassword(String password,String oldPassword, ModelAndView  model,@AuthenticationPrincipal UserCustomVo principalDetail) throws Exception {
    	Authentication ahAuthentication = SecurityContextHolder.getContext().getAuthentication();
    	String id = ahAuthentication.getName();
	    	
    	boolean ret = memberService.checkPassword(id,oldPassword,principalDetail.getCompanyNo());
	
    	if (!ret) {
    		model.addObject("data", new MessageVO("이전 비밀번호가 틀립니다", "/modify"));
    		model.setViewName("thymeleaf/message.html");
    	} else {
        	MemberVo vo =  memberService.readMember(id,principalDetail.getCompanyNo());
        	// 비밀번호 암호화
        	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        	vo.setPassword(passwordEncoder.encode(password));

        	memberService.updatePassword(vo);
    	        
    		model.addObject("data", new MessageVO("변경이 완료되었습니다.", "/"));
    		model.setViewName("thymeleaf/message.html");    	
    		
    	}
        return model;
    }
    
	/*
	 * @RequestMapping("/{url}") public String dynamicUrl(@PathVariable("url")
	 * String url) throws Exception { return url; }
	 */    
/*
    @RequestMapping("/jsp/arrangePunctuality")
    public String arrangePunctuality() throws Exception {
    	return "arrangePunctuality";
    }
    @RequestMapping("/jsp/arrangePunctualityAnalyze")
    public String arrangePunctualityAnalyze() throws Exception {
    	return "arrangePunctualityAnalyze";
    }
    @RequestMapping("/jsp/employeeInfo")
    public String employeeInfo() throws Exception {
    	return "employeeInfo";
    }
    @RequestMapping("/jsp/holidayInfo")
    public String holidayInfo() throws Exception {
    	return "holidayInfo";
    }
    @RequestMapping("/jsp/vacationManagement")
    public String vacationManagement() throws Exception {
    	return "vacationManagement";
    }
    @RequestMapping("/jsp/carInfo")
    public String carInfo() throws Exception {
    	return "carInfo";
    }
    @RequestMapping("/jsp/driverInfo")
    public String driverInfo() throws Exception {
    	return "driverInfo";
    }
    @RequestMapping("/jsp/routeInfo")
    public String routeInfo() throws Exception {
    	return "routeInfo";
    }
    @RequestMapping("/jsp/arrangeBus")
    public String arrangeBus() throws Exception {
    	return "arrangeBus";
    }    
    @RequestMapping("/jsp/arrangeBusView")
    public String arrangeBusView() throws Exception {
    	return "arrangeBusView";
    }    
    @RequestMapping("/jsp/dangerDrivingInfo")
    public String dangerDrivingInfo() throws Exception {
    	return "dangerDrivingInfo";
    }
    @RequestMapping("/jsp/dangerDrivingAnalyze")
    public String dangerDrivingAnalyze() throws Exception {
    	return "dangerDrivingAnalyze";
    }
    @RequestMapping("/jsp/accidentInfo")
    public String accident() throws Exception {
    	return "accidentInfo";
    }
    @RequestMapping("/jsp/employeeCard")
    public String employeeCard() throws Exception {
    	return "employeeCard";
    }
    @RequestMapping("/jsp/drivingOrder")
    public String drivingOrder() throws Exception {
    	return "drivingOrder";
    }
    @RequestMapping("/jsp/drivingOrderAll")
    public String drivingOrderAll() throws Exception {
    	return "drivingOrderAll";
    }
    @RequestMapping("/jsp/iscDrivingRecord")
    public String drivingRecord() throws Exception {
    	return "iscDrivingRecord";
    }
    @RequestMapping("/jsp/iscDriverInfo")
    public String iscDriverInfo() throws Exception {
    	return "iscDriverInfo";
    }
    @RequestMapping("/jsp/empWorkingLog")
    public String empWorkingLog() throws Exception {
    	return "empWorkingLog";
    }
    @RequestMapping("/jsp/empWorkingTimeView")
    public String empWorkingTimeView() throws Exception {
    	return "empWorkingTimeView";
    }
    @RequestMapping("/jsp/empWorkingKMView")
    public String empWorkingKMView() throws Exception {
    	return "empWorkingKMView";
    }
    @RequestMapping("/jsp/uploadStatus")
    public String uploadStatus() throws Exception {
    	return "uploadStatus";
    }
    @RequestMapping("/jsp/allEmpPointView")
    public String allEmpPointView() throws Exception {
    	return "allEmpPointView";
    }
    @RequestMapping("/jsp/publicComplaint")
    public String publicComplaint() throws Exception {
    	return "publicComplaint";
    }
*/
    @RequestMapping("/modify")
    public String modify() throws Exception {
    	return "modify";
    }   
    
    @RequestMapping("/jsp/{url}")
    public String jspConfig( @PathVariable("url") String url) throws Exception {
    	return url;
    }   
    
    @RequestMapping("/menu/{menuId}")
    public String searchMenu( @PathVariable("menuId") String menuId) throws Exception {
    	String url = "";
    	
    	return url;
    }  
    
    @RequestMapping("/admin/{url}")
    public String adminConfig( @PathVariable("url") String url) throws Exception {
    	return "admin/" + url;
    }

}
