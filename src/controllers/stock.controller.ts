import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Stock } from '../entities/stock.entity';
import { StockService } from '../services/stock.service';

@Controller('stocks')
export class StockController {

    constructor(private readonly stockService : StockService) {}

    @Get()
    async getAllStock (){
        return await this.stockService.getAllStock();
    }

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
    async remove(@Body() body: {partName: string; quantity : number}) {
           const {partName , quantity} = body; 
           return await this.stockService.removeStock(partName, quantity)
    }

    @Get('check/low')
    async checkStockLow(@Query('partName') partName : string){
        return await this.stockService.checkStockLow(partName);
    }

    @Delete(':id')
    async deleteStock(@Param('id') id: number){
        return await this.stockService.deleteStock(id);
    }
}