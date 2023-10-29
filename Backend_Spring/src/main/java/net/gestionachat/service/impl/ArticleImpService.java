package net.gestionachat.service.impl;



import lombok.RequiredArgsConstructor;
import net.gestionachat.Exception.ErrorCodes;
import net.gestionachat.Exception.InvalidOperationException;
import net.gestionachat.dto.ArticleDto;


import net.gestionachat.entities.Articles;

import net.gestionachat.Exception.EntityNotFoundException;

import net.gestionachat.repository.ArticleRepository;
import net.gestionachat.service.interFace.ArticleService;
import net.gestionachat.validator.ObjectValidator;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ArticleImpService implements ArticleService {

    private final ArticleRepository articleRepository;
    private final ObjectValidator<ArticleDto> objectValidator;

    @Override
    public ArticleDto save(ArticleDto articleDto) {
        objectValidator.validate(articleDto);

        return ArticleDto.FromEntity(
                articleRepository.save(ArticleDto.toEntity(articleDto)));
    }

    @Override
    public ArticleDto findById(Long id)throws EntityNotFoundException {
        Articles articles = articleRepository.findById(id).orElse(null);
        if (articles == null) {
            return null;
        }

        ArticleDto articleDto = new ArticleDto();
        BeanUtils.copyProperties(articles, articleDto);

        return articleDto;
    }
    @Override
    public List<ArticleDto> findAll() {
        return  articleRepository.findAll().stream()
                .map(ArticleDto ::FromEntity).collect(Collectors.toList());
    }

    @Override
    public ArticleDto updateArticle(ArticleDto dto) throws EntityNotFoundException {
        // Valider l'objet DTO à l'aide de l'objectValidator (assurez-vous que cette étape est correcte)
        objectValidator.validate(dto);

        // Trouver l'utilisateur dans la base de données en utilisant l'ID du DTO
        Articles article = articleRepository.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));

        // Mettez à jour les propriétés de l'entité avec les valeurs du DTO
//        article.setId(dto.getId()); faute
        article.setName(dto.getName());//Added
        article.setDateAdded(dto.getDateAdded());
        article.setDescription(dto.getDescription());

        article.setBrand(dto.getBrand());
        article.setCost(dto.getCost());
        article.setReserved(dto.getReserved());
        article.setStock(dto.getStock());
        article.setPrice(dto.getPrice());
        article.setQuantity(dto.getQuantity());


        // ... autres propriétés à mettre à jour

        // Enregistrez les modifications dans la base de données
        article = articleRepository.save(article);

        // Retournez le DTO mis à jour
        return ArticleDto.FromEntity(article);
    }

    @Override
    public void delete(Long id) throws EntityNotFoundException {
        if (id == null) {
            throw new InvalidOperationException("ID is NULL", ErrorCodes.ARTICLE_ID_IS_NULL);
        }
        Articles article = articleRepository.findById(id).orElseThrow(()->new EntityNotFoundException(id+" not found",ErrorCodes.ARTICLE_NOT_FOUND));
        articleRepository.deleteById(id);
    }
    }
