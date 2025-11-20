import { fakeApplications, VisaApplication } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';

type TApplicationViewPageProps = {
  productId: string;
};

export default async function ApplicationViewPage({
  productId
}: TApplicationViewPageProps) {
  let application = null;
  let pageTitle = 'Create New Application';

  if (productId !== 'new') {
    const data = await fakeApplications.getApplicationById(Number(productId));
    application = data.product as VisaApplication;
    if (!application) {
      notFound();
    }
    pageTitle = `Edit Application`;
  }

  return <ProductForm initialData={application} pageTitle={pageTitle} />;
}
