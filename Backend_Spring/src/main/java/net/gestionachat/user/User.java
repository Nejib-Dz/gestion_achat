package net.gestionachat.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.*;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import net.gestionachat.entities.Role;
import net.gestionachat.token.Token;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;
  @NonNull // Lombok
  // Contraintes de taille
  @Size(min = 6, max = 32)
  private String name;
  @NonNull // Lombok
  @Email // Doit avoir la forme d'une adresse email
  @Column (unique=true)
  private String email;
  @NonNull // Lombok
  private String password;
    private int tele;
    private String country;
    private String sexe;
  private String image;
   private String passwordResetToken;
  private boolean isEnabled;

//      @Enumerated(EnumType.STRING)
//      private Role role;

  /*Added*/
@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
@JoinTable(	name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
private List<Role> roles;
@JsonIgnore
  @OneToMany(mappedBy = "user")
  private List<Token> tokens;


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {

    return null;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }



}
