package com.pjy.dashboard.configuration;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

//http://yoonbumtae.com/?p=764

import com.pjy.dashboard.core.dao.jpa.h2.TokenRepositoryImpl;
import com.pjy.dashboard.core.filter.AuthenticationFilterObtainUsernameFilter;
import com.pjy.dashboard.listener.SessionListener;
import com.pjy.dashboard.service.CustomAuthenticationProvider;
import com.pjy.dashboard.service.MemberServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@RequiredArgsConstructor

@Slf4j
//Spring Security를 활성화 시킵니다.
@EnableWebSecurity 

//Controller에서 특정 페이지에 특정 권한이 있는 유저만 접근을 허용할 경우 @PreAuthorize 어노테이션을 사용하는데, 
//해당 어노테이션에 대한 설정을 활성화시키는 어노테이션입니다. (필수는 아닙니다.)

// remember me 참고
// https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=ppuagirls&logNo=221401627835

//스프링시큐리티 기본api 이해 설명 잘된곳
//https://catsbi.oopy.io/c0a4f395-24b2-44e5-8eeb-275d19e2a536
//https://velog.io/@exoluse/Spring-Boot-Spring-Security-설정


@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
		prePostEnabled = true)
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${ldap.server.url}")
	private String ldapServerUrl;
	@Value("${ldap.manager.dn}")
	private String ldapManagerDn;
	@Value("${ldap.manager.password}")
	private String ldapManagerPassword;

	/*
    private final CorsProperties corsProperties;
    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final MemberRepository userRepository;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final TokenAccessDeniedHandler tokenAccessDeniedHandler;
	private final CustomOAuth2UserService  oAuth2UserService;
	*/
	private final MemberServiceImpl memberServiceImpl;
	//@Autowired
	//private CustomAuthenticationProvider customAuthenticationProvider;
	
    //private final ChatService chatService;
	
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
    	web.ignoring().antMatchers("/h2-console/**");  // --> 추가
        web.ignoring().antMatchers("/css/**", "/js/**", "/monitor/**", "/img/**", "/lib/**","/main.css","/common.js","/resources/**");
    }

    // https://catsbi.oopy.io/c0a4f395-24b2-44e5-8eeb-275d19e2a536 참고
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http.headers().frameOptions().disable()
    	.addHeaderWriter(new StaticHeadersWriter("X-FRAME-OPTIONS","SAMEORIGIN"));
    	
        http.sessionManagement() 
        //.sessionFixation().none()
            .sessionFixation().changeSessionId()
	        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // 세션이 필요하면 생성하도록 셋팅
	        .maximumSessions(1)
	        .maxSessionsPreventsLogin(false)
	        .expiredUrl("/expired")
	        .sessionRegistry(sessionRegistry())
	        ;
	        
        /*
        http.rememberMe().key("uniqueAndSecret")
        	.tokenValiditySeconds(60*60*24*7)
        	.rememberMeParameter("auto_login")
        	.rememberMeCookieName("remember-me")
        	.userDetailsService(memberServiceImpl)
	        .tokenRepository(persistentTokenRepository())
	        .rememberMeServices(persistentTokenBasedRememberMeServices())
        ;*/
        
        http.authorizeRequests()
        		.requestMatchers(CorsUtils::isPreFlightRequest).permitAll() 
        		.antMatchers("/", "/h2-console/**", "/events", "/events/*").permitAll()  // --> 추가
        		.antMatchers("/expired", "/error2", "/logout").permitAll()
        		 //.antMatchers("/css/**").permitAll() //Adding this line solved it
        		 //.antMatchers("/resources/**").permitAll()
        		 //.antMatchers("*.css").permitAll()
        		 //.antMatchers("/monitor/**").permitAll()
        		.mvcMatchers("/proxy**").permitAll()
                .anyRequest().authenticated() // 그 외 모든 요청은 인증된 사용자만 접근 가능 //.antMatchers("/").permitAll()
                .and()
                	.csrf().disable()
                	.httpBasic()                	
                .and()
                	.cors()
                	;
/*                .and()
                	.oauth2Login()				// OAuth2기반의 로그인인 경우
		                .loginPage("/login2")		// 인증이 필요한 URL에 접근하면 /loginForm으로 이동
		                .defaultSuccessUrl("/")			// 로그인 성공하면 "/" 으로 이동
		                .failureUrl("/login2")		// 로그인 실패 시 /loginForm으로 이동
		                .userInfoEndpoint()			// 로그인 성공 후 사용자정보를 가져온다
		                .userService(oAuth2UserService)	//사용자정보를 처리할 때 사용한다
		            .and() 
		            	.successHandler(oAuth2AuthenticationSuccessHandler())
		            	.failureHandler(oAuth2AuthenticationFailureHandler())
		                 ;
*/
        
        http.formLogin()
                .loginPage("/login2")
                .defaultSuccessUrl("/")
                .permitAll()
                ;

        http.addFilterBefore(authenticationFilterObtainUsername(),UsernamePasswordAuthenticationFilter.class);
        
