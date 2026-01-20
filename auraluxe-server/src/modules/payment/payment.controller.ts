/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  //

  // ! for succefull payment
  @Post('success')
  async paymentSuccess(@Body() body) {
    const transactionId = body?.tran_id as string;

    await this.paymentService.successfullPayment(transactionId);

    return { success: true };
  }

  // ! fail transaction
  @Post('fail')
  async paymentFail(@Body() body) {
    const transactionId = body?.tran_id as string;

    await this.paymentService.handleFailedOrCanceledPayment(transactionId);

    return { success: false, message: 'Payment failed' };
  }

  // ! cancel
  @Post('cancel')
  async paymentCancel(@Body() body) {
    const transactionId = body?.tran_id as string;

    await this.paymentService.handleFailedOrCanceledPayment(transactionId);

    return { success: false, message: 'Payment canceled' };
  }

  //
}
