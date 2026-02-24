const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ── Token helpers ──────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("gradeflow_token");
}

function setToken(token: string) {
  localStorage.setItem("gradeflow_token", token);
}

function setUser(user: any) {
  localStorage.setItem("gradeflow_user", JSON.stringify(user));
}

function getUser(): any | null {
  if (typeof window === "undefined") return null;
  const u = localStorage.getItem("gradeflow_user");
  return u ? JSON.parse(u) : null;
}

function clearAuth() {
  localStorage.removeItem("gradeflow_token");
  localStorage.removeItem("gradeflow_user");
}

// ── Fetch wrapper ──────────────────────────────────────────────

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: any = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail || "Request failed");
  }

  // 204 No Content
  if (res.status === 204) return null;
  return res.json();
}

// ── API Methods ────────────────────────────────────────────────

export const api = {
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      setToken(data.access_token);
      setUser(data.user);
      return data;
    },
    register: async (info: {
      email: string;
      password: string;
      full_name: string;
      role?: string;
      department?: string;
    }) => {
      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(info),
      });
      setToken(data.access_token);
      setUser(data.user);
      return data;
    },
    me: async () => {
      return apiFetch("/auth/me");
    },
    getUser,
    getToken,
    setUser,
    logout: () => {
      clearAuth();
    },
  },

  instructor: {
    dashboard: async () => {
      return apiFetch("/instructor/dashboard");
    },

    courses: {
      list: async () => {
        return apiFetch("/instructor/courses");
      },
      get: async (id: string) => {
        return apiFetch(`/instructor/courses/${id}`);
      },
      create: async (course: {
        code: string;
        title: string;
        description?: string;
      }) => {
        return apiFetch("/instructor/courses", {
          method: "POST",
          body: JSON.stringify(course),
        });
      },
      update: async (
        id: string,
        course: { code?: string; title?: string; description?: string; status?: string }
      ) => {
        return apiFetch(`/instructor/courses/${id}`, {
          method: "PUT",
          body: JSON.stringify(course),
        });
      },
      delete: async (id: string) => {
        return apiFetch(`/instructor/courses/${id}`, {
          method: "DELETE",
        });
      },
    },

    analytics: async () => {
      return apiFetch("/instructor/analytics");
    },

    students: {
      list: async () => {
        return apiFetch("/instructor/students");
      },
    },

    assignments: {
      list: async () => {
        return apiFetch("/instructor/assignments");
      },
      create: async (assignment: {
        course_id: string;
        title: string;
        due_date?: string;
      }) => {
        return apiFetch("/instructor/assignments", {
          method: "POST",
          body: JSON.stringify(assignment),
        });
      },
    },

    submissions: {
      list: async () => {
        return apiFetch("/instructor/submissions");
      },
      grade: async (id: string, data: { grade: string; status?: string }) => {
        return apiFetch(`/instructor/submissions/${id}/grade`, {
          method: "PUT",
          body: JSON.stringify({ grade: data.grade, status: data.status || "graded" }),
        });
      },
    },

    profile: {
      get: async () => {
        return apiFetch("/instructor/profile");
      },
      update: async (data: { full_name?: string; department?: string }) => {
        return apiFetch("/instructor/profile", {
          method: "PUT",
          body: JSON.stringify(data),
        });
      },
    },
  },
};
