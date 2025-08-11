# React Admin CRUD Library

A modern and highly configurable React library for creating professional CRUD administration interfaces with complete support for configurable entities, intelligent editors, and affiliate system.

## 🚀 Key Features

- **🔄 Complete CRUD**: Automatic Create, Read, Update, Delete operations
- **🎨 Intelligent Editors**: Modal, Page and Story with declarative configuration
- **🏢 Affiliate System**: Multi-tenant with automatic filtering
- **📱 Responsive**: Adaptive design for all devices
- **⚡ Auto-generation**: Automatic columns and forms based on data
- **🔧 Highly Configurable**: Complete customization of fields, validations and behaviors
- **🎯 Type-safe**: Typed configuration and automatic validation
- **📊 Pagination and Search**: Included by default with advanced configuration

## 📦 Installation

```bash
npm install @epaolillo/react-crud
```

## 🎯 Quick Start

### Basic Configuration

```jsx
import React from 'react';
import AdminCrudApp, { createAutoEntity } from '@epaolillo/react-crud';

// Define your entities
const entities = [
  createAutoEntity({
    key: 'users',
    label: 'Users',
    entityName: 'users',
    baseUrl: '/api/admin/users'
  })
];

function App() {
  return (
    <AdminCrudApp 
      entities={entities}
      basePath="/admin"
    />
  );
}

export default App;
```

### With Editor Configuration

```jsx
const userEntity = createAutoEntity({
  key: 'users',
  label: 'Users',
  entityName: 'users',
  baseUrl: '/api/admin/users',
  
  // Editor configuration
  editorType: 'modal',
  editorConfig: {
    title: 'Edit User',
    fields: [
      { name: 'first_name', label: 'First Name', type: 'text', required: true },
      { name: 'last_name', label: 'Last Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] }
    ]
  }
});
```

## 🏗️ Library Architecture

### Main Components

- **`AdminCrudApp`**: Main application with routing and context
- **`EntityTable`**: Data table with integrated CRUD
- **`DynamicModal`**: Modal editor for simple forms
- **`DynamicPage`**: Full page editor for complex forms
- **`DynamicStory`**: Rich content editor with Editor.js integration
- **`SkeletonField`**: Form fields with validation and styling

### Services

- **`EntityService`**: Generic API layer for all entities
- **`AffiliateService`**: Multi-tenant system management

### Utilities

- **`entityFactory`**: Factory to automatically create complete entities
- **`affiliateUtils`**: Utilities for affiliate management

## 🎨 Editor Types

### 1. Modal Editor (`editorType: 'modal'`)

Ideal for simple forms with few fields.

```jsx
const simpleEntity = createAutoEntity({
  key: 'categories',
  label: 'Categories',
  editorType: 'modal',
  editorConfig: {
    title: 'Edit Category',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' }
    ]
  }
});
```

### 2. Page Editor (`editorType: 'page'`)

For complex forms with multiple sections and advanced fields.

```jsx
const complexEntity = createAutoEntity({
  key: 'products',
  label: 'Products',
  editorType: 'page',
  editorConfig: {
    title: 'Product Editor',
    fields: [
      { name: 'name', label: 'Product Name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { name: 'price', label: 'Price', type: 'number', min: 0 },
      { name: 'category', label: 'Category', type: 'select', options: ['tech', 'clothing'] },
      { name: 'featured_image', label: 'Featured Image', type: 'image' }
    ]
  }
});
```

### 3. Story Editor (`editorType: 'story'`)

Rich content editor with Editor.js integration.

```jsx
const storyEntity = createAutoEntity({
  key: 'stories',
  label: 'Stories',
  editorType: 'story',
  editorConfig: {
    title: 'Story Editor',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 3 },
      { name: 'content', label: 'Content', type: 'editor' },
      { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] }
    ]
  }
});
```

## 🔧 Available Field Types

### Basic Fields

| Type | Description | Options |
|------|-------------|---------|
| `text` | Simple text field | `required`, `placeholder`, `maxLength` |
| `email` | Email field | `required`, `placeholder` |
| `textarea` | Text area | `required`, `rows`, `placeholder` |
| `number` | Numeric field | `required`, `min`, `max`, `step` |
| `select` | Dropdown list | `required`, `options: []`, `multiple` |
| `checkbox` | Checkbox | `required` |
| `radio` | Radio buttons | `required`, `options: []` |

### Advanced Fields

| Type | Description | Options |
|------|-------------|---------|
| `date` | Date picker | `required`, `min`, `max` |
| `datetime` | Date and time picker | `required` |
| `file` | File upload | `required`, `accept`, `multiple` |
| `image` | Image upload | `required`, `accept: 'image/*'` |
| `color` | Color picker | `required` |
| `editor` | Rich text editor | `required`, `toolbar` |
| `blocks` | Content blocks | `required`, `blockTypes: []` |

