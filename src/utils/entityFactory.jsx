/**
 * Entity Factory - Automatic Entity Creation with EntityService
 * Creates fully functional entities with automatic data fetching and EntityTable rendering
 */
import React, { useState, useEffect, useRef } from 'react';
import EntityService from '../services/EntityService.js';
import EntityTable from '../components/EntityTable';
import { useAffiliate } from '../contexts/AffiliateContext';

/**
 * Creates a complete entity with automatic data fetching and EntityTable rendering
 * @param {object} config - Entity configuration
 * @returns {object} Complete entity configuration with React hooks
 */
export function createAutoEntity(config) {
    const {
        // Required
        key,
        label,
        
        // Service configuration
        entityName = key,
        baseUrl,
        validation,
        defaultData,
        filters,
        options,
        formatForDisplay,

        // Config de editores
        editorConfig = {},
        editorType = 'page',
        
        // UI configuration
        icon,
        group,
        description,
        columns = [],
        tableConfig = {},
        
        // Create button configuration
        createButton = {},
        
        // Optional overrides
        customHandlers = {},
        customComponent = null
    } = config;

    // Extract create button configuration with defaults
    const {
        show = true, // Show by default
        text = `Add New ${label}`,
        icon: buttonIcon = 'fas fa-plus',
        className = 'btn btn-primary',
        disabled = false,
        tooltip = `Create a new ${label.toLowerCase()}`
    } = createButton;

    // Create EntityService instance
    const service = EntityService.createForEntity({
        entityName,
        baseUrl: baseUrl || `/api/admin/${entityName}`,
        validation,
        defaultData,
        filters,
        options,
        formatForDisplay
    });

    // Return entity object directly with hook-based data management
    const EntityComponent = () => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(false);
        const [pagination, setPagination] = useState(null);
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(20);
        const [currentSearch, setCurrentSearch] = useState('');
        const [currentFilters, setCurrentFilters] = useState({});
        const { currentAffiliate, isAffiliateSelected } = useAffiliate();
        const tableRef = useRef();

        // Load data function with pagination support
        const loadData = async (params = {}) => {
            // Don't load data if no affiliate is selected
            if (!isAffiliateSelected()) {
                console.log(`No affiliate selected, skipping ${entityName} data load`);
                setData([]);
                setPagination(null);
                return;
            }

            setLoading(true);
            try {
                // Merge default pagination params with provided params
                const requestParams = {
                    page: currentPage,
                    limit: pageSize,
                    search: currentSearch,
                    ...currentFilters,
                    ...params
                };

                console.log(`Loading ${entityName} data from ${service.baseUrl} for affiliate ${currentAffiliate?.id}...`, requestParams);
                const response = await service.get(requestParams);
                console.log(`${entityName} response:`, response);
                
                if (response && response.success) {
                    setData(response.data || []);
                    setPagination(response.pagination || null);
                    
                    // Update state if pagination params were provided
                    if (params.page !== undefined) setCurrentPage(params.page);
                    if (params.limit !== undefined) setPageSize(params.limit);
                    if (params.search !== undefined) setCurrentSearch(params.search);
                    if (params.filters !== undefined) setCurrentFilters(params.filters);
                } else {
                    console.error(`Failed to load ${entityName}:`, response?.error || 'Unknown error');
                    setData([]);
                    setPagination(null);
                }
            } catch (error) {
                console.error(`Error loading ${entityName}:`, error);
                setData([]);
                setPagination(null);
            } finally {
                setLoading(false);
            }
        };

        // Load data on mount and when affiliate changes
        useEffect(() => {
            if (isAffiliateSelected()) {
                loadData();
            }
        }, [currentAffiliate?.id]);

        // Listen for affiliate changes
        useEffect(() => {
            const handleAffiliateChange = () => {
                if (isAffiliateSelected()) {
                    loadData();
                }
            };

            window.addEventListener('affiliateChanged', handleAffiliateChange);
            return () => window.removeEventListener('affiliateChanged', handleAffiliateChange);
        }, []);

        // Pagination handlers
        const handlePageChange = (page) => {
            loadData({ page });
        };

        const handlePageSizeChange = (newLimit) => {
            loadData({ page: 1, limit: newLimit });
        };

        const handleSearch = (searchTerm, filters) => {
            loadData({ page: 1, search: searchTerm, filters });
        };

        // CRUD handlers
        const handleCreate = async (entityData) => {
            try {
                const response = await service.create(entityData);
                if (response && response.success) {
                    setData(prev => [...prev, response.data]);
                    return response.data;
                } else {
                    throw new Error(response?.error || 'Create failed');
                }
            } catch (error) {
                console.error(`Error creating ${entityName}:`, error);
                throw error;
            }
        };

        const handleUpdate = async (id, entityData) => {
            try {
                const response = await service.update(id, entityData);
                if (response && response.success) {
                    setData(prev => prev.map(item => 
                        item.id === id ? response.data : item
                    ));
                    return response.data;
                } else {
                    throw new Error(response?.error || 'Update failed');
                }
            } catch (error) {
                console.error(`Error updating ${entityName}:`, error);
                throw error;
            }
        };

        const handleDelete = async (id) => {
            try {
                const response = await service.delete(id);
                if (response && response.success) {
                    setData(prev => prev.filter(item => item.id !== id));
                    return true;
                } else {
                    throw new Error(response?.error || 'Delete failed');
                }
            } catch (error) {
                console.error(`Error deleting ${entityName}:`, error);
                throw error;
            }
        };

        const handleGetById = async (id) => {
            try {
                const response = await service.getById(id);
                if (response && response.success) {
                    return response.data;
                } else {
                    throw new Error(response?.error || 'Get by ID failed');
                }
            } catch (error) {
                console.error(`Error getting ${entityName} by ID:`, error);
                throw error;
            }
        };

        // Generic action handlers
        const actionHandlers = {
            create: customHandlers.create || (() => {
                // Check if we have editor configuration
                if (editorConfig && editorConfig.fields) {
                    // Use the configured editor instead of prompt
                    return null; // Let EntityTable handle this with its editor
                } else {
                    // Fallback to prompt for simple entities
                    const defaultData = service.getDefaultEntityData();
                    const name = prompt(`Enter ${entityName} name:`);
                    if (name) {
                        return handleCreate({ ...defaultData, name });
                    }
                }
            }),
            edit: customHandlers.edit || ((type, id) => {
                // Check if we have editor configuration
                if (editorConfig && editorConfig.fields) {
                    // Use the configured editor instead of prompt
                    return null; // Let EntityTable handle this with its editor
                } else {
                    // Fallback to prompt for simple entities
                    const item = data.find(d => d.id === id);
                    if (item) {
                        const name = prompt(`Edit ${entityName} name:`, item.name);
                        if (name && name !== item.name) {
                            return handleUpdate(id, { ...item, name });
                        }
                    }
                }
            }),
            delete: customHandlers.delete || ((type, id) => {
                const item = data.find(d => d.id === id);
                if (item && window.confirm(`¿Estás seguro de eliminar "${item.name || `${entityName} ${id}`}"?`)) {
                    return handleDelete(id);
                }
            }),
            // Search and filtering
            search: customHandlers.search || ((searchTerm, filters) => {
                loadData({ search: searchTerm, ...filters });
            }),
            // Custom handlers
            ...customHandlers
        };

        // Handle create new action
        const handleCreateNew = () => {
            // Use the EntityTable's handleCreateNew method through ref
            if (tableRef.current && tableRef.current.handleCreateNew) {
                tableRef.current.handleCreateNew();
            }
        };

        // Handle save entity
        const handleSaveEntity = async (entityData, id) => {
            try {
                let response;
                if (id) {
                    response = await handleUpdate(id, entityData);
                } else {
                    response = await handleCreate(entityData);
                }
                
                if (response) {
                    // Refresh data after successful save
                    loadData();
                }
                return response;
            } catch (error) {
                console.error(`Error saving ${entityName}:`, error);
                throw error;
            }
        };

        // Handle cancel edit
        const handleCancelEdit = () => {
            // This will be handled by EntityTable internally
        };

        // Entity table configuration
        const entityTableConfig = {
            entityType: entityName,
            columns: columns.length > 0 ? columns : getDefaultColumns(data[0]),
            enableSearch: true, // Enable search by default
            filters: [], // No default filters, only search
            actionHandlers,
            onSearch: handleSearch,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            onLoadEntity: handleGetById,
            onSaveEntity: handleSaveEntity,
            onCancelEdit: handleCancelEdit,
            // Add editor configuration
            editorType: editorType,
            editorConfig: editorConfig,
            ...tableConfig
        };

        return (
            <div className="content-section">
                <div className="content-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1>
                                <i className={`${icon || 'fas fa-table'} me-2`}></i>
                                {label}
                            </h1>
                            {description && <p className="text-muted mb-0">{description}</p>}
                        </div>
                        {show && (
                            <div>
                                <button 
                                    className={className}
                                    onClick={handleCreateNew}
                                    disabled={disabled}
                                    title={tooltip}
                                >
                                    <i className={`${buttonIcon} me-1`}></i>
                                    {text}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <EntityTable 
                            ref={tableRef}
                            data={{ data, pagination }}
                            config={entityTableConfig}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        );
    };

    // Return entity object with component
    return {
        key,
        label,
        icon,
        group,
        description,
        component: customComponent || EntityComponent,
        data: [],
        loading: false,
        service
    };
}

/**
 * Generate default columns based on data structure
 * @param {object} sampleData - Sample data object
 * @returns {Array} Default columns configuration
 */
function getDefaultColumns(sampleData) {
    if (!sampleData) return [];

    const columns = [];
    const keys = Object.keys(sampleData);

    // Always include ID if present
    if (keys.includes('id')) {
        columns.push({
            field: 'id',
            header: 'ID',
            type: 'text',
            width: '80px'
        });
    }

    // Add name field if present
    if (keys.includes('name')) {
        columns.push({
            field: 'name',
            header: 'Name',
            type: 'text'
        });
    }

    // Add other common fields
    const commonFields = ['title', 'email', 'status', 'description', 'slug'];
    commonFields.forEach(field => {
        if (keys.includes(field) && !columns.some(col => col.field === field)) {
            columns.push({
                field,
                header: field.charAt(0).toUpperCase() + field.slice(1),
                type: field === 'status' ? 'badge' : 'text'
            });
        }
    });

    // Add date fields
    const dateFields = ['created_at', 'updated_at'];
    dateFields.forEach(field => {
        if (keys.includes(field)) {
            columns.push({
                field,
                header: field === 'created_at' ? 'Created' : 'Updated',
                type: 'date'
            });
        }
    });

    return columns;
}


export default { createAutoEntity };
