import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments') // Para armazenar nesta tabela
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Por padrão, string
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  // Ao criar uma Entity do typrorm, o constructor é gerado automaticamente
}

export default Appointment;
