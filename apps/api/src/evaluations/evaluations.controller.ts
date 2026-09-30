import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { EvaluationsService } from './evaluations.service';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Get()
  findAll(
    @Query('supplierId') supplierId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.evaluationsService.findAll({
      supplierId,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationsService.create(dto);
  }

  @Post('preview')
  preview(@Body() dto: CreateEvaluationDto) {
    return this.evaluationsService.preview(dto);
  }
}
