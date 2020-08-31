import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

// Princípio KISS => Keep It Simple & Stupid

@Entity('appointments') // Para armazenar nesta tabela
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Por padrão, string
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
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
