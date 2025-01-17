package com.pjy.dashboard.domain;

import java.util.List;

import com.nexacro17.xapi.license.A.E;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MenuVo {
	private String subMenu;
	
	private String menuId;
	private String menuNm;
	private String url;
	private int mainSeq;
	private int subSeq;
	private String role;
	
	private List<MenuVo> list;       
}

