import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardScreen from './components/DashboardScreen';
import UploadScreen from './components/UploadScreen';
import SearchScreen from './components/SearchScreen';
import TasksScreen from './components/TasksScreen';
import HistoryScreen from './components/HistoryScreen';
import BankReportScreen from './components/BankReportScreen';
import SystemReportScreen from './components/SystemReportScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import UserManagementScreen from './components/UserManagementScreen';
import SettingsScreen from './components/SettingsScreen';
import { Page } from './types';
import { DataProvider, useData } from './context/DataContext';
import { Logo } from './components/Logo';
import Toast from './components/ui/Toast';

function MainApp() {
    const { currentUser, logout, lastSaved, currentPage, setCurrentPage, isSidebarOpen, setIsSidebarOpen, isLoading, toastMessage, hideToast, hasPermission } = useData();
    const [theme, setTheme] = useState<'light' | 'dark'>(() => 
        (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    );
     useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                     <Logo className="h-24 animate-pulse" />
                     <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">در حال بارگذاری داده‌ها...</p>
                </div>
            </div>
        );
    }
    
    if (!currentUser) {
        return <LoginScreen />;
    }

    const renderPage = () => {
        const pagePermissions: { [key in Page]?: string } = {
            dashboard: 'CAN_VIEW_DASHBOARD',
            upload: 'CAN_UPLOAD_FILES',
            search: 'CAN_VIEW_REPORTS',
            bankReport: 'CAN_VIEW_REPORTS',
            systemReport: 'CAN_VIEW_REPORTS',
            analytics: 'CAN_VIEW_ANALYTICS',
            tasks: 'CAN_MANAGE_TASKS',
            history: 'CAN_VIEW_HISTORY',
            userManagement: 'CAN_MANAGE_USERS',
            settings: 'CAN_MANAGE_BACKUPS',
        };

        const requiredPermission = pagePermissions[currentPage];
        if (requiredPermission && !hasPermission(requiredPermission)) {
            // Redirect to dashboard if user doesn't have permission
             useEffect(() => {
                setCurrentPage('dashboard');
            }, [currentPage, setCurrentPage]);
            return <DashboardScreen />;
        }
        
        switch (currentPage) {
            case 'dashboard':
                return <DashboardScreen />;
            case 'upload':
                return <UploadScreen />;
            case 'search':
                return <SearchScreen />;
            case 'bankReport':
                return <BankReportScreen />;
            case 'systemReport':
                return <SystemReportScreen />;
            case 'analytics':
                return <AnalyticsScreen />;
            case 'tasks':
                return <TasksScreen />;
            case 'history':
                return <HistoryScreen />;
            case 'userManagement':
                return <UserManagementScreen />;
            case 'settings':
                return <SettingsScreen />;
            default:
                setCurrentPage('dashboard');
                return <DashboardScreen />;
        }
    };
    
    return (
        <div className="flex h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans">
            {toastMessage && (
                <Toast
                    message={toastMessage.message}
                    type={toastMessage.type}
                    onClose={hideToast}
                />
            )}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    currentUser={currentUser}
                    onLogout={logout} 
                    lastSaved={lastSaved} 
                    theme={theme} 
                    onToggleTheme={handleThemeToggle}
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <DataProvider>
            <MainApp />
        </DataProvider>
    );
}

export default App;