import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './sideBar.css';

const SideBar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const role = Cookies.get('role');
    const [showAnalytics, setShowAnalytics] = useState(false);

    const handleSignOut = () => {
        Cookies.remove('token');
        Cookies.remove('role');
        navigate('/');
    };

    return (
        <>
            <div className={`sidebar ${!isExpanded ? 'collapsed' : ''}`}>
                <div className="d-flex flex-column h-100">
                    {/* Header */}
                    <div className="sidebar-header px-3 py-3 d-flex justify-content-between align-items-center">
                        <Link to="/" className="d-flex align-items-center text-decoration-none">
                            <img src={`${process.env.PUBLIC_URL}/logo-avocarbon-1.png`} 
                                 alt="Logo" 
                                 className={`logo ${!isExpanded ? 'small-logo' : ''}`} />
                        </Link>

                    </div>

                    {/* Navigation */}
                    <div className="sidebar-body px-3 py-2">
                        <ul className="nav flex-column">
                            {role === 'admin' && (
                                <>
                                    <li className="nav-item mb-2">
                                        <Link to="/admin/dashboard" 
                                              className={`nav-link rounded-3 ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}>
                                            <i className="bi bi-speedometer2 me-3"></i>
                                            {isExpanded && <span>Dashboard</span>}
                                        </Link>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <Link to="/admin/user" 
                                              className={`nav-link rounded-3 ${location.pathname === '/admin/user' ? 'active' : ''}`}>
                                            <i className="bi bi-people me-3"></i>
                                            {isExpanded && <span>Users</span>}
                                        </Link>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <Link to="/admin/cause-arret" 
                                              className={`nav-link rounded-3 ${location.pathname === '/admin/cause-arret' ? 'active' : ''}`}>
                                            <i className="bi bi-exclamation-triangle me-3"></i>
                                            {isExpanded && <span>Cause d'arrêt</span>}
                                        </Link>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <Link to="/admin/track" 
                                              className={`nav-link rounded-3 ${location.pathname === '/admin/track' ? 'active' : ''}`}>
                                            <i className="bi bi-file-earmark-text-fill me-3"></i>
                                            {isExpanded && <span>Tracks</span>}
                                        </Link>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <Link to="/admin/AddLigne" 
                                              className={`nav-link rounded-3 ${location.pathname === '/admin/AddLigne' ? 'active' : ''}`}>
                                            <i className="bi bi-diagram-3 me-3"></i>
                                            {isExpanded && <span>Lignes</span>}
                                        </Link>
                                    </li>
                                </>
                            )}
                            {role === 'user' && (
                                <>
                                    <li className="nav-item mb-2">
                                        <Link to="/user/cause-arret" 
                                              className={`nav-link rounded-3 ${location.pathname === '/user/cause-arret' ? 'active' : ''}`}>
                                            <i className="bi bi-exclamation-triangle me-3"></i>
                                            {isExpanded && <span>Cause d'arrêt</span>}
                                        </Link>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <Link to="/user/track" 
                                              className={`nav-link rounded-3 ${location.pathname === '/user/track' ? 'active' : ''}`}>
                                            <i className="bi bi-file-earmark-text-fill me-3"></i>
                                            {isExpanded && <span>Tracks</span>}
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Profile Section */}
                    <div className="sidebar-footer mt-auto border-top p-3">
                        <div className="dropdown">
                            <button className="btn btn-link w-100 text-start text-decoration-none px-2 dropdown-toggle align-items-center d-flex" 
                                    data-bs-toggle="dropdown">
                                <img src={`${process.env.PUBLIC_URL}/portfilio.png`} 
                                     alt="Profile" 
                                     className="rounded-circle me-2" 
                                     width="32" 
                                     height="32" />
                                {isExpanded && <span className="text-dark">Profile</span>}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow">
                                <li><Link className="dropdown-item" to="#"><i className="bi bi-gear me-2"></i>Settings</Link></li>
                                <li><Link className="dropdown-item" to="#"><i className="bi bi-person me-2"></i>Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item text-danger" onClick={handleSignOut}>
                                    <i className="bi bi-box-arrow-right me-2"></i>Sign out
                                </button></li>

                               

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;