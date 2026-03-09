import { TypeEquipement } from './type-equipement';

export interface Equipement {
  id?: number;
  dateAquisation: string;   // ISO string
  etat: string;
  reservable: boolean;
  typeEquipement: TypeEquipement;
}