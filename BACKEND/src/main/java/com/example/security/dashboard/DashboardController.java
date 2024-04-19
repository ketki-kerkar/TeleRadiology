// New DashboardController.java
package com.example.security.dashboard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    @GetMapping("/doctor-dashboard")
    public String doctorDashboard() {
        return "doctor-dashboard"; // Return the view for doctor dashboard
    }

    @GetMapping("/radiologist-dashboard")
    public String radiologistDashboard() {
        return "radiologist-dashboard"; // Return the view for radiologist dashboard
    }

    @GetMapping("/lab-dashboard")
    public String labDashboard() {
        return "lab-dashboard"; // Return the view for lab dashboard
    }

    @GetMapping("/admin-dashboard")
    public String adminDashboard() {
        return "admin-dashboard"; // Return the view for admin dashboard
    }

    @GetMapping("/receptionist-dashboard")
    public String receptionistDashboard() {
        return "receptionist-dashboard"; // Return the view for receptionist dashboard
    }

    @GetMapping("/patient-dashboard")
    public String patientDashboard() {
        return "patient-dashboard"; // Return the view for patient dashboard
    }
}
