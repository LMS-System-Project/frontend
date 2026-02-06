export const api = {
  auth: {
    login: async (credentials: any) => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ user: { id: 1, name: "John Doe", role: "student" }, token: "fake-jwt-token" });
        }, 1000);
      });
    },
    register: async (data: any) => {
       return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ user: { id: 1, name: "John Doe", role: "student" }, token: "fake-jwt-token" });
        }, 1000);
      });
    }
  },
  courses: {
    list: async () => {
      return Promise.resolve([
        { id: 101, title: 'Advanced Calculus', instructor: 'Dr. Smith', students: 45, progress: 75 },
        { id: 102, title: 'Physics II', instructor: 'Prof. Johnson', students: 32, progress: 40 },
        { id: 103, title: 'Computer Science 101', instructor: 'Ms. Davis', students: 120, progress: 90 },
      ]);
    },
    get: async (id: number) => {
        return Promise.resolve({ id, title: 'Advanced Calculus', description: 'Deep dive into limits and derivatives' });
    }
  }
};
