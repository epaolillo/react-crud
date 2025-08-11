import React, { useState, useRef, useEffect } from 'react';
import { useAffiliate } from '../../contexts/AffiliateContext';
//import logo from '../../assets/logo.svg';
import './navbar.css';

const Navbar = ({ 
    user, 
    onLogout, 
    onToggleMobileSidebar,
    showMobileToggle = true 
}) => {
    const [affiliateDropdownOpen, setAffiliateDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const affiliateDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

    const { 
        currentAffiliate, 
        userAffiliates, 
        switchAffiliate, 
        getCurrentAffiliateName,
        isAffiliateSelected,
        loading: affiliatesLoading 
    } = useAffiliate();

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (affiliateDropdownRef.current && !affiliateDropdownRef.current.contains(event.target)) {
                setAffiliateDropdownOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAffiliateChange = async (affiliateId) => {
        const success = await switchAffiliate(affiliateId);
        if (success) {
            setAffiliateDropdownOpen(false); // Close dropdown after selection
            console.log('Affiliate switched successfully');
        } else {
            console.error('Failed to switch affiliate');
        }
    };

    const toggleAffiliateDropdown = () => {
        setAffiliateDropdownOpen(!affiliateDropdownOpen);
        setUserDropdownOpen(false); // Close other dropdown
    };

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
        setAffiliateDropdownOpen(false); // Close other dropdown
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                {showMobileToggle && (
                    <button 
                        className="btn btn-link d-lg-none text-white me-2"
                        onClick={onToggleMobileSidebar}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                )}
                
                <span className="navbar-brand mb-0">
                    { currentAffiliate?.logo && <img src={currentAffiliate.logo} alt="Logo" className="logo-img" /> }
                    Immergo Producer
                </span>
                
                <div className="navbar-nav ms-auto">
                    {/* Affiliate Selector */}
                    {affiliatesLoading ? (
                        <div className="nav-item me-3">
                            <span className="nav-link">
                                <i className="fas fa-spinner fa-spin me-1"></i>
                                Loading...
                            </span>
                        </div>
                    ) : userAffiliates.length > 0 ? (
                        <div className="nav-item dropdown me-3" ref={affiliateDropdownRef}>
                            <button 
                                className="nav-link dropdown-toggle btn btn-link"
                                onClick={toggleAffiliateDropdown}
                                style={{ border: 'none', background: 'none', color: 'inherit' }}
                            >
                                <i className="fas fa-globe me-1"></i>
                                {getCurrentAffiliateName()}
                            </button>
                            {affiliateDropdownOpen && (
                                <ul className="dropdown-menu dropdown-menu-end show" style={{ display: 'block' }}>
                                    {userAffiliates.map(affiliate => (
                                        <li key={affiliate.id}>
                                            <button 
                                                className={`dropdown-item ${currentAffiliate?.id === affiliate.id ? 'active' : ''}`}
                                                onClick={() => handleAffiliateChange(affiliate.id)}
                                            >
                                                <i className="fas fa-building me-2"></i>
                                                {affiliate.name}
                                                {currentAffiliate?.id === affiliate.id && (
                                                    <i className="fas fa-check ms-2"></i>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className="dropdown-item" href="/admin/affiliates">
                                            <i className="fas fa-cog me-2"></i>
                                            Manage Affiliates
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className="nav-item me-3">
                            <span className="nav-link text-warning">
                                <i className="fas fa-exclamation-triangle me-1"></i>
                                No Affiliates Available
                            </span>
                        </div>
                    )}

                    {/* Visit Site Link */}
                    <a className="nav-link me-3" href="/" target="_blank">
                        <i className="fas fa-external-link-alt me-1"></i>
                        Visit Site
                    </a>

                    {/* User Dropdown */}
                    <div className="nav-item dropdown" ref={userDropdownRef}>
                        <button 
                            className="nav-link dropdown-toggle btn btn-link"
                            onClick={toggleUserDropdown}
                            style={{ border: 'none', background: 'none', color: 'inherit' }}
                        >
                            <i className="fas fa-user-circle me-1"></i>
                            {user?.name || user?.email}
                        </button>
                        {userDropdownOpen && (
                            <ul className="dropdown-menu dropdown-menu-end show" style={{ display: 'block' }}>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-user me-2"></i>
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-cog me-2"></i>
                                        Settings
                                    </a>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item" onClick={onLogout}>
                                        <i className="fas fa-sign-out-alt me-2"></i>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 