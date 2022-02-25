import { Authority } from "src/app/shared/constants/authority";

export const navItemList = [

  // main
  {
    category: 'main',
    title: 'Dashboard',
    icon: 'home',
    directTo: '/',
    authorities: [ Authority.ADMIN, Authority.MODERATOR, Authority.ROOT ]
  },
  {
    category: 'main',
    title: 'Helpers',
    icon: 'privacy_tip',
    directTo: 'application_management/helpers',
    authorities: [ Authority.ADMIN, Authority.MODERATOR, Authority.ROOT ]
  },

  // users management
  {
    category: 'users_management',
    title: 'Users',
    icon: 'perm_identity',
    directTo: 'users_management/users',
    authorities: [ Authority.ADMIN, Authority.MODERATOR, Authority.ROOT ]
  },
  {
    category: 'users_management',
    title: 'Edit user',
    icon: 'edit_note',
    directTo: 'users_management/edit',
    authorities: [ Authority.ADMIN, Authority.ROOT ]
  },
  {
    category: 'users_management',
    title: 'Contact with user',
    icon: 'alternate_email',
    directTo: 'users_management/contact_with_user',
    authorities: [ Authority.ADMIN, Authority.MODERATOR, Authority.ROOT ]
  },

  // creators management
  {
    category: 'creator_management',
    title: 'Verification',
    icon: 'verified_user',
    directTo: 'creator_management/verification',
    authorities: [ Authority.ADMIN, Authority.ROOT ]
  },

  // events management
  {
    category: 'events_management',
    title: 'Search',
    icon: 'event',
    directTo: 'events_management/search',
    authorities: [ Authority.ADMIN, Authority.MODERATOR, Authority.ROOT ]
  },
  {
    category: 'events_management',
    title: 'Event configurator',
    icon: 'edit_calendar',
    directTo: 'events_management/search',
    authorities: [ Authority.ADMIN, Authority.ROOT ]
  },
  {
    category: 'events_management',
    title: 'Contact with creator',
    icon: 'alternate_email',
    directTo: 'events_management/contact_with_creator',
    authorities: [ Authority.ADMIN, Authority.MODERATOR, Authority.ROOT ]
  },

  // payments
  {
    category: 'payments_management',
    title: 'Client payments',
    icon: 'payments',
    directTo: 'payments_management/client',
    authorities: [ Authority.ADMIN, Authority.ROOT ]
  },
  {
    category: 'payments_management',
    title: 'Creator payments',
    icon: 'attach_money',
    directTo: 'payments_management/creator',
    authorities: [ Authority.ADMIN, Authority.ROOT ]
  },
  {
    category: 'payments_management',
    title: 'Event payments',
    icon: 'add_business',
    directTo: 'payments_management/event',
    authorities: [ Authority.ADMIN, Authority.ROOT ]
  },

  // employees management
  {
    category: 'employees_management',
    title: 'Employees',
    icon: 'business_center',
    directTo: 'employees/management',
    authorities: [ Authority.ROOT, Authority.ADMIN ]
  },
  {
    category: 'employees_management',
    title: 'Verification requests',
    icon: 'playlist_add_check',
    directTo: 'employees/management/verification_requests',
    authorities: [ Authority.ROOT ]
  },
  {
    category: 'employees_management',
    title: 'Authority',
    icon: 'admin_panel_settings',
    directTo: 'employees/management/authority',
    authorities: [ Authority.ROOT ]
  }

]