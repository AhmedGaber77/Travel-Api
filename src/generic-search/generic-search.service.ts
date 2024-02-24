// import { Injectable } from '@nestjs/common';
// import { FindOptionsWhere, ILike, Repository } from 'typeorm';

// @Injectable()
// export class GenericSearch<T> {
//   async search(
//     repository: Repository<T>,
//     searchFields: Extract<keyof T, string>[],
//     search: string,
//   ) {
//     const queryBuilder = repository.createQueryBuilder('alias');
//     const whereSearch: FindOptionsWhere<T> = {};
//     searchFields.forEach(
//       (field) => (whereSearch[`${field}` as string] = ILike(`%${search}%`)),
//     );
//     queryBuilder.andWhere(whereSearch);
//     const [items, totalCount] = await queryBuilder.getManyAndCount();
//     return { items, totalCount };
//   }
// }
