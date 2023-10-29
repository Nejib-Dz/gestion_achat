package net.gestionachat.auth;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.gestionachat.config.JwtService;
import net.gestionachat.service.impl.EmailService;
import net.gestionachat.token.*;

import net.gestionachat.user.Role;
import net.gestionachat.user.User;
import net.gestionachat.user.UserRepository;

import org.springframework.http.HttpHeaders;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final ConfirmationTokenRepository confirmationTokenRepository;

  private final EmailService emailService;

  public AuthenticationResponse register(RegisterRequest request) {
    var user = User.builder()
        .name(request.getName())
        .email(request.getEmail())

        .tele(request.getTele())
        .country(request.getCountry())
        .sexe(request.getSexe())

        .password(passwordEncoder.encode(request.getPassword()))
            .roles(request.getRoles())
        .build();
    var savedUser = repository.save(user);

    String token = UUID.randomUUID().toString() ;
    ConfirmationToken confirmationToken = new ConfirmationToken(token , new Date() , savedUser);
    confirmationTokenRepository.save(confirmationToken);

    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .email(savedUser.getEmail()) //added
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    System.out.println("email " +  request.getEmail());
    System.out.println("password " +  request.getPassword());
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
         .accessToken(jwtToken)
            .refreshToken(refreshToken)
           .email(user.getEmail()) /*Added*/
        .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }

 public void sendConfirmationAccountLink(int userId)
 {
   var user = repository.findById(userId).orElseThrow();


   var confirmationToken = confirmationTokenRepository.findByUserId(userId);
   SimpleMailMessage mailMessage = new SimpleMailMessage();
   mailMessage.setTo(user.getEmail());
   mailMessage.setSubject("Complete Registration!");
   mailMessage.setText("To confirm your account, please click here : "
           +"http://localhost:8080/api/v1/auth/confirm-account?token="+confirmationToken.getConfirmationToken());
   emailService.sendEmail(mailMessage);
 }

  public ResponseEntity<?> confirmEmail(String confirmationToken) {
    ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

    if(token != null)
    {
      User user = repository.findByEmailIgnoreCase(token.getUser().getEmail());
      user.setEnabled(true);
      repository.save(user);
      confirmationTokenRepository.delete(token);
      return ResponseEntity.ok("Email verified successfully!");
    }
    return ResponseEntity.badRequest().body("Error: Couldn't verify email");



  }
}
