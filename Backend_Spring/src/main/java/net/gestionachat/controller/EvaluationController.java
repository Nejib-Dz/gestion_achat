package net.gestionachat.controller;

import lombok.RequiredArgsConstructor;

import net.gestionachat.dto.EvaluationFourDto;

import net.gestionachat.dto.FournisseurDto;
import net.gestionachat.entities.EvaluationFournisseur;
import net.gestionachat.repository.EvaluationFourRep;
import net.gestionachat.service.impl.EvaluationFrImpService;
import net.gestionachat.service.impl.FournisseurImplService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/evaluations")
@CrossOrigin(origins ="http://localhost:4200")
public class EvaluationController {

    private final EvaluationFrImpService evaluationFrImpService;
    private final EvaluationFourRep evaluationFourRep;
    @PostMapping("/save")
    public EvaluationFourDto createEvaluation(@RequestBody EvaluationFourDto dto) {

        return evaluationFrImpService.save(dto);
    }

    @GetMapping("/getListByIdFour/{id}")
    public List<EvaluationFourDto> getListByIdFournisseur(@PathVariable Integer id) {
        return evaluationFrImpService.getEvaluationsByFournisseurId(id);
    }
    @GetMapping("/getById/{id}")
    public EvaluationFourDto findById(@PathVariable Long id) {

        return evaluationFrImpService.findById(id);
    }



    @GetMapping("/findByAll")
    public List<EvaluationFourDto> findAll() { return
            evaluationFrImpService.findAll(); }

    @DeleteMapping("/removeFourn/{id}")
    public void delete(@PathVariable("id") Long id) {

        evaluationFrImpService.deleteEvaluationFr(id);
    }



    @PutMapping("/updatee")
    public EvaluationFourDto UpdatUserDto(@RequestBody EvaluationFourDto dto) {

        return evaluationFrImpService.updateEvaluationFr(dto);
    }


}
