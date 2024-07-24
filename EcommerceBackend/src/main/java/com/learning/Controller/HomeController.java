package com.learning.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/demo")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
@CrossOrigin
public class HomeController {

//    public StudentController(StudentService studentService) {
//        this.studentService = studentService;
//    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('admin:read','user:read')")
    public String getAll(){
        return "Get request : Data fetched successfully";
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    public String addStudent(){
       return "Post request : Data added successfully";
    }

    @PutMapping
    @PreAuthorize("hasAuthority('admin:update')")
    public String updateStudent(){
        return "Put request : Data Updated successfully";
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('admin:delete')")
    public String deleteStudent() {
        return "Delete request : Data Deleted Successfully";
    }
}
