import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';

const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const LeadsPage = lazy(() => import('@/features/leads/pages/LeadsPage'));
const ProfilePage = lazy(() => import('@/features/auth/pages/ProfilePage'));
const Customer360Page = lazy(() => import('@/features/customers/pages/Customer360Page'));
const FamilyChitPage = lazy(() => import('@/features/customers/pages/FamilyChitPage'));
const SalesPage = lazy(() => import('@/features/sales/pages/SalesPage'));
const CollectionsPage = lazy(() => import('@/features/collections/pages/CollectionsPage'));
const ServicePage = lazy(() => import('@/features/service/pages/ServicePage'));
const RenewalsPage = lazy(() => import('@/features/renewals/pages/RenewalsPage'));
const FaqPage = lazy(() => import('@/features/support/pages/FaqPage'));
const CanvasserFollowUpPage = lazy(() => import('@/features/sales/pages/CanvasserFollowUpPage'));
const NotificationsPage = lazy(() => import('@/features/notifications/pages/NotificationsPage'));
const NotificationDetailPage = lazy(() => import('@/features/notifications/pages/NotificationDetailPage'));

export default function AppRoutes() {
  return <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="customers/*" element={<Navigate to="/customer-360" replace />} />
      <Route path="leads" element={<LeadsPage />} />
      <Route path="sales" element={<SalesPage />} />
      <Route path="sales/canvasser-follow-up" element={<CanvasserFollowUpPage />} />
      <Route path="customer-360" element={<Customer360Page />} />
      <Route path="customer-360/family-chit" element={<FamilyChitPage />} />
      <Route path="collections" element={<CollectionsPage />} />
      <Route path="service" element={<ServicePage />} />
      <Route path="renewals" element={<RenewalsPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="faqs" element={<FaqPage />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="notifications/:notificationId" element={<NotificationDetailPage />} />
    </Route>
    <Route path="/login" element={<Navigate to="/" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
