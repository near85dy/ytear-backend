import { Module } from '@nestjs/common';
import { auth } from '../../lib/auth';

@Module({
  providers: [
    {
      provide: 'AUTH_INSTANCE',
      useValue: auth,
    },
  ],
  exports: ['AUTH_INSTANCE'],
})
export class AuthModule {}
