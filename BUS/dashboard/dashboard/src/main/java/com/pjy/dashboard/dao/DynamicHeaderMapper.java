package com.pjy.dashboard.dao;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;

public class DynamicHeaderMapper implements ResultSetExtractor<List<Object>> {
	List<Object> list = new ArrayList<>();
  @Override
  public List<Object> extractData(ResultSet rs) throws SQLException{      
      ResultSetMetaData meta = rs.getMetaData();    

      for (int i = 1; i <=  meta.getColumnCount(); i++) { 
    	  Map<String, Object> columns = new HashMap<String, Object>();
          columns.put("COLUMN_NAME", meta.getColumnName(i).toLowerCase());
          if (meta.getColumnTypeName(i).contains("NUMBER"))
              columns.put("TYPE_NAME"	,"dt-body-right");
          else {
        	  if (meta.getColumnDisplaySize(i) > 20)
        		  columns.put("TYPE_NAME"	,"dt-body-left");
        	  else columns.put("TYPE_NAME"	,"dt-body-center");
          }
          list.add(columns);        
      }
      return list;
  }
}

/*
@Override
public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {

    ResultSetMetaData rsMeta = rs.getMetaData();
    int colCount = rsMeta.getColumnCount();

    Map<String, Object> columns = new HashMap<String, Object>();
    for (int i = 1; i <= colCount; i++) {

        columns.put(rsMeta.getColumnLabel(i), rs.getObject(i));
    }
    return columns;

}

public class DynamicHeaderMapper implements ResultSetExtractor<List<String>> {
      List<String> list = new ArrayList<>();
    @Override
    public List<String> extractData(ResultSet rs) throws SQLException{      

        ResultSetMetaData meta = rs.getMetaData();    

        for (int i = 1; i <=  meta.getColumnCount(); i++) 
            list.add(meta.getColumnName(i));        

        return list;
    }
}
    
final List<Map<String, Object>> rows = jdbcTemplate.queryForList(yourQuery);
for (final Map<String, Object> row : rows) {
    // do something like : row.get("yourField");
}    


public class DynamicHeaderMapper implements ResultSetExtractor<Map<String, Object>> {
    @Override
    public Map<String, Object> extractData(ResultSet rs) throws SQLException {

        ResultSetMetaData rsMeta = rs.getMetaData();
        int colCount = rsMeta.getColumnCount();
        List<String> list = new ArrayList<>();
        Map<String, Object> columns = new HashMap<String, Object>();
        for (int i = colCount; i >= 1; i--) {

            columns.put("col_"+i,rsMeta.getColumnLabel(i));
        }
        return columns;

    }
}


public class DynamicHeaderMapper implements ResultSetExtractor<List<DynamicHeaderVo>> {
    List<DynamicHeaderVo> list = new ArrayList<>();
  @Override
  public List<DynamicHeaderVo> extractData(ResultSet rs) throws SQLException{      

      ResultSetMetaData meta = rs.getMetaData();    

      for (int i = 1; i <=  meta.getColumnCount(); i++) { 
    	  DynamicHeaderVo aaa = new DynamicHeaderVo();
    	  aaa.setName(meta.getColumnName(i));
          list.add(aaa);        
      }
      return list;
  }
}
*/