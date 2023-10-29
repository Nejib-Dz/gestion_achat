package net.gestionachat.dto;



import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import net.gestionachat.entities.Role;
import net.gestionachat.token.Token;
import org.springframework.beans.BeanUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.user.User;



@Data
@AllArgsConstructor @NoArgsConstructor
public class UserDto{

	private Integer id;
	// private String username;
     private String name;
	 private String password;
	 @Email
	 private String email;
	 private int tele;
	 private String country;
	 private String sexe;


    private List<Role> roles;
	// Constructeur prenant une chaîne JSON en argument
	public UserDto(String json) {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			UserDto userDto = objectMapper.readValue(json, UserDto.class);

		} catch (IOException e) {
			e.printStackTrace();
			// Gérer l'exception si la désérialisation échoue
		}
	}
	@OneToMany(mappedBy = "user")
	private List<Token> tokens;
//	@OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
//	@JoinColumn(nullable = false, name = "user_id")
//	private User user;

		  public static UserDto FromEntity(User entity) {
			  if (entity != null) {
				  UserDto userDto =new UserDto();
				  BeanUtils.copyProperties(entity,userDto);
				  List<net.gestionachat.entities.Role> rolesDto = entity.getRoles();
				  userDto.setRoles(rolesDto);
				  return userDto;
			  }

			  return null;


		  }
		  public static User toEntity(UserDto dto) {
			  User user=new User();
		  BeanUtils.copyProperties(dto,user);
		  return user;

		  }



}
