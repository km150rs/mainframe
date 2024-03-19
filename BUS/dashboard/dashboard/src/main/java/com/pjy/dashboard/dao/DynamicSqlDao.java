package com.pjy.dashboard.dao;

import java.io.IOException;
import java.io.Reader;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.DatabaseMetaDataCallback;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.jdbc.support.MetaDataAccessException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pjy.dashboard.domain.CommonCodeVo;
import com.pjy.dashboard.util.DateUtil;
import com.pjy.dashboard.domain.AttendanceInfoVo;

import lombok.extern.slf4j.Slf4j;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.select.Select;
import net.sf.jsqlparser.util.TablesNamesFinder;
@Slf4j
public class DynamicSqlDao {

	public JdbcTemplate jdbcTemplate;
	public NamedParameterJdbcTemplate simpleJdbcTemplate;
	
    private static final String SQL_STORED_PROC = ""
            + " BEGIN"
            + "  	 nfoss.PACK_UTIL.SP_DEBUG('$1','$2');"
            + " END;";
    private static final String INVALID_COMPILE = ""
            + " BEGIN"
            + "  	    DBMS_UTILITY.COMPILE_SCHEMA ('NFOSS',false);"
            + " END;";
    private static final String SEND_MAIL_COMPLIANCE_RESULT = ""
            + " BEGIN"
            + "  	    PACK_COMP_BATCH.SEND_MAIL_COMPLIANCE_RESULT('$1');"
            + " END;";
    private static final String INSERT_TABLE_REAL_TO_DEV = ""
            + " BEGIN"
            + "  	    PACK_REAL_TO_DEV.INSERT_TABLE_REAL_TO_DEV('03191');"
            + " END;";

    private static final String SEND_SMS = ""
            + " BEGIN"
            + "    sp_sms_send@MIRAEFMSS( '$1','$2', '$3', '$4','$5');"  
            + " END;";

    
	public Object  getSingleDataBySql(String sql) throws Exception {
		//log.info(sql);
		return jdbcTemplate.queryForMap(sql);
	}
    
	public Collection<?>  getDataBySql(String sql) throws Exception {
		//log.info(sql);
		return jdbcTemplate.query(sql, new MemMapper());
	}
    private static final class MemMapper implements RowMapper<Object>{
        public Object mapRow(ResultSet rs, int rowCnt) throws SQLException{
            ResultSetMetaData rsMeta = rs.getMetaData();
            int colCount = rsMeta.getColumnCount();
            String clobString = null;
            String colNm = null;
            
            LinkedHashMap<String, Object> columns = new LinkedHashMap<String, Object>();
            for (int i = 1; i <= colCount; i++) {
            	colNm = rsMeta.getColumnLabel(i).toLowerCase();
            	if (rs.getObject(i) == null)
                    columns.put(colNm, " ");
            	else {
            		if (rsMeta.getColumnType(i) == Types.CLOB) {
            			try {
							clobString = readClobData(rs.getCharacterStream(colNm));
							columns.put(colNm, clobString);
						} catch (IOException | SQLException e) {
							// TODO Auto-generated catch block
							//e.printStackTrace();
						}
            		} else if (rsMeta.getColumnType(i) == Types.DATE || rsMeta.getColumnType(i) == Types.TIMESTAMP) {
            			java.sql.Date date = rs.getDate(i);
            			DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
            			columns.put(colNm, dateFormat.format(date));
            		} else {
            			columns.put(colNm, rs.getObject(i));
            		}
            	}
            }
            return columns;
        }
        public static String readClobData(Reader reader) throws IOException {
            StringBuffer data = new StringBuffer();
            char[] buf = new char[1024];
            int cnt = 0;
            if (null != reader) {
                while ( (cnt = reader.read(buf)) != -1) {
                    data.append(buf, 0, cnt);
                }
            }
            return data.toString();
        }

            
    }
	private static final class MemMapper2 implements RowMapper<Object>{
        public Object mapRow(ResultSet rs, int rowCnt) throws SQLException{
            ResultSetMetaData rsMeta = rs.getMetaData();
            int colCount = rsMeta.getColumnCount();

            Map<String, Object> columns = new HashMap<String, Object>();
            for (int i = 1; i <= colCount; i++) {
            	if (rs.getObject(i) == null)
                    columns.put(rsMeta.getColumnLabel(i).toLowerCase(), " ");
            	else                columns.put(rsMeta.getColumnLabel(i).toLowerCase(), rs.getObject(i));
            }
            return columns;
        }
    }

    
	//header참고
	public void writeDebugLog(String arg1,String arg2) throws Exception {
		String sql = SQL_STORED_PROC.replace("$1",arg1).replace("$2",arg2);
		jdbcTemplate.execute(sql) ;
		return ;
	}

	public void compileInvalidObject() throws Exception {
		String sql = INVALID_COMPILE;
		jdbcTemplate.execute(sql) ;
		return ;
	}

	public void sendMailComplianceResult(String arg1) throws Exception {
		String sql = SEND_MAIL_COMPLIANCE_RESULT.replace("$1",arg1);
		jdbcTemplate.execute(sql) ;
		return ;
	}
	public void insertTableRealToDev() throws Exception {
		String sql = INSERT_TABLE_REAL_TO_DEV;
		jdbcTemplate.execute(sql) ;
		return ;
	}

	public void dailyBackup(String fileBackupDir) throws Exception {
		String sql = String.format("BACKUP TO '%sbackup_%s.zip'",fileBackupDir, DateUtil.getDay());
		jdbcTemplate.execute(sql) ;
		return ;
	}
	
