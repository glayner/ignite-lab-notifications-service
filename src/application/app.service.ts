import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotification() {
    return this.prisma.notification.findMany();
  }

  async createNotification({
    content,
    category,
    recipientId,
  }: CreateNotificationBody) {
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
