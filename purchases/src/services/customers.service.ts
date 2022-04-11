import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type CreateCustomerParams = {
  authUserId: string;
};

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: { auth_user_id: authUserId },
    });
  }

  async createCustomer(params: CreateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        auth_user_id: params.authUserId,
      },
    });
  }
}
