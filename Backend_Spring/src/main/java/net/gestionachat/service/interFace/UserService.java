package net.gestionachat.service.interFace;

import java.util.List;

import jakarta.persistence.EntityNotFoundException;
import net.gestionachat.dto.UserDto;
import net.gestionachat.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


public interface UserService {
	void initializeRolesAndAdmin();

	ResponseEntity<?> saveUser(User user);

	ResponseEntity<?> confirmEmail(String confirmationToken);
	 UserDto findByUsername(String nom);

	UserDto save(UserDto userDto);
	UserDto findById(Integer id) throws EntityNotFoundException;
    List<UserDto> findAll();
	public UserDto  updateUser(UserDto dto)throws EntityNotFoundException;
    void delete(Integer id) throws EntityNotFoundException;

	UserDto findByEmail(String email);



}
