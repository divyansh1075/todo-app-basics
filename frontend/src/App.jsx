import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './App.css';

// Pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

// Backend API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  // Simple page navigation state: 'home' | 'signin' | 'signup'
  const [currentPage, setCurrentPage] = useState('home');

  // Logged-in user state (reads from localStorage if previously signed in)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setTodos([]);
  };

  // Todo items state
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [serverNotice, setServerNotice] = useState(null);

  // Light / Dark Mode state (persisted in localStorage)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Keep dark class synchronized on <html> root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Helper to attach JWT token if present
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todo`, {
        headers: getAuthHeaders(),
      });
      if (Array.isArray(response.data)) {
        setTodos(response.data);
      }
      setServerNotice(null);
    } catch (err) {
      console.warn('Backend notice:', err.response?.data?.message || err.message);
      if (!serverNotice) {
        setServerNotice(
          'Backend is offline or unreachable at ' + API_URL + '. Running in preview mode.'
        );
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const handleAddTodo = async (text, priority = 'Normal') => {
    try {
      const response = await axios.post(
        `${API_URL}/api/todo`,
        { text, priority },
        { headers: getAuthHeaders() }
      );

      if (response.data && response.data._id) {
        setTodos((prev) => [response.data, ...prev]);
      } else {
        await fetchTodos();
      }
    } catch (err) {
      const mockItem = {
        _id: String(Date.now()),
        text,
        priority,
        completed: false,
      };
      setTodos((prev) => [mockItem, ...prev]);
    }
  };

  // Toggle completed
  const handleToggleTodo = async (id) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      await axios.patch(
        `${API_URL}/api/todo/${id}`,
        {},
        { headers: getAuthHeaders() }
      );
    } catch (err) {
      console.warn('Could not sync toggle:', err.message);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      await axios.delete(`${API_URL}/api/todo/${id}`, {
        headers: getAuthHeaders(),
      });
    } catch (err) {
      console.warn('Could not sync delete:', err.message);
    }
  };

  // Edit todo
  const handleSaveEdit = async (newText) => {
    if (!editingTodo) return;
    const id = editingTodo._id;

    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, text: newText } : t))
    );
    setEditingTodo(null);

    try {
      await axios.put(
        `${API_URL}/api/todo/${id}`,
        { text: newText },
        { headers: getAuthHeaders() }
      );
    } catch (err) {
      console.warn('Could not sync edit:', err.message);
    }
  };

  // Stats calculation
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Filtered task list
  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return todo.text && todo.text.toLowerCase().includes(query);
      }

      return true;
    });
  }, [todos, filter, searchQuery]);

  return (
    <>
      {/* Page Preview Switcher (Floating at bottom-right for easy inspection) */}
      <nav aria-label="Page preview selector" className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-xl shadow-lg text-xs">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 px-1.5">
          Page:
        </span>
        <button
          onClick={() => setCurrentPage('home')}
          className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
            currentPage === 'home'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Home (Dashboard)
        </button>
        <button
          onClick={() => setCurrentPage('signin')}
          className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
            currentPage === 'signin'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setCurrentPage('signup')}
          className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
            currentPage === 'signup'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Sign Up
        </button>
      </nav>

      {/* Render Current Page */}
      {currentPage === 'signin' && (
        <Signin onNavigateToSignup={() => setCurrentPage('signup')} />
      )}

      {currentPage === 'signup' && (
        <Signup onNavigateToSignin={() => setCurrentPage('signin')} />
      )}

      {currentPage === 'home' && (
        <Home
          todos={todos}
          visibleTodos={visibleTodos}
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          serverNotice={serverNotice}
          setServerNotice={setServerNotice}
          currentUser={currentUser}
          onNavigateToSignin={() => setCurrentPage('signin')}
          onSignOut={handleSignOut}
          onAddTodo={handleAddTodo}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onSaveEdit={handleSaveEdit}
          counts={{ total: totalCount, active: activeCount, completed: completedCount }}
          progress={progress}
        />
      )}
    </>
  );
}
