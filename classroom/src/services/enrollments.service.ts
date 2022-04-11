import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  getByCourseAndStudentId(params: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        course_id: params.courseId,
        student_id: params.studentId,
        canceled_at: null,
      },
    });
  }

  getAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceled_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  getEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        student_id: studentId,
        canceled_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
