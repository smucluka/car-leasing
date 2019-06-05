import { DodatnaOprema } from './dodatna.oprema';

export class Car {
  id: number;
  marka_id: number;
  marka: string;
  model: string;
  godina_proizvodnje: string;
  godina_modela: string;
  kilometraza: number;
  motor: string;
  snaga_motora: number;
  radni_obujam: number;
  mjenjac: string;
  broj_stupnjeva: number;
  potrosnja_goriva: string;
  stanje_vozila: string;
  lokacija_vozila: string;
  vlasnik: string;
  garaziran: string;
  broj_vrata: number;
  broj_sjedala: number;
  boja: string;
  vrsta_pogona: string;
  dodatna_oprema: DodatnaOprema[];
}
