import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseModule } from './database/database.module.js';
import { EmployeesModule } from './employees/employees.module.js';
import { APP_GUARD } from '@nestjs/core' ;
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'restapi',
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 10000,
        limit: 3,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    UsersModule,
    DatabaseModule,
    EmployeesModule],

  controllers: [AppController],
  providers: [AppService,
   {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
],
})
export class AppModule {};
