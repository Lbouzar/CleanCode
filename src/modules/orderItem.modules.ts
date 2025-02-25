import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemController } from 'src/controllers/orderItem.controller';
import { OrderItem } from 'src/entities/orderItem.entity';
import { OrderItemRepository } from 'src/repositories/orderItem.repository';
import { OrderItemService } from 'src/services/orderItem.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemRepository, OrderItemService],
  controllers: [OrderItemController],
  exports: [OrderItemService],
})
export class OrderItemModule {}
