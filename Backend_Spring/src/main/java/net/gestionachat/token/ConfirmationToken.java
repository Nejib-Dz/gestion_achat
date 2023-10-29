package net.gestionachat.token;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.gestionachat.user.User;

import java.util.Date;

@Data
@Entity @AllArgsConstructor
@NoArgsConstructor
public class ConfirmationToken {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="token_id")
    private Long tokenId;

    @Column(name="confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.DATE)
    private Date createdDate;

    @ManyToOne
    private User user ;
    /*
     * @Temporal(TemporalType.TIMESTAMP) private Date createdDate;
     */


    public ConfirmationToken(String confirmationToken, Date createdDate , User user) {
        this.confirmationToken = confirmationToken;
        this.createdDate = createdDate;
        this.user = user ;
    }
}
