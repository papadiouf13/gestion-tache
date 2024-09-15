export default interface TachesList {
    id: number;
    libelle: string;
    statut: string;
    etat: boolean;
    userId: number; 
  }

export interface TacheCreation {
  id: number;
  libelle: string;
  statut: string;
  etat: boolean;
  userId: number;
}

export interface TacheUpdate {
  id: number;
  updatedTache: Partial<TachesList>;
}
