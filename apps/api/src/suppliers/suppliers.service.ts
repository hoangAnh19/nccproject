import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Supplier, SupplierRank } from './supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliers: Repository<Supplier>,
  ) {}

  findAll(search?: string, rank?: SupplierRank, type?: string) {
    return this.suppliers.find({
      where: {
        ...(search ? { name: Like(`%${search}%`) } : {}),
        ...(rank ? { rank } : {}),
        ...(type ? { types: Like(`%${type}%`) } : {}),
      },
      order: {
        latestScore: 'DESC',
        id: 'ASC',
      },
    });
  }

  create(dto: CreateSupplierDto) {
    const supplier = this.suppliers.create({
      ...dto,
      taxCode: dto.taxCode ?? null,
      note: dto.note ?? null,
      latestScore: null,
      rank: SupplierRank.UNRATED,
      lastEvaluatedAt: null,
    });

    return this.suppliers.save(supplier);
  }
}
