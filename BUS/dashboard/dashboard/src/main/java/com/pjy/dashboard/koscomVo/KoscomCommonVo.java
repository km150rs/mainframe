package com.pjy.dashboard.koscomVo;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.math.BigDecimal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.core.anotation.FieldInfo;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
/* FTP::CS2(개발_kfoss)_172.21.12.116\/apframe/kfoss/sise/appl/include|kspq.h */
@Slf4j
@Getter
@Setter
public  class KoscomCommonVo {

	private String data_gb;
	private String info_gb;
	private String market_gb;
	
	public KoscomCommonVo() {
	}

	public void getHeader(String recvPacket)  {
		data_gb = recvPacket.substring(0,2);
		info_gb = recvPacket.substring(2,4);
		market_gb = recvPacket.substring(4,5);
	}
	/*
	 * getClassVo
	 * 수신된 packet에 해당하는 vo class 를 찾아 return
	 */	
	public Object getClassVo(String recvPacket) throws ClassNotFoundException, InstantiationException, IllegalAccessException {
		
		Class<?> objClass = null;
		String className = null;
		try {
			className = String.format("com.pjy.dashboard.koscomVo.kospi.%s",data_gb);
			objClass = Class.forName(className);
			return objClass.newInstance();
		} catch (ClassNotFoundException e) {
			className = String.format("com.pjy.dashboard.koscomVo.kospi.%s%s%s",data_gb,info_gb,market_gb);
			try {
				objClass = Class.forName(className);
				return objClass.newInstance();
			} catch (ClassNotFoundException e1) {
				return null;
				//className = String.format("com.pjy.dashboard.koscomVo.kospi.%s%s1",data_gb,info_gb);
				//objClass = Class.forName(className);
				//return objClass.newInstance();
			}
		}
	}

