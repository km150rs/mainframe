package com.pjy.dashboard.controller;

import java.util.concurrent.atomic.AtomicReference;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.boot.actuate.health.Status;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("${management.endpoints.web.base-path:/actuator}")
public class CustomHealthIndicator implements HealthIndicator {

    private final AtomicReference<Health> health = new AtomicReference<>(Health.up().build());

    @Override
    public Health health() {
        return health.get();
    }

    @PutMapping("${management.endpoints.web.path-mapping.health:health}/up")
    public Health up() {
        Health up = Health.up().build();
        this.health.set(up);
        return up;
    }

    @PutMapping("${management.endpoints.web.path-mapping.health:health}/down")
    public Health down() {
        Health down = Health.down().build();
        this.health.set(down);
        return down;
    }

    @PutMapping("${management.endpoints.web.path-mapping.health:health}/maintenance")
    public Health maintenance() {
        Health maintenance = Health.status(new Status("MAINTENANCE", "점검중")).build();
        this.health.set(maintenance);
        return maintenance;
    }

}
