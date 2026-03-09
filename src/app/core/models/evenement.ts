import { TypeEvenement } from './type-evenement';

export interface Evenement {
  id?: number;
  nom?: string;
  titre: string;
  description?: string;
  dateDebut: string;      // ISO
  dateFin: string;        // ISO
  typeEvenement: TypeEvenement;
}