/*
 * 	
        //여기 참고
        //https://blog.naver.com/PostView.nhn?blogId=wizardkyn&logNo=220652200194
        // authenticationFilterObtainUsername 를 사용하면 successHandler,failureHandler는 호출안됨.

                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                																				HttpServletResponse response, 
                																				Authentication authentication) throws IOException, ServletException {
                        log.info("authentication:: "+ authentication.getName());
 //                       SecurityContextHolder.getContext().setAuthentication(authentication);
                        //chatService.sendMessage(authentication.getName());
                        
                        SessionListener.getInstance().setSession(httpServletRequest, authentication.getName());
                        
                        response.sendRedirect("/");
                    }
                })//로그인 성공 후 핸들러
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest httpServletRequest,
                																				HttpServletResponse response,
                																				AuthenticationException e) throws IOException, ServletException {
                        log.info("exception:: "+e.getMessage());
                        response.sendRedirect("/error");
                    }
                })//로그인 실패 후 핸들러
                ;
*/
        http.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/logout")
                .invalidateHttpSession(true)
                .addLogoutHandler( new LogoutHandler() { // 로그아웃 핸들러 (기능추가) 
                	@Override 
                	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) { 
                        log.info("addLogoutHandler:logout: ");
                		HttpSession session = request.getSession(); 
                		session.invalidate(); 
                	} 
                }) 
                .logoutSuccessHandler( new LogoutSuccessHandler() { // 로그아웃 성공시 처리할 핸들러 
                	@Override 
                	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException { 
                        log.info("logoutSuccessHandler:onLogoutSuccess: ");
                		response.sendRedirect("/error2"); 
                	} 
                });

        http.exceptionHandling()
                .accessDeniedPage("/error2");
       // http.sessionManagement().invalidSessionUrl("/expired");
       
       // http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        
    }
