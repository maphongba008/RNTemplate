import client from '.';
import { User } from '@src/stores/User';

class Services {
  fetchUsers = (): Promise<User[]> => {
    return client.get('https://jsonplaceholder.typicode.com/users', User);
  };
}

export default new Services();
