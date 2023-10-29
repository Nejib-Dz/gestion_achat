package net.gestionachat.controller;

import lombok.RequiredArgsConstructor;
import net.gestionachat.dto.FournisseurDto;

import net.gestionachat.repository.FournisseurRep;
import net.gestionachat.service.interFace.FourniseurService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/fournisseur")
@CrossOrigin(origins ="http://localhost:4200")
public class FournisseurController {


	private final FourniseurService fourniseurService;

   private final FournisseurRep fournisseurRep;
	  @PostMapping("/save")
	    public FournisseurDto createFournisseur(@RequestBody FournisseurDto Dto) {

		  return fourniseurService.save(Dto);
	    }


	    @GetMapping("/getById/{id}")
	    public FournisseurDto findById(@PathVariable Integer id) {

		  return fourniseurService.findById(id);
	    }



		  @GetMapping("/findByAll")
		  public List<FournisseurDto> findAll() { return
				  fourniseurService.findAll(); }

	    @DeleteMapping("/removeFourn/{id}")
	    public void delete(@PathVariable("id") Integer id) {

		  fourniseurService.deleteFournisseur(id);
	    }



	@PutMapping("/updatee")
	public FournisseurDto UpdatUserDto(@RequestBody FournisseurDto dto) {

		  return fourniseurService.updateFournisseur(dto);
	}
}
