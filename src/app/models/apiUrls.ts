const userUrl = 'http://localhost:3000/userservice';

export const urls = {
  user_details: `${userUrl}`,
  all_users: `${userUrl}users/all`,
  auth: {
    register_user: `${userUrl}register`,
    login_details: `${userUrl}login`,
  },
};
