import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {BranchRepository} from '.';
import {MongodbDataSource} from '../datasources';
import {Branch, Category, Product, ProductRelations} from '../models';
import {CategoryRepository} from './category.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  public readonly category: BelongsToAccessor<
    Category,
    typeof Product.prototype.id
  >;
  public readonly branch: BelongsToAccessor<
    Branch,
    typeof Product.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('CategoryRepository')
    protected categoryRepositoryGetter: Getter<CategoryRepository>,
    @repository.getter('BranchRepository')
    protected branchRepositoryGetter: Getter<BranchRepository>,
  ) {
    super(Product, dataSource);
    this.category = this.createBelongsToAccessorFor(
      'category',
      categoryRepositoryGetter,
    );
    this.registerInclusionResolver('category', this.category.inclusionResolver);

    this.branch = this.createBelongsToAccessorFor(
      'branch',
      branchRepositoryGetter,
    );
    this.registerInclusionResolver('branch', this.branch.inclusionResolver);
  }
}
