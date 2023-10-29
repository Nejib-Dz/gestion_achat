package net.gestionachat.controller;

import lombok.RequiredArgsConstructor;
import net.gestionachat.dto.ArticleDto;
import net.gestionachat.dto.UserDto;
import net.gestionachat.entities.Role;
import net.gestionachat.service.interFace.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/* Added*/
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/roles")
@CrossOrigin(origins ="http://localhost:4200")
public class RoleController {
    @Autowired
    private RoleService roleService;
    @PostMapping("/create-role")
    public Role create(@RequestBody Role role) {

        return roleService.save(role);
    }
    @DeleteMapping("/remove/{id}")
    public void delete(@PathVariable("id") Integer id) {
        roleService.delete(id);
    }


//Edited
    @PutMapping("/update-role")
    public Role UpdatRole(@RequestBody Role role) {
        return roleService.updateRole(role);
    }



    @GetMapping("/findAll")
    public List<Role> findAll() {
        return roleService.findAll();
    }
}
