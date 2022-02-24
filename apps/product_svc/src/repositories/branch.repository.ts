import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Branch, BranchRelations} from '../models';

export class BranchRepository extends DefaultCrudRepository<
  Branch,
  typeof Branch.prototype.id,
  BranchRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Branch, dataSource);
  }
}