/*    @Bean
    CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedOrigins(Arrays.asList("*"));
	    configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT","DELETE","OPTION"));
	    configuration.setAllowedHeaders(Arrays.asList("Origin","Accept","X-Requested-With","Authorization", "Cache-Control", "Content-Type","Access-Control-Request-Method","Access-Control-Request-headers"));
	    configuration.setAllowCredentials(true);
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
    }
*/
    
    
    
    @Bean
   public CorsConfigurationSource corsConfigurationSource() {
       CorsConfiguration configuration = new CorsConfiguration();
       // - (3)
       configuration.addAllowedOrigin("*");
       configuration.addAllowedMethod("*");
       configuration.addAllowedHeader("*");
       configuration.setAllowCredentials(true);
       configuration.setMaxAge(3600L);
       UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
       source.registerCorsConfiguration("/**", configuration);
       return source;
   }  
     
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
    	//auth.userDetailsService(service)에 org.springframework.security.core.userdetails.UserDetailsService 
    	//인터페이스를 구현한 Service를 넘겨야합니다. 
    	
    	/* 
    	 * 1번째 방법 : database table 인증할때
		 *      auth.userDetailsService(memberService).passwordEncoder(passwordEncoder());
    	 * 
    	 * 2번째 방법 : active directory 인증
    	 *		auth.authenticationProvider(ldapAuthenticationProvider()); 
        */
    	auth.userDetailsService(memberServiceImpl).passwordEncoder(passwordEncoder());
    	//auth.authenticationProvider(authenticationProvider());
    }
    /*
    @Bean
    public AuthenticationProvider ldapAuthenticationProvider() throws Exception {
            DefaultSpringSecurityContextSource contextSource = new DefaultSpringSecurityContextSource(ldapServerUrl);
            contextSource.setUserDn(ldapManagerDn);
            contextSource.setPassword(ldapManagerPassword);
            contextSource.setReferral("follow");
            contextSource.afterPropertiesSet();
            LdapUserSearch ldapUserSearch = new FilterBasedLdapUserSearch("", "(&(objectClass=user)(CN={0}))", contextSource);
            BindAuthenticator bindAuthenticator = new BindAuthenticator(contextSource);
            bindAuthenticator.setUserSearch(ldapUserSearch);
            
            LdapAuthenticationProvider ldapAuthenticationProvider = new LdapAuthenticationProvider(bindAuthenticator, new DefaultLdapAuthoritiesPopulator(contextSource, ""));
            ldapAuthenticationProvider.setUserDetailsContextMapper(userDetailsContextMapper());
            return ldapAuthenticationProvider;
    }

    @Bean
    public UserDetailsContextMapper userDetailsContextMapper() {
        return new LdapUserDetailsMapper() {
            @Override
            public UserDetails mapUserFromContext(DirContextOperations ctx, String username, Collection<? extends GrantedAuthority> authorities) {
            	log.info(ctx.getDn().toString());

            	Attributes answer = ctx.getAttributes();
            	
            	try {
					for (NamingEnumeration  ae = answer.getAll();ae.hasMore();) {
						Object attr = ae.next();
						//log.info(attr.toString());
					}
				} catch (NamingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            	MemberVo vo = memberServiceImpl.readMember(username);
            	log.info(username + "  " + vo.toString());
            	if (vo != null) {
            		vo.setLdap_description(ctx.getStringAttribute("description"));
            		vo.setLdap_mail(ctx.getStringAttribute("mail"));
            		vo.setLdap_mobile(ctx.getStringAttribute("mobile"));
            		vo.setLdap_displayName(ctx.getStringAttribute("displayName"));
            		
            		try {
						memberServiceImpl.updateUserInfoByLdap(vo);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
            	}
            	UserDetails details = memberServiceImpl.loadUserByUsername(username);
                return details;
            }
        };
    }
    */
    /*
     * 1) sessionRegistry(sessionRegistry()); 를 추가하지 않으면 사용자가 Logout 후 다시 Login 할 때 
     * "Maximum sessions of 1 for this principal exceeded" 에러를 발생시키며 로그인 되지 않습니다.
     */
    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }
    /*
    // Register HttpSessionEventPublisher
     * HttpSessionEventPublisher
    	http://dveamer.github.io/backend/PreventDuplicatedLogin.html
    	
		다만, 지금의 설정만으로는 WAS가 하나만 있을 때는 잘 동작하는 것으로 보이겠지만 
		session clustering 환경에서 로그인 방지 처리가 성공적으로 이뤄지지 않습니다. 
		session의 추가 혹은 삭제라는 변경사항이 발생하면 모든 WAS로 전파는 되지만 Spring Security까지 전달이 되지 않습니다. 
		Spring Security가 전달받기 위해서는 아래와 같은 리스너 등록 작업이 필요합니다.
		
		Spring Boot의 내장 tomcat을 사용하는 것이 아니라 외부의 WAS를 이용한다면
		 web.xml에 아래와 같이 리스너 등록을 해주셔야 합니다.
	     web.xml
	    <listener>
	    <listener-class>session.destory.servlet.SessionManagerListener</listener-class>
	    </listener>    
    // was가 여러개 있을 때(session clustering)

    @Bean
    public static ServletListenerRegistrationBean httpSessionEventPublisher() {
        return new ServletListenerRegistrationBean(new HttpSessionEventPublisher());
    }
    @Bean
    public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
      return new ServletListenerRegistrationBean<HttpSessionEventPublisher>(new HttpSessionEventPublisher());
    }    
    */
    /*
     * SessionDestroyedListener
     * 
    @Bean public HttpSessionEventPublisher httpSessionEventPublisher() { 
    	return new HttpSessionEventPublisher(); 
    }
     */

        
    @Bean 
    public PersistentTokenBasedRememberMeServices persistentTokenBasedRememberMeServices(){ 
    	PersistentTokenBasedRememberMeServices persistentTokenBasedRememberMeServices = new PersistentTokenBasedRememberMeServices("uniqueAndSecret", memberServiceImpl, persistentTokenRepository());
    	persistentTokenBasedRememberMeServices.setParameter("auto_login");
    	persistentTokenBasedRememberMeServices.setAlwaysRemember(false);
    	persistentTokenBasedRememberMeServices.setCookieName("remember-me");
//    	persistentTokenBasedRememberMeServices.setTokenValiditySeconds(60);
    	persistentTokenBasedRememberMeServices.setTokenValiditySeconds(60*60*24*7);
    	return persistentTokenBasedRememberMeServices; 
    } 
    @Bean 
    public PersistentTokenRepository persistentTokenRepository(){ 
    	TokenRepositoryImpl tokenRepositoryImpl = new TokenRepositoryImpl(); 
    	return tokenRepositoryImpl; 
    }
    
    
    @Bean

    @Override

    public AuthenticationManager authenticationManagerBean() throws Exception {

        return super.authenticationManagerBean();

    }
    @Bean

    public AuthenticationFilterObtainUsernameFilter authenticationFilterObtainUsername() throws Exception {

    	AuthenticationFilterObtainUsernameFilter authenticationFilterObtainUsername = new AuthenticationFilterObtainUsernameFilter();

        authenticationFilterObtainUsername.setAuthenticationManager(this.authenticationManagerBean());

        authenticationFilterObtainUsername.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/login2","POST"));

        return authenticationFilterObtainUsername;

    }

}
