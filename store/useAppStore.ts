import { create } from "zustand";

type Challenge = {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  icon: string;
  color: string;
  completed: boolean;
};

type User = {
  name: string;
  email: string;
};

type AppState = {
  // Auth state
  isAuthenticated: boolean;
  user: User | null;

  // Challenge state
  challenges: Challenge[];
  totalMinutes: number;
  totalCalories: number;
  stepsTaken: number;

  // Auth actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Challenge actions
  markComplete: (id: string) => void;
  updateProgress: (id: string, current: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
  // Auth initial state
  isAuthenticated: false,
  user: null,

  // Challenges initial state
  challenges: [
    {
      id: "1",
      title: "Walk 5000 Steps",
      description: "Complete 5000 steps today",
      target: 5000,
      current: 3200,
      unit: "steps",
      icon: "walking",
      color: "#8E24AA",
      completed: false,
    },
    {
      id: "2",
      title: "Run 1 Mile",
      description: "Complete a 1 mile run",
      target: 1.0,
      current: 0.6,
      unit: "miles",
      icon: "running",
      color: "#1E88E5",
      completed: false,
    },
    {
      id: "3",
      title: "Exercise 60 Minutes",
      description: "Work out for 60 minutes",
      target: 60,
      current: 45,
      unit: "minutes",
      icon: "stopwatch",
      color: "#FB8C00",
      completed: false,
    },
    {
      id: "4",
      title: "Burn 500 Calories",
      description: "Burn 500 calories today",
      target: 500,
      current: 320,
      unit: "calories",
      icon: "fire",
      color: "#E53935",
      completed: false,
    },
    {
      id: "5",
      title: "Drink 2L Water",
      description: "Stay hydrated with 2L of water",
      target: 2.0,
      current: 2.0,
      unit: "liters",
      icon: "tint",
      color: "#43A047",
      completed: true,
    },
  ],

  // Aggregate stats for home screen
  totalMinutes: 45,
  totalCalories: 320,
  stepsTaken: 3200,

  // Auth actions
  login: async (email, password) => {
    // TODO: Replace with actual API call
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation - accept any email/password for now
    if (email && password) {
      set({
        isAuthenticated: true,
        user: { name: email.split('@')[0], email }
      });
      return true;
    }
    return false;
  },

  signup: async (name, email, password) => {
    // TODO: Replace with actual API call
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation - accept any input for now
    if (name && email && password) {
      set({
        isAuthenticated: true,
        user: { name, email }
      });
      return true;
    }
    return false;
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null
    });
  },

  // Challenge actions
  markComplete: (id) =>
    set((state) => ({
      challenges: state.challenges.map((c) =>
        c.id === id ? { ...c, completed: true, current: c.target } : c
      ),
    })),

  updateProgress: (id, current) =>
    set((state) => ({
      challenges: state.challenges.map((c) => {
        if (c.id === id) {
          const completed = current >= c.target;
          return { ...c, current, completed };
        }
        return c;
      }),
    })),
}));