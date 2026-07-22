import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { EvaluationsService } from './evaluations.service';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Get()
  findAll() {
    return this.evaluationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationsService.create(dto);
  }
}
