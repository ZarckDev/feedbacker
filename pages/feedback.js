import { useAuth } from '@lib/auth';
import useSWR from 'swr';
import EmptyState from '@components/EmptyState';
import FeedbackTableHeader from '@components/FeedbackTableHeader';
import SiteTableSkeleton from '@components/SiteTableSkeleton';
import DashboardShell from '@components/DashboardShell';
import FeedbackTable from '@components/FeedbackTable';
import fetcher from '@utils/fetcher';

export default function MyFeedback() {
  const { user } = useAuth();

  // fetch data on the client side ==> use SWR !!!
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
