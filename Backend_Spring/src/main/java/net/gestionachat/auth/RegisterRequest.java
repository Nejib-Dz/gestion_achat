package net.gestionachat.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.entities.Role;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {


	private String username;
    private String name;
	 private String password;
	 private String email;
	 private int tele;
	 private String country;
	 private String sexe;

     private List<Role> roles;
}
