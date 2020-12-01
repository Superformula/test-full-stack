import { NgModule } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

import { environment } from 'src/environments/environment';


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const uri = environment.APOLLO_CLIENT_URI;

  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
