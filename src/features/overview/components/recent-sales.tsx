import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { recentApplicationsData } from '@/constants/data';

const statusColors: Record<string, string> = {
  'visa-ready': 'bg-green-500/10 text-green-700 dark:text-green-400',
  'ops-processing': 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  'qc-pending': 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  'payment-pending': 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
  'completed': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  'submitted': 'bg-purple-500/10 text-purple-700 dark:text-purple-400'
};

const formatStatus = (status: string): string => {
  return status
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function RecentSales() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>
          Latest visa applications processed this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {recentApplicationsData.map((application) => (
            <div key={application.id} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={application.image} alt='Avatar' />
                <AvatarFallback>{application.initials}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1 flex-1'>
                <div className='flex items-center gap-2'>
                  <p className='text-sm leading-none font-medium'>{application.partnerName}</p>
                  <Badge 
                    variant='outline' 
                    className={statusColors[application.status] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400'}
                  >
                    {formatStatus(application.status)}
                  </Badge>
                </div>
                <p className='text-muted-foreground text-xs'>{application.applicationNumber}</p>
              </div>
              <div className='ml-auto text-right'>
                <div className='font-medium text-sm'>{application.amount}</div>
                <div className='text-muted-foreground text-xs'>Fee</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
