package com.pjy.dashboard.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.AsyncRestTemplate;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.domain.oauth.NaverOAuthToken;
import com.pjy.dashboard.domain.oauth.NaverProfileResponse;
import com.pjy.dashboard.listener.SessionListener;
import com.pjy.dashboard.service.ChatService;
import com.pjy.dashboard.util.HolidayApiUtil;

import lombok.extern.slf4j.Slf4j;
@Slf4j
//@RestController
public class Oauth2Controller {
	  private String CLIENT_ID = "6tBTRMNAn86FypvJ2bS0"; //애플리케이션 클라이언트 아이디값";
	  private String CLI_SECRET = "vSJokjSsZF"; //애플리케이션 클라이언트 시크릿값";
	  
    @Autowired
    private ChatService chatService;

	@GetMapping("/getSessionId")
	public String getSessionId(HttpSession session) {
		return session.getId();
	}
    
    @RequestMapping("/SISE_extendSessionTimeout")
    public String SISE_changeSessionTimeout(HttpServletRequest request,
             @RequestParam(value="sessionId") String sessionId    		) throws Exception{

    	SessionListener.getInstance().setSession(request, sessionId);
        //HttpSession session = request.getSession();
        //session.setMaxInactiveInterval(100);

        return "ok";
    }  
    
    /*
     * sql 쿼리 히스토리 보관 
     */
    
    @RequestMapping("/holidayInfoAPI2")
    public @ResponseBody ResponseEntity holidayInfoAPI2(@RequestParam("year") String year,
    		@RequestParam("month") String month) throws Exception{

    	log.info(year + month);
    	
    	 ArrayList<HashMap> responseHolidayArr = new ArrayList<>();

         try {
             Map<String, Object> holidayMap = HolidayApiUtil.holidayInfoAPI(year, month);
             Map<String, Object> response = (Map<String, Object>) holidayMap.get("response");
             Map<String, Object> body = (Map<String, Object>) response.get("body");
             log.info("body = " + body);

             int totalCount = (int) body.get("totalCount");
             if (totalCount <= 0) {
            	 log.info("공휴일 없음");
             }
             if (totalCount == 1) {
                 HashMap<String, Object> items = (HashMap<String, Object>) body.get("items");
                 HashMap<String, Object> item = (HashMap<String, Object>) items.get("item");
                 responseHolidayArr.add(item);
                 log.info("item = " + item);
             }
             if (totalCount > 1) {
                 HashMap<String, Object> items = (HashMap<String, Object>) body.get("items");
                 ArrayList<HashMap<String, Object>> item = (ArrayList<HashMap<String, Object>>) items.get("item");
                 for (HashMap<String, Object> itemMap : item) {
                	 log.info("itemMap = " + itemMap);
                     responseHolidayArr.add(itemMap);
                 }
                 
             }
         } catch (IOException e) {
             e.printStackTrace();
         }
         return ResponseEntity.ok().body(responseHolidayArr);
    }

    @RequestMapping("/naver-login")
    public String naverLogin(HttpServletRequest request, HttpServletResponse response) throws MalformedURLException, UnsupportedEncodingException, URISyntaxException {
        String url = getNaverAuthorizeUrl("authorize");
        try {
            response.sendRedirect(url);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "ok";
    }
    public String getNaverAuthorizeUrl(String type) throws URISyntaxException, MalformedURLException, UnsupportedEncodingException {
        
        String baseUrl = "https://nid.naver.com/oauth2.0";
        String clientId = "6tBTRMNAn86FypvJ2bS0";
        String redirectUrl = "http://localhost:10010/login/oauth2/code/naver";

        UriComponents uriComponents = UriComponentsBuilder
                .fromUriString(baseUrl + "/" + type)
                .queryParam("response_type", "code")
                .queryParam("client_id", clientId)
                .queryParam("redirect_uri", URLEncoder.encode(redirectUrl, "UTF-8"))
                .queryParam("state", URLEncoder.encode("1234", "UTF-8"))
                .build();

        
        return uriComponents.toString();
    }

    	// async Rest API test
    @RequestMapping("/login/oauth2/code/naver_sync")
    public ResponseEntity naverCallback0(String code, String state) throws IOException {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type","authorization_code");
        params.add("client_id","6tBTRMNAn86FypvJ2bS0");
        params.add("client_secret", "vSJokjSsZF");
        params.add("code", code);
        params.add("state", state);
    		// Parameter로 전달할 속성들 추가

		// Http 메시지 생성
        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = makeTokenRequest(params);
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
        
   		log.info(naverToken.toString());
        return naverCallback2(naverToken);
    		// ObjectMapper를 통해 NaverOAuthToken 객체로 매핑
		//return tokenResponse;
    }

	// sync Rest API test
    @RequestMapping("/login/oauth2/code/naver")
    public ResponseEntity naverCallback1(String code, String state) throws IOException {

    	WebClient webClient = WebClient.builder()
    	        .baseUrl("https://nid.naver.com")
    	        .defaultHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
    	        //.defaultHeaders(headers -> headers.setBearerAuth("7e0af818e0564a238bbcf6b9a0f7c176"))
    	        .build();    	
    	
    	
        webClient.post()
	        .uri(uriBuilder -> uriBuilder
	        	    .path("/oauth2.0/token/")
	        	    .queryParam("grant_type", "authorization_code")
	        	    .queryParam("client_id", "6tBTRMNAn86FypvJ2bS0")
	        	    .queryParam("client_secret", "vSJokjSsZF")
	        	    .queryParam("code", code)
	        	    .queryParam("state", state)
	        	    .build())
	        .retrieve()
	        .bodyToMono(String.class)
	        .subscribe(ret -> {
	        	ObjectMapper objectMapper = new ObjectMapper();
	            log.info(ret );
	            try {
					NaverOAuthToken naverToken = objectMapper.readValue(ret, NaverOAuthToken.class);
		            log.info(naverToken.toString());
		            naverCallback2(naverToken);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	        });
        
        return ResponseEntity.ok().body("ok");
    		// ObjectMapper를 통해 NaverOAuthToken 객체로 매핑
		//return tokenResponse;
    }
    
    private HttpEntity<MultiValueMap<String, String>> makeTokenRequest(MultiValueMap<String, String> params) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(params, headers);
        return naverTokenRequest;
    }    
    
    //@RequestMapping("/login/oauth2/code/naver")
    public ResponseEntity naverCallback2(NaverOAuthToken naverToken) throws IOException {
        HttpEntity<MultiValueMap<String, String>> naverProfileRequest  = makeProfileRequest (naverToken);
    		// Http 메시지 생성

        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> profileResponse  = rt.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                naverProfileRequest,
                String.class
        );

   		ObjectMapper objectMapper = new ObjectMapper();
   		NaverProfileResponse naverProfileResponse = objectMapper.readValue(profileResponse.getBody(), NaverProfileResponse.class);
   		log.info(naverProfileResponse.toString());
    		// ObjectMapper를 통해 NaverOAuthToken 객체로 매핑
		return profileResponse ;
    }

