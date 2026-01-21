/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from './payment.service';

const redirectURL = 'http://localhost:3000';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  //

  // ! for succefull payment
  @Post('success')
  async paymentSuccess(@Body() body, @Res() res: Response) {
    const transactionId = body?.tran_id as string;

    await this.paymentService.successfullPayment(transactionId);

    return res.redirect(`${redirectURL}/payment-success`);
  }

  // ! fail transaction
  @Post('fail')
  async paymentFail(@Body() body, @Res() res: Response) {
    const transactionId = body?.tran_id as string;

    await this.paymentService.handleFailedOrCanceledPayment(transactionId);

    return res.redirect(`${redirectURL}/payment-fail`);
  }

  // ! cancel
  @Post('cancel')
  async paymentCancel(@Body() body, @Res() res: Response) {
    const transactionId = body?.tran_id as string;

    await this.paymentService.handleFailedOrCanceledPayment(transactionId);

    return res.redirect(`${redirectURL}/payment-cancel`);
  }

  //
}
