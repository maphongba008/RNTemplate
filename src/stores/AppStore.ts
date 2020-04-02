import { User } from './User';
import Services from '@src/api/Services';
import { DataLoader } from './DataLoader';

export class AppStore {
  usersLoader: DataLoader<User[]> = new DataLoader();

  fetchUsers = async () => {
    this.usersLoader.startLoading();
    try {
      const users = await Services.fetchUsers();
      this.usersLoader.setData(users);
    } catch (e) {
      this.usersLoader.setError(e.message);
    }
  };
}

export default new AppStore();
