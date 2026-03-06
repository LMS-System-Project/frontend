const API_BASE = "/api";

/**
 * Resolve a file URL to an absolute URL.
 * - If the URL is already absolute (http/https), return as-is.
 * - Otherwise, prepend the backend origin (NEXT_PUBLIC_API_URL or localhost fallback).
 */
export function resolveFileUrl(fileUrl: string): string {
  if (fileUrl.startsWith("http")) return fileUrl;
  const backendOrigin = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";
  return `${backendOrigin}${fileUrl}`;
}

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

async function apiFetchFormData(path: string, formData: FormData) {
  const token = getToken();
  const headers: any = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  // Do NOT set Content-Type — browser sets it with boundary for multipart/form-data
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail || "Request failed");
  }
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
        description?: string;
        instructions?: string;
        max_marks?: number;
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

    materials: {
      list: async (courseId: string) => {
        return apiFetch(`/instructor/courses/${courseId}/materials`);
      },
      upload: async (courseId: string, file: File, title: string, description?: string) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        if (description) formData.append("description", description);
        return apiFetchFormData(`/instructor/courses/${courseId}/materials`, formData);
      },
      delete: async (materialId: string) => {
        return apiFetch(`/instructor/materials/${materialId}`, {
          method: "DELETE",
        });
      },
    },
  },

  student: {
    dashboard: async () => {
      return apiFetch("/student/dashboard");
    },

    catalog: async () => {
      return apiFetch("/student/catalog");
    },

    enroll: async (courseId: string) => {
      return apiFetch(`/student/enroll/${courseId}`, {
        method: "POST",
      });
    },

    courses: {
      list: async () => {
        return apiFetch("/student/courses");
      },
      materials: async (courseId: string) => {
        return apiFetch(`/student/courses/${courseId}/materials`);
      },
    },

    assignments: {
      list: async () => {
        return apiFetch("/student/assignments");
      },
      submit: async (assignmentId: string, notes?: string) => {
        return apiFetch(`/student/assignments/${assignmentId}/submit`, {
          method: "POST",
          body: JSON.stringify({ notes }),
        });
      },
      submitWithFile: async (assignmentId: string, file?: File, notes?: string) => {
        const formData = new FormData();
        if (file) formData.append("file", file);
        if (notes) formData.append("notes", notes);
        return apiFetchFormData(`/student/assignments/${assignmentId}/submit`, formData);
      },
    },

    profile: {
      get: async () => {
        return apiFetch("/student/profile");
      },
      update: async (data: { full_name?: string; department?: string }) => {
        return apiFetch("/student/profile", {
          method: "PUT",
          body: JSON.stringify(data),
        });
      },
    },

    ai: {
      chat: async (message: string) => {
        return apiFetch("/student/ai/chat", {
          method: "POST",
          body: JSON.stringify({ message }),
        });
      },
    },

    career: {
      jobs: async (query?: string, location?: string) => {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (location) params.set("location", location);
        const qs = params.toString();
        return apiFetch(`/student/career/jobs${qs ? `?${qs}` : ""}`);
      },
      generateResume: async (data: { target_role?: string; include_skills?: boolean; include_courses?: boolean }) => {
        return apiFetch("/student/career/generate-resume", {
          method: "POST",
          body: JSON.stringify(data),
        });
      },
    },

    collab: {
      studyGroups: async () => apiFetch("/student/collab/study-groups"),
      studyPartners: async () => apiFetch("/student/collab/study-partners"),
    },
  },
};

