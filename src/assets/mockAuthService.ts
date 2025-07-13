class MockAuthService {
  constructor() {}

  async createUser({ email, name }: any) {
    await new Promise((resolve) =>
      setTimeout(() => resolve({ email, name }), 1000)
    );

    return;
  }

  async login({ email }: any) {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ email, name: "Mock User" }), 1000)
    ); // Mocking user data
  }

  async getCurrentUser() {
    return new Promise((_resolve,reject) =>
      setTimeout(
        () =>
          reject({
            email: "mockeduser@example.com",
            name: "Mock User",
          }),
        1000
      )
    );
  }

  async logout() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

const mockAuthService = new MockAuthService();
export default mockAuthService;
