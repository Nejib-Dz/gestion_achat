package net.gestionachat.service.interFace;

import jakarta.persistence.EntityNotFoundException;
import net.gestionachat.dto.ArticleDto;
import net.gestionachat.dto.UserDto;

import java.util.List;

public interface ArticleService {

    ArticleDto save(ArticleDto articleDto);
    ArticleDto findById(Long id) throws EntityNotFoundException;
    List<ArticleDto> findAll();
     ArticleDto  updateArticle(ArticleDto dto);
    void delete(Long id) throws EntityNotFoundException;
}
