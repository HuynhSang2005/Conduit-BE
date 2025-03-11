import { DynamicModule, Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { constructDBUrl } from './utils';

interface DatabaseModuleOptions {
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
}

// dynamic module
// forRoot => singleton
// register
// CallAPiModule.register({})

@Global()
@Module({})
export class PostmarkModule {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    return {
      module: PostmarkModule,
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useValue: options,
        },
        {
          provide: DatabaseService,
          useFactory: () => {
            return new DatabaseService({
              datasources: {
                db: {
                  url: constructDBUrl(options),
                },
              },
            });
          },
        },
      ],
      exports: ['DATABASE_OPTIONS', DatabaseService],
    };
  }
}
