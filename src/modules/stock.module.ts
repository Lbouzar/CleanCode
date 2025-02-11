import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from '../entities/stock.entity';
import { StockRepository } from '../repositories/stock.repository';
import { StockService } from '../services/stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [StockRepository, StockService],
  exports: [StockService],
})
export class StockModule {}
