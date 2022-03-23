import { Body, Controller, Get, Param } from '@nestjs/common';
import { Branch } from './branch.schema';
import { BranchesService } from './branches.service';

@Controller('branches')
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @Get('/:id')
  public async getBranchInfo(@Param('id') branchId: string): Promise<Branch> {
    return this.branchesService.getById(branchId);
  }
}
