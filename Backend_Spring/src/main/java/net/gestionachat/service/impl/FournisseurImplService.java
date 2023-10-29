package net.gestionachat.service.impl;


import lombok.RequiredArgsConstructor;
import net.gestionachat.Exception.EntityNotFoundException;
import net.gestionachat.Exception.ErrorCodes;
import net.gestionachat.Exception.InvalidOperationException;
import net.gestionachat.dto.ArticleDto;
import net.gestionachat.dto.FournisseurDto;

import net.gestionachat.entities.Articles;
import net.gestionachat.entities.Fournisseur;
import net.gestionachat.repository.FournisseurRep;
import net.gestionachat.service.interFace.FourniseurService;

import net.gestionachat.validator.ObjectValidator;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FournisseurImplService implements FourniseurService {

    private final FournisseurRep fournisseurRep;
    private final ObjectValidator<FournisseurDto> objectValidator;


    @Override
    public FournisseurDto save(FournisseurDto dto) {

            objectValidator.validate(dto);

        return FournisseurDto.fromEntity(
                fournisseurRep.save(FournisseurDto.toEntity(dto)));
           /* Fournisseur entity = FournisseurDto.toEntity(dto);
            Fournisseur savedEntity = fournisseurRep.save(entity);

        fournisseurRep.save(FournisseurDto.toEntity(dto));
        return FournisseurDto.fromEntity(savedEntity);*/
    }

    @Override
    public FournisseurDto findById(Integer id) throws EntityNotFoundException {
        Fournisseur fournisseur = fournisseurRep.findById(id).orElse(null);
        if (fournisseur == null) {
            return null;
        }

        FournisseurDto fournisseurDto = new FournisseurDto();
        BeanUtils.copyProperties(fournisseur, fournisseurDto);


        return fournisseurDto;
    }

    @Override
    public List<FournisseurDto> findAll() {
        return  fournisseurRep.findAll().stream()
                .map(FournisseurDto ::fromEntity).collect(Collectors.toList());
    }

    @Override
    public FournisseurDto updateFournisseur(FournisseurDto dto) {
        // Valider l'objet DTO à l'aide de l'objectValidator (assurez-vous que cette étape est correcte)
       // objectValidator.validate(dto);

        // Trouver l'utilisateur dans la base de données en utilisant l'ID du DTO
        Fournisseur fournisseur = fournisseurRep.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("Fournisseur not found"));

        // Mettez à jour les propriétés de l'entité avec les valeurs du DTO
        fournisseur.setName(dto.getName());
        fournisseur.setEmail(dto.getEmail());
        fournisseur.setTele(dto.getTele());
        fournisseur.setCountry(dto.getCountry());



        // ... autres propriétés à mettre à jour

        // Enregistrez les modifications dans la base de données
        fournisseur = fournisseurRep.save(fournisseur);

        // Retournez le DTO mis à jour
        return FournisseurDto.fromEntity(fournisseur);
    }

    @Override
    public void deleteFournisseur(Integer id) throws EntityNotFoundException {
        if (id == null) {
            throw new InvalidOperationException("ID is NULL", ErrorCodes.FOURNISSEUR_ID_IS_NULL);
        }
        Fournisseur fournisseur  = fournisseurRep.findById(id).orElseThrow(()->new EntityNotFoundException(id+" not found",ErrorCodes.FOURNISSEUR_NOT_FOUND));
        fournisseurRep.deleteById(id);
    }
}
