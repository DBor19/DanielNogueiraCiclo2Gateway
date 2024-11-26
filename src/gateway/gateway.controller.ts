import { Controller, Get, Post } from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';

@Controller('gateway')
export class GatewayController {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://senac:senac@localhost:5672'], // Credenciais do RabbitMQ
      queue: 'response_queue', // Fila usada para comunicação
    },
  })
  client: ClientProxy;

  @Post('send')
  sendMessage() {
    const message = { cliente: 'João', motorista: 'Maria', valor: 100.0 };
    return this.client.send('process_request', message);
  }

  @Get('status')
  getStatus() {
    return { status: 'API Gateway funcionando!' };
  }
}
