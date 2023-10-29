package net.gestionachat.controller;

import lombok.RequiredArgsConstructor;
import net.gestionachat.dto.DemandeAchatDto;
import net.gestionachat.service.interFace.DemandeAchatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/demandeachat")
@CrossOrigin(origins ="http://localhost:4200")
public class DemandeAchatController {


	private final DemandeAchatService demandeAchatService;


	 @PostMapping("/saveDemande")
	    public DemandeAchatDto createDemande(@RequestBody DemandeAchatDto dto ) {

		  return demandeAchatService.saveDemandeAchat(dto);
	    }


	    @GetMapping("/getId/{id}")
	    public DemandeAchatDto findById(@PathVariable Integer id) {

		  return demandeAchatService.findById(Long.valueOf(id));
	    }
//Added
	@PutMapping("/accept-Demand")
	public void ValiderDemande(@RequestBody DemandeAchatDto demandeAchatDto) {

		 demandeAchatService.ValiderDemande(demandeAchatDto);
	}
	@PutMapping("/refuse-Demand")
	public void RefuserDemande(@RequestBody DemandeAchatDto demandeAchatDto) {

		 demandeAchatService.RefuserDemande(demandeAchatDto);
	}

		  @GetMapping("/getAll")
		  public List<DemandeAchatDto> findAll() { return
				  demandeAchatService.findAll(); }

	    @DeleteMapping("/remoove/{id}")
	    public void delete(@PathVariable("id") Integer id) {

			demandeAchatService.delete(Long.valueOf(id));
	    }



	@PutMapping("/updateDemande")
	public DemandeAchatDto UpdatDemandeDto(@RequestBody DemandeAchatDto dto) {

		  return demandeAchatService.updateDemandeAchat(dto);
	}
}
