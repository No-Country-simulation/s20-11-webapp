/*{
  "email": "user@example.com",
  "password": "password123"
}
  */

export const authService = {
  login: async (data) => {
    try {
     return api.post(API_ENDPOINTS.AUTH.LOGIN, data);
    } catch (error) {
      console.error(error);
    }
  },
};
