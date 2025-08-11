import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import EntityTable from '../../components/EntityTable';
import './admin.css';

const Admin = ({ entities = [], customRoutes = [] }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [currentSection, setCurrentSection] = useState('dashboard');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setUser(data.user);
                    } else {
                        navigate('/login');
                    }
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Auth check error:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/login');
        }
    };

    const handleSectionChange = (section) => {
        setCurrentSection(section);
        setMobileSidebarOpen(false); // Close mobile sidebar when section changes
    };

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    const renderEntitySection = (entity) => {
        // If entity has a custom component, render it
        if (entity.component) {
            const EntityComponent = entity.component;
            return <EntityComponent />;
        }


        console.log("Entity",entity);
        // Otherwise render with EntityTable
        return (
            <div className="content-section">
                <div className="content-header">
                    <h1>
                        <i className={`${entity.icon || 'fas fa-table'} me-2`}></i>
                        {entity.label}
                    </h1>
                    <p>{entity.description || `Manage your ${entity.label.toLowerCase()}`}</p>
                </div>
                <div className="row">
                    <div className="col-12">
                        <EntityTable 
                            data={entity.data || []}
                            config={entity.config || {}}
                            loading={entity.loading || false}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const renderCurrentSection = () => {
        // Check if current section is a custom entity
        const customEntity = entities.find(entity => entity.key === currentSection);
        if (customEntity) {
            return renderEntitySection(customEntity);
        }

        // Default sections
        switch (currentSection) {
            case 'dashboard':
                return (
                    <div className="content-section">
                        <div className="content-header">
                            <h1>
                                <i className="fas fa-tachometer-alt me-2"></i>
                                Dashboard
                            </h1>
                            <p>Welcome to your admin panel overview</p>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <p>Bienvenido al panel de administración. Aquí se implementarán todas las funcionalidades del CMS.</p>
                                        <div className="alert alert-info">
                                            <i className="fas fa-info-circle me-2"></i>
                                            Este es un componente temporal. Según las reglas del proyecto, aquí se implementará el admin completo con todas las entidades del sistema.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="content-section">
                        <div className="alert alert-danger">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            Sección no encontrada: {currentSection}
                        </div>
                    </div>
                );
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-app">
            {/* Top Navigation Bar */}
            <Navbar 
                user={user}
                onLogout={handleLogout}
                onToggleMobileSidebar={toggleMobileSidebar}
            />

            {/* Main Container */}
            <div className="admin-container">
                {/* Sidebar */}
                <Sidebar 
                    currentSection={currentSection}
                    onSectionChange={handleSectionChange}
                    mobileSidebarOpen={mobileSidebarOpen}
                    userPermissions={user?.permissions || []}
                    entities={entities}
                />

                {/* Main Content */}
                <main className="admin-content">
                    {renderCurrentSection()}
                </main>
            </div>

            {/* Mobile sidebar overlay */}
            {mobileSidebarOpen && (
                <div 
                    className="mobile-sidebar-overlay"
                    onClick={() => setMobileSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Admin;