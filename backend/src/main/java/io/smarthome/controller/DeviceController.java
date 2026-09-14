package io.smarthome.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    @GetMapping
    public String devices() {
        return "Devices API is working!";
    }
}package io.smarthome.controller;

import io.smarthome.model.Device;
import io.smarthome.repository.DeviceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    private final DeviceRepository deviceRepository;

    public DeviceController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @PostMapping
    public Device createDevice(@RequestBody Device device) {
        return deviceRepository.save(device);
    }

    @GetMapping("/{id}")
    public Device getDevice(@PathVariable Long id) {
        return deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));
    }

    @PutMapping("/{id}")
    public Device updateDevice(
            @PathVariable Long id,
            @RequestBody Device updatedDevice) {

        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));

        device.setName(updatedDevice.getName());
        device.setType(updatedDevice.getType());
        device.setStatus(updatedDevice.isStatus());

        return deviceRepository.save(device);
    }

    @DeleteMapping("/{id}")
    public String deleteDevice(@PathVariable Long id) {

        deviceRepository.deleteById(id);

        return "Device deleted successfully";
    }
}