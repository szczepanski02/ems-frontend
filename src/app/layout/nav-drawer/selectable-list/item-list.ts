import { authorities } from "src/app/shared/constants/authorities";

export const navItemList = [

  // main
  {
    category: 'main',
    title: 'Dashboard',
    icon: 'home',
    directTo: '/',
    authorities: [ authorities.ADMIN, authorities.MODERATOR, authorities.ROOT ]
  },
  {
    category: 'main',
    title: 'Helpers',
    icon: 'privacy_tip',
    directTo: 'application_management/helpers',
    authorities: [ authorities.ADMIN, authorities.MODERATOR, authorities.ROOT ]
  },

  // users management
  {
    category: 'users_management',
    title: 'Users',
    icon: 'perm_identity',
    directTo: 'users_management/users',
    authorities: [ authorities.ADMIN, authorities.MODERATOR, authorities.ROOT ]
  },
  {
    category: 'users_management',
    title: 'Edit user',
    icon: 'edit_note',
    directTo: 'users_management/edit',
    authorities: [ authorities.ADMIN, authorities.ROOT ]
  },
  {
    category: 'users_management',
    title: 'Contact with user',
    icon: 'alternate_email',
    directTo: 'users_management/contact_with_user',
    authorities: [ authorities.ADMIN, authorities.MODERATOR, authorities.ROOT ]
  },

  // creators management
  {
    category: 'creator_management',
    title: 'Verification',
    icon: 'verified_user',
    directTo: 'creator_management/verification',
    authorities: [ authorities.ADMIN, authorities.ROOT ]
  },

  // events management
  {
    category: 'events_management',
    title: 'Search',
    icon: 'event',
    directTo: 'events_management/search',
    authorities: [ authorities.ADMIN, authorities.MODERATOR, authorities.ROOT ]
  },
  {
    category: 'events_management',
    title: 'Event configurator',
    icon: 'edit_calendar',
    directTo: 'events_management/search',
    authorities: [ authorities.ADMIN, authorities.ROOT ]
  },
  {
    category: 'events_management',
    title: 'Contact with creator',
    icon: 'alternate_email',
    directTo: 'events_management/contact_with_creator',
    authorities: [ authorities.ADMIN, authorities.MODERATOR, authorities.ROOT ]
  },

  // payments
  {
    category: 'payments_management',
    title: 'Client payments',
    icon: 'payments',
    directTo: 'payments_management/client',
    authorities: [ authorities.ADMIN, authorities.ROOT ]
  },
  {
    category: 'payments_management',
    title: 'Creator payments',
    icon: 'attach_money',
    directTo: 'payments_management/creator',
    authorities: [ authorities.ADMIN, authorities.ROOT ]
  },
  {
    category: 'payments_management',
    title: 'Event payments',
    icon: 'add_business',
    directTo: 'payments_management/event',
    authorities: [ authorities.ADMIN, authorities.ROOT ]
  },

  // employees management
  {
    category: 'employees_management',
    title: 'Employees',
    icon: 'business_center',
    directTo: 'employees_management/list',
    authorities: [ authorities.ROOT ]
  },
  {
    category: 'employees_management',
    title: 'Verification requests',
    icon: 'playlist_add_check',
    directTo: 'employees_management/verification_requests',
    authorities: [ authorities.ROOT ]
  },
  {
    category: 'employees_management',
    title: 'Authorities',
    icon: 'admin_panel_settings',
    directTo: 'employees_management/authorities',
    authorities: [ authorities.ROOT ]
  }

]