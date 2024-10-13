import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SaleDetailsService } from './sale_details.service';
import { CreateSaleDetailDto } from './dto/create-sale_detail.dto';
import { UpdateSaleDetailDto } from './dto/update-sale_detail.dto';

@Controller('sale-details')
export class SaleDetailsController {
  constructor(private readonly saleDetailsService: SaleDetailsService) {}

  @Post()
  create(@Body() createSaleDetailDto: CreateSaleDetailDto) {
    return this.saleDetailsService.create(createSaleDetailDto);
  }

  @Get()
  findAll() {
    return this.saleDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.saleDetailsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDetailDto: UpdateSaleDetailDto,
  ) {
    return this.saleDetailsService.update(id, updateSaleDetailDto);
  }
}
