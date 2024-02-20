import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { CHECK_ABILITIES_KEY, RequiredRule } from './abilities.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<RequiredRule[]>(
      CHECK_ABILITIES_KEY,
      context.getHandler() || [],
    );

    await 1;

    const user = context.switchToHttp().getRequest().user;
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
      });
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
