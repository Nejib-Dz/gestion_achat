package net.gestionachat.Exception;

public enum ErrorCodes {

	DEMANDEACHA_NOT_FOUND(1000),
	DEMANDEACHA_NOT_VALID(1001),
	DEMANDEACHA_ID_IS_NULL(1002),
	DEMANDEACHA_CODE_IS_NULL(1003),
	DEMANDEACHA_ALREADY_IN_USE(1004),

	    USER_NOT_FOUND(2000),
	    USER_NOT_VALID(2001),
	   USER_ID_IS_NULL(2002),
	   USER_CODE_IS_NULL(2003),
	   USER_ALREADY_IN_USE(2004),

	ARTICLE_ID_IS_NULL(1002),
	ARTICLE_NOT_FOUND(2000),



	FOURNISSEUR_ID_IS_NULL(1002),
	FOURNISSEUR_NOT_FOUND(2000), EVALUATION_ID_IS_NULL(1002), EVALUATION_NOT_FOUND(2000);




	    private final int code;

	    ErrorCodes(int code) {
	        this.code = code;
	    }

	    public int getCode() {
	        return code;
	    }

}
