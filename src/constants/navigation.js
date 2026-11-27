import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
export const navigationItems = [
  { label: 'Overview', path: '/', icon: DashboardRoundedIcon },
  { label: 'Lead & Enquiry', path: '/leads', icon: PersonSearchRoundedIcon },
  { label: 'Sales & Follow-up', path: '/sales', icon: InsightsRoundedIcon },
  { label: 'Customer 360° View', path: '/customer-360', icon: GroupsRoundedIcon },
  { label: 'Collection & Arrears', path: '/collections', icon: PaymentsRoundedIcon },
  { label: 'Service & Complaints', path: '/service', icon: SupportAgentRoundedIcon },
  { label: 'Renewal & Retention', path: '/renewals', icon: AutorenewRoundedIcon },
];
