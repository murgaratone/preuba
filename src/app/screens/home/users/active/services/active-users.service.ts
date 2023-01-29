import { Injectable } from '@angular/core';
import {
  User,
  UserList,
  UserListResult,
} from 'app/shared/models/user.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveUsersService {
  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService
  ) {}

  public getUsers(pageNumber?: number): Promise<UserListResult> {
    return this.dataApiService.getAll(
      `colaborators?pageSize=${this.configService.pageSize}&pageNumber=${
        pageNumber ?? 1
      }`,
      undefined,
      true
    );
  }

  public getUser(id: string) {
    return this.dataApiService.getById('colaborators', id);
  }

  public createUser(user: User): Promise<any> {
    return this.dataApiService.post(user, 'colaborators');
  }

  public updateUser(user: User): Promise<any> {
    return this.dataApiService.update(user, 'colaborators');
  }

  public disableUser(user: any) {
    return this.dataApiService.disable(
      { status: !user.status },
      user.id,
      'colaborators/status'
    );
  }
}
