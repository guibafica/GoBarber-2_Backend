import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const usersRepository = new UsersRepository();
  const authenticatedUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticatedUser.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
