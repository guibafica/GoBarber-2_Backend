import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import UpdateUserAvatarService from 'modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const usersRepository = new UsersRepository();
  const createUser = new CreateUsersService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.json(user);
});

// .patch() -> Atualizar uma única informação do usuário
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default usersRouter;
