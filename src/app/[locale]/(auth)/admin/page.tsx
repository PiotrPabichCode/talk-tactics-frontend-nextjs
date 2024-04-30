'use client';

import withAuthRoles from '@/router/withAuthRoles';

function AdminPage() {
  return <div>This is only admin page</div>;
}

export default withAuthRoles(AdminPage, ['ADMIN'], 'all');
