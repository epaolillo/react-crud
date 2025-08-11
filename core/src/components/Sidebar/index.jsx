import { useState } from 'react';
import './sidebar.css';

const Sidebar = ({ 
    currentSection = 'dashboard', 
    onSectionChange, 
    mobileSidebarOpen = false,
    userPermissions = [],
    entities = [] // New prop for custom entities
}) => {
    
    // Helper function to check permissions (simplified for now)
    const hasPermission = (permission) => {
        // For now, return true for all permissions
        // This will be implemented properly with the permission system
        return true;
    };

    const handleSectionClick = (section) => {
        if (onSectionChange) {
            onSectionChange(section);
        }
    };


    // Merge default items with custom entities
    const generateEntityItems = () => {
        if (!entities || entities.length === 0) return [];

        // Group entities by their group property or create a default "Custom" group
        const entityGroups = entities.reduce((groups, entity) => {
            const groupName = entity.group || 'Custom';
            if (!groups[groupName]) {
                groups[groupName] = {
                    group: groupName,
                    items: []
                };
            }
            groups[groupName].items.push({
                section: entity.key,
                icon: entity.icon || 'fas fa-table',
                label: entity.label,
                permission: entity.permission
            });
            return groups;
        }, {});

        return Object.values(entityGroups);
    };

    const sidebarItems = [...generateEntityItems()];

    const renderSidebarItem = (item) => (
        <a
            key={item.section}
            href="#"
            className={`sidebar-item ${currentSection === item.section ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                handleSectionClick(item.section);
            }}
        >
            <i className={item.icon}></i>
            <span>{item.label}</span>
        </a>
    );

    const renderSidebarGroup = (group) => {
        // Check if group has permission requirement
        if (group.permission && !hasPermission(group.permission)) {
            return null;
        }

        return (
            <div key={group.group} className="sidebar-section">
                {group.group && <h6 className="sidebar-header">{group.group}</h6>}
                {group.items.map(item => {
                    // Check individual item permissions
                    if (item.permission && !hasPermission(item.permission)) {
                        return null;
                    }
                    return renderSidebarItem(item);
                })}
            </div>
        );
    };

    return (
        <aside className={`admin-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
            {sidebarItems.map(item => {
                if (item.standalone) {
                    return (
                        <div key={item.section} className="sidebar-section">
                            {renderSidebarItem(item)}
                        </div>
                    );
                }
                return renderSidebarGroup(item);
            })}
        </aside>
    );
};

export default Sidebar;