    public String checkBackDate(int arg1) throws SQLException{
    	String sql = String.format("select F_NDD_SLS_DT(to_char(sysdate,'yyyymmdd'),%d) from dual",arg1);
        return this.jdbcTemplate.queryForObject(sql, String.class);
	}	

    public int checkApiProcStatus(String sql) throws SQLException{
        return this.jdbcTemplate.queryForObject(sql, Integer.class);
        //return this.jdbcTemplate.queryForObject("select (sysdate - to_date(max(mm_cg_time),'YYYYMMDDHH24MISS')) * ( 24 * 60 * 60) from SF01OS0101 where rec_date = to_char(sysdate,'YYYYMMDD')", Integer.class);
	}	
	public void sendSMS(String arg1,String arg2,String arg3,String arg4,String arg5) throws Exception {
		String sql = SEND_SMS.replace("$1",arg1).replace("$2",arg2).replace("$3",arg3).replace("$4",arg4).replace("$5",arg5);
		jdbcTemplate.execute(sql) ;
		return ;
	}
	/*
	 * not use
	 */
    public int getCTIUserCount() throws SQLException{
        return this.jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users", Integer.class);
    }	
/*
    private RowMapper<AttendanceInfoVo> ctiInfoVoMapper = new RowMapper<AttendanceInfoVo>() {
        public AttendanceInfoVo mapRow(ResultSet rs, int rowNum) throws SQLException {
        	AttendanceInfoVo vo = new AttendanceInfoVo();
            vo.setSvc_id(rs.getString("svc_id"));
            vo.setLog_id(rs.getString("log_id"));
            vo.setServer_ip(rs.getString("server_ip"));
            vo.setSvc_nm(rs.getString("svc_nm"));
            vo.setSvc_nm(rs.getString("log_nm"));
            vo.setProc_ymd(rs.getString("proc_ymd"));
            vo.setUse_yn(rs.getString("use_yn"));
            vo.setPid(rs.getString("pid"));
            vo.setPid_nm(rs.getString("pid_nm"));
            return vo;
        }
    };    
	// cti info
	public AttendanceInfoVo getCTIInfo(String server_ip,String svc_id,String log_id) throws Exception {
		AttendanceInfoVo info = jdbcTemplate.queryForObject("select  * from  TBL_XML_CTI_INFO a where a.server_ip = ? and a.svc_id = ? and a.log_id = ? ",new Object[] {server_ip,svc_id,log_id}, this.ctiInfoVoMapper );
        return info;
	}
	*/
	//header참고
	public List<Object> getHeaderBySql(String sql) throws Exception {
		List<Object> colHeaders = jdbcTemplate.query(sql,new DynamicHeaderMapper()) ;
		return colHeaders;
	}

	public String getData4(int seq) throws Exception {
	//	List<String> colHeaders = jdbcTemplate.query("select * from tbl_CORR_JM_info where koscom_cd = '069500'",new DynamicHeaderMapper()) ;
		Map<String,Object> data = jdbcTemplate.queryForMap("select * from tbl_CORR_JM_info where koscom_cd = '069500'");

		//String jsonCol = new Gson().toJson(colHeaders);
		//String jsonData = new Gson().toJson(data);
		//String jsonCol = new Gson().toJson(colHeaders);
		//log.info(jsonCol);

		ObjectMapper mapper = new ObjectMapper();
		JSONObject jsonObj = new JSONObject();
		//String strCol = colHeaders.toString().replace("[","").replace("]", "");

		//String jsonstrCol = mapper.writeValueAsString(colHeaders);
		String jsonData = mapper.writeValueAsString(data);
		
        //jsonObj.put("columns"    ,jsonstrCol);
        jsonObj.put("data"  	,jsonData);
        
		return jsonObj.toString();
        //return jsonstrCol;
	}

