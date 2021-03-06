import { useAuth } from '@lib/auth';
import useSWR from 'swr';
import EmptyState from '@components/EmptyState';
import SiteTableSkeleton from '@components/SiteTableSkeleton';
import DashboardShell from '@components/DashboardShell';
import SiteTable from '@components/SiteTable';
import fetcher from '@utils/fetcher';
import SiteTableHeader from '@components/SiteTableHeader';

export default function Dashboard() {
  const { user } = useAuth();

  // fetch data on the client side ==> use SWR !!!
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
