import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierRank } from './supplier.entity';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('rank') rank?: SupplierRank,
    @Query('type') type?: string,
  ) {
    return this.suppliersService.findAll(search, rank, type);
  }

  @Post()
  create(@Body() dto: CreateSupplierDto) {
    return this.suppliersService.create(dto);
  }
}