	public Object getTableListByF2(String searchTable) throws Exception {
		Object tblList = JdbcUtils.extractDatabaseMetaData(jdbcTemplate.getDataSource(), 
			new DatabaseMetaDataCallback() {
	            @Override
	            public Object processMetaData(DatabaseMetaData dmd) throws SQLException,
	                    MetaDataAccessException {
	                List<Object> tableList = new ArrayList<Object>();
	                ResultSet rs = dmd.getTables(null, null, searchTable, new String[] { "TABLE" });
	                while (rs.next()) {
	        			try {
	        				Map<String,Object> data = jdbcTemplate.queryForMap("select  a.TABLE_NAME,a.COMMENTS from  all_tab_comments a where a.table_name = '" + rs.getString("TABLE_NAME") + "' and rownum = 1");
	        				tableList.add(data);
	        			} catch (EmptyResultDataAccessException e) {
	        				return null;
	        			}
	                }
	
	                return tableList;
	            }
        	}
		);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("tableList", tblList);
		
		return data;
	}
	// sql내 테이블 comment 정보 return
	public Object getTableComment(String tableName) throws Exception {
		tableName = tableName.toUpperCase().replace("NFOSS.", "");
		Map<String,Object> comment = jdbcTemplate.queryForMap("select  a.COMMENTS from  all_tab_comments a where a.table_name = '" + tableName.toUpperCase() + "' and rownum = 1");
        return comment;
	}	
	// sql내 테이블 정보 return
	public Object getTableListBySql(String sql) throws Exception {
		Statement statement = CCJSqlParserUtil.parse(sql);
		Select selectStatement = (Select) statement;
		TablesNamesFinder tablesNamesFinder = new TablesNamesFinder();
		List<String> tableList = tablesNamesFinder.getTableList((Statement) selectStatement);

    	List<Object> infoList = new ArrayList<Object>();
		for (String element : tableList) {
			//log.info("element:"+element.toUpperCase());
			String table = element.toUpperCase().replace("NFOSS.", "");
			try {
				Map<String,Object> data = jdbcTemplate.queryForMap("select  a.TABLE_NAME,a.COMMENTS from  all_tab_comments a where a.table_name = '" + table + "' and rownum = 1");
				infoList.add(data);
			} catch (EmptyResultDataAccessException e) {
				return null;
			}
		}
        return infoList;
	}
	//사용안함
	public Object getTableList2(String sql) throws Exception {
		Statement statement = CCJSqlParserUtil.parse(sql);
		Select selectStatement = (Select) statement;
		TablesNamesFinder tablesNamesFinder = new TablesNamesFinder();
		List<String> tableList = tablesNamesFinder.getTableList((Statement) selectStatement);

		Object infoList = JdbcUtils.extractDatabaseMetaData(jdbcTemplate.getDataSource(), 
				new DatabaseMetaDataCallback() {
		            @Override
		            public Object processMetaData(DatabaseMetaData dmd) throws SQLException,
		                    MetaDataAccessException {
		            	List<Object> infoList = new ArrayList<Object>();
		        		for (String element : tableList) {
		        			//log.info("element:"+element.toUpperCase());
			                ResultSet rs = dmd.getTables(null, null, element.toUpperCase(), null);
			                //ResultSetMetaData rsMeta = rs.getMetaData();
			                //int colCount = rsMeta.getColumnCount();
			                //for (int i = 1; i <= colCount; i++) {
			                //    log.info("meta {}",rsMeta.getColumnLabel(i));
			                //}
			                while (rs.next()) {
				                Map<String, Object> info = new HashMap<String, Object>();
				                info.put("TABLE_NAME",rs.getString("TABLE_NAME")); 
				                info.put("REMARKS",rs.getString("REMARKS")); 
				                infoList.add(info);
			                    //log.info("TABLE_NAME {}",rs.getString("TABLE_NAME"));
			                    //log.info("TYPE {}",rs.getString("TABLE_TYPE"));
			                    //log.info("REMARKS {}",rs.getString("REMARKS"));
			                    //log.info("TABLE_CAT {}",rs.getString("TABLE_CAT"));
				                break;
		          		    }
		                }
		                return infoList;
		            }
	        	}
			);		
        return infoList;
	}	
	// 사용안함
	public String getTableInfo(String tbl) throws Exception {
		
		Object infoList = JdbcUtils.extractDatabaseMetaData(jdbcTemplate.getDataSource(), 
			new DatabaseMetaDataCallback() {
	            @Override
	            public Object processMetaData(DatabaseMetaData dmd) throws SQLException,
	                    MetaDataAccessException {
	            	List<Object> infoList = new ArrayList<Object>();
	                ResultSet rs = dmd.getTables(null, null, tbl, null);
	                while (rs.next()) {
		                Map<String, Object> info = new HashMap<String, Object>();
		                info.put("TABLE_NAME ",rs.getString("TABLE_NAME ")); 
		                info.put("REMARKS ",rs.getString("REMARKS ")); 
		                infoList.add(info);
          		    }
	                return infoList;
	            }
        	}
		);
		ObjectMapper mapper = new ObjectMapper();
		String jsonstrCol = mapper.writeValueAsString(infoList);
        return jsonstrCol;
	}
	// 사용안함
	public Object getColumnInfo(String tbl) throws Exception {
		
		Object colList = JdbcUtils.extractDatabaseMetaData(jdbcTemplate.getDataSource(), 
			new DatabaseMetaDataCallback() {
	            @Override
	            public Object processMetaData(DatabaseMetaData dmd) throws SQLException,
	                    MetaDataAccessException {
	            	List<Object> columnList = new ArrayList<Object>();
	                ResultSet rs = dmd.getColumns(null, null, tbl, null);
	                while (rs.next()) {
		                Map<String, Object> columns = new HashMap<String, Object>();
	                	columns.put("COLUMN_NAME",rs.getString("COLUMN_NAME")); 
	                	columns.put("ORDINAL_POSITION",rs.getInt("ORDINAL_POSITION"));
	                	columns.put("TYPE_NAME",rs.getString("TYPE_NAME")); 
	                	String comment = jdbcTemplate.queryForObject("select COMMENTS from ALL_COL_COMMENTS where owner = 'NFOSS' and table_name = ? and column_name = ?", new Object[]{tbl, rs.getString("COLUMN_NAME")}, String.class); 
	                	
	                	columns.put("REMARKS",comment);
	                	columns.put("COLUMN_SIZE",rs.getInt("COLUMN_SIZE"));
	                	columns.put("DECIMAL_DIGITS",rs.getInt("DECIMAL_DIGITS"));
	                	columns.put("NULLABLE",rs.getInt("NULLABLE") == 0 ? false : true);
	                	columnList.add(columns);
          		    }
	
	                return columnList;
	            }
        	}
		);
        return colList;
	}
	/*
	public Object getIndexInfo(String tbl) throws Exception {
		
		Object idxList = JdbcUtils.extractDatabaseMetaData(jdbcTemplate.getDataSource(), 
			new DatabaseMetaDataCallback() {
	            @Override
	            public Object processMetaData(DatabaseMetaData dmd) throws SQLException,
	                    MetaDataAccessException {
	            	List<Object> indexList = new ArrayList<Object>();
	                ResultSet rs = dmd.getIndexInfo(null, "NFOSS", tbl, false,true);
	                while (rs.next()) {
	                	if (rs.getInt("ORDINAL_POSITION") <= 0)	continue;
		                Map<String, Object> columns = new HashMap<String, Object>();
	                	columns.put("INDEX_NAME",rs.getString("INDEX_NAME")); 
	                	columns.put("ORDINAL_POSITION",rs.getInt("ORDINAL_POSITION"));
	                	columns.put("COLUMN_NAME",rs.getString("COLUMN_NAME")); 
	                	columns.put("TYPE",rs.getString("TYPE")); 
	                	
	                	columns.put("CARDINALITY",rs.getInt("CARDINALITY"));
	                	columns.put("INDEX_QUALIFIER",rs.getString("INDEX_QUALIFIER")); 
	                	indexList.add(columns);
          		    }
	
	                return indexList;
	            }
        	}
		);
        return idxList;
	}			
	*/
	public Object getPrimaryKeyInfo(String tbl) throws Exception {
		String sql = " select a.column_id                                                           "
				+ "       ,a.column_name                                                         "
				+ "       ,nvl (b.comments, ' ') as comments                                     "
				+ "       ,case                                                                  "
				+ "            when a.data_type = 'NUMBER' then                                  "
				+ "                a.data_type || '(' || a.data_precision || ',' || a.data_scale "
				+ "                || ')'                                                        "
				+ "            else     a.data_type || '(' || a.data_length || ')'               "
				+ "        end as type                                                           "
				+ "       ,case when nvl (c.column_position, 0) > 0 then 'PK' else ' ' end       "
				+ "            as column_position                                                "
				+ "   from all_tab_columns a, all_col_comments b, all_ind_columns c              "
				+ "  where a.table_name = b.table_name                                           "
				+ "    and a.column_name = b.column_name                                         "
				+ "    and a.owner = 'NFOSS'                                                     "
				+ "    and a.table_name = upper ('" + tbl + "')                                  "
				+ "    and a.owner = c.table_owner(+)                                            "
				+ "    and a.table_name = c.table_name(+)                                        "
				+ "    and a.column_name = c.column_name(+)                                      "
				+ "    and c.index_name(+) like 'PK%'                                            "
				+ " order by a.table_name, a.column_id                                           ";
	
		return this.getDataBySql(sql);
	}				

