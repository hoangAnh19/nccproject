import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PreviewScoreDto } from './dto/preview-score.dto';
import { UpsertEvaluationConfigDto } from './dto/upsert-evaluation-config.dto';

@Controller('admin/evaluation-configs')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Post()
  create(@Body() dto: UpsertEvaluationConfigDto) {
    return this.adminService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpsertEvaluationConfigDto) {
    return this.adminService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }

  @Post(':id/set-default')
  setDefault(@Param('id') id: string) {
    return this.adminService.setDefault(id);
  }

  @Get(':id/preview')
  preview(@Param('id') id: string) {
    return this.adminService.preview(id);
  }

  @Post(':id/preview-score')
  previewScore(@Param('id') id: string, @Body() dto: PreviewScoreDto) {
    return this.adminService.previewScore(id, dto);
  }
}
