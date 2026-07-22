import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('summary')
  summary() {
    return this.reportsService.summary();
  }

  @Get('rank-distribution')
  rankDistribution() {
    return this.reportsService.rankDistribution();
  }

  @Get('top-suppliers')
  topSuppliers(@Query('limit') limit?: string) {
    return this.reportsService.topSuppliers(limit ? Number(limit) : 5);
  }
}