	public Object getIndexInfo(String tbl) throws Exception {
		
		String sql =   "select c.index_name                                       "
				+ "    ,   c.column_position                                      "
				+ "      ,c.column_name                                           "
				+ "      ,nvl (b.comments, ' ') as comments                       "
				+ "  from all_ind_columns c,all_tab_columns a, all_col_comments b "
				+ " where c.table_owner = 'NFOSS'                                 "
				+ "   and c.table_name  = upper ('" + tbl + "')                   "
				+ "   and c.table_name  = b.table_name                            "
				+ "   and c.column_name = b.column_name                           "
				+ "   and c.table_owner = a.owner                                 "
				+ "   and c.table_name  = a.table_name                            "
				+ "   and c.column_name = a.column_name                           "
				+ "order by c.index_name desc,c.column_position                   ";
	
		return this.getDataBySql(sql);
	}				

	public Object getSqlSelect(String tbl) throws Exception {
	/*	
		try {
			String sql = properties.getString("mtr.query.sql1");
			log.info("properties mtr.query.sql1 : " + sql);	    	
	    } catch (Exception e) {
			log.error("properties error: " + e.getMessage());	    	
	    }
		*/
		String sql =   "select z.sql                                                                                           "
				+ "    || case when instr(z.sql,'FROM') > 0 then ''                                                       "
				+ "            else 'FROM ' || chr (9) || z.table_name "
				+ "       end || ';'                                                                                      "
				+ "       sql                                                                                             "
				+ "from                                                                                                   "
				+ "(                                                                                                      "
				+ "    select replace (                                                                                   "
				+ "               xmlagg (xmlelement (y, '', y.sql)).extract ('//text()').getstringval ()                 "
				+ "              ,'@'                                                                                     "
				+ "              ,'''')                                                                                   "
				+ "               as sql                                                                                  "
				+ "               ,max(y.table_name) table_name                                                           "
				+ "    from                                                                                               "
				+ "    (   select case                                                                                    "
				+ "                       when rownum = 1 then 'SELECT ' || chr (13)                                      "
				+ "                       when idx_no = 1 then 'FROM ' || chr (9) || x.table_name || chr (13) || 'WHERE'  "
				+ "                       when idx_no > 1 then 'AND '                                                     "
				+ "                   end || case                                                                         "
				+ "                       when rownum = 1 then  chr (9) || ' ' || chr (9) || x.column_name || chr (13)    "
				+ "                       when idx_no >= 1 then chr (9) || x.column_name                                  "
				+ "                       else                  chr (9) || ',' || chr (9) || x.column_name || chr (13)    "
				+ "                   end || case                                                                         "
				+ "                       when idx_no = 0 then ''                                                         "
				+ "                       else ' = ' || decode (x.type, 'N', '0', '@@') || chr (13)                       "
				+ "                   end                                                                                 "
				+ "                       as sql                                                                          "
				+ "                       ,x.table_name                                                                   "
				+ "        from                                                                                           "
				+ "        (                                                                                              "
				+ "                select a.column_id                                                                     "
				+ "                      ,a.column_name                                                                   "
				+ "                      ,a.table_name                                                                    "
				+ "                      ,substr (a.data_type, 1, 1) as type                                              "
				+ "                      ,nvl (c.column_position, 0) as idx_no                                            "
				+ "                  from all_tab_columns a, all_ind_columns c                                            "
				+ "                 where a.owner = 'NFOSS'                                                               "
				+ "                   and a.table_name = upper ('" + tbl + "')                                            "
				+ "                   and a.owner = c.table_owner(+)                                                      "
				+ "                   and a.table_name = c.table_name(+)                                                  "
				+ "                   and a.column_name = c.column_name(+)                                                "
				+ "                   and c.index_name(+) like '%PK'                                                      "
				+ "                order by idx_no, a.column_id                                                           "
				+ "        ) x                                                                                            "
				+ "    ) y                                                                                                "
				+ ")z                                                                                                     ";

		return this.getDataBySql(sql);
	}				
	public Object getSqlInsert(String tbl) throws Exception {
		String sql = "select z.sql|| z.sql2 || ');' as sql " 
				+ "from " 
				+ "( " 
				+ "    select replace ( " 
				+ "               xmlagg (xmlelement (y, '', y.sql)).extract ('//text()').getstringval () " 
				+ "              ,'@' " 
				+ "              ,'''') " 
				+ "               as sql " 
				+ "            ,replace ( " 
				+ "               xmlagg (xmlelement (y, '', y.sql2)).extract ('//text()').getstringval () " 
				+ "              ,'@' " 
				+ "              ,'''') " 
				+ "               as sql2              " 
				+ "    from  " 
				+ "    (   select case " 
				+ "                       when rownum = 1 then 'INSERT INTO ' || chr (9) || x.table_name || '(' || chr (13) " 
				+ "               end  " 
				+ "               || case " 
				+ "                       when rownum = 1 then  chr (9) || ' ' || chr (9) || x.column_name || chr (13) " 
				+ "                       else                  chr (9) || ',' || chr (9) || x.column_name || chr (13) " 
				+ "                  end  " 
				+ "               as sql, " 
				+ "                case " 
				+ "                       when rownum = 1 then ') VALUES (' || chr (13) " 
				+ "               end  " 
				+ "               || case " 
				+ "                       when rownum = 1 then  chr (9) || ' ' || chr (9) || decode (x.type, 'N', '0', '@@') || chr (9)|| chr (9)|| '-- ' || x.column_name || chr (13) " 
				+ "                       else                  chr (9) || ',' || chr (9) || decode (x.type, 'N', '0', '@@') || chr (9)|| chr (9)|| '-- ' || x.column_name || chr (13) " 
				+ "                  end  " 
				+ "               as sql2                " 
				+ "        from  " 
				+ "        ( " 
				+ "                select a.column_id " 
				+ "                      ,a.column_name " 
				+ "                      ,a.table_name " 
				+ "                      ,substr (a.data_type, 1, 1) as type " 
				+ "                      ,nvl (c.column_position, 0) as idx_no " 
				+ "                  from all_tab_columns a, all_ind_columns c " 
				+ "                 where a.owner = 'NFOSS' " 
				+ "                   and a.table_name = upper ('" + tbl + "') " 
				+ "                   and a.owner = c.table_owner(+) " 
				+ "                   and a.table_name = c.table_name(+) " 
				+ "                   and a.column_name = c.column_name(+) " 
				+ "                   and c.index_name(+) like '%PK' " 
				+ "                order by idx_no, a.column_id " 
				+ "        ) x " 
				+ "    ) y " 
				+ ")z ";
		return this.getDataBySql(sql);
	}				
	public Object getSqlUpdate(String tbl) throws Exception {
		String sql =   "select z.sql " 
				+ "    || case when instr(z.sql,'WHERE') > 0 then ''  " 
				+ "            else 'WHERE' || chr (9) || 'pk_not_found_' || z.table_name  " 
				+ "       end || chr(13) || ';'  " 
				+ "       sql  " 
				+ "from " 
				+ "( " 
				+ "    select replace ( " 
				+ "               xmlagg (xmlelement (y, '', y.sql)).extract ('//text()').getstringval () " 
				+ "              ,'@' " 
				+ "              ,'''') " 
				+ "               as sql " 
				+ "               ,max(y.table_name) table_name " 
				+ "    from  " 
				+ "    (   select case " 
				+ "                       when rownum = 1 then 'UPDATE ' || chr (9) || x.table_name || chr (13) " 
				+ "                       when idx_no = 1 then 'WHERE' " 
				+ "                       when idx_no > 1 then 'AND ' " 
				+ "                   end || case " 
				+ "                       when rownum = 1 then  'SET' || chr (9) || ' ' || chr (9) || x.column_name  " 
				+ "                       when idx_no >= 1 then chr (9) || x.column_name " 
				+ "                       else                  chr (9) || ',' || chr (9) || x.column_name  " 
				+ "                   end || case " 
				+ "                       when idx_no = 0 then chr (9) || ' = ' || decode (x.type, 'N', '0', '@@') || chr (13) " 
				+ "                       else ' = ' || decode (x.type, 'N', '0', '@@') || chr (13) " 
				+ "                   end " 
				+ "                       as sql " 
				+ "                       ,x.table_name " 
				+ "        from  " 
				+ "        ( " 
				+ "                select a.column_id " 
				+ "                      ,a.column_name " 
				+ "                      ,a.table_name " 
				+ "                      ,substr (a.data_type, 1, 1) as type " 
				+ "                      ,nvl (c.column_position, 0) as idx_no " 
				+ "                  from all_tab_columns a, all_ind_columns c " 
				+ "                 where a.owner = 'NFOSS' " 
				+ "                   and a.table_name = upper ('" + tbl + "') " 
				+ "                   and a.owner = c.table_owner(+) " 
				+ "                   and a.table_name = c.table_name(+) " 
				+ "                   and a.column_name = c.column_name(+) " 
				+ "                   and c.index_name(+) like '%PK' " 
				+ "                order by idx_no, a.column_id " 
				+ "        ) x " 
				+ "    ) y " 
				+ ")z ";
		return this.getDataBySql(sql);
	}				
	public Object getSqlDelete(String tbl) throws Exception {
		String sql =   "select z.sql " 
				+ "    || case when instr(z.sql,'FROM') > 0 then ''  " 
				+ "            else 'FROM ' || chr (9) || z.table_name || chr (13) || " 
				+ "                 'WHERE' || chr (9) || 'pk_not_found_' || z.table_name  " 
				+ "       end || chr(13) || ';'  " 
				+ "       as sql  " 
				+ "from " 
				+ "( " 
				+ "    select replace ( " 
				+ "               xmlagg (xmlelement (y, '', y.sql)).extract ('//text()').getstringval () " 
				+ "              ,'@' " 
				+ "              ,'''') " 
				+ "               as sql " 
				+ "               ,max(y.table_name) table_name " 
				+ "    from  " 
				+ "    (   select case " 
				+ "                       when rownum = 1 then 'DELETE ' || chr (13) " 
				+ "                       when idx_no = 1 then 'FROM ' || chr (9) || x.table_name || chr (13) || 'WHERE' " 
				+ "                       when idx_no > 1 then 'AND ' " 
				+ "                   end || case " 
				+ "                       when idx_no >= 1 then chr (9) || x.column_name " 
				+ "                       else                  '' " 
				+ "                   end || case " 
				+ "                       when idx_no = 0 then '' " 
				+ "                       else ' = ' || decode (x.type, 'N', '0', '@@') || chr (13) " 
				+ "                   end " 
				+ "                       as sql " 
				+ "                       ,x.table_name " 
				+ "        from  " 
				+ "        ( " 
				+ "                select a.column_id " 
				+ "                      ,a.column_name " 
				+ "                      ,a.table_name " 
				+ "                      ,substr (a.data_type, 1, 1) as type " 
				+ "                      ,nvl (c.column_position, 0) as idx_no " 
				+ "                  from all_tab_columns a, all_ind_columns c " 
				+ "                 where a.owner = 'NFOSS' " 
				+ "                   and a.table_name = upper ('" + tbl + "') " 
				+ "                   and a.owner = c.table_owner(+) " 
				+ "                   and a.table_name = c.table_name(+) " 
				+ "                   and a.column_name = c.column_name(+) " 
				+ "                   and c.index_name(+) like '%PK' " 
				+ "                order by idx_no, a.column_id " 
				+ "        ) x " 
				+ "    ) y " 
				+ ")z ";
		return this.getDataBySql(sql);
	}				
	
