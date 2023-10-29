package net.gestionachat.controller;

import net.gestionachat.dto.CommandeDto;
import net.gestionachat.dto.DevisDto;
import net.gestionachat.service.interFace.CommandeService;
import net.gestionachat.service.interFace.DevisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/devis")
@CrossOrigin(origins ="http://localhost:4200")
public class DevisController {

    @Autowired
    private DevisService devisService;

    @PostMapping("/saveDevis")
    public DevisDto createDevis(@RequestBody DevisDto dto ) {

        return devisService.saveDevis(dto);
    }


    @GetMapping("/getId/{id}")
    public DevisDto findById(@PathVariable Integer id) {

        return devisService.findById(Long.valueOf(id));
    }



    @GetMapping("/getAll")
    public List<DevisDto> findAll() {
        return devisService.findAll();
    }

    @DeleteMapping("/remove/{id}")
    public void delete(@PathVariable("id") Integer id) {

        devisService.delete(Long.valueOf(id));
    }



    @PutMapping("/updateDevis")
    public DevisDto UpdatDemandeDto(@RequestBody DevisDto dto) {

        return devisService.updateDto(dto);
    }
}
