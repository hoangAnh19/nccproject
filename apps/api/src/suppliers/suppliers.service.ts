import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../database/entities';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

type SupplierFilters = {
  search?: string;
  type?: string;
  rank?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
};

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliers: Repository<Supplier>,
  ) {}

  async findAll(filters: SupplierFilters) {
    const qb = this.suppliers.createQueryBuilder('supplier');

    if (filters.type) {
      qb.andWhere('supplier.type = :type', { type: filters.type });
    }

    if (filters.rank) {
      if (filters.rank === 'UNRATED' || filters.rank === 'Chưa có') {
        qb.andWhere('supplier.latestRankCode IS NULL');
      } else {
        qb.andWhere('supplier.latestRankCode = :rank', { rank: filters.rank });
      }
    }

    if (filters.status === 'evaluated') {
      qb.andWhere('supplier.lastEvaluatedAt IS NOT NULL');
    } else if (filters.status === 'unevaluated') {
      qb.andWhere('supplier.lastEvaluatedAt IS NULL');
    }

    if (filters.search) {
      qb.andWhere(
        '(supplier.name LIKE :search OR supplier.code LIKE :search OR supplier.taxCode LIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    const sortFieldMap: Record<string, string> = {
      name: 'supplier.name',
      code: 'supplier.code',
      taxCode: 'supplier.taxCode',
      type: 'supplier.type',
      latestScore: 'supplier.latestScore',
      createdAt: 'supplier.createdAt',
    };

    const sortColumn = sortFieldMap[filters.sortBy ?? ''] || 'supplier.createdAt';
    const sortDir = filters.sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    qb.orderBy(sortColumn, sortDir);
    if (sortColumn !== 'supplier.createdAt') {
      qb.addOrderBy('supplier.createdAt', 'DESC');
    }

    const page = Math.max(1, filters.page ?? 1);
    const limit = Math.min(100, Math.max(1, filters.limit ?? 20));
    qb.skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const supplier = await this.suppliers.findOne({
      where: { id },
      relations: { evaluations: { items: { criterion: true } } },
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
