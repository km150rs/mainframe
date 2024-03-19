package com.pjy.dashboard.configuration;

	import java.util.concurrent.Callable;
import java.util.concurrent.Executor;
import java.util.concurrent.Future;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import lombok.extern.slf4j.Slf4j;

@Slf4j
	@Configuration
	@EnableAsync
	public class AsyncConfiguration  implements AsyncConfigurer {

    @Bean
    //@Bean(name = "asyncThreadPool", destroyMethod = "destroy")
	    public Executor asyncThreadPool() {
	        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
			/*
			 * UserThread(log표시명) 의 경우 최초 3번의 요청은 CorePoolSize에 설정한 쓰레드에 할당되고
			 * 쓰레드가 끝나기 전 추가 요청이 들어오면 MaxPoolSize에 설정한 사이즈 만큼 추가로 쓰레드가 생성되어 할당됨.
			 * 30개의 쓰레드가 모두 돌고있는 도중 추가 요청이 들어오게 되면 QueueCapacity에서 설정한 사이즈 10 만큼 대기열로 들어가 처리를 기다리고,
			 * 돌고 있는 쓰레드가 종료되면 순차적으로 처리됨. 쓰레드와 큐가 모두 꽉차게 되면 Exception이 발생. 
			 */
	        taskExecutor.setCorePoolSize(3); // 기본 쓰레드 사이즈
	        taskExecutor.setMaxPoolSize(30); // 최대 쓰레드 사이즈
	        taskExecutor.setQueueCapacity(10); // Max쓰레드가 동작하는 경우 대기하는 queue 사이즈
	        taskExecutor.setThreadNamePrefix("UserConnection-");
	        taskExecutor.setDaemon(true);
	        taskExecutor.initialize();

	        return taskExecutor;
	    }
	    
	    //Handler를 이용해서 exception에 대한 처리 방법
	    /*
	     * WAS 프로세스가 종료되는 과정에서 threadPoolTaskExecutor bean을 종료해야하는데 
	     * 그 방법을 약속하지 않았고 결국 종료에 실패해서 발생하는 메시지 입니다. 
	     * 이 상황에서는 memory leak과는 큰 상관없고 결국 JVM의 heap memory가 OS에게 반환되면서 
	     * threadPoolTaskExecutor bean이 차지하던 memory도 당연히 반환됩니다.
	     * 다만 WAS 종료시마다 경고 메시지가 뜨게 되고 이러한 불필요한 경고, 
	     * 에러 메시지가 많이 발생하는 시스템은 운영자가 정작 중요한 경고, 
	     * 에러 메시지를 놓치기 쉽기 때문에 메시지가 발생하지 않도록 처리하는 것이 좋습니다.
	     */
	    public class HandlingExecutor implements AsyncTaskExecutor {
	        private AsyncTaskExecutor executor;

	        public HandlingExecutor(AsyncTaskExecutor executor) {
	            this.executor = executor;
	        }

	        @Override
	        public void execute(Runnable task) {
	            executor.execute(createWrappedRunnable(task));
	        }

	        @Override
	        public void execute(Runnable task, long startTimeout) {
	            executor.execute(createWrappedRunnable(task), startTimeout);
	        }

	        @Override
	        public Future<?> submit(Runnable task) {
	            return executor.submit(createWrappedRunnable(task));
	        }

	        @Override
	        public <T> Future<T> submit(final Callable<T> task) {
	            return executor.submit(createCallable(task));
	        }

	        private <T> Callable<T> createCallable(final Callable<T> task) {
	            return new Callable<T>() {
	                @Override
	                public T call() throws Exception {
	                    try {
	                        return task.call();
	                    } catch (Exception ex) {
	                        handle(ex);
	                        throw ex;
	                    }
	                }
	            };
	        }

	        private Runnable createWrappedRunnable(final Runnable task) {
	            return new Runnable() {
	                @Override
	                public void run() {
	                    try {
	                        task.run();
	                    } catch (Exception ex) {
	                        handle(ex);
	                    }
	                }
	            };
	        }

	        private void handle(Exception ex) {
	            log.info("Failed to execute task. : {}", ex.getMessage());
	            log.error("Failed to execute task. ",ex);
	        }

	        public void destroy() {
	            if(executor instanceof ThreadPoolTaskExecutor){
	                ((ThreadPoolTaskExecutor) executor).shutdown();
	            }
	        }
	    }
}
