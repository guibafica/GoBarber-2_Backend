import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments') // Para armazenar nesta tabela
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Por padrão, string
  provider_id: string;

  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Ao criar uma Entity do typrorm, o constructor é gerado automaticamente
}

export default Appointment;
