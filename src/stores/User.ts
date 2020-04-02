import { Expose } from 'class-transformer';

export class User {
  @Expose()
  id = 0;
  @Expose()
  @Expose()
  name = '';
  @Expose()
  email = '';
  @Expose()
  website = '';
}
