import { useAuth } from '@lib/auth';
import useSWR from 'swr';
import EmptyState from '@components/EmptyState';
import SiteTableSkeleton from '@components/SiteTableSkeleton';
import DashboardShell from '@components/DashboardShell';
import SiteTable from '@components/SiteTable';
import fetcher from '@utils/fetcher';

export default function Dashboard() {
  const auth = useAuth();

  // fetch data on the client side ==> use SWR !!!
  const { data } = useSWR('/api/sites', fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
