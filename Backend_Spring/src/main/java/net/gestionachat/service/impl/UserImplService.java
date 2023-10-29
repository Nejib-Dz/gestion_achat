package net.gestionachat.service.impl;

import java.security.SecureRandom;
import java.util.*;

import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import net.gestionachat.Exception.EntityNotFoundException;
import net.gestionachat.Exception.ErrorCodes;
import net.gestionachat.Exception.InvalidOperationException;
import net.gestionachat.dto.UserDto;

import net.gestionachat.service.interFace.UserService;



import net.gestionachat.user.User;
import net.gestionachat.user.UserRepository;
import net.gestionachat.validator.ObjectValidator;

import org.springframework.beans.BeanUtils;


import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@RequiredArgsConstructor
@Service
@Slf4j

public class UserImplService implements UserService {
	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

    private ObjectValidator<UserDto> objectValidator;
	private final EmailService emailService;



    @Override
	  public UserDto save(UserDto userDto) {
      //objectValidator.validate(userDto);
		userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
	  return UserDto.FromEntity(
	  userRepository.save(UserDto.toEntity(userDto)) );
	  }
	@Override
	public UserDto findById(Integer id) {
		User user = userRepository.findById(id).orElse(null);
		if (user == null) {
			return null;
		}

		UserDto userDto = new UserDto();
		BeanUtils.copyProperties(user, userDto);


		return userDto;
	}

	@Override
	public UserDto findByEmail(String email) throws jakarta.persistence.EntityNotFoundException {
		User user = userRepository.findByEmail(email).orElse(null);
		if (user == null) {
			return null;
		}

		UserDto userDto = new UserDto();
		BeanUtils.copyProperties(user, userDto);


		return userDto;
	}





	@Override
	public List<UserDto> findAll() {
		return  userRepository.findAll().stream()
				.map(UserDto ::FromEntity).collect(Collectors.toList()); }
	@Override
	public void delete(Integer id) {
		if (id == null) {
			throw new InvalidOperationException("ID is NULL", ErrorCodes.USER_ID_IS_NULL);
		}
		User admin = userRepository.findById(id).orElseThrow(()->new EntityNotFoundException(id+" not found",ErrorCodes.USER_NOT_FOUND));
		userRepository.deleteById(id);


	}
	@Override
	public UserDto updateUser(UserDto dto)  {


		// Trouver l'utilisateur dans la base de données en utilisant l'ID du DTO
		User user = userRepository.findById(dto.getId())
				.orElseThrow(() -> new IllegalArgumentException("User not found"));

		// Mettez à jour les propriétés de l'entité avec les valeurs du DTO
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());
		user.setTele(dto.getTele());
		user.setCountry(dto.getCountry());
		user.setSexe(dto.getSexe());

		// ... autres propriétés à mettre à jour

		// Enregistrez les modifications dans la base de données
		user = userRepository.save(user);

		// Retournez le DTO mis à jour
		return UserDto.FromEntity(user);
	}

	// Méthode pour générer un jeton aléatoire

	private String generateRandomToken() {
		SecureRandom secureRandom = new SecureRandom();
		byte[] tokenBytes = new byte[32]; // 256 bits
		secureRandom.nextBytes(tokenBytes);
		return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
	}





	@Override
	public void initializeRolesAndAdmin() {

	}

	@Override
	public ResponseEntity<?> saveUser(User user) {
		return null;
	}

	@Override
	public ResponseEntity<?> confirmEmail(String confirmationToken) {
		return null;
	}

	@Override
	public UserDto findByUsername(String nom) {
		return null;
	}












}
