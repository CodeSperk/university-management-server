import config from '../config';
import { USER_ROLE } from '../module/user/user.constants';
import { User } from '../module/user/user.model';

const superUser = {
  id: '0001',
  email: 'inbx.mahbub@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database database is connected, we will check is there any user who is superAdmin
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
