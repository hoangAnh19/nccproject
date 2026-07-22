import { Controller, Get } from '@nestjs/common';
import { EvaluationConfigsService } from './evaluation-configs.service';

@Controller('evaluation-configs')
export class EvaluationConfigsController {
  constructor(private readonly configsService: EvaluationConfigsService) {}

  @Get('default')
  getDefault() {
    return this.configsService.getDefault();
  }

  @Get('default/form-schema')
  getDefaultFormSchema() {
    return this.configsService.getDefaultFormSchema();
  }
}
