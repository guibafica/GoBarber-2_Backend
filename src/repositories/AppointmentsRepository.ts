import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // O retorno de uma função async, é uma promise(Valor que pode estar
    // disponível agora, no futuro ou nunca)
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

// findByDate(date).then() == const response = await findByDate(date)
// .then() => Pega o resultado da função

export default AppointmentsRepository;
