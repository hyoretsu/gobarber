import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
 beforeEach(() => {
  fakeAppointmentsRepository = new FakeAppointmentsRepository();
  fakeNotificationsRepository = new FakeNotificationsRepository();
  createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationsRepository);
 });

 it('should be able to create a new appointment', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
   return new Date(2020, 4, 10, 12).getTime();
  });

  const appointment = await createAppointment.execute({
   date: new Date(2020, 4, 10, 13),
   provider_id: 'provider',
   user_id: 'user',
  });

  expect(appointment).toHaveProperty('id');
  expect(appointment.provider_id).toBe('provider');
 });

 it('should not be able to create two appointments on the same time', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
   return new Date(2020, 4, 10, 12).getTime();
  });

  const appointmentDate = new Date(2020, 4, 10, 13);

  await createAppointment.execute({
   date: appointmentDate,
   provider_id: 'provider',
   user_id: 'user',
  });

  await expect(
   createAppointment.execute({
    date: appointmentDate,
    provider_id: 'provider',
    user_id: 'user',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });

 it('should not be able to create an appointment on a past date', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
   return new Date(2020, 4, 10, 12).getTime();
  });

  await expect(
   createAppointment.execute({
    date: new Date(2020, 4, 10, 11),
    provider_id: 'provider',
    user_id: 'user',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });

 it('should not be able to create an appointment with yourself', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
   return new Date(2020, 4, 10, 12).getTime();
  });

  await expect(
   createAppointment.execute({
    date: new Date(2020, 4, 10, 13),
    provider_id: 'provider',
    user_id: 'provider',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });

 it('should not be able to create an appointment before 8AM or after 5PM', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
   return new Date(2020, 4, 10, 12).getTime();
  });

  await expect(
   createAppointment.execute({
    date: new Date(2020, 4, 11, 7),
    provider_id: 'provider',
    user_id: 'provider',
   }),
  ).rejects.toBeInstanceOf(AppError);

  await expect(
   createAppointment.execute({
    date: new Date(2020, 4, 11, 18),
    provider_id: 'provider',
    user_id: 'provider',
   }),
  ).rejects.toBeInstanceOf(AppError);
 });
});
