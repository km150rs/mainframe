package com.pjy.dashboard.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
@Component
public class DynamicSqlH2Dao extends DynamicSqlDao{

	@Autowired
	@Qualifier("h2DataSource")
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		this.jdbcTemplate.setMaxRows(50000);
		this.simpleJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	@Transactional(transactionManager = "h2DataSourceTransactionManager")
	public int execute(String sql) throws Exception {
		return jdbcTemplate.update(sql) ;
	}	

	@Transactional(transactionManager = "h2DataSourceTransactionManager")
	public void batchInsert(String[] sql) throws Exception {
		jdbcTemplate.batchUpdate(sql) ;
		return ;
	}	


}
