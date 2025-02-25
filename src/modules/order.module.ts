import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from 'src/controllers/order.controller';
import { Order } from 'src/entities/order.entity';
import { OrderRepository } from 'src/repositories/order.repository';
import { OrderService } from 'src/services/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
