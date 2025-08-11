import require$$0, { useState, useEffect, createContext, useContext, useRef, forwardRef, useImperativeHandle, useCallback } from "react";
import { useNavigate, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  "production" !== process.env.NODE_ENV && function() {
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch ("number" === typeof type.tag && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return false;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          displayName
        ));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
      self = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
      var children = config.children;
      if (void 0 !== children)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return "key" !== k;
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
          'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
          isStaticChildren,
          children,
          keys,
          children
        ), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      children && defineKeyPropWarningGetter(
        maybeKey,
        "function" === typeof type ? type.displayName || type.name || "Unknown" : type
      );
      return ReactElement(
        type,
        children,
        self,
        source,
        getOwner(),
        maybeKey,
        debugStack,
        debugTask
      );
    }
    function validateChildKeys(node) {
      "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = require$$0, REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
      React,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_development.jsx = function(type, config, maybeKey, source, self) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        false,
        source,
        self,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    reactJsxRuntime_development.jsxs = function(type, config, maybeKey, source, self) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        true,
        source,
        self,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
  }();
  return reactJsxRuntime_development;
}
if (process.env.NODE_ENV === "production") {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({
    show: false,
    type: "error",
    message: ""
  });
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            navigate("/admin");
          }
        }
      } catch (error) {
        console.log("Not authenticated");
      }
    };
    checkAuth();
    setTimeout(() => {
      const emailField = document.getElementById("email");
      if (emailField) {
        emailField.focus();
      }
    }, 100);
  }, [navigate]);
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const showAlert = (type, message) => {
    setAlert({
      show: true,
      type,
      message
    });
  };
  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    hideAlert();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      const data = await response.json();
      if (data.success) {
        showAlert("success", "Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/admin");
        }, 1e3);
      } else {
        showAlert("error", data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlert("error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "login-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-6 col-lg-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "login-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "login-header display-5 mb-2", children: "Immergo Producer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Sign in to your admin panel" })
    ] }),
    alert.show && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `alert alert-dismissible fade show mb-4 ${alert.type === "error" ? "alert-danger" : "alert-success"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: alert.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn-close", onClick: hideAlert })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, noValidate: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "email", className: "form-label fw-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-envelope me-2" }),
          "Email Address"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            className: "form-control",
            value: form.email,
            onChange: handleInputChange,
            placeholder: "Enter your email",
            required: true,
            autoComplete: "email"
          }
        ),
        errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-danger small mt-1", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "password", className: "form-label fw-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-lock me-2" }),
          "Password"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "position-relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: showPassword ? "text" : "password",
              id: "password",
              name: "password",
              className: "form-control pe-5",
              value: form.password,
              onChange: handleInputChange,
              placeholder: "Enter your password",
              required: true,
              autoComplete: "current-password"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3",
              onClick: () => setShowPassword(!showPassword),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `${showPassword ? "fas fa-eye-slash" : "fas fa-eye"} text-muted` })
            }
          )
        ] }),
        errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-danger small mt-1", children: errors.password })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            id: "remember",
            name: "remember",
            className: "form-check-input",
            checked: form.remember,
            onChange: handleInputChange
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "remember", className: "form-check-label", children: "Remember me" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-grid mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          className: "btn btn-login text-white",
          disabled: loading,
          children: !loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-sign-in-alt me-2" }),
            "Sign In"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin me-2" }),
            "Signing in..."
          ] })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "text-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-shield-alt me-1" }),
      "Secure login powered by JWT"
    ] }) })
  ] }) }) }) }) });
};
const Sidebar = ({
  currentSection = "dashboard",
  onSectionChange,
  mobileSidebarOpen = false,
  userPermissions = [],
  entities = []
  // New prop for custom entities
}) => {
  const hasPermission = (permission) => {
    return true;
  };
  const handleSectionClick = (section) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };
  const generateEntityItems = () => {
    if (!entities || entities.length === 0) return [];
    const entityGroups = entities.reduce((groups, entity) => {
      const groupName = entity.group || "Custom";
      if (!groups[groupName]) {
        groups[groupName] = {
          group: groupName,
          items: []
        };
      }
      groups[groupName].items.push({
        section: entity.key,
        icon: entity.icon || "fas fa-table",
        label: entity.label,
        permission: entity.permission
      });
      return groups;
    }, {});
    return Object.values(entityGroups);
  };
  const sidebarItems = [...generateEntityItems()];
  const renderSidebarItem = (item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: "#",
      className: `sidebar-item ${currentSection === item.section ? "active" : ""}`,
      onClick: (e) => {
        e.preventDefault();
        handleSectionClick(item.section);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: item.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
      ]
    },
    item.section
  );
  const renderSidebarGroup = (group) => {
    if (group.permission && !hasPermission(group.permission)) ;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-section", children: [
      group.group && /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "sidebar-header", children: group.group }),
      group.items.map((item) => {
        if (item.permission && !hasPermission(item.permission)) ;
        return renderSidebarItem(item);
      })
    ] }, group.group);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: `admin-sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`, children: sidebarItems.map((item) => {
    if (item.standalone) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sidebar-section", children: renderSidebarItem(item) }, item.section);
    }
    return renderSidebarGroup(item);
  }) });
};
class AffiliatesService {
  constructor() {
    this.baseUrl = "/api/admin/affiliates";
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
      const url = endpoint.startsWith("http") ? endpoint : `${this.baseUrl}${endpoint}`;
      const defaultOptions = {
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
        // Include cookies for JWT
      };
      const response = await fetch(url, { ...defaultOptions, ...options });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Affiliates API Error:", error);
      throw error;
    }
  }
  /**
   * Get affiliates list with pagination and filtering
   * @param {object} params - Query parameters
   * @returns {Promise<object>} Affiliates list with pagination
   */
  async get(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.search) queryParams.append("search", params.search);
    if (params.status) queryParams.append("status", params.status);
    if (params.type) queryParams.append("type", params.type);
    const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : "";
    return await this.makeRequest(endpoint);
  }
  /**
   * Get single affiliate by ID
   * @param {number} id - Affiliate ID
   * @returns {Promise<object>} Affiliate data
   */
  async getById(id) {
    return await this.makeRequest(`/${id}`);
  }
  /**
   * Create new affiliate
   * @param {object} data - Affiliate data
   * @returns {Promise<object>} Created affiliate
   */
  async create(data) {
    const validationErrors = this.validateAffiliateData(data);
    if (Object.keys(validationErrors).length > 0) {
      throw new Error(Object.values(validationErrors)[0]);
    }
    return await this.makeRequest("", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  /**
   * Update existing affiliate
   * @param {number} id - Affiliate ID
   * @param {object} data - Updated affiliate data
   * @returns {Promise<object>} Updated affiliate
   */
  async update(id, data) {
    const validationErrors = this.validateAffiliateData(data, true);
    if (Object.keys(validationErrors).length > 0) {
      throw new Error(Object.values(validationErrors)[0]);
    }
    return await this.makeRequest(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  /**
   * Delete affiliate
   * @param {number} id - Affiliate ID
   * @returns {Promise<object>} Deletion result
   */
  async delete(id) {
    return await this.makeRequest(`/${id}`, {
      method: "DELETE"
    });
  }
  // ============================================================================
  // UTILITY METHODS
  // ============================================================================
  /**
   * Validate affiliate data
   * @param {object} data - Affiliate data to validate
   * @param {boolean} isUpdate - Whether this is an update operation
   * @returns {object} Validation errors
   */
  validateAffiliateData(data, isUpdate = false) {
    const errors = {};
    if (!data.name || !data.name.trim()) {
      errors.name = "Affiliate name is required";
    }
    if (!data.slug || !data.slug.trim()) {
      errors.slug = "Slug is required";
    }
    if (data.contact_email && !this.isValidEmail(data.contact_email)) {
      errors.contact_email = "Invalid email format";
    }
    return errors;
  }
  /**
   * Get default affiliate data structure
   * @returns {object} Default affiliate data
   */
  getDefaultAffiliateData() {
    return {
      name: "",
      slug: "",
      description: "",
      contact_email: "",
      contact_phone: "",
      website_url: "",
      status: "active",
      type: "organization"
    };
  }
  /**
   * Format affiliate for display
   * @param {object} affiliate - Affiliate object
   * @returns {object} Formatted affiliate
   */
  formatAffiliateForDisplay(affiliate) {
    return {
      ...affiliate,
      name_display: affiliate.name || "Unnamed Affiliate",
      type_display: this.getTypeDisplay(affiliate.type)
    };
  }
  /**
   * Format user for display
   * @param {object} user - User object
   * @returns {object} Formatted user
   */
  formatUserForDisplay(user) {
    return {
      ...user,
      name: user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email,
      name_display: user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email
    };
  }
  /**
   * Generate slug from name
   * @param {string} name - Affiliate name
   * @returns {string} Generated slug
   */
  generateSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim("-");
  }
  /**
   * Get type display name
   * @param {string} type - Affiliate type
   * @returns {string} Display name
   */
  getTypeDisplay(type) {
    const types = {
      "organization": "Organization",
      "individual": "Individual",
      "partner": "Partner",
      "sponsor": "Sponsor"
    };
    return types[type] || type;
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
   * Get type options for select
   * @returns {Array} Type options
   */
  getTypeOptions() {
    return [
      { value: "organization", label: "Organization" },
      { value: "individual", label: "Individual" },
      { value: "partner", label: "Partner" },
      { value: "sponsor", label: "Sponsor" }
    ];
  }
  /**
   * Get status options for select
   * @returns {Array} Status options
   */
  getStatusOptions() {
    return [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" }
    ];
  }
  // ============================================================================
  // MEMBER MANAGEMENT METHODS
  // ============================================================================
  /**
   * Get affiliate members
   * @param {number} affiliateId - Affiliate ID
   * @returns {Promise<object>} Members list
   */
  async getMembers(affiliateId) {
    return await this.makeRequest(`/${affiliateId}/members`);
  }
  /**
   * Get available affiliates that can be added as members
   * @param {number} affiliateId - Affiliate ID
   * @returns {Promise<object>} Available affiliates
   */
  async getAvailableMembers(affiliateId) {
    return await this.makeRequest(`/${affiliateId}/available-members`);
  }
  /**
   * Add member to affiliate
   * @param {number} affiliateId - Affiliate ID
   * @param {number} toAffiliateId - Member affiliate ID
   * @param {object} permissions - Member permissions
   * @returns {Promise<object>} Add result
   */
  async addMember(affiliateId, toAffiliateId, permissions = {}) {
    return await this.makeRequest(`/${affiliateId}/members`, {
      method: "POST",
      body: JSON.stringify({
        to_affiliate_id: toAffiliateId,
        permissions
      })
    });
  }
  /**
   * Update member permissions
   * @param {number} affiliateId - Affiliate ID
   * @param {number} memberId - Member affiliate ID
   * @param {object} permissions - Updated permissions
   * @returns {Promise<object>} Update result
   */
  async updateMemberPermissions(affiliateId, memberId, permissions) {
    return await this.makeRequest(`/${affiliateId}/members/${memberId}`, {
      method: "PUT",
      body: JSON.stringify({ permissions })
    });
  }
  /**
   * Remove member from affiliate
   * @param {number} affiliateId - Affiliate ID
   * @param {number} memberId - Member affiliate ID
   * @returns {Promise<object>} Remove result
   */
  async removeMember(affiliateId, memberId) {
    return await this.makeRequest(`/${affiliateId}/members/${memberId}`, {
      method: "DELETE"
    });
  }
  /**
   * Get permission options for checkboxes
   * @returns {Array} Permission options
   */
  getPermissionOptions() {
    return [
      {
        name: "can_use",
        label: "B can use content from A",
        description: "Allow this affiliate to use content from the current affiliate"
      },
      {
        name: "can_copy",
        label: "B can copy content from A",
        description: "Allow this affiliate to copy content from the current affiliate"
      },
      {
        name: "can_assign",
        label: "B can assign content to A",
        description: "Allow this affiliate to assign content to the current affiliate"
      },
      {
        name: "access_publishers",
        label: "Access to A enabled for B's publishers",
        description: "Allow this affiliate's publishers to access the current affiliate"
      }
    ];
  }
  /**
   * Get current user info
   * @returns {Promise<object>} Current user data
   */
  async getCurrentUser() {
    try {
      const response = await fetch("/api/admin/affiliates/current-user", {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        return data.success ? data.data : null;
      }
      return null;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }
}
const affiliatesService = new AffiliatesService();
let currentAffiliateId = null;
const setCurrentAffiliateId = (affiliateId) => {
  currentAffiliateId = affiliateId;
  if (affiliateId) {
    localStorage.setItem("currentAffiliateId", affiliateId.toString());
  } else {
    localStorage.removeItem("currentAffiliateId");
  }
};
const getCurrentAffiliateId = () => {
  if (currentAffiliateId !== null) {
    console.log("🔍 getCurrentAffiliateId: returning from memory:", currentAffiliateId);
    return currentAffiliateId;
  }
  const stored = localStorage.getItem("currentAffiliateId");
  console.log("🔍 getCurrentAffiliateId: stored in localStorage:", stored);
  if (stored) {
    const parsed = parseInt(stored);
    if (!isNaN(parsed)) {
      currentAffiliateId = parsed;
      console.log("🔍 getCurrentAffiliateId: parsed and set:", parsed);
      return parsed;
    }
  }
  console.log("🔍 getCurrentAffiliateId: returning null");
  return null;
};
const AffiliateContext = createContext();
const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (!context) {
    throw new Error("useAffiliate must be used within an AffiliateProvider");
  }
  return context;
};
const AffiliateProvider = ({ children }) => {
  const [currentAffiliate, setCurrentAffiliate] = useState(null);
  const [userAffiliates, setUserAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    loadUserAffiliates();
  }, []);
  const loadUserAffiliates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await affiliatesService.get();
      if (response.success) {
        setUserAffiliates(response.data);
        await handleAffiliateSelection(response.data);
      } else {
        setError("Failed to load affiliates");
        console.error("Error loading affiliates:", response.error);
      }
    } catch (error2) {
      console.error("Error loading user affiliates:", error2);
      setError("Failed to load affiliates");
    } finally {
      setLoading(false);
    }
  };
  const handleAffiliateSelection = async (affiliates) => {
    if (affiliates.length === 0) {
      console.log("No affiliates available for user");
      setCurrentAffiliate(null);
      return;
    }
    const storedAffiliateId = getCurrentAffiliateId();
    console.log("Stored affiliate ID:", storedAffiliateId);
    let affiliateToUse = null;
    if (storedAffiliateId) {
      affiliateToUse = affiliates.find((a) => a.id == storedAffiliateId);
      if (affiliateToUse) {
        console.log("Using stored affiliate:", affiliateToUse.name);
      } else {
        console.log("Stored affiliate not found in user affiliates, will use first available");
      }
    }
    if (!affiliateToUse) {
      affiliateToUse = affiliates[0];
      console.log("Using first available affiliate:", affiliateToUse.name);
    }
    if (affiliateToUse) {
      setCurrentAffiliate(affiliateToUse);
      setCurrentAffiliateId(affiliateToUse.id);
      console.log("Affiliate set to:", affiliateToUse.name, "ID:", affiliateToUse.id);
    }
  };
  const switchAffiliate = async (affiliateId) => {
    try {
      const affiliate = userAffiliates.find((a) => a.id === affiliateId);
      if (affiliate) {
        setCurrentAffiliate(affiliate);
        setCurrentAffiliateId(affiliateId);
        window.dispatchEvent(new CustomEvent("affiliateChanged", {
          detail: { affiliateId }
        }));
        console.log("Switched to affiliate:", affiliate.name);
        return true;
      }
      console.error("Affiliate not found in user affiliates:", affiliateId);
      return false;
    } catch (error2) {
      console.error("Error switching affiliate:", error2);
      setError("Failed to switch affiliate");
      return false;
    }
  };
  const refreshAffiliates = async () => {
    await loadUserAffiliates();
  };
  const getCurrentAffiliateName = () => {
    return (currentAffiliate == null ? void 0 : currentAffiliate.name) || "No Affiliate Selected";
  };
  const isAffiliateSelected = () => {
    return !!currentAffiliate;
  };
  const value = {
    currentAffiliate,
    userAffiliates,
    loading,
    error,
    switchAffiliate,
    refreshAffiliates,
    getCurrentAffiliateId,
    getCurrentAffiliateName,
    isAffiliateSelected
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateContext.Provider, { value, children });
};
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (affiliateDropdownRef.current && !affiliateDropdownRef.current.contains(event.target)) {
        setAffiliateDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleAffiliateChange = async (affiliateId) => {
    const success = await switchAffiliate(affiliateId);
    if (success) {
      setAffiliateDropdownOpen(false);
      console.log("Affiliate switched successfully");
    } else {
      console.error("Failed to switch affiliate");
    }
  };
  const toggleAffiliateDropdown = () => {
    setAffiliateDropdownOpen(!affiliateDropdownOpen);
    setUserDropdownOpen(false);
  };
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setAffiliateDropdownOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "navbar navbar-expand-lg navbar-dark bg-dark fixed-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-fluid", children: [
    showMobileToggle && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "btn btn-link d-lg-none text-white me-2",
        onClick: onToggleMobileSidebar,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-bars" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "navbar-brand mb-0", children: [
      (currentAffiliate == null ? void 0 : currentAffiliate.logo) && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: currentAffiliate.logo, alt: "Logo", className: "logo-img" }),
      "Immergo Producer"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "navbar-nav ms-auto", children: [
      affiliatesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nav-item me-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "nav-link", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin me-1" }),
        "Loading..."
      ] }) }) : userAffiliates.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nav-item dropdown me-3", ref: affiliateDropdownRef, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "nav-link dropdown-toggle btn btn-link",
            onClick: toggleAffiliateDropdown,
            style: { border: "none", background: "none", color: "inherit" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-globe me-1" }),
              getCurrentAffiliateName()
            ]
          }
        ),
        affiliateDropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "dropdown-menu dropdown-menu-end show", style: { display: "block" }, children: [
          userAffiliates.map((affiliate) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: `dropdown-item ${(currentAffiliate == null ? void 0 : currentAffiliate.id) === affiliate.id ? "active" : ""}`,
              onClick: () => handleAffiliateChange(affiliate.id),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-building me-2" }),
                affiliate.name,
                (currentAffiliate == null ? void 0 : currentAffiliate.id) === affiliate.id && /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-check ms-2" })
              ]
            }
          ) }, affiliate.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "dropdown-divider" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "dropdown-item", href: "/admin/affiliates", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-cog me-2" }),
            "Manage Affiliates"
          ] }) })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nav-item me-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "nav-link text-warning", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-exclamation-triangle me-1" }),
        "No Affiliates Available"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "nav-link me-3", href: "/", target: "_blank", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-external-link-alt me-1" }),
        "Visit Site"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nav-item dropdown", ref: userDropdownRef, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "nav-link dropdown-toggle btn btn-link",
            onClick: toggleUserDropdown,
            style: { border: "none", background: "none", color: "inherit" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-user-circle me-1" }),
              (user == null ? void 0 : user.name) || (user == null ? void 0 : user.email)
            ]
          }
        ),
        userDropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "dropdown-menu dropdown-menu-end show", style: { display: "block" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "dropdown-item", href: "#", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-user me-2" }),
            "Profile"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "dropdown-item", href: "#", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-cog me-2" }),
            "Settings"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "dropdown-divider" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "dropdown-item", onClick: onLogout, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-sign-out-alt me-2" }),
            "Logout"
          ] }) })
        ] })
      ] })
    ] })
  ] }) });
};
const EditorJs = forwardRef(({
  data = { blocks: [] },
  placeholder = "Start creating your content...",
  onChange = null,
  onReady = null,
  customTools = {},
  readOnly = false,
  className = ""
}, ref) => {
  const editorRef = useRef(null);
  const holderRef = useRef(null);
  const holderId = useRef(`editor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const isInitializing = useRef(false);
  useImperativeHandle(ref, () => ({
    save: async () => {
      if (editorRef.current) {
        try {
          return await editorRef.current.save();
        } catch (error) {
          console.error("Error saving editor data:", error);
          throw error;
        }
      }
      return { blocks: [] };
    },
    clear: async () => {
      if (editorRef.current) {
        try {
          await editorRef.current.clear();
        } catch (error) {
          console.error("Error clearing editor:", error);
        }
      }
    },
    render: async (data2) => {
      if (editorRef.current) {
        try {
          await editorRef.current.render(data2);
        } catch (error) {
          console.error("Error rendering editor data:", error);
        }
      }
    },
    destroy: async () => {
      if (editorRef.current) {
        try {
          await editorRef.current.destroy();
          editorRef.current = null;
        } catch (error) {
          console.error("Error destroying editor:", error);
        }
      }
    },
    focus: () => {
      if (editorRef.current) {
        try {
          editorRef.current.focus();
        } catch (error) {
          console.error("Error focusing editor:", error);
        }
      }
    },
    getEditor: () => editorRef.current
  }));
  const checkDependencies = () => {
    const coreGlobals = [
      "EditorJS",
      "Header",
      "Paragraph",
      "List",
      "Quote",
      "Table",
      "Delimiter",
      "ImageTool"
    ];
    const customGlobals = [
      "ColumnsBlock",
      "AdvUnitBlock"
    ];
    const optionalGlobals = [
      "StoriesReelBlock",
      "TextAlign"
    ];
    const missingCore = coreGlobals.filter((dep) => typeof window[dep] === "undefined");
    const missingCustom = customGlobals.filter((dep) => typeof window[dep] === "undefined");
    const missingOptional = optionalGlobals.filter((dep) => typeof window[dep] === "undefined");
    const hasCreateEditor = typeof window.createEditor === "function";
    console.log("🔍 Editor.js Dependencies Check:");
    console.log("  Core tools available:", coreGlobals.filter((dep) => typeof window[dep] !== "undefined"));
    console.log("  Custom tools available:", customGlobals.filter((dep) => typeof window[dep] !== "undefined"));
    console.log("  Optional tools available:", optionalGlobals.filter((dep) => typeof window[dep] !== "undefined"));
    if (missingCore.length > 0) {
      console.warn("  ❌ Missing core tools:", missingCore);
    }
    if (missingCustom.length > 0) {
      console.warn("  ⚠️ Missing custom tools:", missingCustom);
    }
    if (missingOptional.length > 0) {
      console.info("  📝 Missing optional tools:", missingOptional);
    }
    console.log("  createEditor function:", hasCreateEditor ? "✅ Available" : "❌ Missing");
    const hasMainTools = typeof window.mainEditorTools === "object";
    console.log("  mainEditorTools:", hasMainTools ? "✅ Available" : "❌ Missing");
    if (hasMainTools) {
      console.log("  Available tools in mainEditorTools:", Object.keys(window.mainEditorTools));
    }
    return {
      hasAllCore: missingCore.length === 0,
      hasCustomTools: missingCustom.length === 0,
      hasCreateEditor,
      missingCore,
      missingCustom,
      missingOptional,
      ready: missingCore.length === 0 && hasCreateEditor
    };
  };
  useEffect(() => {
    const initializeEditor = async () => {
      if (isInitializing.current) {
        return;
      }
      if (!holderRef.current) {
        console.warn("Editor holder element not found");
        return;
      }
      isInitializing.current = true;
      try {
        const maxWaitTime = 15e3;
        const checkInterval = 300;
        let waited = 0;
        const waitForDependencies = () => {
          return new Promise((resolve, reject) => {
            const check = () => {
              const deps2 = checkDependencies();
              if (deps2.ready) {
                console.log("✅ All required Editor.js dependencies loaded");
                if (!deps2.hasCustomTools) {
                  console.warn("⚠️ Some custom tools missing, but proceeding with available tools");
                }
                resolve(deps2);
                return;
              }
              waited += checkInterval;
              if (waited >= maxWaitTime) {
                reject(new Error(`Editor.js dependencies not loaded within timeout.
Missing core: ${deps2.missingCore.join(", ")}
Missing custom: ${deps2.missingCustom.join(", ")}`));
                return;
              }
              if (waited % 3e3 === 0) {
                console.log(`⏳ Waiting for Editor.js dependencies... (${waited / 1e3}s)`);
              }
              setTimeout(check, checkInterval);
            };
            check();
          });
        };
        const deps = await waitForDependencies();
        if (editorRef.current) {
          try {
            await editorRef.current.destroy();
          } catch (error) {
            console.warn("Error destroying previous editor:", error);
          }
          editorRef.current = null;
        }
        let parsedData = data;
        if (typeof data === "string") {
          try {
            parsedData = JSON.parse(data);
          } catch (error) {
            console.warn("Invalid JSON data provided, using empty blocks:", error);
            parsedData = { blocks: [] };
          }
        }
        if (!parsedData || typeof parsedData !== "object") {
          parsedData = { blocks: [] };
        }
        if (!Array.isArray(parsedData.blocks)) {
          parsedData.blocks = [];
        }
        console.log("🔧 Creating Editor.js instance with data:", parsedData);
        const createEditorFn = window.createEditor;
        if (!createEditorFn) {
          throw new Error("createEditor function not available");
        }
        editorRef.current = createEditorFn({
          holder: holderId.current,
          placeholder,
          data: parsedData,
          readOnly,
          customTools,
          onChange: onChange ? () => {
            if (editorRef.current && onChange) {
              setTimeout(() => {
                onChange();
              }, 100);
            }
          } : void 0
        });
        if (editorRef.current && editorRef.current.configuration) {
          console.log("🛠️ Editor initialized with tools:", Object.keys(editorRef.current.configuration.tools || {}));
        }
        if (onReady && editorRef.current) {
          setTimeout(() => {
            onReady(editorRef.current);
          }, 300);
        }
        console.log("✅ EditorJs component initialized successfully");
      } catch (error) {
        console.error("Failed to initialize EditorJs:", error);
        if (holderRef.current) {
          holderRef.current.innerHTML = `
                        <div class="editor-error">
                            <div class="editor-error-icon">⚠️</div>
                            <div class="editor-error-title">Editor Loading Error</div>
                            <div class="editor-error-message">
                                Editor.js failed to initialize. Please ensure all Editor.js dependencies are loaded.
                            </div>
                            <div class="editor-error-details">${error.message}</div>
                            <button class="btn btn-sm btn-primary mt-2" onclick="window.location.reload()">
                                Reload Page
                            </button>
                        </div>
                    `;
        }
      } finally {
        isInitializing.current = false;
      }
    };
    const timeoutId = setTimeout(initializeEditor, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  useEffect(() => {
    if (editorRef.current && data && !isInitializing.current) {
      const updateEditor = async () => {
        try {
          let parsedData = data;
          if (typeof data === "string") {
            parsedData = JSON.parse(data);
          }
          if (parsedData && parsedData.blocks) {
            const currentData = await editorRef.current.save();
            const currentBlocks = JSON.stringify(currentData.blocks);
            const newBlocks = JSON.stringify(parsedData.blocks);
            if (currentBlocks !== newBlocks) {
              await editorRef.current.render(parsedData);
            }
          }
        } catch (error) {
          console.warn("Error updating editor data:", error);
        }
      };
      const timeoutId = setTimeout(updateEditor, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [data]);
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
        } catch (error) {
          console.warn("Error destroying editor on unmount:", error);
        }
        editorRef.current = null;
      }
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `editorjs-wrapper ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: holderRef,
      id: holderId.current,
      className: "editorjs-holder"
    }
  ) });
});
EditorJs.displayName = "EditorJs";
const SkeletonField = ({ type = "text", label = true, helpText = false, rows = 3 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "text":
      case "email":
      case "url":
      case "number":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-input skeleton-animate" });
      case "textarea":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "skeleton-textarea skeleton-animate",
            style: { height: `${rows * 24}px` }
          }
        );
      case "select":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-select skeleton-animate" });
      case "checkbox":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-checkbox skeleton-animate" });
      case "color":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-color skeleton-animate" });
      case "editor":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skeleton-editor skeleton-animate", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skeleton-editor-toolbar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-tool skeleton-animate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-tool skeleton-animate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-tool skeleton-animate" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-editor-content skeleton-animate" })
        ] });
      case "custom":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-custom skeleton-animate" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-input skeleton-animate" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "skeleton-field mb-3", children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-label skeleton-animate" }),
    renderSkeleton(),
    helpText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-help-text skeleton-animate" })
  ] });
};
const DynamicPage = ({
  show = false,
  title = "Edit Item",
  config = {},
  entityData = null,
  onSave = null,
  onCancel = null,
  loading = false
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const editorRef = useRef(null);
  const {
    fields = [],
    entityType = "entity",
    editorConfig = null,
    customValidation = null
  } = config;
  useEffect(() => {
    if (entityData) {
      setFormData({ ...entityData });
    } else {
      const defaultData = {};
      fields.forEach((field) => {
        defaultData[field.name] = field.defaultValue || "";
      });
      setFormData(defaultData);
    }
    setErrors({});
  }, [entityData, fields]);
  const hasContentField = () => {
    return fields.some((field) => field.type === "editor");
  };
  const handleEditorChange = async () => {
    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        setFormData((prev) => ({
          ...prev,
          content: outputData
        }));
      } catch (error) {
        console.error("Error saving editor data:", error);
      }
    }
  };
  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value
    }));
    if (fieldName === "title" && !formData.slug && fields.find((f) => f.name === "slug")) {
      const slug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
        slug
      }));
    }
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };
  const generateSlug = (title2) => {
    return title2.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  };
  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const value = formData[field.name];
      if (field.required && (!value || value.toString().trim() === "")) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.validation) {
        const validationResult = field.validation(value, formData);
        if (validationResult !== true) {
          newErrors[field.name] = validationResult;
        }
      }
    });
    if (customValidation) {
      const customErrors = customValidation(formData);
      Object.assign(newErrors, customErrors);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    setSaving(true);
    try {
      if (editorRef.current && hasContentField()) {
        const outputData = await editorRef.current.save();
        formData.content = outputData;
      }
      let dataToSave = formData;
      if (config.onBeforeSave) {
        dataToSave = config.onBeforeSave(formData);
      }
      if (onSave) {
        await onSave(dataToSave);
      } else {
        console.error("DynamicPage: No onSave function provided");
      }
    } catch (error) {
      console.error("DynamicPage: Save failed:", error);
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const panels = config.panels || {};
  const groupedFields = {};
  Object.keys(panels).forEach((panelKey) => {
    groupedFields[panelKey] = [];
  });
  fields.forEach((field) => {
    if (field.panel && panels[field.panel]) {
      groupedFields[field.panel].push(field);
    } else if (field.group && panels[field.group]) {
      groupedFields[field.group].push(field);
    }
  });
  const renderField = (field) => {
    var _a;
    const value = formData[field.name] || "";
    const hasError = errors[field.name];
    if (formData._isLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SkeletonField,
        {
          type: field.type,
          label: true,
          helpText: field.helpText,
          rows: field.rows
        },
        field.name
      );
    }
    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: field.type,
            className: `form-control ${hasError ? "is-invalid" : ""}`,
            value,
            placeholder: field.placeholder,
            onChange: (e) => handleInputChange(field.name, e.target.value)
          }
        );
      case "textarea":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: `form-control ${hasError ? "is-invalid" : ""}`,
            rows: field.rows || 3,
            value,
            placeholder: field.placeholder,
            onChange: (e) => handleInputChange(field.name, e.target.value),
            style: field.name === "custom_css" ? { fontFamily: "monospace", fontSize: "12px" } : {}
          }
        );
      case "select":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: `form-select ${hasError ? "is-invalid" : ""}`,
            value,
            onChange: (e) => handleInputChange(field.name, e.target.value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: field.placeholder || "Select..." }),
              (_a = field.options) == null ? void 0 : _a.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
            ]
          }
        );
      case "checkbox":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              className: "form-check-input",
              checked: !!value,
              onChange: (e) => handleInputChange(field.name, e.target.checked)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-check-label", children: field.checkboxLabel || field.label })
        ] });
      case "editor":
        let editorData = value;
        if (typeof value === "string" && value) {
          try {
            editorData = JSON.parse(value);
          } catch (e) {
            editorData = { blocks: [] };
          }
        }
        if (!editorData || typeof editorData !== "object") {
          editorData = { blocks: [] };
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-field", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditorJs,
          {
            ref: editorRef,
            data: editorData,
            placeholder: (editorConfig == null ? void 0 : editorConfig.placeholder) || "Start writing...",
            onChange: handleEditorChange,
            customTools: (editorConfig == null ? void 0 : editorConfig.tools) || {},
            className: "dynamic-page-editor"
          }
        ) });
      case "custom":
        return field.render ? field.render(value, (newValue) => handleInputChange(field.name, newValue), formData) : null;
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            className: `form-control ${hasError ? "is-invalid" : ""}`,
            value,
            placeholder: field.placeholder,
            onChange: (e) => handleInputChange(field.name, e.target.value)
          }
        );
    }
  };
  const renderSidebarPanel = (title2, fields2, show2 = true, panelKey = null) => {
    if (!show2 || fields2.length === 0) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "panel-title", children: title2.toUpperCase() }),
      fields2.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group mb-3", children: [
        field.type !== "checkbox" && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: field.label }),
        renderField(field),
        field.helpText && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "form-text text-muted mt-1", children: field.helpText }),
        errors[field.name] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "invalid-feedback d-block", children: errors[field.name] }),
        field.help && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-text", children: field.help })
      ] }, field.name))
    ] }, panelKey || title2);
  };
  if (!show) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-editor-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-header-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-link editor-back-btn", onClick: handleCancel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-chevron-left me-2" }),
          "BACK"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "editor-title", children: entityData ? `Edit ${entityType}` : `Create New ${entityType}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-header-right", children: [
        fields.find((f) => f.name === "status") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "form-select me-2",
            style: { width: "auto" },
            value: formData.status || "draft",
            onChange: (e) => handleInputChange("status", e.target.value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "draft", children: "Draft" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "published", children: "Published" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-primary",
            onClick: handleSave,
            disabled: saving,
            children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spinner-border spinner-border-sm me-1", role: "status" }),
              "SAVING..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-save me-1" }),
              "SAVE"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "editor-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-main", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner-border", role: "status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "visually-hidden", children: "Loading..." }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Object.keys(panels).map((panelKey) => {
        const panel = panels[panelKey];
        if (!panel.showInMain || !groupedFields[panelKey] || groupedFields[panelKey].length === 0) {
          return null;
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "main-panel-section", children: groupedFields[panelKey].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "main-field mb-4", children: field.name === "title" || field.type === "title" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-title-section p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "form-control form-control-lg border-0 p-0",
              placeholder: field.placeholder || "Enter title...",
              value: formData[field.name] || "",
              onChange: (e) => handleInputChange(field.name, e.target.value),
              style: { fontSize: "2.5rem", fontWeight: "bold" }
            }
          ),
          errors[field.name] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "invalid-feedback d-block", children: errors[field.name] })
        ] }) : field.type === "editor" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-content-section", children: renderField(field) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          field.type !== "custom" && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label fw-bold mb-2", children: field.label }),
          renderField(field),
          field.helpText && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "form-text text-muted mt-1", children: field.helpText }),
          errors[field.name] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "invalid-feedback d-block", children: errors[field.name] })
        ] }) }, field.name)) }, panelKey);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "editor-sidebar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sidebar-panel", children: Object.keys(panels).map((panelKey) => {
        const panel = panels[panelKey];
        if (!panel.showInSidebar || !groupedFields[panelKey] || groupedFields[panelKey].length === 0) {
          return null;
        }
        return renderSidebarPanel(panel.title, groupedFields[panelKey], true, panelKey);
      }) }) })
    ] })
  ] });
};
const DynamicModal = ({
  isOpen = false,
  onClose,
  onSave,
  data = null,
  config = {},
  loading = false,
  modalWidth = "modal-lg"
  // Default to Bootstrap's modal-lg
}) => {
  var _a;
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    var _a2;
    if (isOpen) {
      if (data) {
        setFormData({ ...data });
      } else {
        let defaultData = {};
        if (config.getDefaultData) {
          defaultData = config.getDefaultData();
        } else {
          (_a2 = config.fields) == null ? void 0 : _a2.forEach((field) => {
            defaultData[field.name] = field.defaultValue || getDefaultValueForType(field.type);
          });
        }
        setFormData(defaultData);
      }
      setErrors({});
    }
  }, [isOpen, data, config.fields, config.getDefaultData]);
  const getDefaultValueForType = (type) => {
    switch (type) {
      case "checkbox":
        return false;
      case "number":
        return 0;
      case "color":
        return "#007cba";
      default:
        return "";
    }
  };
  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value
    }));
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: void 0
      }));
    }
  };
  const validateForm = () => {
    var _a2;
    const newErrors = {};
    (_a2 = config.fields) == null ? void 0 : _a2.forEach((field) => {
      if (field.required) {
        const value = formData[field.name];
        if (!value || typeof value === "string" && value.trim() === "") {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
    });
    if (config.customValidation) {
      const customErrors = config.customValidation(formData);
      Object.assign(newErrors, customErrors);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = async () => {
    if (!validateForm()) return;
    setSaving(true);
    try {
      await onSave(formData, data == null ? void 0 : data.id);
      onClose();
    } catch (error) {
      console.error("Error saving entity:", error);
      setErrors({ general: error.message || "Failed to save entity" });
    } finally {
      setSaving(false);
    }
  };
  const handleClose = () => {
    if (!saving) {
      onClose();
    }
  };
  const renderField = (field) => {
    const { name, label, type, required, placeholder, helpText, options, rows } = field;
    const value = formData[name] || "";
    const hasError = errors[name];
    if (formData._isLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SkeletonField,
        {
          type,
          label: true,
          helpText,
          rows
        },
        name
      );
    }
    const commonProps = {
      id: name,
      name,
      value,
      onChange: (e) => handleFieldChange(name, e.target.value),
      className: `form-control ${hasError ? "is-invalid" : ""}`,
      required
    };
    let fieldElement;
    switch (type) {
      case "text":
      case "email":
      case "url":
        fieldElement = /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type,
            placeholder,
            ...commonProps
          }
        );
        break;
      case "textarea":
        fieldElement = /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            rows: rows || 3,
            placeholder,
            ...commonProps
          }
        );
        break;
      case "select":
        fieldElement = /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { ...commonProps, children: [
          placeholder && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: placeholder }),
          options == null ? void 0 : options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
        ] });
        break;
      case "color":
        fieldElement = /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "color",
            ...commonProps,
            className: `form-control form-control-color ${hasError ? "is-invalid" : ""}`
          }
        );
        break;
      case "checkbox":
        fieldElement = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: name,
              name,
              checked: value || false,
              onChange: (e) => handleFieldChange(name, e.target.checked),
              className: `form-check-input ${hasError ? "is-invalid" : ""}`,
              required
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-check-label", htmlFor: name, children: field.checkboxLabel || label })
        ] });
        break;
      case "number":
        fieldElement = /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            placeholder,
            ...commonProps,
            onChange: (e) => handleFieldChange(name, parseFloat(e.target.value) || 0)
          }
        );
        break;
      case "custom":
        if (field.render) {
          fieldElement = field.render(value, (newValue) => handleFieldChange(name, newValue), formData);
        } else {
          fieldElement = /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Custom field render function not provided" });
        }
        break;
      case "relation":
        fieldElement = /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted", children: "Relation fields are not supported in this version" });
        break;
      default:
        fieldElement = /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted", children: [
          "Unknown field type: ",
          type
        ] });
        break;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      type !== "checkbox" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: name, className: "form-label", children: [
        label,
        " ",
        required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger", children: "*" })
      ] }),
      fieldElement,
      helpText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-text", children: helpText }),
      hasError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "invalid-feedback d-block", children: hasError })
    ] }, name);
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal d-block", style: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `modal-dialog ${modalWidth}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "modal-title", children: config.title || (data ? "Edit Entity" : "Create Entity") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "btn-close",
          onClick: handleClose,
          disabled: saving
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-body", children: [
      errors.general && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert alert-danger", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-exclamation-triangle me-2" }),
        errors.general
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        handleSave();
      }, children: [
        (_a = config.fields) == null ? void 0 : _a.map((field) => renderField(field)),
        config.customRender && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: (() => {
          console.log("🔍 DynamicModal calling customRender:", { hasData: !!data, formDataId: formData == null ? void 0 : formData.id });
          return config.customRender(formData, handleFieldChange, !!data);
        })() })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "btn btn-secondary",
          onClick: handleClose,
          disabled: saving,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "btn btn-primary",
          onClick: handleSave,
          disabled: saving || loading,
          children: [
            saving && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spinner-border spinner-border-sm me-2" }),
            data ? "Update" : "Create"
          ]
        }
      )
    ] })
  ] }) }) });
};
const DynamicStory = ({
  show = false,
  title = "Edit Story",
  config = {},
  entityData = null,
  onSave = null,
  onCancel = null,
  loading = false
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [asyncOptions, setAsyncOptions] = useState({});
  const [loadingOptions, setLoadingOptions] = useState({});
  const editorRef = useRef(null);
  const {
    fields = [],
    entityType = "story",
    editorConfig = null,
    customValidation = null
  } = config;
  useEffect(() => {
    if (entityData) {
      setFormData({ ...entityData });
    } else {
      const defaultData = {};
      fields.forEach((field) => {
        defaultData[field.name] = field.defaultValue || "";
      });
      setFormData(defaultData);
    }
    setErrors({});
  }, [entityData, fields]);
  useEffect(() => {
    fields.forEach((field) => {
      if (field.async && field.loadOptions) {
        loadAsyncOptions(field.name, field.loadOptions);
      }
    });
  }, [fields]);
  const hasContentField = () => {
    return fields.some((field) => field.type === "editor");
  };
  const handleEditorChange = async () => {
    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        handleInputChange("content", outputData);
      } catch (error) {
        console.error("Saving failed:", error);
      }
    }
  };
  const loadAsyncOptions = async (fieldName, loadOptionsFn) => {
    if (!loadOptionsFn || asyncOptions[fieldName]) return;
    setLoadingOptions((prev) => ({ ...prev, [fieldName]: true }));
    try {
      const options = await loadOptionsFn();
      setAsyncOptions((prev) => ({ ...prev, [fieldName]: options }));
    } catch (error) {
      console.error(`Error loading options for ${fieldName}:`, error);
    } finally {
      setLoadingOptions((prev) => ({ ...prev, [fieldName]: false }));
    }
  };
  const handleInputChange = (fieldName, value) => {
    let processedValue = value;
    const field = fields.find((f) => f.name === fieldName);
    if (field && field.type === "number") {
      if (value === "" || value === null || value === void 0) {
        processedValue = field.defaultValue || 0;
      } else {
        processedValue = parseInt(value) || field.defaultValue || 0;
      }
    }
    setFormData((prev) => ({
      ...prev,
      [fieldName]: processedValue
    }));
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && (!formData[field.name] || formData[field.name] === "")) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    if (customValidation) {
      const customErrors = customValidation(formData);
      Object.assign(newErrors, customErrors);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    setSaving(true);
    try {
      let finalData = { ...formData };
      if (hasContentField() && editorRef.current) {
        const editorData = await editorRef.current.save();
        finalData.content = editorData;
      }
      let dataToSave = finalData;
      if (config.onBeforeSave) {
        dataToSave = config.onBeforeSave(finalData);
      }
      if (onSave) {
        await onSave(dataToSave);
      } else {
        console.error("DynamicStory: No onSave function provided");
      }
    } catch (error) {
      console.error("DynamicStory: Save failed:", error);
      setErrors({ general: error.message || "Save failed. Please try again." });
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const panels = config.panels || {};
  const groupedFields = {};
  Object.keys(panels).forEach((panelKey) => {
    groupedFields[panelKey] = [];
  });
  fields.forEach((field) => {
    if (field.panel && panels[field.panel]) {
      groupedFields[field.panel].push(field);
    } else if (field.group && panels[field.group]) {
      groupedFields[field.group].push(field);
    } else if (panels.main) {
      groupedFields.main.push(field);
    }
  });
  const renderField = (field) => {
    const value = formData[field.name] || "";
    const hasError = errors[field.name];
    if (formData._isLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SkeletonField,
        {
          type: field.type,
          label: true,
          helpText: field.helpText,
          rows: field.rows
        },
        field.name
      );
    }
    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: field.type,
            className: `form-control ${hasError ? "is-invalid" : ""}`,
            value: value || "",
            placeholder: field.placeholder,
            onChange: (e) => handleInputChange(field.name, e.target.value)
          }
        );
      case "number":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            className: `form-control ${hasError ? "is-invalid" : ""}`,
            value: value || "",
            placeholder: field.placeholder || "0",
            min: field.min || 0,
            step: field.step || 1,
            onChange: (e) => handleInputChange(field.name, e.target.value)
          }
        );
      case "textarea":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: `form-control ${hasError ? "is-invalid" : ""}`,
            rows: field.rows || 3,
            value,
            placeholder: field.placeholder,
            onChange: (e) => handleInputChange(field.name, e.target.value)
          }
        );
      case "select":
        const options = field.async ? asyncOptions[field.name] || [] : field.options || [];
        const isLoading = loadingOptions[field.name];
        if (field.async && field.loadOptions && !asyncOptions[field.name] && !isLoading) {
          loadAsyncOptions(field.name, field.loadOptions);
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: `form-select ${hasError ? "is-invalid" : ""}`,
              value,
              onChange: (e) => handleInputChange(field.name, e.target.value),
              disabled: isLoading,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: field.placeholder || "Select..." }),
                options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
              ]
            }
          ),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "text-muted", children: "Loading options..." })
        ] });
      case "checkbox":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-check", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              className: "form-check-input",
              checked: !!value,
              onChange: (e) => handleInputChange(field.name, e.target.checked)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-check-label", children: field.checkboxLabel || field.label })
        ] });
      case "editor":
        const editorData = typeof value === "object" ? value : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "story-editor-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditorJs,
          {
            ref: editorRef,
            holderId: (editorConfig == null ? void 0 : editorConfig.holderId) || "story-content-editor",
            data: editorData,
            placeholder: (editorConfig == null ? void 0 : editorConfig.placeholder) || "Start writing your story...",
            onChange: handleEditorChange,
            customTools: (editorConfig == null ? void 0 : editorConfig.tools) || {},
            className: "dynamic-story-editor"
          }
        ) });
      case "file":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "file-upload-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              className: `form-control ${hasError ? "is-invalid" : ""}`,
              accept: field.accept || "*",
              onChange: (e) => handleInputChange(field.name, e.target.files[0])
            }
          ),
          value && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "text-muted", children: [
            "Current file: ",
            typeof value === "string" ? value : value == null ? void 0 : value.name
          ] }) })
        ] });
      case "custom":
        return field.render ? field.render(value, (newValue) => handleInputChange(field.name, newValue), formData) : null;
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            className: `form-control ${hasError ? "is-invalid" : ""}`,
            value,
            placeholder: field.placeholder,
            onChange: (e) => handleInputChange(field.name, e.target.value)
          }
        );
    }
  };
  const renderSidebarPanel = (title2, fields2, show2 = true, panelKey = null) => {
    if (!show2 || fields2.length === 0) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "story-panel-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "story-panel-title", children: title2.toUpperCase() }),
      fields2.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group mb-3", children: [
        field.type !== "checkbox" && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: field.label }),
        renderField(field),
        field.helpText && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "form-text text-muted", children: field.helpText }),
        errors[field.name] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "invalid-feedback d-block", children: errors[field.name] })
      ] }, field.name))
    ] }, panelKey || title2);
  };
  if (!show) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dynamic-story-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dynamic-story-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "story-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "story-header-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "btn btn-link story-back-btn",
            onClick: handleCancel,
            disabled: saving,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-chevron-left me-2" }),
              "BACK"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "story-title", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "story-header-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn btn-primary story-save-btn",
          onClick: handleSave,
          disabled: saving || loading,
          children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-spinner fa-spin me-1" }),
            "SAVING..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-save me-1" }),
            "SAVE"
          ] })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "story-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "story-main", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "story-content", children: [
        errors.general && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "alert alert-danger mb-3", children: errors.general }),
        Object.keys(panels).map((panelKey) => {
          const panel = panels[panelKey];
          if (!panel.showInMain || !groupedFields[panelKey] || groupedFields[panelKey].length === 0) {
            return null;
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "story-main-panel", children: groupedFields[panelKey].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "story-field mb-4", children: [
            field.type !== "editor" && field.type !== "custom" && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "story-field-label", children: field.label }),
            renderField(field),
            field.helpText && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "form-text text-muted mt-1", children: field.helpText }),
            errors[field.name] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "invalid-feedback d-block", children: errors[field.name] })
          ] }, field.name)) }, panelKey);
        })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "story-sidebar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "story-sidebar-content", children: Object.keys(panels).map((panelKey) => {
        const panel = panels[panelKey];
        if (!panel.showInSidebar || !groupedFields[panelKey] || groupedFields[panelKey].length === 0) {
          return null;
        }
        return renderSidebarPanel(panel.title, groupedFields[panelKey], true, panelKey);
      }) }) })
    ] })
  ] }) });
};
const EntityTable = forwardRef(({
  data = [],
  config = {},
  loading = false
}, ref) => {
  const entities = Array.isArray(data) ? data : data.data || [];
  const pagination = data.pagination || null;
  const [searchTerm, setSearchTerm] = useState(config.currentSearch || "");
  const [filters, setFilters] = useState(config.currentFilters || {});
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  const [editorLoading, setEditorLoading] = useState(false);
  const {
    tableId = "entity-table",
    entityType = "entity",
    emptyMessage = "No items found.",
    enableSearch = false,
    columns = [],
    filters: filterOptions = [],
    actionHandlers = {},
    disableEdit = false,
    disableDelete = false,
    disableCreate = false,
    showViewButton = false,
    viewUrl = null,
    customActions = [],
    conditionalEdit = null,
    conditionalDelete = null,
    onSearch = null,
    onPageChange = null,
    onPageSizeChange = null,
    // Editor configuration
    editorType = "page",
    // 'page', 'modal', 'story'
    editorConfig = {},
    onLoadEntity = null,
    onSaveEntity = null
  } = config;
  const debouncedSearch = useCallback(() => {
    if (onSearch) {
      onSearch(searchTerm, filters);
    }
  }, [searchTerm, filters, onSearch]);
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      debouncedSearch();
    }, 500);
    setSearchTimeout(timeout);
  };
  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[field] = value;
    } else {
      delete newFilters[field];
    }
    setFilters(newFilters);
    if (onSearch) {
      onSearch(searchTerm, newFilters);
    }
  };
  const handleSearchClick = () => {
    debouncedSearch();
  };
  const handleClearSearch = () => {
    setSearchTerm("");
    setFilters({});
    if (onSearch) {
      onSearch("", {});
    }
  };
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      debouncedSearch();
    }
  };
  const handleEdit = async (type, id) => {
    setShowEditor(true);
    if (id && onLoadEntity) {
      setEditorLoading(true);
      setEditingEntity({ id, _isLoading: true });
      try {
        const entityData = await onLoadEntity(id);
        setEditingEntity(entityData);
      } catch (error) {
        console.error("Error loading entity:", error);
        setEditingEntity(null);
      } finally {
        setEditorLoading(false);
      }
    } else {
      setEditingEntity(null);
    }
  };
  const handleCreateNew = () => {
    setEditingEntity(null);
    setShowEditor(true);
  };
  const handleSaveEntity = async (entityData) => {
    if (onSaveEntity) {
      try {
        await onSaveEntity(entityData, (editingEntity == null ? void 0 : editingEntity.id) || null);
        setShowEditor(false);
        setEditingEntity(null);
      } catch (error) {
        console.error("EntityTable: Error saving entity:", error);
      }
    } else {
      console.error("EntityTable: No onSaveEntity function provided");
    }
  };
  useImperativeHandle(ref, () => ({
    handleCreateNew,
    handleEdit
  }));
  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingEntity(null);
  };
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);
  const enhancedActionHandlers = {
    ...actionHandlers,
    edit: (type, id) => {
      if (editorConfig && editorConfig.fields) {
        handleEdit(type, id);
      } else if (actionHandlers.edit) {
        actionHandlers.edit(type, id);
      }
    }
  };
  const renderTableCell = (entity, column) => {
    const value = getNestedProperty(entity, column.field);
    switch (column.type) {
      case "text":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: value || "-" });
      case "text-with-subtitle":
        const subtitle = getNestedProperty(entity, column.subtitleField);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: value || "-" }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "text-muted", children: subtitle })
          ] })
        ] });
      case "badge":
        const badgeClass = column.badgeClass ? column.badgeClass(value) : "bg-secondary";
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${badgeClass}`, children: value || "-" });
      case "badge-with-color":
        const bgColor = getNestedProperty(entity, column.colorField) || "#6c757d";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "badge rounded-pill",
            style: { backgroundColor: bgColor },
            children: value || "-"
          }
        );
      case "user-name":
        const firstName = getNestedProperty(entity, "author.first_name");
        const lastName = getNestedProperty(entity, "author.last_name");
        return firstName && lastName ? `${firstName} ${lastName}` : "-";
      case "date":
        return value ? new Date(value).toLocaleDateString() : "-";
      case "code":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
          "/",
          value
        ] });
      case "system-badge":
        return entity.is_system ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge bg-info ms-2", children: "System" }) : "";
      case "custom":
        return column.render ? column.render(entity, value) : value || "-";
      default:
        return value || "-";
    }
  };
  const renderActionButtons = (entity) => {
    const buttons = [];
    if (!disableEdit && (!conditionalEdit || conditionalEdit(entity))) {
      buttons.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-sm btn-primary me-1",
            onClick: () => enhancedActionHandlers.edit && enhancedActionHandlers.edit(entityType, entity.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-edit" })
          },
          "edit"
        )
      );
    }
    if (showViewButton && viewUrl) {
      const url = typeof viewUrl === "function" ? viewUrl(entity) : viewUrl.replace(":id", entity.id);
      buttons.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: url,
            target: "_blank",
            className: "btn btn-sm btn-secondary me-1",
            rel: "noreferrer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-eye" })
          },
          "view"
        )
      );
    }
    if (!disableDelete && (!conditionalDelete || conditionalDelete(entity))) {
      buttons.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-sm btn-danger",
            onClick: () => enhancedActionHandlers.delete && enhancedActionHandlers.delete(entityType, entity.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-trash" })
          },
          "delete"
        )
      );
    }
    if (customActions) {
      customActions.forEach((action, index) => {
        if (!action.condition || action.condition(entity)) {
          buttons.push(
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: `btn btn-sm ${action.class || "btn-outline-primary"} me-1`,
                onClick: () => enhancedActionHandlers[action.action] && enhancedActionHandlers[action.action](entityType, entity.id),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: action.icon }),
                  " ",
                  action.label || ""
                ]
              },
              `custom-${index}`
            )
          );
        }
      });
    }
    return buttons;
  };
  const getNestedProperty = (obj, path) => {
    if (!path || typeof path !== "string") return null;
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== void 0 ? current[key] : null;
    }, obj);
  };
  const renderSearchAndFilters = () => {
    if (!enableSearch && !filterOptions.length) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mb-3", children: [
      enableSearch && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            className: "form-control",
            placeholder: "Search in all fields...",
            value: searchTerm,
            onChange: (e) => handleSearchChange(e.target.value),
            onKeyPress: handleSearchKeyPress
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-outline-secondary",
            type: "button",
            onClick: handleSearchClick,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-search" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-outline-secondary",
            type: "button",
            onClick: handleClearSearch,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-times" })
          }
        )
      ] }) }),
      filterOptions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: enableSearch ? "col-md-8" : "col-md-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row g-2", children: [
          filterOptions.map((filter) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-4 col-lg-3", children: filter.type === "select" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "form-select form-control-sm",
              value: filters[filter.field] || "",
              onChange: (e) => handleFilterChange(filter.field, e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: filter.placeholder || `All ${filter.label}` }),
                filter.options && filter.options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
              ]
            }
          ) : filter.type === "date" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "form-control form-control-sm",
              value: filters[filter.field] || "",
              onChange: (e) => handleFilterChange(filter.field, e.target.value)
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "form-control form-control-sm",
              placeholder: filter.placeholder || `Filter by ${filter.label}`,
              value: filters[filter.field] || "",
              onChange: (e) => handleFilterChange(filter.field, e.target.value)
            }
          ) }, filter.field)),
          Object.keys(filters).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-md-4 col-lg-3 d-flex align-items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn btn-outline-secondary btn-sm",
              onClick: handleClearSearch,
              title: "Clear all filters",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-filter-circle-xmark me-1" }),
                "Clear Filters"
              ]
            }
          ) })
        ] }),
        Object.keys(filters).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-filter me-1" }),
          "Active filters: ",
          Object.keys(filters).map((field) => {
            const filter = filterOptions.find((f) => f.field === field);
            const value = filters[field];
            return `${(filter == null ? void 0 : filter.label) || field}: ${value}`;
          }).join(", ")
        ] }) }) })
      ] })
    ] });
  };
  const renderPagination = () => {
    if (!pagination || pagination.pages <= 1) return null;
    const { page, pages, total, limit } = pagination;
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex justify-content-between align-items-center mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted me-3", children: [
          "Showing ",
          startItem,
          "-",
          endItem,
          " of ",
          total,
          " items"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "form-select form-select-sm",
            style: { width: "auto" },
            value: limit,
            onChange: (e) => onPageSizeChange && onPageSizeChange(parseInt(e.target.value)),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "20", children: "20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "50", children: "50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "100", children: "100" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted ms-2", children: "per page" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "pagination pagination-sm mb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: `page-item ${page === 1 ? "disabled" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "page-link",
            disabled: page === 1,
            onClick: () => onPageChange && onPageChange(1),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-angle-double-left" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: `page-item ${page === 1 ? "disabled" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "page-link",
            disabled: page === 1,
            onClick: () => onPageChange && onPageChange(page - 1),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-angle-left" })
          }
        ) }),
        pageNumbers.map((pageNum) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "li",
          {
            className: `page-item ${pageNum === page ? "active" : ""}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "page-link",
                onClick: () => onPageChange && onPageChange(pageNum),
                children: pageNum
              }
            )
          },
          pageNum
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: `page-item ${page === pages ? "disabled" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "page-link",
            disabled: page === pages,
            onClick: () => onPageChange && onPageChange(page + 1),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-angle-right" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: `page-item ${page === pages ? "disabled" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "page-link",
            disabled: page === pages,
            onClick: () => onPageChange && onPageChange(pages),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-angle-double-right" })
          }
        ) })
      ] }) })
    ] });
  };
  const renderEditor = () => {
    if (!showEditor || !editorConfig) return null;
    console.log("editorConfig", editorConfig);
    console.log("editorType", editorType);
    switch (editorType) {
      case "page":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          DynamicPage,
          {
            show: showEditor,
            title: editorConfig.title || `${editingEntity ? "Edit" : "Create"} ${entityType}`,
            config: editorConfig,
            entityData: editingEntity,
            onSave: handleSaveEntity,
            onCancel: handleCancelEdit,
            loading: editorLoading
          }
        );
      case "modal":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          DynamicModal,
          {
            isOpen: showEditor,
            onClose: handleCancelEdit,
            onSave: handleSaveEntity,
            data: editingEntity,
            config: editorConfig,
            loading: editorLoading,
            modalWidth: editorConfig.modalWidth
          }
        );
      case "story":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          DynamicStory,
          {
            show: showEditor,
            title: editorConfig.title || `${entityType} Editor`,
            config: editorConfig,
            entityData: editingEntity,
            onSave: handleSaveEntity,
            onCancel: handleCancelEdit,
            loading
          }
        );
      default:
        return null;
    }
  };
  if (!entities.length && !loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "table-responsive", children: [
        renderSearchAndFilters(),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert alert-info text-center py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-search fa-2x text-muted mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h5", children: emptyMessage }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0", children: searchTerm || Object.keys(filters).length > 0 ? "Try adjusting your search criteria or clear the filters to see all items." : "Create your first item using the button above." })
        ] }),
        pagination && renderPagination()
      ] }),
      renderEditor()
    ] });
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "table-responsive", children: [
        renderSearchAndFilters(),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner-border text-primary", role: "status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "visually-hidden", children: "Loading..." }) }) })
      ] }),
      renderEditor()
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "table-responsive", children: [
      renderSearchAndFilters(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "table table-hover", id: tableId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          columns.map((col, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: col.header }, index)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: entities.map((entity) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          columns.map((col, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: renderTableCell(entity, col) }, index)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: renderActionButtons(entity) })
        ] }, entity.id)) })
      ] }),
      pagination && renderPagination()
    ] }),
    renderEditor()
  ] });
});
const Admin = ({ entities = [], customRoutes = [] }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.user);
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };
  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setMobileSidebarOpen(false);
  };
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  const renderEntitySection = (entity) => {
    if (entity.component) {
      const EntityComponent = entity.component;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(EntityComponent, {});
    }
    console.log("Entity", entity);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `${entity.icon || "fas fa-table"} me-2` }),
          entity.label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: entity.description || `Manage your ${entity.label.toLowerCase()}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EntityTable,
        {
          data: entity.data || [],
          config: entity.config || {},
          loading: entity.loading || false
        }
      ) }) })
    ] });
  };
  const renderCurrentSection = () => {
    const customEntity = entities.find((entity) => entity.key === currentSection);
    if (customEntity) {
      return renderEntitySection(customEntity);
    }
    switch (currentSection) {
      case "dashboard":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-tachometer-alt me-2" }),
              "Dashboard"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Welcome to your admin panel overview" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bienvenido al panel de administración. Aquí se implementarán todas las funcionalidades del CMS." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert alert-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-info-circle me-2" }),
              "Este es un componente temporal. Según las reglas del proyecto, aquí se implementará el admin completo con todas las entidades del sistema."
            ] })
          ] }) }) }) })
        ] });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "content-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert alert-danger", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-exclamation-triangle me-2" }),
          "Sección no encontrada: ",
          currentSection
        ] }) });
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex justify-content-center align-items-center vh-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner-border", role: "status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "visually-hidden", children: "Loading..." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-app", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Navbar,
      {
        user,
        onLogout: handleLogout,
        onToggleMobileSidebar: toggleMobileSidebar
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Sidebar,
        {
          currentSection,
          onSectionChange: handleSectionChange,
          mobileSidebarOpen,
          userPermissions: (user == null ? void 0 : user.permissions) || [],
          entities
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "admin-content", children: renderCurrentSection() })
    ] }),
    mobileSidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mobile-sidebar-overlay",
        onClick: () => setMobileSidebarOpen(false)
      }
    )
  ] });
};
const createEntity = ({
  key,
  label,
  icon = "fas fa-table",
  group = "Custom",
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
const createColumn = ({
  key,
  label,
  type = "text",
  sortable = true,
  searchable = false,
  render = null,
  className = "",
  width = null,
  subtitleField = null,
  badgeClass = null,
  colorField = null
}) => {
  return {
    field: key,
    // EntityTable expects 'field' instead of 'key'
    header: label,
    // EntityTable expects 'header' instead of 'label'
    type,
    sortable,
    searchable,
    render,
    className,
    width,
    subtitleField,
    // For text-with-subtitle type
    badgeClass,
    // For badge type
    colorField
    // For badge-with-color type
  };
};
const createAction = ({
  key,
  label,
  icon,
  variant = "primary",
  handler,
  condition = null,
  confirm = false,
  confirmMessage = "Are you sure?"
}) => {
  const classMap = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark"
  };
  return {
    action: key,
    // EntityTable expects 'action' instead of 'key'
    label,
    icon,
    class: classMap[variant] || "btn-primary",
    // EntityTable expects 'class' instead of 'variant'
    handler,
    condition,
    confirm,
    confirmMessage
  };
};
const createFilter = ({
  field,
  label,
  type = "select",
  options = [],
  multiple = false,
  defaultValue = null,
  placeholder = ""
}) => {
  return {
    field,
    // EntityTable expects 'field' instead of 'key'
    label,
    type,
    options,
    multiple,
    defaultValue,
    placeholder
    // EntityTable uses placeholder for filter options
  };
};
const createEntityTableConfig = ({
  tableId = "entity-table",
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
  editorType = "page",
  editorConfig = {},
  onLoadEntity = null,
  onSaveEntity = null,
  onSearch = null,
  onPageChange = null,
  onPageSizeChange = null,
  emptyMessage = "No items found."
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
const createRoute = ({
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
const commonEntityGroups = {
  CONTENT: "Content",
  USERS: "Users",
  SYSTEM: "System",
  CUSTOM: "Custom"
};
const commonIcons = {
  USERS: "fas fa-users",
  USER: "fas fa-user",
  SETTINGS: "fas fa-cog",
  DASHBOARD: "fas fa-tachometer-alt",
  CONTENT: "fas fa-file-alt",
  TABLE: "fas fa-table",
  EDIT: "fas fa-edit",
  DELETE: "fas fa-trash",
  VIEW: "fas fa-eye",
  ADD: "fas fa-plus",
  SAVE: "fas fa-save",
  CANCEL: "fas fa-times"
};
class EntityService {
  constructor(entityConfig = {}) {
    this.entityName = entityConfig.entityName || "entity";
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
      const url = endpoint.startsWith("http") ? endpoint : `${this.baseUrl}${endpoint}`;
      const defaultOptions = {
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
        // Include cookies for JWT
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
      const affiliateId = localStorage.getItem("currentAffiliateId");
      return affiliateId ? parseInt(affiliateId) : null;
    } catch (error) {
      console.error("Error getting affiliate ID from localStorage:", error);
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
    if (params.page) queryParams.append("page", params.page);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.search) queryParams.append("search", params.search);
    const affiliateId = this.getCurrentAffiliateId();
    if (affiliateId) {
      queryParams.append("affiliate_id", affiliateId);
    }
    if (this.config.filters) {
      this.config.filters.forEach((filter) => {
        if (params[filter]) queryParams.append(filter, params[filter]);
      });
    }
    const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : "";
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
    if (this.config.validation) {
      const validationErrors = this.validateEntityData(data);
      if (Object.keys(validationErrors).length > 0) {
        throw new Error(Object.values(validationErrors)[0]);
      }
    }
    const affiliateId = this.getCurrentAffiliateId();
    const entityData = affiliateId ? { ...data, affiliate_id: affiliateId } : data;
    return await this.makeRequest("", {
      method: "POST",
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
    if (this.config.validation) {
      const validationErrors = this.validateEntityData(data, true);
      if (Object.keys(validationErrors).length > 0) {
        throw new Error(Object.values(validationErrors)[0]);
      }
    }
    const affiliateId = this.getCurrentAffiliateId();
    const entityData = affiliateId ? { ...data, affiliate_id: affiliateId } : data;
    return await this.makeRequest(`/${id}`, {
      method: "PUT",
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
        method: "DELETE"
      });
    }
    return await this.makeRequest(`/${id}`, {
      method: "DELETE"
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
      if (rules.required && (!value || typeof value === "string" && !value.trim())) {
        errors[field] = rules.message || `${field} is required`;
        return;
      }
      if (rules.email && value && !this.isValidEmail(value)) {
        errors[field] = rules.message || "Invalid email format";
        return;
      }
      if (rules.validator && typeof rules.validator === "function") {
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
    if (!name) return "";
    return name.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim("-");
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
      method: "POST",
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
      method: "PUT",
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
      method: "DELETE"
    });
  }
  /**
   * Get current user info (if applicable)
   * @returns {Promise<object>} Current user data
   */
  async getCurrentUser() {
    try {
      const response = await fetch("/api/admin/auth/current-user", {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        return data.success ? data.data : null;
      }
      return null;
    } catch (error) {
      console.error("Error fetching current user:", error);
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
function createAutoEntity(config) {
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
    editorType = "page",
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
  const {
    show = true,
    // Show by default
    text = `Add New ${label}`,
    icon: buttonIcon = "fas fa-plus",
    className = "btn btn-primary",
    disabled = false,
    tooltip = `Create a new ${label.toLowerCase()}`
  } = createButton;
  const service = EntityService.createForEntity({
    entityName,
    baseUrl: baseUrl || `/api/admin/${entityName}`,
    validation,
    defaultData,
    filters,
    options,
    formatForDisplay
  });
  const EntityComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [currentSearch, setCurrentSearch] = useState("");
    const [currentFilters, setCurrentFilters] = useState({});
    const { currentAffiliate, isAffiliateSelected } = useAffiliate();
    const tableRef = useRef();
    const loadData = async (params = {}) => {
      if (!isAffiliateSelected()) {
        console.log(`No affiliate selected, skipping ${entityName} data load`);
        setData([]);
        setPagination(null);
        return;
      }
      setLoading(true);
      try {
        const requestParams = {
          page: currentPage,
          limit: pageSize,
          search: currentSearch,
          ...currentFilters,
          ...params
        };
        console.log(`Loading ${entityName} data from ${service.baseUrl} for affiliate ${currentAffiliate == null ? void 0 : currentAffiliate.id}...`, requestParams);
        const response = await service.get(requestParams);
        console.log(`${entityName} response:`, response);
        if (response && response.success) {
          setData(response.data || []);
          setPagination(response.pagination || null);
          if (params.page !== void 0) setCurrentPage(params.page);
          if (params.limit !== void 0) setPageSize(params.limit);
          if (params.search !== void 0) setCurrentSearch(params.search);
          if (params.filters !== void 0) setCurrentFilters(params.filters);
        } else {
          console.error(`Failed to load ${entityName}:`, (response == null ? void 0 : response.error) || "Unknown error");
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
    useEffect(() => {
      if (isAffiliateSelected()) {
        loadData();
      }
    }, [currentAffiliate == null ? void 0 : currentAffiliate.id]);
    useEffect(() => {
      const handleAffiliateChange = () => {
        if (isAffiliateSelected()) {
          loadData();
        }
      };
      window.addEventListener("affiliateChanged", handleAffiliateChange);
      return () => window.removeEventListener("affiliateChanged", handleAffiliateChange);
    }, []);
    const handlePageChange = (page) => {
      loadData({ page });
    };
    const handlePageSizeChange = (newLimit) => {
      loadData({ page: 1, limit: newLimit });
    };
    const handleSearch = (searchTerm, filters2) => {
      loadData({ page: 1, search: searchTerm, filters: filters2 });
    };
    const handleCreate = async (entityData) => {
      try {
        const response = await service.create(entityData);
        if (response && response.success) {
          setData((prev) => [...prev, response.data]);
          return response.data;
        } else {
          throw new Error((response == null ? void 0 : response.error) || "Create failed");
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
          setData((prev) => prev.map(
            (item) => item.id === id ? response.data : item
          ));
          return response.data;
        } else {
          throw new Error((response == null ? void 0 : response.error) || "Update failed");
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
          setData((prev) => prev.filter((item) => item.id !== id));
          return true;
        } else {
          throw new Error((response == null ? void 0 : response.error) || "Delete failed");
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
          throw new Error((response == null ? void 0 : response.error) || "Get by ID failed");
        }
      } catch (error) {
        console.error(`Error getting ${entityName} by ID:`, error);
        throw error;
      }
    };
    const actionHandlers = {
      create: customHandlers.create || (() => {
        if (editorConfig && editorConfig.fields) {
          return null;
        } else {
          const defaultData2 = service.getDefaultEntityData();
          const name = prompt(`Enter ${entityName} name:`);
          if (name) {
            return handleCreate({ ...defaultData2, name });
          }
        }
      }),
      edit: customHandlers.edit || ((type, id) => {
        if (editorConfig && editorConfig.fields) {
          return null;
        } else {
          const item = data.find((d) => d.id === id);
          if (item) {
            const name = prompt(`Edit ${entityName} name:`, item.name);
            if (name && name !== item.name) {
              return handleUpdate(id, { ...item, name });
            }
          }
        }
      }),
      delete: customHandlers.delete || ((type, id) => {
        const item = data.find((d) => d.id === id);
        if (item && window.confirm(`¿Estás seguro de eliminar "${item.name || `${entityName} ${id}`}"?`)) {
          return handleDelete(id);
        }
      }),
      // Search and filtering
      search: customHandlers.search || ((searchTerm, filters2) => {
        loadData({ search: searchTerm, ...filters2 });
      }),
      // Custom handlers
      ...customHandlers
    };
    const handleCreateNew = () => {
      if (tableRef.current && tableRef.current.handleCreateNew) {
        tableRef.current.handleCreateNew();
      }
    };
    const handleSaveEntity = async (entityData, id) => {
      try {
        let response;
        if (id) {
          response = await handleUpdate(id, entityData);
        } else {
          response = await handleCreate(entityData);
        }
        if (response) {
          loadData();
        }
        return response;
      } catch (error) {
        console.error(`Error saving ${entityName}:`, error);
        throw error;
      }
    };
    const handleCancelEdit = () => {
    };
    const entityTableConfig = {
      entityType: entityName,
      columns: columns.length > 0 ? columns : getDefaultColumns(data[0]),
      enableSearch: true,
      // Enable search by default
      filters: [],
      // No default filters, only search
      actionHandlers,
      onSearch: handleSearch,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
      onLoadEntity: handleGetById,
      onSaveEntity: handleSaveEntity,
      onCancelEdit: handleCancelEdit,
      // Add editor configuration
      editorType,
      editorConfig,
      ...tableConfig
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "content-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `${icon || "fas fa-table"} me-2` }),
            label
          ] }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted mb-0", children: description })
        ] }),
        show && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className,
            onClick: handleCreateNew,
            disabled,
            title: tooltip,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `${buttonIcon} me-1` }),
              text
            ]
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EntityTable,
        {
          ref: tableRef,
          data: { data, pagination },
          config: entityTableConfig,
          loading
        }
      ) }) })
    ] });
  };
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
function getDefaultColumns(sampleData) {
  if (!sampleData) return [];
  const columns = [];
  const keys = Object.keys(sampleData);
  if (keys.includes("id")) {
    columns.push({
      field: "id",
      header: "ID",
      type: "text",
      width: "80px"
    });
  }
  if (keys.includes("name")) {
    columns.push({
      field: "name",
      header: "Name",
      type: "text"
    });
  }
  const commonFields = ["title", "email", "status", "description", "slug"];
  commonFields.forEach((field) => {
    if (keys.includes(field) && !columns.some((col) => col.field === field)) {
      columns.push({
        field,
        header: field.charAt(0).toUpperCase() + field.slice(1),
        type: field === "status" ? "badge" : "text"
      });
    }
  });
  const dateFields = ["created_at", "updated_at"];
  dateFields.forEach((field) => {
    if (keys.includes(field)) {
      columns.push({
        field,
        header: field === "created_at" ? "Created" : "Updated",
        type: "date"
      });
    }
  });
  return columns;
}
class ErrorBoundary extends require$$0.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "20px",
        maxWidth: "800px",
        margin: "50px auto",
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { color: "#dc3545", marginBottom: "20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-exclamation-triangle", style: { marginRight: "10px" } }),
          "Something went wrong"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginBottom: "20px", color: "#6c757d" }, children: "An error occurred while rendering the application. Please check the console for more details." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          border: "1px solid #dee2e6",
          marginBottom: "20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#495057", marginBottom: "10px" }, children: "Error Details:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: {
            fontSize: "12px",
            color: "#dc3545",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }, children: this.state.error && this.state.error.toString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "4px",
          border: "1px solid #dee2e6",
          marginBottom: "20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { color: "#495057", marginBottom: "10px" }, children: "Stack Trace:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: {
            fontSize: "11px",
            color: "#6c757d",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            maxHeight: "200px",
            overflow: "auto"
          }, children: this.state.errorInfo && this.state.errorInfo.componentStack })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => window.location.reload(),
              style: {
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-refresh", style: { marginRight: "5px" } }),
                "Reload Page"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => this.setState({ hasError: false, error: null, errorInfo: null }),
              style: {
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fas fa-retry", style: { marginRight: "5px" } }),
                "Try Again"
              ]
            }
          )
        ] })
      ] });
    }
    return this.props.children;
  }
}
function App({ entities = [] }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Login, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/admin/*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Admin, { entities }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/admin", replace: true }) })
  ] }) }) }) });
}
export {
  EntityService,
  commonEntityGroups,
  commonIcons,
  createAction,
  createAutoEntity,
  createColumn,
  createEntity,
  createEntityTableConfig,
  createFilter,
  createRoute,
  App as default
};
//# sourceMappingURL=index.mjs.map
