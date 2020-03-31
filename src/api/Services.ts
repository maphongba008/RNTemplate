import client from '.';
import { observable } from 'mobx';
import { Expose } from 'class-transformer';

export class User {
  @Expose()
  id = 0;
  @Expose()
  @observable
  @Expose()
  name = '';
  @Expose()
  email = '';
  @Expose()
  website = '';

  get fullName() {
    return this.name + 'ahihi';
  }
}

export class Services {
  fetchUsers = (): Promise<User[]> => {
    return client.get('https://jsonplaceholder.typicode.com/users', User);
  };
}

export default new Services();
