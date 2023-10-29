package net.gestionachat.controller;

import net.gestionachat.dto.CommandeDto;
import net.gestionachat.dto.DemandeAchatDto;
import net.gestionachat.service.interFace.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/commande")
@CrossOrigin(origins ="http://localhost:4200")
public class CommandeController {
    @Autowired
    private CommandeService commandeService;

    @PostMapping("/saveCommande")
    public CommandeDto createCommande(@RequestBody CommandeDto dto ) {

        return commandeService.saveCommande(dto);
    }


    @GetMapping("/getId/{id}")
    public CommandeDto findById(@PathVariable Integer id) {

        return commandeService.findById(Long.valueOf(id));
    }



    @GetMapping("/getAll")
    public List<CommandeDto> findAll() {
        return commandeService.findAll(); }

    @DeleteMapping("/remove/{id}")
    public void delete(@PathVariable("id") Integer id) {

        commandeService.delete(Long.valueOf(id));
    }



    @PutMapping("/updateCommande")
    public CommandeDto UpdatDemandeDto(@RequestBody CommandeDto dto) {

        return commandeService.updateCommande(dto);
    }
}
