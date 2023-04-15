import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  private StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`Invalid Status: ${value}`);
    }

    return value;
  }
}
