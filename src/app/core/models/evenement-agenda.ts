export interface EvenementAgendaItem {
  id: number;
  titre: string;
  dateDebut: string;
  dateFin: string;
  typeEvenement: string;
  statut: string;
  salles: string[];
  equipements: string[];
}
