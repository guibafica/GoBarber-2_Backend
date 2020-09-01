import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // O retorno de uma função async, é uma promise(Valor que pode estar
    // disponível agora, no futuro ou nunca)
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

// findByDate(date).then() == const response = await findByDate(date)
// .then() => Pega o resultado da função

export default AppointmentsRepository;
