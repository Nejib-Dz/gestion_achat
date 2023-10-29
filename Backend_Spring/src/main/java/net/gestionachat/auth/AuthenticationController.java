package net.gestionachat.auth;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


import net.gestionachat.config.JwtService;


import net.gestionachat.service.interFace.UserService;

import net.gestionachat.user.User;
import net.gestionachat.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

import java.util.HashMap;

import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin( "http://localhost:4200")
@RequiredArgsConstructor
public class AuthenticationController {

  private final UserRepository userRepository;
  private final AuthenticationService service;

  private final UserService userService;
  private UserDetails userDetails;

  private JwtService jwtUtils;
  private AuthenticationManager authenticationManager;
  @Qualifier("mailSender") /*Added*/
  @Autowired
  private JavaMailSender javaMailSender;

  //@PreAuthorize("isAuthenticated() and (hasRole('ADMIN'))")
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
      @RequestBody RegisterRequest request
  )
  {
    return ResponseEntity.ok(service.register(request));
  }


  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {

    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }

  //confirmation email
  @GetMapping(value="/send-confirmation-account-link/{id}")
  public void confirmUserAccount(@PathVariable int id) {
     service.sendConfirmationAccountLink(id);
  }

  @RequestMapping(value="/confirm-account", method= {RequestMethod.GET,
          RequestMethod.POST})
  public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
    return service.confirmEmail(confirmationToken);
  }



  //test forgot passwprd and rest password
  @PostMapping("/forget-password")
  public HashMap<String, String> resetPassword( String email) throws MessagingException {
    HashMap<String, String> message = new HashMap<>();
    Optional<User> userExistingOptional = userRepository.findByEmail(email);

    if (userExistingOptional.isPresent()) {
      User userExisting = userExistingOptional.get();

      UUID token = UUID.randomUUID();
      userExisting.setPasswordResetToken(token.toString());

      // Cette ligne crée un objet MimeMessage, qui est utilisé pour construire et envoyer des e-mails
      MimeMessage message1 = javaMailSender.createMimeMessage();
      //Cet objet MimeMessageHelper facilite la construction de l'e-mail en fournissant des méthodes pour définir les différentes parties de l'e-mail, comme le sujet, le destinataire, le corps du message, etc.
      MimeMessageHelper helper = new MimeMessageHelper(message1);
      //Définit le sujet de l'e-mail comme "forget-password".
      helper.setSubject("forgot_password");
      helper.setFrom("benalinajib527@gmail.com");
      helper.setTo(userExisting.getEmail());
      // Définit le contenu du corps du message. Dans cet exemple, il s'agit d'un lien HTML que l'utilisateur peut cliquer pour réinitialiser son mot de passe. Le paramètre true indique que le contenu est au format HTML.
      helper.setText("<HTML><body><a href=\"http://localhost:4200/reset-password/"+userExisting.getPasswordResetToken()+"\">Forget_Password<a/></body></HTML>", true);
     // helper.setText("votre codde est  "+userExisting.getPasswordResetToken());
      javaMailSender.send(message1);

      userRepository.saveAndFlush(userExisting);

      message.put("user", "user found and email sent");
    } else {
      message.put("user", "user not found");
    }

    return message;
  }


  @PostMapping("/reset-password/{passwordResetToken}")
  public HashMap<String,String> savePassword (@PathVariable String passwordResetToken, String newPassword){
    User userexisting = userRepository.findByPasswordResetToken(passwordResetToken);
    HashMap message = new HashMap();

    //ce code traite la réinitialisation du mot de passe pour un utilisateur spécifique. Si l'utilisateur est trouvé dans la base de données, son mot de passe est mis à jour et le jeton de réinitialisation est supprimé. Si l'utilisateur n'est pas trouvé, un message indiquant que la réinitialisation du mot de passe a échoué est renvoyé.
    if(userexisting != null){
      userexisting.setId(userexisting.getId());
      userexisting.setPassword(new BCryptPasswordEncoder().encode(newPassword));
      userexisting.setPasswordResetToken(null);
      userRepository.save(userexisting);
      message.put("resetpassword","proccesed");
      return message;
    }else{
      message.put("resetpassword", "failed");
      return message;
    }
  }

}

