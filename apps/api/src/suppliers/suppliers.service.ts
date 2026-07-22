import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Supplier } from '../database/entities';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

type SupplierFilters = {
  search?: string;
  type?: string;
  rank?: string;
};

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliers: Repository<Supplier>,
  ) {}

  async findAll(filters: SupplierFilters) {
    const where = [];
    const base: Record<string, unknown> = {};
    if (filters.type) base.type = filters.type;
    if (filters.rank) base.latestRankCode = filters.rank;
    if (filters.search) {
      where.push({ ...base, name: Like(`%${filters.search}%`) });
      where.push({ ...base, code: Like(`%${filters.search}%`) });
      where.push({ ...base, taxCode: Like(`%${filters.search}%`) });
    }

    return this.suppliers.find({
      where: where.length > 0 ? where : base,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const supplier = await this.suppliers.findOne({
      where: { id },
      relations: { evaluations: true },
      order: { evaluations: { createdAt: 'DESC' } },
    });
    if (!supplier) throw new NotFoundException('Không tìm thấy nhà cung cấp');
    return supplier;
  }

  create(dto: CreateSupplierDto) {
    return this.suppliers.save(this.suppliers.create(dto));
  }

  async update(id: string, dto: UpdateSupplierDto) {
    const supplier = await this.findOne(id);
    Object.assign(supplier, dto);
    return this.suppliers.save(supplier);
  }

  async remove(id: string) {
    const supplier = await this.findOne(id);
    await this.suppliers.remove(supplier);
    return { deleted: true };
  }
}
