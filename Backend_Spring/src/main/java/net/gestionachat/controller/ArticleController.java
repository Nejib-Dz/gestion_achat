package net.gestionachat.controller;

import lombok.RequiredArgsConstructor;
import net.gestionachat.dto.ArticleDto;

import net.gestionachat.service.interFace.ArticleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/articles")
@CrossOrigin(origins ="http://localhost:4200")
public class ArticleController {


	private final ArticleService articleService;


	  @PostMapping("/create")
	    public ArticleDto createAeticle(@RequestBody ArticleDto Dto) {

		  return articleService.save(Dto);
	    }


	    @GetMapping("/findById/{id}")
	    public ArticleDto findById(@PathVariable Integer id) {

		  return articleService.findById(Long.valueOf(id));
	    }



		  @GetMapping("/findAll")
		  public List<ArticleDto> findAll() {
		  return articleService.findAll();
	  }

	    @DeleteMapping("/delete/{id}")
	    public void delete(@PathVariable("id") Integer id) {

			articleService.delete(Long.valueOf(id));
	    }



	@PutMapping("/update")
	public ArticleDto UpdatArticleDto(@RequestBody ArticleDto dto) {

		  return articleService.updateArticle(dto);
	}
}
