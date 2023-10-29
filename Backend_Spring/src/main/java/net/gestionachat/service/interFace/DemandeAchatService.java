package net.gestionachat.service.interFace;


import net.gestionachat.dto.DemandeAchatDto;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface DemandeAchatService {

    DemandeAchatDto saveDemandeAchat(DemandeAchatDto dto );
    DemandeAchatDto findById(Long id) ;
    void ValiderDemande(DemandeAchatDto dto);
    void RefuserDemande(DemandeAchatDto dto);

    public DemandeAchatDto updateDemandeAchat(DemandeAchatDto dto);

    List<DemandeAchatDto> findAll();
    void delete(Long id) ;
}
