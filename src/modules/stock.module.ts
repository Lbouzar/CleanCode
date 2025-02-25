import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from 'src/controllers/stock.controller';
import { Stock } from '../entities/stock.entity';
import { StockRepository } from '../repositories/stock.repository';
import { StockService } from '../services/stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [StockRepository, StockService],
  controllers: [StockController],
  exports: [StockService],
})
export class StockModule {}
