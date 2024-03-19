package com.pjy.dashboard.interceptor;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.scripting.xmltags.DynamicContext;
import org.apache.ibatis.scripting.xmltags.DynamicSqlSource;
import org.apache.ibatis.scripting.xmltags.SqlNode;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

@Intercepts({
    @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class,
            RowBounds.class, ResultHandler.class})})
public class AddParamInterceptor implements Interceptor {
	private final Log logger = LogFactory.getLog(getClass());
	private Properties properties;
	private final static String DEFAULT_ORG_NAME = "_ids_own_org";
	private static Field rootSqlNodeField = null;


	static {
	    try {
	        rootSqlNodeField = DynamicSqlSource.class.getDeclaredField("rootSqlNode");
	    } catch (NoSuchFieldException ignore) {
	
	    }
	    rootSqlNodeField.setAccessible(true);
	}
	
	public Object intercept(Invocation invocation) throws Throwable {
	    MappedStatement mappedStatement = (MappedStatement) invocation.getArgs()[0];
	    SqlSource sqlSource = mappedStatement.getSqlSource();
	    if (sqlSource instanceof DynamicSqlSource) {
	
	        SqlNode sqlnode = (SqlNode) rootSqlNodeField.get(sqlSource);
	        SqlNode oriSqlNode = sqlnode;
	        if (sqlnode instanceof SqlNodeProxy) {
	            oriSqlNode = ((SqlNodeProxy) sqlnode).target;
	        }
	        //TODO we can put arguments in ThreadLocal
	        rootSqlNodeField.set(sqlSource, proxyNode(oriSqlNode, new Date()));
	    }
	
	
	    return invocation.proceed();
	
	
	}
	
	public Object plugin(Object target) {
	    return Plugin.wrap(target, this);
	}
	
	@Override
	public void setProperties(Properties properties) {
	    this.properties = properties;
	}
	
	
	private SqlNode proxyNode(SqlNode sqlnode, Object value) {
	    return new SqlNodeProxy(sqlnode, DEFAULT_ORG_NAME, value);
	}
	
	
	private class SqlNodeProxy implements SqlNode {
	    private SqlNode target;
	    private final Map map;
	
	    SqlNodeProxy(SqlNode target, String param, Object value) {
	        super();
	        this.target = target;
	        map = new HashMap(2);
	        map.put(param, value);
	    }
	
	    SqlNodeProxy(SqlNode target, Map map) {
	        super();
	        this.target = target;
	        this.map = map;
	    }
	
	    @Override
	    public boolean apply(DynamicContext context) {
	        context.getBindings().putAll(map);
	        return target.apply(context);
	    }
	}
}