import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../util/BaseEntity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: true })
  githubId?: string;

  @Column('citext', { unique: true })
  email!: string;

  @Column({ type: 'bytea', nullable: true })
  password?: Buffer;

  get isPasswordless() {
    return !!this.password && this.githubId;
  }
}