### Special Fields

| Type | Description | Options |
|------|-------------|---------|
| `slug` | Automatic slug generation | `required`, `source: 'title'` |
| `async-select` | Select with async options | `required`, `loadOptions: function` |
| `conditional` | Conditional field | `required`, `showWhen: function` |

## 🎛️ Advanced Configuration

### Table Configuration

```jsx
const entityWithTableConfig = createAutoEntity({
  key: 'orders',
  label: 'Orders',
  tableConfig: {
    showSearch: true,
    showPagination: true,
    itemsPerPage: 25,
    sortable: true,
    defaultSort: { field: 'created_at', direction: 'desc' },
    columns: [
      { field: 'id', header: 'Order ID', sortable: true },
      { field: 'customer_name', header: 'Customer', sortable: true },
      { field: 'total', header: 'Total', type: 'currency', sortable: true },
      { field: 'status', header: 'Status', type: 'badge', sortable: true },
      { field: 'created_at', header: 'Created', type: 'date', sortable: true }
    ]
  }
});
```

### Validation Configuration

```jsx
const entityWithValidation = createAutoEntity({
  key: 'users',
  label: 'Users',
  validation: {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must be at least 8 characters with uppercase, lowercase and number'
    }
  }
});
```

### Filter Configuration

```jsx
const entityWithFilters = createAutoEntity({
  key: 'products',
  label: 'Products',
  filters: ['category', 'status', 'price_range'],
  tableConfig: {
    filterOptions: {
      category: {
        type: 'select',
        options: ['electronics', 'clothing', 'books'],
        placeholder: 'Select category'
      },
      status: {
        type: 'select',
        options: ['active', 'inactive', 'draft'],
        placeholder: 'Select status'
      },
      price_range: {
        type: 'range',
        min: 0,
        max: 1000,
        step: 10
      }
    }
  }
});
```

## 🏢 Affiliate System

### Automatic Configuration

The library includes complete support for multi-tenant systems:

```jsx
// Automatically configured
const affiliateEntity = createAutoEntity({
  key: 'products',
  label: 'Products',
  // Automatically filters by affiliate_id
  // Automatically includes affiliate_id in create/update
  // Automatically reloads data when affiliate changes
});
```

### Manual Affiliate Management

```jsx
import { useAffiliate } from '@epaolillo/react-crud';

const CustomComponent = () => {
  const { currentAffiliate, switchAffiliate, userAffiliates } = useAffiliate();
  
  return (
    <div>
      <select 
        value={currentAffiliate?.id || ''} 
        onChange={(e) => switchAffiliate(e.target.value)}
      >
        {userAffiliates.map(affiliate => (
          <option key={affiliate.id} value={affiliate.id}>
            {affiliate.name}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## 🔄 Workflows

### Creation Flow

1. User clicks "Create New"
2. Configured editor opens (modal, page or story)
3. User fills out the form
4. Information is validated
5. Sent to API with automatic `affiliate_id`
6. Table updates and editor closes

### Edit Flow

1. User clicks "Edit"
2. Entity data is loaded
3. Editor opens with pre-filled data
4. User modifies information
5. Validated and sent to API
6. Table updates

### Delete Flow

1. User clicks "Delete"
2. Confirmation is shown
3. Delete request is sent
4. Table updates

## 🎨 Style Customization

### Custom CSS

```css
/* Customize table styles */
.entity-table {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
}

/* Customize modal styles */
.dynamic-modal {
  --modal-width: 800px;
  --modal-background: #ffffff;
}
```

### Custom Themes

```jsx
const customTheme = {
  colors: {
    primary: '#6366f1',
    secondary: '#64748b',
    success: '#10b981',
    danger: '#ef4444'
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem'
  }
};

<AdminCrudApp 
  entities={entities}
  theme={customTheme}
/>
```

## 📱 Responsive Design

The library is completely responsive by default:

- **Mobile First**: Design optimized for mobile devices
- **Breakpoints**: Automatic adaptation to different screen sizes
- **Touch Friendly**: Interactions optimized for touch screens
- **Flexible Layouts**: Automatic adjustment of columns and forms

## 🔒 Security and Permissions

### Access Control

```jsx
const secureEntity = createAutoEntity({
  key: 'admin_users',
  label: 'Admin Users',
  permission: 'admin.users.manage', // Required permission
  editorConfig: {
    fields: [
      { name: 'role', label: 'Role', type: 'select', options: ['user', 'admin'] }
    ]
  }
});
```

### Client-side Validation

```jsx
const validatedEntity = createAutoEntity({
  key: 'orders',
  label: 'Orders',
  validation: {
    amount: {
      required: true,
      min: 0,
      custom: (value) => value <= 10000 || 'Order amount cannot exceed $10,000'
    }
  }
});
```

## 🚀 Optimization and Performance

### Lazy Loading

```jsx
const optimizedEntity = createAutoEntity({
  key: 'large_dataset',
  label: 'Large Dataset',
  tableConfig: {
    virtualScrolling: true,
    pageSize: 50,
    loadMoreThreshold: 10
  }
});
```

### Caching

```jsx
const cachedEntity = createAutoEntity({
  key: 'products',
  label: 'Products',
  cacheConfig: {
    enableCache: true,
    cacheDuration: 5 * 60 * 1000, // 5 minutes
    cacheKey: 'products_cache'
  }
});
```

## 🧪 Testing

### Test Configuration

```jsx
// Basic entity test
test('should create entity with basic config', () => {
  const entity = createAutoEntity({
    key: 'test',
    label: 'Test Entity'
  });
  
  expect(entity.key).toBe('test');
  expect(entity.label).toBe('Test Entity');
});

