import React, { lazy } from 'react';
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

const DashboardPage = lazy(() =>
    import('./pages/dashboard/dashboard.container')
);
const StorePage = lazy(() => import('./pages/store/store.container'));
const StoreDetailPage = lazy(() => import('./pages/store-detail/store-detail.container'));
const StoreSignUpPage = lazy(() =>
    import('./pages/store-sign-up/store-sign-up.container')
);
const ClientSignUpPage = lazy(() =>
    import('./pages/client-sign-up/client-sign-up.container')
);
const ClientPage = lazy(() => import('./pages/client/client.container'));
const AccountPage = lazy(() => import('./pages/account/account.component'));
const SettingsPage = lazy(() =>
    import('./pages/settings/settings.component')
);
const SubscriptionPage = lazy(() =>
    import('./pages/subscription/subscription.component')
);

const routes = [
    {
        title: 'Dashboard',
        icon: <DashboardIcon />,
        id: 1,
        link: '/dashboard',
        main: <DashboardPage />
    },
    {
        title: 'Stores',
        icon: <StoreIcon />,
        id: 2,
        link: '/dashboard/store',
        main: <StorePage />
    },
    {
        title: 'Stores',
        icon: <StoreIcon />,
        id: 3,
        link: '/dashboard/store/search/:keyword',
        main: <StorePage />
    },
    {
        title: 'Stores',
        icon: <StoreIcon />,
        id: 4,
        link: '/dashboard/store/:storeId',
        main: <StoreDetailPage />
    },
    {
        title: 'Add store',
        icon: <ShopTwoIcon />,
        id: 5,
        link: '/dashboard/store-signup',
        main: <StoreSignUpPage />
    },
    {
        title: 'Clients',
        icon: <PeopleIcon />,
        id: 6,
        link: '/dashboard/client',
        main: <ClientPage />
    },
    {
        title: 'Add client',
        icon: <PersonAddIcon />,
        id: 7,
        link: '/dashboard/client-signup',
        main: <ClientSignUpPage />
    },
    {
        title: 'Subscriptions',
        icon: <RecentActorsIcon />,
        id: 8,
        link: '/dashboard/subscriptions',
        main: <SubscriptionPage />
    },
    {
        title: 'Account',
        icon: <PersonIcon />,
        id: 9,
        link: '/dashboard/account',
        main: <AccountPage />
    },
    {
        title: 'Settings',
        icon: <SettingsIcon />,
        id: 10,
        link: '/dashboard/settings',
        main: <SettingsPage />
    },
];

export default routes;