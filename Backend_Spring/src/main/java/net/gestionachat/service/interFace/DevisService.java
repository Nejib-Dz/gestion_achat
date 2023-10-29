package net.gestionachat.service.interFace;

import net.gestionachat.dto.DevisDto;

import java.util.List;
//Added

public interface DevisService {
    DevisDto saveDevis(DevisDto dto );
    DevisDto findById(Long id) ;

    DevisDto updateDto(DevisDto dto);

    List<DevisDto> findAll();
    void delete(Long id) ;

}
