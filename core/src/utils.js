// Utility functions for entity configuration

/**
 * Creates a basic entity configuration for EntityTable
 * @param {Object} options - Entity configuration options
 * @returns {Object} Complete entity configuration
 */
export const createEntity = ({
  key,
  label,
  icon = 'fas fa-table',
  group = 'Custom',
  permission = null,
  description = null,
  component = null,
  config = {},
  data = [],
  loading = false
}) => {
  return {
    key,
    label,
    icon,
    group,
    permission,
    description: description || `Manage your ${label.toLowerCase()}`,
    component,
    config: {
      entityType: key,
      ...config
    },
    data,
    loading
  };
};

/**
 * Creates a column configuration for EntityTable
 * @param {Object} options - Column configuration options
 * @returns {Object} Column configuration
 */
export const createColumn = ({
  key,
  label,
  type = 'text',
  sortable = true,
  searchable = false,
  render = null,
  className = '',
  width = null,
  subtitleField = null,
  badgeClass = null,
  colorField = null
}) => {
  return {
    field: key, // EntityTable expects 'field' instead of 'key'
    header: label, // EntityTable expects 'header' instead of 'label'
    type,
    sortable,
    searchable,
    render,
    className,
    width,
    subtitleField, // For text-with-subtitle type
    badgeClass, // For badge type
    colorField // For badge-with-color type
  };
};

/**
 * Creates an action configuration for EntityTable
 * @param {Object} options - Action configuration options
 * @returns {Object} Action configuration
 */
export const createAction = ({
  key,
  label,
  icon,
  variant = 'primary',
  handler,
  condition = null,
  confirm = false,
  confirmMessage = 'Are you sure?'
}) => {
  // Convert variant to EntityTable expected class format
  const classMap = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark'
  };

  return {
    action: key, // EntityTable expects 'action' instead of 'key'
    label,
    icon,
    class: classMap[variant] || 'btn-primary', // EntityTable expects 'class' instead of 'variant'
    handler,
    condition,
    confirm,
    confirmMessage
  };
};

/**
 * Creates a filter configuration for EntityTable
 * @param {Object} options - Filter configuration options
 * @returns {Object} Filter configuration
 */
export const createFilter = ({
  field,
  label,
  type = 'select',
  options = [],
  multiple = false,
  defaultValue = null,
  placeholder = ''
}) => {
  return {
    field, // EntityTable expects 'field' instead of 'key'
    label,
    type,
    options,
    multiple,
    defaultValue,
    placeholder // EntityTable uses placeholder for filter options
  };
};

/**
 * Creates a complete EntityTable configuration
 * @param {Object} options - Configuration options
 * @returns {Object} Complete EntityTable configuration
 */
export const createEntityTableConfig = ({
  tableId = 'entity-table',
  entityType,
  columns = [],
  enableSearch = true,
  filters = [],
  customActions = [],
  actionHandlers = {},
  disableEdit = false,
  disableDelete = false,
  disableCreate = false,
  showViewButton = false,
  viewUrl = null,
  conditionalEdit = null,
  conditionalDelete = null,
  editorType = 'page',
  editorConfig = {},
  onLoadEntity = null,
  onSaveEntity = null,
  onSearch = null,
  onPageChange = null,
  onPageSizeChange = null,
  emptyMessage = 'No items found.'
}) => {
  return {
    tableId,
    entityType,
    columns,
    enableSearch,
    filters,
    customActions,
    actionHandlers,
    disableEdit,
    disableDelete,
    disableCreate,
    showViewButton,
    viewUrl,
    conditionalEdit,
    conditionalDelete,
    editorType,
    editorConfig,
    onLoadEntity,
    onSaveEntity,
    onSearch,
    onPageChange,
    onPageSizeChange,
    emptyMessage
  };
};

/**
 * Creates a route configuration
 * @param {Object} options - Route configuration options
 * @returns {Object} Route configuration
 */
export const createRoute = ({
  path,
  element,
  exact = false
}) => {
  return {
    path,
    element,
    exact
  };
};

// Common entity configurations that can be reused
export const commonEntityGroups = {
  CONTENT: 'Content',
  USERS: 'Users',
  SYSTEM: 'System',
  CUSTOM: 'Custom'
};

export const commonIcons = {
  USERS: 'fas fa-users',
  USER: 'fas fa-user',
  SETTINGS: 'fas fa-cog',
  DASHBOARD: 'fas fa-tachometer-alt',
  CONTENT: 'fas fa-file-alt',
  TABLE: 'fas fa-table',
  EDIT: 'fas fa-edit',
  DELETE: 'fas fa-trash',
  VIEW: 'fas fa-eye',
  ADD: 'fas fa-plus',
  SAVE: 'fas fa-save',
  CANCEL: 'fas fa-times'
};
