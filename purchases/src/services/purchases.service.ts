import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type CreatePurchaseParams = {
  customerId: string;
  productId: string;
};

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  getAllPurcharses() {
    return this.prisma.purchase.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  getAllPurcharsesFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customer_id: customerId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async createPurchase(params: CreatePurchaseParams) {
    const { customerId, productId } = params;
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) throw new Error('Product not found.');
    return await this.prisma.purchase.create({
      data: {
        customer_id: customerId,
        product_id: productId,
      },
    });
  }
}
