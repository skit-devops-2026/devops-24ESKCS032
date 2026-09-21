package io.smarthome.controller;

import io.smarthome.model.Device;
import io.smarthome.repository.DeviceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("DeviceController Unit Tests")
class DeviceControllerTest {

    @Mock
    private DeviceRepository deviceRepository;

    @InjectMocks
    private DeviceController deviceController;

    private Device sampleDevice;

    @BeforeEach
    void setUp() {
        sampleDevice = new Device("Ceiling Fan", "FAN", true);
    }

    @Test
    @DisplayName("Should return all devices from repository")
    void testGetAllDevices() {
        Device secondDevice = new Device("Desk Lamp", "LIGHT", false);
        when(deviceRepository.findAll()).thenReturn(Arrays.asList(sampleDevice, secondDevice));

        List<Device> devices = deviceController.getAllDevices();

        assertNotNull(devices);
        assertEquals(2, devices.size());
        assertEquals("Ceiling Fan", devices.get(0).getName());
        assertEquals("Desk Lamp", devices.get(1).getName());
        verify(deviceRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should return device by ID when device exists")
    void testGetDeviceByIdFound() {
        when(deviceRepository.findById(1L)).thenReturn(Optional.of(sampleDevice));

        Device found = deviceController.getDevice(1L);

        assertNotNull(found);
        assertEquals("Ceiling Fan", found.getName());
        assertEquals("FAN", found.getType());
        verify(deviceRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Should throw RuntimeException when device is not found by ID")
    void testGetDeviceByIdNotFound() {
        when(deviceRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> deviceController.getDevice(99L)
        );

        assertEquals("Device not found", exception.getMessage());
        verify(deviceRepository, times(1)).findById(99L);
    }

    @Test
    @DisplayName("Should save and return created device")
    void testCreateDevice() {
        when(deviceRepository.save(sampleDevice)).thenReturn(sampleDevice);

        Device created = deviceController.createDevice(sampleDevice);

        assertNotNull(created);
        assertEquals("Ceiling Fan", created.getName());
        verify(deviceRepository, times(1)).save(sampleDevice);
    }

    @Test
    @DisplayName("Should update existing device and return updated entity")
    void testUpdateDevice() {
        Device existing = new Device("Old Light", "LIGHT", false);
        Device updateInfo = new Device("New Dimmer Light", "LIGHT", true);

        when(deviceRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(deviceRepository.save(existing)).thenReturn(existing);

        Device result = deviceController.updateDevice(1L, updateInfo);

        assertNotNull(result);
        assertEquals("New Dimmer Light", result.getName());
        assertTrue(result.isStatus());
        verify(deviceRepository, times(1)).findById(1L);
        verify(deviceRepository, times(1)).save(existing);
    }

    @Test
    @DisplayName("Should delete device by ID and return confirmation string")
    void testDeleteDevice() {
        doNothing().when(deviceRepository).deleteById(1L);

        String message = deviceController.deleteDevice(1L);

        assertEquals("Device deleted successfully", message);
        verify(deviceRepository, times(1)).deleteById(1L);
    }
}
