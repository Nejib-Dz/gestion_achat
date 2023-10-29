package net.gestionachat.service.impl;



import lombok.RequiredArgsConstructor;
import net.gestionachat.Exception.EntityNotFoundException;
import net.gestionachat.Exception.ErrorCodes;
import net.gestionachat.Exception.InvalidOperationException;
import net.gestionachat.dto.ArticleDto;
import net.gestionachat.dto.DemandeAchatDto;

import net.gestionachat.dto.UserDto;
import net.gestionachat.entities.DemandeAchat;
import net.gestionachat.repository.DemandeAchatRep;
import net.gestionachat.service.interFace.DemandeAchatService;

import net.gestionachat.user.User;
import net.gestionachat.user.UserRepository;
import net.gestionachat.validator.ObjectValidator;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class DemandeAchatImplService implements DemandeAchatService {

    private final DemandeAchatRep demandeAchatRep;
    private final ObjectValidator<DemandeAchatDto> objectValidator;
    private final UserRepository userRepository ;

   @Override
    public DemandeAchatDto saveDemandeAchat(DemandeAchatDto dto ) {
        // get User
       // User demandeur = userRepository.findByEmail(authentication.getName()).get();
        objectValidator.validate(dto);
        dto.setEtat("Treatement");
        dto.setDateDemande(new Date());
        DemandeAchat demandeAchat = DemandeAchatDto.toEntity(dto);


       // demandeAchat.setUserDemandeur(demandeur);

        return DemandeAchatDto.FromEntity(
                demandeAchatRep.save(demandeAchat));
    }



    @Override
    public DemandeAchatDto findById(Long id) throws EntityNotFoundException {
        DemandeAchat demandeAchat = demandeAchatRep.findById(Math.toIntExact(id)).orElse(null);
        if (demandeAchat == null) {
            return null;
        }

        DemandeAchatDto demandeAchatDto = new DemandeAchatDto();
        BeanUtils.copyProperties(demandeAchat, demandeAchatDto);


        return demandeAchatDto;
    }

    @Override
    public void ValiderDemande(DemandeAchatDto dto) {
        DemandeAchat demandeAchat = DemandeAchatDto.toEntity(dto);
        User userApprouvant = UserDto.toEntity(dto.getUserApprouvant());
        demandeAchat.setUserApprouvant(userApprouvant);
            demandeAchat.setEtat("Accepted");
            demandeAchat.setDateApprobation(new Date());
            demandeAchatRep.save(demandeAchat);

    }

    @Override
    public void RefuserDemande(DemandeAchatDto dto) {
        DemandeAchat demandeAchat = DemandeAchatDto.toEntity(dto);
        User userApprouvant = UserDto.toEntity(dto.getUserApprouvant());
        demandeAchat.setUserApprouvant(userApprouvant);
        demandeAchat.setEtat("Refused");
        demandeAchat.setDateApprobation(new Date());
        demandeAchatRep.save(demandeAchat);
    }

    @Override
    public DemandeAchatDto updateDemandeAchat(DemandeAchatDto dto) throws EntityNotFoundException {
        // Valider l'objet DTO à l'aide de l'objectValidator (assurez-vous que cette étape est correcte)
        objectValidator.validate(dto);

        // Trouver l'utilisateur dans la base de données en utilisant l'ID du DTO
        DemandeAchat demandeAchat = demandeAchatRep.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Mettez à jour les propriétés de l'entité avec les valeurs du DTO
        demandeAchat.setDateDemande(dto.getDateDemande());
        demandeAchat.setDateApprobation(dto.getDateApprobation());
        demandeAchat.setEtat(dto.getEtat());
        demandeAchat.setDescription(dto.getDescription());
        demandeAchat.setDelais(dto.getDelais());
        demandeAchat.setMotifRejet(dto.getMotifRejet());
        demandeAchat.setQteApprouvee(dto.getQteApprouvee());
        demandeAchat.setQteDemandee(dto.getQteDemandee());
        demandeAchat.setName(dto.getName());
        demandeAchat.setArticles(dto.getArticles().stream()
                .map(ArticleDto::toEntity)
                .collect(Collectors.toList()));

        // ... autres propriétés à mettre à jour

        // Enregistrez les modifications dans la base de données
        demandeAchat = demandeAchatRep.save(demandeAchat);

        // Retournez le DTO mis à jour
        return DemandeAchatDto.FromEntity(demandeAchat);
    }


    @Override
    public List<DemandeAchatDto> findAll() {
        return  demandeAchatRep.findAll().stream()
                .map(DemandeAchatDto ::FromEntity).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) throws EntityNotFoundException {
        if (id == null) {
            throw new InvalidOperationException("ID is NULL", ErrorCodes.DEMANDEACHA_ID_IS_NULL);
        }
        DemandeAchat admin = demandeAchatRep.findById(Math.toIntExact(id)).orElseThrow(()->new EntityNotFoundException(id+" not found",ErrorCodes.DEMANDEACHA_NOT_FOUND));
        demandeAchatRep.deleteById(Math.toIntExact(id));
    }
}
