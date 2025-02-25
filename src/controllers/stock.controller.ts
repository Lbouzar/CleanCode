import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Stock } from '../entities/stock.entity';
import { StockService } from '../services/stock.service';

@Controller('stocks')
export class StockController {

    constructor(private readonly stockService : StockService) {}

    @Get(':id')
    async getStockById(@Param('id') id: number) {
        return await this.stockService.getStockById(id);
    }

    @Post()
    async createStock(@Body() stock: Stock){
        if(!stock.partName || stock.quantity < 0 ) {
            throw new BadRequestException('Invalid stock data'); 
        }
       return await this.stockService.createStock(stock);
    }

    @Post('remove')
    async remove(@Body() body: {stockId: number; quantity : number}) {
           const {stockId , quantity} = body; 
           return await this.stockService.decreaseStock(stockId, quantity)
    }

    @Get('check/low')
    async checkStockLow(@Query('partName') partName : string){
        return await this.stockService.checkStockLow(partName);
    }

    @Get('real-time')
    async getStockLevels() {
    return await this.stockService.getAllStock();
}

    @Delete(':id')
    async deleteStock(@Param('id') id: number){
        return await this.stockService.deleteStock(id);
    }
}