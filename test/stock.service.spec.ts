import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../src/entities/stock.entity';
import { NotificationService } from '../src/services/notification.service';
import { StockService } from '../src/services/stock.service';

describe('StockService (Unit)', () => {
  let stockService: StockService;
  let stockRepository: Repository<Stock>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockService,
        {
          provide: getRepositoryToken(Stock),
          useValue: {
            findOne: jest.fn(), // Mock `findOne` method
            save: jest.fn(), // Mock `save` method
          },
        },
        {
          provide: NotificationService,
          useValue: {
            sendLowStockAlert: jest.fn(), // Mock `sendLowStockAlert`
          },
        },
      ],
    }).compile();

    stockService = module.get<StockService>(StockService);
    stockRepository = module.get<Repository<Stock>>(getRepositoryToken(Stock));
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should decrease stock and send an alert if stock is low', async () => {
    const mockStock: Stock = { id: 1, partName: 'Battery', quantity: 5, minQuantity: 3 } as Stock;

    jest.spyOn(stockRepository, 'findOne').mockResolvedValue(mockStock);
    jest.spyOn(stockRepository, 'save').mockResolvedValue({ ...mockStock, quantity: 2 });

    await stockService.decreaseStock(1, 3);

    expect(stockRepository.save).toHaveBeenCalledWith({ ...mockStock, quantity: 2 });
    expect(notificationService.sendLowStockAlert).toHaveBeenCalledWith('Battery', 2);
  });

  it('should throw an error if stock does not exist', async () => {
    jest.spyOn(stockRepository, 'findOne').mockResolvedValue(null);

    await expect(stockService.decreaseStock(1, 2)).rejects.toThrow(NotFoundException);
  });
});