    private HttpEntity<MultiValueMap<String, String>> makeProfileRequest(NaverOAuthToken naverToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer "+ naverToken.getAccess_token());
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        HttpEntity<MultiValueMap<String, String>> naverProfileRequest = new HttpEntity<>(headers);
        return naverProfileRequest;
    }
    
    /**
     * 토큰삭제(테스트안해봄)
     * @param apiURL
     * @param headerStr
     * @return
     * @throws IOException
     */    
    @RequestMapping("/naver/deleteToken")
    public String deleteToken(HttpSession session, HttpServletRequest request, Model model, String accessToken) throws IOException {
      String apiURL;
      apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=delete&";
      apiURL += "client_id=" + "6tBTRMNAn86FypvJ2bS0";
      apiURL += "&client_secret=" + "vSJokjSsZF";
      apiURL += "&access_token=" + accessToken;
      apiURL += "&service_provider=NAVER";
      System.out.println("apiURL=" + apiURL);
      String res = requestToServer(apiURL,"");
      model.addAttribute("res", res);
      session.invalidate();
      return "test-naver-callback";
    }
    /**
     * 서버 통신 메소드
     * @param apiURL
     * @param headerStr
     * @return
     * @throws IOException
     */
    private String requestToServer(String apiURL, String headerStr) throws IOException {
      URL url = new URL(apiURL);
      HttpURLConnection con = (HttpURLConnection)url.openConnection();
      con.setRequestMethod("GET");
      System.out.println("header Str: " + headerStr);
      if(headerStr != null && !headerStr.equals("") ) {
        con.setRequestProperty("Authorization", headerStr);
      }
      int responseCode = con.getResponseCode();
      BufferedReader br;
      System.out.println("responseCode="+responseCode);
      if(responseCode == 200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else {  // 에러 발생
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }
      String inputLine;
      StringBuffer res = new StringBuffer();
      while ((inputLine = br.readLine()) != null) {
        res.append(inputLine);
      }
      br.close();
      if(responseCode==200) {
        return res.toString();
      } else {
        return null;
      }
    }
    /**
     * 토큰 갱신 요청 페이지 컨트롤러
     * @param session
     * @param request
     * @param model
     * @param refreshToken
     * @return
     * @throws IOException
     * @throws ParseException
     */
    @RequestMapping("/naver/refreshToken")
    public String refreshToken(HttpSession session, HttpServletRequest request, Model model, String refreshToken) throws IOException, ParseException {
      String apiURL;
      apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&";
      apiURL += "client_id=" + "6tBTRMNAn86FypvJ2bS0";
      apiURL += "&client_secret=" + "vSJokjSsZF";
      apiURL += "&refresh_token=" + refreshToken;
      System.out.println("apiURL=" + apiURL);
      String res = requestToServer(apiURL,"");
      model.addAttribute("res", res);
      session.invalidate();
      return "test-naver-callback";
    }
    
    /**
     * 콜백 페이지 컨트롤러
     * @param session
     * @param request
     * @param model
     * @return
     * @throws IOException
     * @throws ParseException
     * @throws org.apache.tomcat.util.json.ParseException 
     */
    @RequestMapping("/naver/callback1")
    public String naverCallback1(HttpSession session, HttpServletRequest request, Model model) throws IOException, ParseException, org.apache.tomcat.util.json.ParseException {
      String code = request.getParameter("code");
      String state = request.getParameter("state");
      String redirectURI = URLEncoder.encode("http://localhost:8080/naver/callback1", "UTF-8");
      String apiURL;
      apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&";
      apiURL += "client_id=" + CLIENT_ID;
      apiURL += "&client_secret=" + CLI_SECRET;
      apiURL += "&redirect_uri=" + redirectURI;
      apiURL += "&code=" + code;
      apiURL += "&state=" + state;
      System.out.println("apiURL=" + apiURL);
      String res = requestToServer(apiURL,"");
      if(res != null && !res.equals("")) {
        model.addAttribute("res", res);
        Map<String, Object> parsedJson = new JSONParser(res).parseObject();
        System.out.println(parsedJson);
        session.setAttribute("currentUser", res);
        session.setAttribute("currentAT", parsedJson.get("access_token"));
        session.setAttribute("currentRT", parsedJson.get("refresh_token"));
      } else {
        model.addAttribute("res", "Login failed!");
      }
      return "test-naver-callback";
    }
    
}