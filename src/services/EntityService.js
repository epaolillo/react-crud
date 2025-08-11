/**
 * Generic Entity Service - API Layer
 * Handles all CRUD operations for any entity
 * Configurable and reusable across different entities
 */
class EntityService {
    constructor(entityConfig = {}) {
        this.entityName = entityConfig.entityName || 'entity';
        this.baseUrl = entityConfig.baseUrl || `/api/admin/${this.entityName}`;
        this.config = entityConfig;
    }

    // ============================================================================
    // REQUIRED METHODS (STANDARD INTERFACE)
    // ============================================================================

    /**
     * Helper method to make API requests with proper error handling
     * @param {string} endpoint - API endpoint 
     * @param {object} options - Request options
     * @returns {Promise<object>} API response
     */
    async makeRequest(endpoint, options = {}) {
        try {
            const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
            
            const defaultOptions = {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Include cookies for JWT
            };

            const response = await fetch(url, { ...defaultOptions, ...options });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`${this.entityName} API Error:`, error);
            throw error;
        }
    }

    /**
     * Get current affiliate ID from localStorage
     * @returns {number|null} Current affiliate ID
     */
    getCurrentAffiliateId() {
        try {
            const affiliateId = localStorage.getItem('currentAffiliateId');
            return affiliateId ? parseInt(affiliateId) : null;
        } catch (error) {
            console.error('Error getting affiliate ID from localStorage:', error);
            return null;
        }
    }

    /**
     * Get entities list with pagination and filtering
     * @param {object} params - Query parameters
     * @returns {Promise<object>} Entities list with pagination
     */
    async get(params = {}) {
        const queryParams = new URLSearchParams();
        
        // Standard pagination params
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.search) queryParams.append('search', params.search);
        
        // Always include affiliate_id if available
        const affiliateId = this.getCurrentAffiliateId();
        if (affiliateId) {
            queryParams.append('affiliate_id', affiliateId);
        }
        
        // Apply entity-specific filters from config
        if (this.config.filters) {
            this.config.filters.forEach(filter => {
                if (params[filter]) queryParams.append(filter, params[filter]);
            });
        }

        const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return await this.makeRequest(endpoint);
    }

    /**
     * Get single entity by ID
     * @param {number} id - Entity ID
     * @returns {Promise<object>} Entity data
     */
    async getById(id) {
        const affiliateId = this.getCurrentAffiliateId();
        if (affiliateId) {
            return await this.makeRequest(`/${id}?affiliate_id=${affiliateId}`);
        }
        return await this.makeRequest(`/${id}`);
    }

    /**
     * Create new entity
     * @param {object} data - Entity data
     * @returns {Promise<object>} Created entity
     */
    async create(data) {
        // Validate required fields if configured
        if (this.config.validation) {
            const validationErrors = this.validateEntityData(data);
            if (Object.keys(validationErrors).length > 0) {
                throw new Error(Object.values(validationErrors)[0]);
            }
        }

        // Always include affiliate_id if available
        const affiliateId = this.getCurrentAffiliateId();
        const entityData = affiliateId ? { ...data, affiliate_id: affiliateId } : data;

        return await this.makeRequest('', {
            method: 'POST',
            body: JSON.stringify(entityData)
        });
    }

    /**
     * Update existing entity
     * @param {number} id - Entity ID
     * @param {object} data - Updated entity data
     * @returns {Promise<object>} Updated entity
     */
    async update(id, data) {
        // Validate required fields if configured
        if (this.config.validation) {
            const validationErrors = this.validateEntityData(data, true);
            if (Object.keys(validationErrors).length > 0) {
                throw new Error(Object.values(validationErrors)[0]);
            }
        }

        // Always include affiliate_id if available
        const affiliateId = this.getCurrentAffiliateId();
        const entityData = affiliateId ? { ...data, affiliate_id: affiliateId } : data;

        return await this.makeRequest(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(entityData)
        });
    }

    /**
     * Delete entity
     * @param {number} id - Entity ID
     * @returns {Promise<object>} Deletion result
     */
    async delete(id) {
        const affiliateId = this.getCurrentAffiliateId();
        if (affiliateId) {
            return await this.makeRequest(`/${id}?affiliate_id=${affiliateId}`, {
                method: 'DELETE'
            });
        }
        return await this.makeRequest(`/${id}`, {
            method: 'DELETE'
        });
    }

    // ============================================================================
    // UTILITY METHODS
    // ============================================================================

    /**
     * Validate entity data based on configuration
     * @param {object} data - Entity data to validate
     * @param {boolean} isUpdate - Whether this is an update operation
     * @returns {object} Validation errors
     */
    validateEntityData(data, isUpdate = false) {
        const errors = {};

        if (!this.config.validation) return errors;

        Object.entries(this.config.validation).forEach(([field, rules]) => {
            const value = data[field];

            // Required field validation
            if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
                errors[field] = rules.message || `${field} is required`;
                return;
            }

            // Email validation
            if (rules.email && value && !this.isValidEmail(value)) {
                errors[field] = rules.message || 'Invalid email format';
                return;
            }

            // Custom validation function
            if (rules.validator && typeof rules.validator === 'function') {
                const result = rules.validator(value, data, isUpdate);
                if (result !== true) {
                    errors[field] = result || rules.message || `Invalid ${field}`;
                }
            }
        });

        return errors;
    }

    /**
     * Get default entity data structure
     * @returns {object} Default entity data
     */
    getDefaultEntityData() {
        return this.config.defaultData || {};
    }

    /**
     * Format entity for display
     * @param {object} entity - Entity object
     * @returns {object} Formatted entity
     */
    formatEntityForDisplay(entity) {
        if (!this.config.formatForDisplay) {
            return entity;
        }

        return this.config.formatForDisplay(entity);
    }

    /**
     * Generate slug from name (if configured)
     * @param {string} name - Entity name
     * @returns {string} Generated slug
     */
    generateSlug(name) {
        if (!name) return '';
        
        return name
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} Is valid email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Get options for select fields
     * @param {string} optionType - Type of options to get
     * @returns {Array} Options array
     */
    getOptions(optionType) {
        if (this.config.options && this.config.options[optionType]) {
            return this.config.options[optionType];
        }
        return [];
    }

    // ============================================================================
    // RELATIONSHIP METHODS (GENERIC)
    // ============================================================================

    /**
     * Get related entities (generic relationship handler)
     * @param {number} entityId - Entity ID
     * @param {string} relationshipType - Type of relationship
     * @returns {Promise<object>} Related entities
     */
    async getRelated(entityId, relationshipType) {
        return await this.makeRequest(`/${entityId}/${relationshipType}`);
    }

    /**
     * Add relationship
     * @param {number} entityId - Entity ID
     * @param {string} relationshipType - Type of relationship
     * @param {number} relatedId - Related entity ID
     * @param {object} relationshipData - Additional relationship data
     * @returns {Promise<object>} Add result
     */
    async addRelated(entityId, relationshipType, relatedId, relationshipData = {}) {
        return await this.makeRequest(`/${entityId}/${relationshipType}`, {
            method: 'POST',
            body: JSON.stringify({
                related_id: relatedId,
                ...relationshipData
            })
        });
    }

    /**
     * Update relationship
     * @param {number} entityId - Entity ID
     * @param {string} relationshipType - Type of relationship
     * @param {number} relatedId - Related entity ID
     * @param {object} relationshipData - Updated relationship data
     * @returns {Promise<object>} Update result
     */
    async updateRelated(entityId, relationshipType, relatedId, relationshipData) {
        return await this.makeRequest(`/${entityId}/${relationshipType}/${relatedId}`, {
            method: 'PUT',
            body: JSON.stringify(relationshipData)
        });
    }

    /**
     * Remove relationship
     * @param {number} entityId - Entity ID
     * @param {string} relationshipType - Type of relationship
     * @param {number} relatedId - Related entity ID
     * @returns {Promise<object>} Remove result
     */
    async removeRelated(entityId, relationshipType, relatedId) {
        return await this.makeRequest(`/${entityId}/${relationshipType}/${relatedId}`, {
            method: 'DELETE'
        });
    }

    /**
     * Get current user info (if applicable)
     * @returns {Promise<object>} Current user data
     */
    async getCurrentUser() {
        try {
            const response = await fetch('/api/admin/auth/current-user', {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.success ? data.data : null;
            }
            
            return null;
        } catch (error) {
            console.error('Error fetching current user:', error);
            return null;
        }
    }

    // ============================================================================
    // CONFIGURATION METHODS
    // ============================================================================

    /**
     * Update service configuration
     * @param {object} newConfig - New configuration
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        if (newConfig.entityName) {
            this.entityName = newConfig.entityName;
            this.baseUrl = newConfig.baseUrl || `/api/admin/${this.entityName}`;
        }
    }

    /**
     * Create a new instance with different configuration
     * @param {object} entityConfig - Entity configuration
     * @returns {EntityService} New service instance
     */
    static createForEntity(entityConfig) {
        return new EntityService(entityConfig);
    }
}

export default EntityService;
