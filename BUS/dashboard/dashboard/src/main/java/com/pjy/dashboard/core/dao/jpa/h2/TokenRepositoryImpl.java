package com.pjy.dashboard.core.dao.jpa.h2;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.pjy.dashboard.core.dao.jpa.h2.RememberMeRepository;
import com.pjy.dashboard.core.domain.security.RememberMeVo;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Transactional 
@Repository
public class TokenRepositoryImpl implements PersistentTokenRepository { 
	@Autowired 
	private RememberMeRepository tokenRepository; 
	
	
	@Override 
	public void createNewToken(PersistentRememberMeToken token) { 
		// TODO Auto-generated method stub 
		RememberMeVo newToken = new RememberMeVo(); 
		newToken.setUserId(token.getUsername()); 
		newToken.setToken(token.getTokenValue()); 
		newToken.setLastAccessDt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())); 
		newToken.setSeries(token.getSeries()); 
		
		tokenRepository.save(newToken); 
	} 
	@Override 
	public void updateToken(String series, String tokenValue, Date lastUsed) { 
		log.info("updateToken :" + series + " / " + tokenValue); 
		// TODO Auto-generated method stub 
		RememberMeVo updateToken = tokenRepository.findBySeries(series); 
		updateToken.setToken(tokenValue); 
		updateToken.setLastAccessDt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())); 
		updateToken.setSeries(series); 
		tokenRepository.save(updateToken); 
	} 
	@Override 
	public PersistentRememberMeToken getTokenForSeries(String series) {
		log.info("getTokenForSeries :" + series); 
		// TODO Auto-generated method stub 
		RememberMeVo token = tokenRepository.findBySeries(series); 
		if (token == null ) return null;
		try {
			PersistentRememberMeToken persistentRememberMeToken = new PersistentRememberMeToken(token.getUserId(), series, token.getToken(), token.getLastAccessDt()); 
			return persistentRememberMeToken;
		} catch (Exception e) {
			log.error(e.getMessage());
			return null;
		}
	} 
	@Override 
	public void removeUserTokens(String username) { 
		log.info("removeUserTokens :" + username); 
		tokenRepository.deleteByUserId(username);
	} 
}
	


