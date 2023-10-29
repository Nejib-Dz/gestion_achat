package net.gestionachat.service.interFace;

import net.gestionachat.dto.CommandeDto;
import net.gestionachat.dto.DemandeAchatDto;

import java.util.List;
//Added
public interface CommandeService {
    CommandeDto saveCommande(CommandeDto dto );
    CommandeDto findById(Long id) ;

    public CommandeDto updateCommande(CommandeDto dto);

    List<CommandeDto> findAll();
    void delete(Long id) ;
}
