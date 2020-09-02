import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // O retorno de uma função async, é uma promise(Valor que pode estar
    // disponível agora, no futuro ou nunca)
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointments = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointments);

    return appointments;
  }
}

// findByDate(date).then() == const response = await findByDate(date)
// .then() => Pega o resultado da função

export default AppointmentsRepository;
