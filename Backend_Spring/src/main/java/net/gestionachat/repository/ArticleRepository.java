package net.gestionachat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.gestionachat.entities.Articles;



public interface ArticleRepository extends JpaRepository<Articles, Long>{

}
