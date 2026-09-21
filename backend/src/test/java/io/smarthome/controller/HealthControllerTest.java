package io.smarthome.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("HealthController Unit Tests")
class HealthControllerTest {

    private HealthController healthController;

    @BeforeEach
    void setUp() {
        healthController = new HealthController();
    }

    @Test
    @DisplayName("Should return health check confirmation message")
    void testHealthEndpoint() {
        String result = healthController.health();
        assertEquals("SmartHome backend is running!", result);
    }
}
