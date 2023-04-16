import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), BoardModule, AuthModule],
})
export class AppModule {}