	/*
	 * 컴플라이언스 소요시간 구간별 대상 file list (개발에만 존재)
	 */
	public Object getComplianceListByTimeGubun(String proc_ymd,String server_ip,String timeGubun,
			String product
			) throws Exception {
		String sql =   " select  x.data ,x.user_nm " 
				+ " from ( " 
				+ " select   " 
				+ "         a.error_msg as data " 
				+ "     ,   b.user_nm " 
				+ "     ,   case when a.elapsed_time between '00:00:00.000' and '00:00:03.000' then '1' " 
				+ "              when a.elapsed_time between '00:00:03.001' and '00:00:05.000' then '2' " 
				+ "              when a.elapsed_time between '00:00:05.001' and '00:00:10.000' then '3' " 
				+ "              when a.elapsed_time between '00:00:10.001' and '00:00:30.000' then '4' " 
				+ "              when a.elapsed_time between '00:00:30.001' and '00:00:60.000' then '5' " 
				+ "              else '6' " 
				+ "         end as gubun             " 
				+ " from tbl_mtr_errorlog a, ozx0us@jnfoss b" 
				+ " where a.proc_ymd = '" + proc_ymd + "' " 
				+ " and ( "
				+ " 		( '" + server_ip + "' = '172.21.12.116' and a.server_ip = '" + server_ip + "') "
				+ " 	or	( '" + server_ip + "' <> '172.21.12.116' and a.server_ip in ('172.21.12.117','172.21.12.118')) "
				+ " 	) "
				+ " and a.action = 'compl' " 
				+ " and a.svc_id = decode('" + product + "','All',a.svc_id,'" + product + "') "
				+ " and b.unyong_cd(+) = '03191' "
				+ " and a.pid = b.user_id(+) "
				+ " ) x  " 
				+ " where x.gubun = decode('" + timeGubun + "','7',x.gubun,'" + timeGubun + "') "
				;

		return jdbcTemplate.query(sql, new SplitMapper());
	}				
    private static final class SplitMapper implements RowMapper<Object>{
        public Object mapRow(ResultSet rs, int rowCnt) throws SQLException{
            ResultSetMetaData rsMeta = rs.getMetaData();
            int colCount = rsMeta.getColumnCount();

            Map<String, Object> columns = new HashMap<String, Object>();
            String[] strArray = null;
            //for (int i = 1; i <= colCount; i++) {
            	strArray = rs.getString(1).split(" ");
            	int j = 0;
            	for (String s : strArray) {
            		columns.put("data"+j, s);
            		j++;
            	}
            	columns.put("user_nm", rs.getString(2));
            //}
            return columns;
        }
   }
		
