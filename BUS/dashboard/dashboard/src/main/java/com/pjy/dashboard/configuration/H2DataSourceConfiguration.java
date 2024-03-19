package com.pjy.dashboard.configuration;

import java.util.HashMap;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@EnableTransactionManagement
@MapperScan(basePackages="com.pjy.dashboard.mapper.h2", sqlSessionFactoryRef="h2SqlSessionFactory")
@PropertySource("classpath:/common.properties")
@EnableJpaRepositories(
		entityManagerFactoryRef = "H2entityManagerFactory",
		transactionManagerRef = "H2transactionManager",
		basePackages = "com.pjy.dashboard.core.dao.jpa.h2"
)
public class H2DataSourceConfiguration {         
  
//	/*서버 모드로 접속하기 위해서 아래 스프링 빈을 등록*/
//	@Bean(initMethod = "start", destroyMethod = "stop")
//	public Server H2DatabaseServer() throws SQLException {
//		return Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9092");
//	}
	
	@Autowired
	private ApplicationContext applicationContext;
  

	@Bean(name = "h2DataSourceTransactionManager")
	public DataSourceTransactionManager transactionManager (@Qualifier("h2DataSource") DataSource dataSource){
	      DataSourceTransactionManager transactionManager = new DataSourceTransactionManager(dataSource);
	      return transactionManager;
	}
    
	@Bean
	@ConfigurationProperties(prefix="spring.datasource.hikari.h2")
	public HikariConfig h2HikariConfig() {
		return new HikariConfig();
	}
  
	@Bean(name="h2DataSource", destroyMethod = "close")
	public DataSource h2DataSource() {
		DataSource dataSource = new HikariDataSource(h2HikariConfig());
	    return dataSource;
	}
  
	@Bean(name="h2SqlSessionFactory")
	public SqlSessionFactory h2SqlSessionFactory(@Qualifier("h2DataSource") DataSource dataSource) throws Exception {
		final SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(dataSource);
		sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:mapper/*.xml"));
		sqlSessionFactoryBean.getObject().getConfiguration().setMapUnderscoreToCamelCase(true);
	  //  ((RefreshableSqlSessionFactoryBean) sqlSessionFactoryBean).setInterval(1000);
		return sqlSessionFactoryBean.getObject();
	}
  
	@Bean(name="h2SqlSessionTemplate")
	public SqlSessionTemplate h2SqlSessionTemplate(@Qualifier("h2SqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
		return new SqlSessionTemplate(sqlSessionFactory);
	}
	// jpa용 entityManagerFactory
	@Bean (name="H2entityManagerFactory")
	public EntityManagerFactory h2EntityManagerFactory() { 
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter(); 
		vendorAdapter.setGenerateDdl(true); 
		LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean(); 
		factory.setJpaVendorAdapter(vendorAdapter); 
		factory.setDataSource(h2DataSource()); 
		factory.setPackagesToScan("com.pjy.dashboard.core"); //<-- 주의) 다른 패키지에 있을경우 반드시 설정
		
		HashMap<String, Object> properties = new HashMap<>();
		properties.put("hibernate.dialect","org.hibernate.dialect.H2Dialect");
		factory.setJpaPropertyMap(properties);
		
		factory.afterPropertiesSet(); 
	  
		return factory.getObject(); 
	}
	// jpa용 transactionManager
	// Transaction 설정
	
	@Bean(name="H2transactionManager")
	public PlatformTransactionManager transactionManager2(@Qualifier("H2entityManagerFactory")EntityManagerFactory emf) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(emf);
        return transactionManager;
	}
	
}

