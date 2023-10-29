package net.gestionachat.service.interFace;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import net.gestionachat.dto.ArticleDto;
import net.gestionachat.dto.DevisDto;
import net.gestionachat.entities.Role;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


public interface RoleService {
    Role save(Role role);

    List<Role> findAll();
    Role updateRole(Role role);


    void delete(Integer id) ;
}
