import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/data/model/user';
import { PageInput } from 'src/app/data/enum/query-input.enum';

@Injectable()
export class UsersService {
  private categories$ = new BehaviorSubject<User[]>(null);

  constructor(
    private http: HttpClient,
    private apollo: Apollo) { }

  private setUsers(categories: User[]): void {
    this.categories$.next(categories);
  }

  public getUsers(): Observable<Array<User>> {
    return this.categories$.asObservable();
  }

  public createUser(): void {
    this.http.get<User[]>('assets/mock/user-collection.json')
      .subscribe(users => {
        const user = users[Math.floor(Math.random() * users.length)];

        const createUsers = gql`
        mutation {
          createUser(
            input: {
              name: "${user.name}"
              dob: "${user.dob}"
              description: "${user.description}"
              address: "${user.address}"
            }
          ) {
            id
          }
        }`;

        this.apollo.mutate({ mutation: createUsers }).subscribe();
      });
  }

  public listUsers({ page = 1, refetch = false }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const queryStmt = gql`
      {
        listUsers(
          input: {
            limit: ${PageInput.LIMIT}
            page: ${page}
          }
        ) {
          id
          name
          address
          description
          createdAt
        }
      }`;

      if (refetch) {
        this.apollo
          .watchQuery({
            query: queryStmt,
          })
          .refetch()
          .then((users: any) => {
            this.setUsers(users.data.listUsers as User[]);
            resolve(true);
          });

        return;
      }

      this.apollo
        .watchQuery({
          query: queryStmt,
        })
        .valueChanges
        .subscribe((result: any) => {
          this.setUsers(result.data.listUsers as User[]);

          resolve(true);
        });
    });
  }

  public findUserByName(name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const queryStmt = gql`
      {
        findUser(
          input: {
            name: "${name}"
          }
        )
         {
          id
          name
          address
          description
          createdAt
        }
      }`;

      this.apollo
        .query({
          query: queryStmt,
        })
        .subscribe((result: any) => {
          this.setUsers(result.data.findUser as User[]);

          resolve(true);
        });
    });
  }

  public updateUser(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const updateUser = gql`
      mutation {
        updateUser(
          id: "${user.id}"
          input: { name: "${user.name}", description: "${user.description}", address: "${user.address}" }
        ) {
          id
        }
      }`;

      this.apollo.mutate({ mutation: updateUser })
        .subscribe(updateResult => {
          if (updateResult.errors) {
            reject(updateResult.errors);
            return;
          }

          resolve(true);
        });
    });
  }
}
