import { Route } from 'react-router';
import { lazy } from 'react';

const InvoiceApp = lazy(() => import('./invoice'));
const InvoiceList = lazy(() => import('./components/invoice-list'));
const CreateInvoice = lazy(() => import('./components/create-invoice'));
const ViewInvoice = lazy(() => import('./components/view-invoice'));

export const InvoiceRoutes = () => {
  return (
    <Route path="/invoice" element={<InvoiceApp />}>
      <Route index element={<InvoiceList />} />
      <Route path="create" element={<CreateInvoice />} />
      <Route path="view/:id" element={<ViewInvoice />} />
    </Route>
  );
};