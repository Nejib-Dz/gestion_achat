package net.gestionachat.service.interFace;

import jakarta.persistence.EntityNotFoundException;
import net.gestionachat.dto.FournisseurDto;

import java.util.List;

public interface FourniseurService {

    FournisseurDto save(FournisseurDto dto);
    FournisseurDto findById(Integer id) throws EntityNotFoundException;
    List<FournisseurDto> findAll();
    public FournisseurDto  updateFournisseur(FournisseurDto dto);

    void deleteFournisseur(Integer id);
}
