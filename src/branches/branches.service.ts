import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from './branch.schema';

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch.name)
    private readonly branchModel: Model<Branch>,
  ) {}

  async getById(branchId: string) {
    console.log('AAA', branchId);
    return this.branchModel.findById(branchId);
  }
}
