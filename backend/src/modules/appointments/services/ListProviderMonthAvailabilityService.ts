import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
 provider_id: string;
 month: number;
 year: number;
}

type IResponse = Array<{
 day: number;
 availability: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
 constructor(
  @inject('AppointmentsRepository')
  private appointmentsRepository: IAppointmentsRepository,
 ) {}

 public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
  const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
   provider_id,
   month,
   year,
  });

  return [{ day: 1, availability: false }];
 }
}
