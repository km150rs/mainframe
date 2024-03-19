package com.pjy.dashboard.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.ServletResponseWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import com.pjy.dashboard.core.filter.BufferedHttpResponseWrapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TestFilter implements Filter {
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		log.info("init Pjy Filter");
	}
/* 
 * 2021/01/22 의도한대로 잘안됨 
 * 
 */
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

		BufferedHttpResponseWrapper responseWrapper = new BufferedHttpResponseWrapper((HttpServletResponse) res);
		chain.doFilter(req, responseWrapper);		


		byte[] origXML = responseWrapper.getBuffer();
		if (origXML == null || origXML.length == 0) {
			log.info("origXML 0");
			return;
		} 
		String string = new String(origXML, "utf-8");
		//string = string.replaceAll("(\r\n|\r|\n|\n\r|\\p{Z}|\\t)", "");
		string = string.replaceAll("(\r\n|\r|\n|\n\r|\\t)", "");
		res.getOutputStream().write(string.getBytes());
		//res.getOutputStream().write(origXML);
		res.flushBuffer( );
	}
	
	@Override
	public void destroy() {
		log.info("destroy Pjy Filter");
	}
}