	public List<String>  getUnionDataBySql(String sql) throws Exception {
		//log.info(sql);
		return jdbcTemplate.query(sql, new unionMemMapper());
	}
    private static final class unionMemMapper implements RowMapper<String>{
        @Override
        public String mapRow(ResultSet rs, int rowCnt) throws SQLException{
            	return rs.getString(1);
        }
    }

	public void batchInsert(String insertSql, List<Map<String, Object>> list ) throws Exception {
	    SqlParameterSource[] source = new SqlParameterSource[list.size()];
	    int i=0;
	    
	    for (Map<String, Object> map : list) {
	    	source[i++] = new MapSqlParameterSource(map);
	    }
	    try {
	    	simpleJdbcTemplate.batchUpdate(insertSql, source);
	    } catch (DuplicateKeyException ex1) {
	    	return;
	    }
		
		return ;
	}
	public String getInsertSql(CommonCodeVo vo,String tableName) throws SQLException {
			//log.info("server  : {},tableName:{}", server , tableName);
		DatabaseMetaData databaseMetaData = jdbcTemplate.getDataSource().getConnection().getMetaData();
		ResultSet columns = databaseMetaData.getColumns(null,null, tableName, null);
			
		ArrayList<String> columnList = new ArrayList<String>();
	
		StringBuilder nameBuilder = new StringBuilder();
		StringBuilder valueBuilder = new StringBuilder();
		while(columns.next()) {
			columnList.add(columns.getString("COLUMN_NAME").toLowerCase());
		}
		String str = null;
		for (String col : columnList) {
		    nameBuilder.append(",").append(col);
		    if (col.equals("company_no"))
		    	str = String.format(", '%s' ", vo.getCompanyNo());
		    else if (col.equals("last_chg_user"))
		    	str = String.format(", '%s' ", vo.getUserVo().getUsername());	
		    else if (col.equals("base_year") && vo.getBaseYear() != null)
		    	str = String.format(", '%s' ", vo.getBaseYear());	
		    else if (col.equals("base_ym") && vo.getBaseYm() != null)
		    	str = String.format(", '%s' ", vo.getBaseYm());	
		    else if (col.equals("base_ymd") && vo.getBaseYmd() != null )
		    	str = String.format(", '%s' ", vo.getBaseYmd());	
		    else if (col.equals("route_nm") && vo.getRouteNm() != null )
		    	str = String.format(", '%s' ", vo.getRouteNm());	
		    else if (col.equals("last_chg_date"))
		    	str = String.format(", TO_CHAR( SYSDATE,'yyyy-mm-dd hh:mi:ss')");	
		    else str = String.format(", :%s ", col);

		    valueBuilder.append(str);
		    
		    // 배차정시성용: TBL_arrange_punctuality_info
		    if (vo.getLastColumnNm() != null && vo.getLastColumnNm().equals(col))
		    	break;
		}
	
		String insertSql = String.format("INSERT INTO %s (%s) values (%s)", 
					tableName
				,	nameBuilder.deleteCharAt(0).toString()
				,	valueBuilder.deleteCharAt(0).toString());
		log.info("insert sql : {}", insertSql);
		return insertSql;
	}	
	public String getMergeSql(CommonCodeVo vo,String tableName) throws SQLException {
		//log.info("server  : {},tableName:{}", server , tableName);
		DatabaseMetaData databaseMetaData = jdbcTemplate.getDataSource().getConnection().getMetaData();
		ResultSet columns = databaseMetaData.getColumns(null,null, tableName, null);
		ResultSet keyColumns = databaseMetaData.getPrimaryKeys(null,null, tableName);
		
			
		ArrayList<String> columnList = new ArrayList<String>();
		ArrayList<String> keyColumnList = new ArrayList<String>();
	
		StringBuilder nameBuilder = new StringBuilder();
		StringBuilder valueBuilder = new StringBuilder();

		while(keyColumns.next()) {
			String key = keyColumns.getString("COLUMN_NAME").toLowerCase();
			keyColumnList.add(key);
		    nameBuilder.append(",").append(key);
		}

		while(columns.next()) {
			columnList.add(columns.getString("COLUMN_NAME").toLowerCase());
		}
		String str = null;
		for (String col : columnList) {
		    if (col.equals("company_no"))
		    	str = String.format(", '%s' ", vo.getCompanyNo());
		    else if (col.equals("last_chg_user"))
		    	str = String.format(", '%s' ", vo.getUserVo().getUsername());	
		    else if (col.equals("base_year") && vo.getBaseYear() != null)
		    	str = String.format(", '%s' ", vo.getBaseYear());	
		    else if (col.equals("base_ym") && vo.getBaseYm() != null)
		    	str = String.format(", '%s' ", vo.getBaseYm());	
		    else if (col.equals("base_ymd") && vo.getBaseYmd() != null )
		    	str = String.format(", '%s' ", vo.getBaseYmd());	
		    else if (col.equals("route_nm") && vo.getRouteNm() != null )
		    	str = String.format(", '%s' ", vo.getRouteNm());	
		    else if (col.equals("last_chg_date"))
		    	str = String.format(", TO_CHAR( SYSDATE,'yyyy-mm-dd hh:mi:ss')");	
		    else str = String.format(", :%s ", col);
	
		    valueBuilder.append(str);
		    
		    // 배차정시성용: TBL_arrange_punctuality_info
		    if (vo.getLastColumnNm() != null && vo.getLastColumnNm().equals(col))
		    	break;
		}
	
		String mergeSql = String.format("MERGE INTO %s KEY (%s) select %s", 
					tableName
				,	nameBuilder.deleteCharAt(0).toString()
				,	valueBuilder.deleteCharAt(0).toString());
		log.info("merge sql : {}", mergeSql);
		return mergeSql;
	}	

