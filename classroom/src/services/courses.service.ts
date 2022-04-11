import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

import slugify from 'slugify';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  getAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async createCourse(params: CreateCourseParams) {
    const { title } = params;
    const slug = slugify(title, {
      lower: true,
    });
    const course = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
    if (course) throw new Error('Course already exists.');
    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
