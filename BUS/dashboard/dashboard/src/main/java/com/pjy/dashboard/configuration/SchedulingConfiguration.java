package com.pjy.dashboard.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

/*
 *  
 * @SpringBootApplication @EnableScheduling 추가
 * 기본적으로 모든 @Scheduled 작업은 Spring에 의해 생성 된 한개의 스레드 풀에서 실행된다. 
 * 하나의 Scheduled이 돌고 있다면 그것이 다 끝나야 다음 Scheduled이 실행되는 문제가 있다.
 * 
 * 스프링 부트에서 설정을 통해 Schedule에 대한 쓰래드 풀을 생성하고 그 쓰레드 풀을 사용하여 모든 스케줄 된 작업을 실행하도록 할 수 있다.
 */
@Configuration
public class SchedulingConfiguration implements SchedulingConfigurer {
    private final int POOL_SIZE = 10;

    @Override
    public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();

        threadPoolTaskScheduler.setPoolSize(POOL_SIZE);
        threadPoolTaskScheduler.setThreadNamePrefix("pjy-task-pool-");
        threadPoolTaskScheduler.initialize();

        scheduledTaskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
    }
}