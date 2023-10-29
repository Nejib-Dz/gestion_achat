package net.gestionachat.service.impl;

import net.gestionachat.Exception.EntityNotFoundException;
import net.gestionachat.Exception.ErrorCodes;
import net.gestionachat.Exception.InvalidOperationException;
import net.gestionachat.dto.DemandeAchatDto;
import net.gestionachat.dto.DevisDto;
import net.gestionachat.entities.DemandeAchat;
import net.gestionachat.entities.Devis;
import net.gestionachat.repository.DemandeAchatRep;
import net.gestionachat.repository.DevisRepository;
import net.gestionachat.service.interFace.DevisService;
import net.gestionachat.user.UserRepository;
import net.gestionachat.validator.ObjectValidator;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DevisImplService implements DevisService {
    @Autowired
    private  DevisRepository devisRepository;
    @Autowired
    private  ObjectValidator<DevisDto> objectValidator;

    @Override
    public DevisDto saveDevis(DevisDto dto ) {

        objectValidator.validate(dto);
        Devis devis = DevisDto.toEntity(dto);




        return DevisDto.FromEntity(
                devisRepository.save(devis));
    }

    @Override
    public DevisDto findById(Long id) throws EntityNotFoundException {
        Devis devis = devisRepository.findById(Math.toIntExact(id)).orElse(null);
        if (devis == null) {
            return null;
        }

        DevisDto devisDto = new DevisDto();
        BeanUtils.copyProperties(devis, devisDto);


        return devisDto;
    }

    @Override
    public DevisDto updateDto(DevisDto dto) throws EntityNotFoundException {
        objectValidator.validate(dto);
        Devis devis = devisRepository.findById(dto.getIdDevis())
                .orElseThrow(() -> new IllegalArgumentException("Devis not found"));
        devis.setStatutDevis(dto.getStatutDevis());
        devis.setDateCreeDevis(dto.getDateCreeDevis());
        devis.setDateValidDevis(dto.getDateValidDevis());
        devis.setMontanTotal(dto.getMontanTotal());

        devis = devisRepository.save(devis);


        return DevisDto.FromEntity(devis);
    }


    @Override
    public List<DevisDto> findAll() {
        return  devisRepository.findAll().stream()
                .map(DevisDto ::FromEntity).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) throws EntityNotFoundException {
        if (id == null) {
            throw new InvalidOperationException("ID is NULL", ErrorCodes.DEMANDEACHA_ID_IS_NULL);
        }
        Devis devis = devisRepository.findById(Math.toIntExact(id)).orElseThrow(()->new EntityNotFoundException(id+" not found",ErrorCodes.DEMANDEACHA_NOT_FOUND));
        devisRepository.deleteById(Math.toIntExact(id));
    }
}
