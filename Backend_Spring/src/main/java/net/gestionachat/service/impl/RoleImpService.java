package net.gestionachat.service.impl;

import net.gestionachat.Exception.EntityNotFoundException;
import net.gestionachat.Exception.ErrorCodes;
import net.gestionachat.Exception.InvalidOperationException;
import net.gestionachat.entities.Devis;
import net.gestionachat.entities.Role;
import net.gestionachat.repository.RoleRepository;
import net.gestionachat.service.interFace.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleImpService implements RoleService {
 @Autowired
   private  RoleRepository roleRepository;
    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role updateRole(Role role) {
        Role roleExist = roleRepository.findById(role.getId())
                .orElseThrow(() -> new IllegalArgumentException("Devis not found"));
        roleExist.setName(role.getName());
        return roleRepository.save(role);
    }

    @Override
    public void delete(Integer id) {
        if (id == null) {
            throw new InvalidOperationException("ID is NULL", ErrorCodes.DEMANDEACHA_ID_IS_NULL);
        }
        roleRepository.deleteById(Math.toIntExact(id));
    }
}
