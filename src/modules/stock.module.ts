import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from 'src/controllers/stock.controller';
import { Stock } from '../entities/stock.entity';
import { StockRepository } from '../repositories/stock.repository';
import { StockService } from '../services/stock.service';
import { NotificationModule } from './notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), NotificationModule],
  providers: [StockRepository, StockService],
  controllers: [StockController],
  exports: [StockService],
})
export class StockModule {}
