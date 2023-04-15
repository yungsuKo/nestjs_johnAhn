import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './boards/boards.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), BoardModule],
})
export class AppModule {}