	public Object getPrimaryColumns(CommonCodeVo vo) throws SQLException {
		//log.info("server  : {},tableName:{}", server , tableName);
		DatabaseMetaData databaseMetaData = jdbcTemplate.getDataSource().getConnection().getMetaData();
		ResultSet keyColumns = databaseMetaData.getPrimaryKeys(null,null,  vo.getTargetTable());
		
		ArrayList<String> keyColumnList = new ArrayList<String>();
		while(keyColumns.next()) {
			String key = keyColumns.getString("COLUMN_NAME").toLowerCase();
			keyColumnList.add(key);
		}
	

		return keyColumnList;
	}		
	public String getupdateSql_tbm_driverInfo_detail(CommonCodeVo vo) throws SQLException {
		String sql = String.format("update  tbm_driverInfo_detail set prev_daily_seq = :prev_daily_seq,prev_work_pattern = :prev_work_pattern,off_group = :off_group, ampm_gubun = :ampm_gubun, emp_nm = :emp_nm " 
						+			" where company_no = '%s' and BASE_YM = '%s' and route_nm = '%s' and car_regno||emp_nm = :key "
						,	vo.getCompanyNo(), vo.getBaseYm(),vo.getRouteNm() );
		
		log.info("getupdateSql_tbm_driverInfo_detail sql : {}", sql);
		return sql;
	}		
	