	/*
	 * displayVo
	 * vo class내 항목을 출력한다
	 */	
	public void displayVo(Object vo) {
		try {
			// 맴버 변수를 취득
			for (Field field : vo.getClass().getDeclaredFields()) {
				FieldInfo anno = field.getDeclaredAnnotation(FieldInfo.class);
				if (anno != null) {
					int len = anno.length();
					log.info(anno.korName() + "length :" + len);
				}
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}
	/*
	 * getInsertQuery  (old)
	 * 수신된 packet으로 insert query 생성
	 */	
	public String getInsertQuery(Object obj,String recvPacket) {
		FieldInfo anno = null;
		int start = 0;
		int end = 0;
		StringBuilder  qry = new StringBuilder();
		int i=0;
		qry.append("insert into " + obj.getClass().getSimpleName() + " select ");
		try {
			for (Field field : getClass().getDeclaredFields()) {
				 anno = field.getDeclaredAnnotation(FieldInfo.class);
				if (anno != null) {
					//field.setAccessible(true);
					int len = anno.length();
					String aa = subStringNew(recvPacket,start, len);
					//field.set(this, aa);
					if (i == 0)	
						qry.append("'" + aa.trim() + "'");
					else qry.append(",'" + aa.trim() + "'");
					start += len;
					end += len;
				}
				i++;
			}
			log.info("qry :" + qry );
			//jdbcTemplate.execute(sql) ;
		} catch (Throwable e) {
			log.error("anno :" + anno.korName()+ "/" + start + "/" + end);
			e.printStackTrace();
		}
		return qry.toString();
	}
	/*
	 * setData
	 * 수신된 packet으로 vo내 칼럼값을 채운다
	 */
	public void setData(Object obj,String recvPacket) {
		FieldInfo anno = null;
		int start = 0;
		int end = 0;
		try {
			for (Field field : obj.getClass().getDeclaredFields()) {
				 anno = field.getDeclaredAnnotation(FieldInfo.class);
				if (anno != null) {
					field.setAccessible(true);
					int len = anno.length();
					String aa = subStringNew(recvPacket,start, len);
					//log.info(anno.korName() + "length :" + len + " / " + aa);
					field.set(obj, aa);
					start += len;
					end += len;
				}
			}
			log.info("toString :" + obj.toString() );
		} catch (Throwable e) {
			log.error("anno :" + anno.korName()+ "/" + start + "/" + end);
			e.printStackTrace();
		}
	}
	/*
	 * subStringNew
	 * 수신된 packet을 자른다 (한글 처리기능) 
	 */
	private String subStringNew(String strData, int iStartPos, int iByteLength) {
		byte[] bytTemp = null;
		int iRealStart = 0;
		int iRealEnd = 0;
		int iLength = 0;
		int iChar = 0;
		
		try {
			// UTF-8로 변환하는경우 한글 2Byte, 기타 1Byte로 떨어짐
			bytTemp = strData.getBytes("EUC-KR");
			iLength = bytTemp.length;

			for(int iIndex = 0; iIndex < iLength; iIndex++) {
				if(iStartPos <= iIndex) {
					break;
				}
				iChar = (int)bytTemp[iIndex];
				if((iChar > 127)|| (iChar < 0)) {
					// 한글의 경우(2byte 통과처리)
					// 한글은 2Byte이기 때문에 다음 글자는 볼것도 없이 스킵한다
					iRealStart++;
					iIndex++;
				} else {
					// 기타 글씨(1Byte 통과처리)
					iRealStart++;
				}
			}
			
			iRealEnd = iRealStart;
			int iEndLength = iRealStart + iByteLength;
			for(int iIndex = iRealStart; iIndex < iEndLength; iIndex++)
			{
				iChar = (int)bytTemp[iIndex];
				if((iChar > 127)|| (iChar < 0)) {
					// 한글의 경우(2byte 통과처리)
					// 한글은 2Byte이기 때문에 다음 글자는 볼것도 없이 스킵한다
					iRealEnd++;
					iIndex++;
				} else {
					// 기타 글씨(1Byte 통과처리)
					iRealEnd++;
				}
			}
		} catch(Exception e) {
			log.info(e.getMessage());
		}

		return strData.substring(iRealStart, iRealEnd);
	}
	
	/*
	 * convStringToVo (위보다 개선)
	 * 수신된 packet으로 vo내 칼럼값을 채운다
	 */
	public void convStringToVo(Object obj,String recvPacket) {
		int nPos = 0;
		byte[] bstr = null;
		try {
			bstr = recvPacket.getBytes("EUC-KR");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		for (Field field : obj.getClass().getDeclaredFields()) {
			if (field.getName().toLowerCase().contains("filler"))
				break;
			FieldInfo anno = field.getDeclaredAnnotation(FieldInfo.class);
			if (anno == null) continue;
			
			field.setAccessible(true);
			byte []nstr = new byte[anno.length()];
			System.arraycopy(bstr, nPos, nstr, 0, anno.length());
			
			try {
					String zstr = new String(nstr,"EUC-KR");
					if (zstr.isEmpty()) {
						field.set(obj, 0);
					} else if (field.getType() == BigDecimal.class) {
						zstr =  String.format("%s.%s", zstr.substring(0, anno.length() - anno.decimalPoint()),zstr.substring(anno.length() - anno.decimalPoint(),anno.length()));
						//BigDecimal value = new BigDecimal(zstr).stripTrailingZeros();
						//if (value.scale() < 0)
						//	value = value.setScale(0);
						BigDecimal value = new BigDecimal(zstr);
						field.set(obj, value);
					} else 	if (field.getType() == String.class) {
						zstr = zstr.replaceAll("'", "");
						field.set(obj, zstr);
					} else 	if (field.getType() == int.class) {
						field.set(obj, Integer.parseInt(zstr));
					} else 	if (field.getType() == long.class) {
						field.set(obj, Long.parseLong(zstr));
					}					
			} catch (Exception e) {
				// TODO Auto-generated catch block
			}
			nPos += anno.length();
			if (nPos >= bstr.length)
				break;
		}
		//log.info("toString :" + this.toString() );
		return ;
	}
	/*
	 * getInsertQueryNew
	 * 수신된 packet으로 insert query 생성
	 */
	public String getInsertQueryNew(final Class<?> cls,String recvPacket) {
		int nPos = 0;
		byte[] bstr = null;
		try {
			bstr = recvPacket.getBytes("EUC-KR");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		StringBuilder  qry = new StringBuilder();
		int i=0;
		qry.append("insert into " + cls.getSimpleName() + " select ");

		
		for (Field field : cls.getDeclaredFields()) {
			if (field.getName().toLowerCase().contains("filler"))
				break;
			FieldInfo anno = field.getDeclaredAnnotation(FieldInfo.class);
			if (anno == null) continue;
			//log.info(anno.toString());
			
			byte []nstr = new byte[anno.length()];
			System.arraycopy(bstr, nPos, nstr, 0, anno.length());
			
			try {
				String zstr = new String(nstr,"EUC-KR").trim();
				if (i > 0)	
					qry.append(",");

				if (field.getType() == BigDecimal.class) {
					zstr =  String.format("%s.%s", zstr.substring(0, anno.length() - anno.decimalPoint()),zstr.substring(anno.length() - anno.decimalPoint(),anno.length()));
					BigDecimal value = new BigDecimal(zstr).stripTrailingZeros();
					if (value.scale() < 0)
						value = value.setScale(0);
					qry.append(value);
				} else 	if (field.getType() == String.class) {
					zstr = zstr.replaceAll("'", "");
					qry.append("'" + zstr + "'");
				} else 	if (field.getType() == int.class) {
					if (zstr.isEmpty()) {
						qry.append(0);
					} else {
						qry.append(Integer.parseInt(zstr));
					}
				} else 	if (field.getType() == long.class) {
					if (zstr.isEmpty()) {
						qry.append(0);
					} else {
						qry.append(Long.parseLong(zstr));
					}
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
			}
			nPos += anno.length();
			if (nPos >= bstr.length)
				break;
			i++;
		}
		//log.info("toString :" + this.toString() );
		return qry.toString();
	}
	
	/*
	 * getUpdateQueryNew
	 * 수신된 packet으로 update query 생성
	 */
	public String getUpdateQueryNew(final Class<?> cls,String recvPacket) {
		int nPos = 0;
		byte[] bstr = null;
		try {
			bstr = recvPacket.getBytes("EUC-KR");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		StringBuilder  qry = new StringBuilder();
		StringBuilder  qry_pk = new StringBuilder();
		int i=0,k=0;
		
		qry.append("update " + cls.getSimpleName() + " set ");

		
		for (Field field : cls.getDeclaredFields()) {
			if (field.getName().toLowerCase().contains("filler"))
				break;
			
			FieldInfo anno = field.getDeclaredAnnotation(FieldInfo.class);
			if (anno == null) continue;
			
			byte []nstr = new byte[anno.length()];
			System.arraycopy(bstr, nPos, nstr, 0, anno.length());
			
			try {
				String zstr = new String(nstr,"EUC-KR").trim();
				//log.info(anno.korName() + "[" + zstr + "]");
				if (anno.pk()) {
					if (k == 0)	
						qry_pk.append(" where " + anno.korName() + " = '" + zstr + "'");
					else
						qry_pk.append(" and " + anno.korName() + " = '" + zstr + "'");
					k++;
					nPos += anno.length();
					continue;
				}
				
				if (i > 0)	
					qry.append(",");

				qry.append(anno.korName() + " = ");
				//log.info(anno.korName() + "" + zstr);

				if (field.getType() == BigDecimal.class) {
					if (zstr == null || zstr.isEmpty() || zstr.equals(" "))
						qry.append(0);
					else {
						//log.info(anno.korName() + "" + zstr.substring(0, anno.length() - anno.decimalPoint()));
						//log.info(anno.korName() + "" + zstr.substring(anno.length() - anno.decimalPoint(),anno.length()));
						String new_zstr =  String.format("%s.%s", zstr.substring(0, anno.length() - anno.decimalPoint()),zstr.substring(anno.length() - anno.decimalPoint(),anno.length()));
						BigDecimal value = new BigDecimal(new_zstr).stripTrailingZeros();
						if (value.scale() < 0)
							value = value.setScale(0);
						qry.append(value);
					}
				} else 	if (field.getType() == String.class) {
					zstr = zstr.replaceAll("'", "");
					qry.append("'" + zstr + "'");
				} else 	if (field.getType() == int.class) {
					if (zstr.isEmpty()) {
						qry.append(0);
					} else {
						qry.append(Integer.parseInt(zstr));
					}
				} else 	if (field.getType() == long.class) {
					if (zstr.isEmpty()) {
						qry.append(0);
					} else {
						qry.append(Long.parseLong(zstr));
					}
				}

			} catch (Exception e) {
				log.info(e.getMessage());
				// TODO Auto-generated catch block
			}
			nPos += anno.length();
			if (nPos >= bstr.length)
				break;
			i++;
		}
		//log.info("toString :" + this.toString() );
		return qry.toString() + qry_pk.toString();
	}	
	public String getInitQuery(Object obj) {
		String qry;
		
		qry = String.format("delete from %s where %s = '%s'", obj.getClass().getSimpleName(), getIndexColumn(obj),getIndexValue(obj));
		log.info("getInitQuery :" + qry);
		
		return qry;
	}
    public String getIndexColumn(Object obj) {
    	String strKey = "";
    	for (Field field : obj.getClass().getDeclaredFields()) {
			FieldInfo anno = field.getDeclaredAnnotation(FieldInfo.class);
			if (anno == null) continue;
			if (anno.pk()) {
				if (strKey.isEmpty())
					strKey = field.getName();
				else strKey = strKey + "||" + field.getName();
			}
    	}
    	return strKey;
	}
    public String getIndexValue(Object obj) {
    	String strValue = "";
    	for (Field field : obj.getClass().getDeclaredFields()) {
    		field.setAccessible(true);
			FieldInfo anno = field.getDeclaredAnnotation(FieldInfo.class);
			if (anno == null) continue;
			if (anno.pk()) {
				try {
					
					strValue = strValue + field.get(obj);
				} catch (Exception e) {
					e.printStackTrace();
					return null;
				}
			}
    	}
    	return strValue;
	}
    
    public String  getJSONString(Object vo) {
		String str = null;
        ObjectMapper mapper = new ObjectMapper();
        try {
        	str = mapper.writeValueAsString(vo);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			return str;
		}
        return str; 
	}
}
