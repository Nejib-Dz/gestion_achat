package net.gestionachat.service.impl;

import net.gestionachat.Exception.EntityNotFoundException;
import net.gestionachat.Exception.ErrorCodes;
import net.gestionachat.Exception.InvalidOperationException;
import net.gestionachat.dto.CommandeDto;
import net.gestionachat.dto.DemandeAchatDto;
import net.gestionachat.entities.Articles;
import net.gestionachat.entities.Commande;
import net.gestionachat.entities.DemandeAchat;
import net.gestionachat.repository.CommandeReposirory;
import net.gestionachat.repository.DemandeAchatRep;
import net.gestionachat.service.interFace.CommandeService;
import net.gestionachat.validator.ObjectValidator;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommandeImpService implements CommandeService {
    @Autowired
    private  CommandeReposirory commandeRepository;
    @Autowired
    private  ObjectValidator<CommandeDto> objectValidator;
    @Override
    public CommandeDto saveCommande(CommandeDto dto) {
        objectValidator.validate(dto);
        dto.setDateCmd(new Date());
        Commande commande = CommandeDto.toEntity(dto);
//         for (DemandeAchat demand :commande.getDemandeAchats()){
//             for(Articles article :demand.getArticles()){
//                 commande.setMontantToltal(commande.getMontantToltal()+article.getPrice());
//             }
//         }


        return CommandeDto.FromEntity(
                commandeRepository.save(commande));
    }

    @Override
    public CommandeDto findById(Long id) {
        Commande commande = commandeRepository.findById(Math.toIntExact(id)).orElse(null);
        if (commande == null) {
            return null;
        }

        CommandeDto commandeDto = new CommandeDto();
        BeanUtils.copyProperties(commande, commandeDto);


        return commandeDto;
    }

    @Override
    public CommandeDto updateCommande(CommandeDto dto) {
        objectValidator.validate(dto);

        Commande commande = commandeRepository.findById(dto.getIdCmd())
                .orElseThrow(() -> new IllegalArgumentException("Command not found"));

        commande.setAdresseLivraison(dto.getAdresseLivraison());
        commande.setName(dto.getName());
        commande.setDateCmd(dto.getDateCmd());
        commande.setModePaiment(dto.getModePaiment());
        commande.setMontantToltal(dto.getMontantToltal());
        commande.setDemandeAchats(dto.getDemandeAchats().stream()
                .map(DemandeAchatDto::toEntity)
                .collect(Collectors.toList()));
        commande = commandeRepository.save(commande);

        return CommandeDto.FromEntity(commande);
    }

    @Override
    public List<CommandeDto> findAll() {
        return  commandeRepository.findAll().stream()
                .map(CommandeDto ::FromEntity).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) throws EntityNotFoundException {
        if (id == null) {
            throw new InvalidOperationException("ID is NULL", ErrorCodes.DEMANDEACHA_ID_IS_NULL);
        }
        Commande commande = commandeRepository.findById(Math.toIntExact(id)).orElseThrow(()->new EntityNotFoundException(id+" not found",ErrorCodes.DEMANDEACHA_NOT_FOUND));
        commandeRepository.deleteById(Math.toIntExact(id));
    }
}
