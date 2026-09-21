package io.smarthome.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Device Model Unit Tests")
class DeviceTest {

    @Test
    @DisplayName("Should create device with parameterized constructor and verify getters")
    void testParameterizedConstructor() {
        Device device = new Device("Living Room Light", "LIGHT", true);

        assertEquals("Living Room Light", device.getName());
        assertEquals("LIGHT", device.getType());
        assertTrue(device.isStatus());
        assertNull(device.getId());
    }

    @Test
    @DisplayName("Should create empty device and set fields via setters")
    void testNoArgsConstructorAndSetters() {
        Device device = new Device();
        device.setName("Smart Thermostat");
        device.setType("THERMOSTAT");
        device.setStatus(false);

        assertEquals("Smart Thermostat", device.getName());
        assertEquals("THERMOSTAT", device.getType());
        assertFalse(device.isStatus());
    }

    @Test
    @DisplayName("Should correctly toggle status")
    void testStatusToggle() {
        Device device = new Device("Smart Lock", "LOCK", false);
        assertFalse(device.isStatus());

        device.setStatus(true);
        assertTrue(device.isStatus());
    }
}
