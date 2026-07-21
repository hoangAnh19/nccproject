import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { EvaluationsService } from './evaluations.service';

@Controller()
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Get('evaluations')
  findAll() {
    return this.evaluationsService.findAll();
  }

  @Post('evaluations')
  create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationsService.create(dto);
  }

  @Get('reports/summary')
  getSummary() {
    return this.evaluationsService.getSummary();
  }

  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
