import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class StockGateway {
    @WebSocketServer()
    server: Server;

    sendStockUpdate(stockItem) {
        this.server.emit('stockUpdate', stockItem);
    }
}
