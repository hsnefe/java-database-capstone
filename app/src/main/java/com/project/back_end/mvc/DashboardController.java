package com.project.back_end.mvc;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.back_end.services.Service;

@Controller
public class DashboardController {
    @Autowired
    private Service service;

    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        ResponseEntity<Map<String, String>> validationResponse = service.validateToken(token, "admin");
        if (!validationResponse.getStatusCode().is2xxSuccessful()) {
            return "redirect:/";
        }
        return "admin/adminDashboard";
    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        ResponseEntity<Map<String, String>> validationResponse = service.validateToken(token, "doctor");
        if (!validationResponse.getStatusCode().is2xxSuccessful()) {
            return "redirect:/";
        }
        return "doctor/doctorDashboard";
    }

    @GetMapping("/loggedPatientDashboard/{token}")
    public String loggedPatientDashboard(@PathVariable String token) {
        ResponseEntity<Map<String, String>> validationResponse = service.validateToken(token, "patient");
        if (!validationResponse.getStatusCode().is2xxSuccessful()) {
            return "redirect:/";
        }
        return "loggedPatient/loggedPatientDashboard";
    }
}
