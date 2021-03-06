import React from 'react';
import { 
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    PersonAdd as PersonAddIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    RecentActors as RecentActorsIcon,
    Store as StoreIcon,
    ShopTwo as ShopTwoIcon,
} from '@material-ui/icons';

const menuNav = [
    {
        title: 'Dashboard',
        icon: <DashboardIcon />,
        id: 1,
        link: '/dashboard',
    },
    {
        title: 'Stores',
        icon: <StoreIcon />,
        id: 2,
        link: '/dashboard/store',
    },
    {
        title: 'Add store',
        icon: <ShopTwoIcon />,
        id: 3,
        link: '/dashboard/store-signup',
    },
    {
        title: 'Clients',
        icon: <PeopleIcon />,
        id: 4,
        link: '/dashboard/client',
    },
    {
        title: 'Add client',
        icon: <PersonAddIcon />,
        id: 5,
        link: '/dashboard/client-signup',
    },
    {
        title: 'Subscriptions',
        icon: <RecentActorsIcon />,
        id: 6,
        link: '/dashboard/subscriptions',
    },
    {
        title: 'Account',
        icon: <PersonIcon />,
        id: 7,
        link: '/dashboard/account',
    },
    {
        title: 'Settings',
        icon: <SettingsIcon />,
        id: 8,
        link: '/dashboard/settings',
    },
];

export default menuNav;
