package com.pjy.dashboard.filter;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.filter.Filter;
import ch.qos.logback.core.spi.FilterReply;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SqlFilter extends Filter<ILoggingEvent> {
    private String keyword; // 필터링할 문자열


	@Override
	public FilterReply decide(ILoggingEvent event) {
        if (event.getMessage().contains(keyword)) { // 로그 이벤트의 메시지에 필터링할 문자열이 포함되어 있다면
            return FilterReply.DENY; // 거부
        } else {
            return FilterReply.ACCEPT; // 승인
        }
	}
}
