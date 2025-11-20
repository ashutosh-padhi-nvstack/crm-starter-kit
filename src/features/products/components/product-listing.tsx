import { VisaApplication } from '@/constants/data';
import { fakeApplications } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { ProductTable } from './product-tables';
import { columns } from './product-tables/columns';

type ApplicationListingPage = {};

export default async function ApplicationListingPage({}: ApplicationListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await fakeApplications.getApplications(filters);
  const totalApplications = data.total_products;
  const applications: VisaApplication[] = data.products;

  return (
    <ProductTable
      data={applications}
      totalItems={totalApplications}
      columns={columns}
    />
  );
}
