import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { TestController } from './test/test.controller.js';

@Module({
  controllers: [UsersController, TestController],
  providers: [UsersService]
})
export class UsersModule {}