// Validation test
test('should validate required fields', () => {
  const entity = createAutoEntity({
    key: 'user',
    validation: {
      name: { required: true }
    }
  });
  
  const isValid = entity.service.validateEntityData({});
  expect(isValid).toBe(false);
});
```

## 📚 Complete Examples

### E-commerce Platform

```jsx
const ecommerceEntities = [
  // Products
  createAutoEntity({
    key: 'products',
    label: 'Products',
    editorType: 'page',
    editorConfig: {
      title: 'Product Editor',
      fields: [
        { name: 'name', label: 'Product Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
        { name: 'price', label: 'Price', type: 'number', min: 0, step: 0.01 },
        { name: 'category', label: 'Category', type: 'select', options: ['electronics', 'clothing'] },
        { name: 'images', label: 'Product Images', type: 'file', multiple: true, accept: 'image/*' },
        { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive', 'draft'] }
      ]
    }
  }),
  
  // Orders
  createAutoEntity({
    key: 'orders',
    label: 'Orders',
    editorType: 'modal',
    editorConfig: {
      title: 'Order Details',
      fields: [
        { name: 'customer_name', label: 'Customer Name', type: 'text', required: true },
        { name: 'total', label: 'Total Amount', type: 'number', required: true },
        { name: 'status', label: 'Order Status', type: 'select', options: ['pending', 'processing', 'shipped', 'delivered'] }
      ]
    }
  }),
  
  // Categories
  createAutoEntity({
    key: 'categories',
    label: 'Categories',
    editorType: 'modal',
    editorConfig: {
      title: 'Category Editor',
      fields: [
        { name: 'name', label: 'Category Name', type: 'text', required: true },
        { name: 'slug', label: 'Slug', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' }
      ]
    }
  })
];
```

### Blog Platform

```jsx
const blogEntities = [
  // Stories
  createAutoEntity({
    key: 'stories',
    label: 'Stories',
    editorType: 'story',
    editorConfig: {
      title: 'Story Editor',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 3 },
        { name: 'content', label: 'Content', type: 'editor' },
        { name: 'featured_image', label: 'Featured Image', type: 'image' },
        { name: 'category', label: 'Category', type: 'select', options: ['tech', 'business', 'lifestyle'] },
        { name: 'tags', label: 'Tags', type: 'text', placeholder: 'Separate with commas' },
        { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published', 'archived'] },
        { name: 'publish_date', label: 'Publish Date', type: 'datetime' }
      ]
    }
  }),
  
  // Authors
  createAutoEntity({
    key: 'authors',
    label: 'Authors',
    editorType: 'page',
    editorConfig: {
      title: 'Author Profile',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'bio', label: 'Biography', type: 'textarea', rows: 5 },
        { name: 'avatar', label: 'Profile Picture', type: 'image' },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'social_links', label: 'Social Media Links', type: 'textarea', rows: 3 }
      ]
    }
  })
];
```

## 🔧 Migration from Previous Versions

### Main Changes

1. **`createEntity` → `createAutoEntity`**: New more powerful factory function
2. **`editorConfig`**: New configuration for intelligent editors
3. **`affiliate_id`**: Automatic filtering by affiliate
4. **Validation**: Improved and configurable validation system

### Migration Guide

```jsx
// Before
const oldEntity = createEntity({
  key: 'users',
  label: 'Users',
  config: createEntityTableConfig({...})
});

// After
const newEntity = createAutoEntity({
  key: 'users',
  label: 'Users',
  editorType: 'modal',
  editorConfig: {
    fields: [...]
  }
});
```

## 🆘 Troubleshooting

### Common Issues

**Editor doesn't open:**
- Verify that `editorConfig.fields` is defined
- Make sure `editorType` is valid

**Fields don't render:**
- Check the structure of `editorConfig.fields`
- Make sure each field has `name`, `label`, and `type`

**Not filtering by affiliate:**
- Verify that the user has assigned affiliates
- Make sure the affiliate context is configured

**Validation errors:**
- Check the `validation` configuration
- Make sure required fields are marked


