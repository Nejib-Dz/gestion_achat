import { User } from "app/core/user/user.types";
import { Article } from "app/modules/Models/Article";

export interface DemandeAchat {

    id: number;//Edited
    dateDemande: Date;
    dateApprobation: Date;
    description: string;
    qteDemandee: number;
    //Added
    qteApprouvee: number;
    delais: string;
    etat: string;
    name?: string;
    motifRejet: string;
    userDemandeur: User;
    userApprouvant:User;
    articles: Article[];
    avatar?: string;
    status?: string;
}
