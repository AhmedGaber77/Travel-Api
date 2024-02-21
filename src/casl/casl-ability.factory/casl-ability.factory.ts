import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/modules/accounts/entities/account.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';
import { WholesalerEntity } from 'src/modules/wholesalers/entities/wholesaler.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<
      | typeof WholesalerEntity
      | typeof TravelOfficeEntity
      | typeof ReservationEntity
      | typeof AccountEntity
      | typeof UserEntity
    >
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, build } = new AbilityBuilder<MongoAbility<[Action, Subjects]>>(
      createMongoAbility,
    );

    if (user.role?.id === RoleEnum.admin) {
      can(Action.Manage, 'all');
    } else if (user.role?.id === RoleEnum.travelAgent) {
      const travelOfficeId = user.travelOffice?.id;
      can(Action.Read, TravelOfficeEntity, {
        id: travelOfficeId,
      });
      can(Action.Create, ReservationEntity, {
        travelOfficeId: { $exists: true },
      });
      can(Action.Read, ReservationEntity, {
        travelOfficeId: { $exists: true },
      });
    } else if (user.role?.id === RoleEnum.wholesaler) {
      can(Action.Read, WholesalerEntity);
      can(Action.Read, TravelOfficeEntity);
      can(Action.Read, ReservationEntity);
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
