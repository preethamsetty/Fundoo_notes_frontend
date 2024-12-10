jest.mock('axios', () => ({
    post: jest.fn().mockResolvedValue({ data: { message: 'Registration successful!' } }),
  }));
  