	public String getupdateSql_tbm_holiday_info(CommonCodeVo vo) throws SQLException {
		String sql = String.format("MERGE INTO  TBM_Holiday_INFO KEY (company_no,work_date) "
						+			"select '%s' , SUBSTRING(:locdate,1,4)|| '-' || SUBSTRING(:locdate,5,2) || '-' || SUBSTRING(:locdate,7,2) , :dateName ,:isHoliday,'api','batch', TO_CHAR( SYSDATE,'yyyy-mm-dd hh:mi:ss')  " 
						,	vo.getCompanyNo() );
		
		log.info("getupdateSql_tbm_holiday_info sql : {}", sql);
		return sql;
	}		

	
	public String getupdateSql_tbm_routeReduction_info(CommonCodeVo vo,int week) throws SQLException {
		String sql = String.format("MERGE INTO  TBM_ROUTE_REDUCTION_INFO KEY (company_no,route_nm,reduct_week) "
						+			"select '%s' , :route_nm, %d, decode(%d,7,replace(:sat_count,'.0',''),replace(:sun_count,'.0','')) " 
						,	vo.getCompanyNo() ,week, week );
		
		log.info("getupdateSql_tbm_routeReduction_info sql : {}", sql);
		return sql;
	}		
	public String getupdateSql_tbm_routeWeekSeq_info(CommonCodeVo vo) throws SQLException {
		String sql = String.format("update  TBM_ROUTE_WEEKSEQ_INFO set next_work_interval = :next_work_interval " 
						+			" where company_no = '%s' and route_nm = :route_nm and week_gb = :week_gb "
						,	vo.getCompanyNo()  );
		
		log.info("getupdateSql_TBM_ROUTE_WEEKSEQ_INFO sql : {}", sql);
		return sql;
	}		

	public String getupdateSql_arrangeDetail(CommonCodeVo vo) throws SQLException {
		String sql = String.format("update  TBL_MONTH_ARRANGE_DETAIL "
		           + "  set    d1  = :d1  "
		           + "        ,d2  = :d2  "
		           + "        ,d3  = :d3  "
		           + "        ,d4  = :d4  "
		           + "        ,d5  = :d5  "
		           + "        ,d6  = :d6  "
		           + "        ,d7  = :d7  "
		           + "        ,d8  = :d8  "
		           + "        ,d9  = :d9  "
		           + "        ,d10 = :d10 "
		           + "        ,d11 = :d11 "
		           + "        ,d12 = :d12 "
		           + "        ,d13 = :d13 "
		           + "        ,d14 = :d14 "
		           + "        ,d15 = :d15 "
		           + "        ,d16 = :d16 "
		           + "        ,d17 = :d17 "
		           + "        ,d18 = :d18 "
		           + "        ,d19 = :d19 "
		           + "        ,d20 = :d20 "
		           + "        ,d21 = :d21 "
		           + "        ,d22 = :d22 "
		           + "        ,d23 = :d23 "
		           + "        ,d24 = :d24 "
		           + "        ,d25 = :d25 "
		           + "        ,d26 = :d26 "
		           + "        ,d27 = :d27 "
		           + "        ,d28 = :d28 "
		           + "        ,d29 = :d29 "
		           + "        ,d30 = :d30 "
		           + "        ,d31 = :d31 "
				   + "	where company_no = '%s' and BASE_YM = '%s' and route_nm = '%s' and init_seq = %d and car_regno = :car_regno and emp_nm = :emp_nm and dispatch_seq = 6 "
						,	vo.getCompanyNo(), vo.getBaseYm(),vo.getRouteNm() ,vo.getInitSeq());

		log.info("getupdateSql_arrangeDetail sql : {}", sql);
		return sql;
	}		
	
	public String getdeleteSql_arrangeDetail(CommonCodeVo vo) throws SQLException {
		String sql = String.format("delete from TBL_MONTH_ARRANGE_DETAIL "
								+ "	where company_no = '%s' and BASE_YM = '%s' and route_nm = '%s' and init_seq = %d and car_regno = :car_regno and emp_nm = :emp_nm and dispatch_seq = 6 "
								,	vo.getCompanyNo(), vo.getBaseYm(),vo.getRouteNm() ,vo.getInitSeq());

		log.info("getdeleteSql_arrangeDetail sql : {}", sql);
		return sql;
	}			
}
