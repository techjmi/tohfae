/* ======================== DESIGN TYPES ======================== */
export const DESIGN_TYPE = {
  TEXT: "text",
  IMAGE: "image",
  TEMPLATE: "template",
  CUSTOM: "custom",
  MIXED: "mixed",
};

/* ======================== DESIGN STATUS ======================== */
export const DESIGN_STATUS = {
  DRAFT: "draft",
  SAVED: "saved",
  SUBMITTED: "submitted",
  APPROVED: "approved",
  REJECTED: "rejected",
};

/* ======================== TEXT CUSTOMIZATION OPTIONS ======================== */
export const TEXT_FONT_FAMILY = {
  ARIAL: "Arial",
  HELVETICA: "Helvetica",
  TIMES_NEW_ROMAN: "Times New Roman",
  COURIER: "Courier",
  VERDANA: "Verdana",
  GEORGIA: "Georgia",
  COMIC_SANS: "Comic Sans MS",
  IMPACT: "Impact",
  PACIFICO: "Pacifico",
  ROBOTO: "Roboto",
  OPEN_SANS: "Open Sans",
};

export const TEXT_ALIGNMENT = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
  JUSTIFY: "justify",
};

/* ======================== DESIGN ELEMENT SCHEMA ======================== */
export const DESIGN_ELEMENT_SCHEMA = {
  id: { type: 'string', required: true },
  type: { type: 'string', required: true, enum: Object.values(DESIGN_TYPE) },
  
  // Position and dimensions
  position: {
    x: { type: 'number', required: true },
    y: { type: 'number', required: true },
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
    rotation: { type: 'number', optional: true, default: 0 },
    zIndex: { type: 'number', optional: true, default: 0 },
  },
  
  // Text-specific properties
  text: {
    content: { type: 'string', optional: true },
    fontFamily: { type: 'string', optional: true },
    fontSize: { type: 'number', optional: true },
    fontWeight: { type: 'string', optional: true },
    fontStyle: { type: 'string', optional: true },
    color: { type: 'string', optional: true },
    alignment: { type: 'string', optional: true },
    lineHeight: { type: 'number', optional: true },
  },
  
  // Image-specific properties
  image: {
    url: { type: 'string', optional: true },
    originalUrl: { type: 'string', optional: true },
    filters: { type: 'object', optional: true },
    opacity: { type: 'number', optional: true, min: 0, max: 1 },
  },
  
  // Common styling
  style: {
    backgroundColor: { type: 'string', optional: true },
    borderColor: { type: 'string', optional: true },
    borderWidth: { type: 'number', optional: true },
    borderRadius: { type: 'number', optional: true },
    opacity: { type: 'number', optional: true, min: 0, max: 1 },
    shadow: { type: 'object', optional: true },
  }
};

/* ======================== DESIGN SCHEMA ======================== */
export const DESIGN_SCHEMA = {
  designId: { type: 'string', required: true },
  userId: { type: 'string', required: true },
  productId: { type: 'string', required: true },
  productCategory: { type: 'string', required: true },
  
  name: { type: 'string', optional: true },
  status: { type: 'string', required: true, enum: Object.values(DESIGN_STATUS) },
  
  // Canvas/artboard settings
  canvas: {
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
    backgroundColor: { type: 'string', optional: true },
    backgroundImage: { type: 'string', optional: true },
  },
  
  // Design elements (text, images, shapes, etc.)
  elements: { type: 'array', required: true, items: DESIGN_ELEMENT_SCHEMA },
  
  // Preview/thumbnail
  preview: {
    thumbnailUrl: { type: 'string', optional: true },
    previewUrl: { type: 'string', optional: true },
  },
  
  // Metadata
  metadata: {
    createdAt: { type: 'date', required: true },
    updatedAt: { type: 'date', required: true },
    version: { type: 'number', optional: true, default: 1 },
  }
};

/* ======================== VALIDATION FUNCTIONS ======================== */

export const validateDesignElement = (element) => {
  const errors = [];
  
  if (!element?.id) errors.push('Element ID is required');
  if (!element?.type || !Object.values(DESIGN_TYPE).includes(element.type)) {
    errors.push('Valid element type is required');
  }
  
  if (!element?.position) {
    errors.push('Element position is required');
  } else {
    if (typeof element.position.x !== 'number') errors.push('Position x must be a number');
    if (typeof element.position.y !== 'number') errors.push('Position y must be a number');
    if (typeof element.position.width !== 'number' || element.position.width <= 0) {
      errors.push('Width must be a positive number');
    }
    if (typeof element.position.height !== 'number' || element.position.height <= 0) {
      errors.push('Height must be a positive number');
    }
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateDesign = (design) => {
  const errors = [];
  
  if (!design?.designId) errors.push('Design ID is required');
  if (!design?.userId) errors.push('User ID is required');
  if (!design?.productId) errors.push('Product ID is required');
  
  if (!design?.canvas) {
    errors.push('Canvas settings are required');
  } else {
    if (typeof design.canvas.width !== 'number' || design.canvas.width <= 0) {
      errors.push('Canvas width must be a positive number');
    }
    if (typeof design.canvas.height !== 'number' || design.canvas.height <= 0) {
      errors.push('Canvas height must be a positive number');
    }
  }

  if (!design?.elements || !Array.isArray(design.elements)) {
    errors.push('Design must have elements array');
  } else {
    design.elements.forEach((element, index) => {
      const elementValidation = validateDesignElement(element);
      if (!elementValidation.isValid) {
        errors.push(`Element ${index + 1}: ${elementValidation.errors.join(', ')}`);
      }
    });
  }

  return { isValid: errors.length === 0, errors };
};

/* ======================== API REQUEST/RESPONSE CONTRACTS ======================== */

/**
 * POST /api/designs - Create/Save design
 */
export const CREATE_DESIGN_REQUEST = {
  body: {
    productId: { type: 'string', required: true },
    productCategory: { type: 'string', required: true },
    name: { type: 'string', optional: true },
    canvas: { type: 'object', required: true },
    elements: { type: 'array', required: true },
    status: { type: 'string', optional: true, default: DESIGN_STATUS.DRAFT },
  }
};

export const CREATE_DESIGN_RESPONSE = {
  success: { type: 'boolean' },
  data: {
    designId: { type: 'string' },
    status: { type: 'string' },
    previewUrl: { type: 'string', optional: true },
  }
};

/**
 * GET /api/designs - Get user's designs
 */
export const GET_DESIGNS_REQUEST = {
  query: {
    productId: { type: 'string', optional: true },
    status: { type: 'string', optional: true, enum: Object.values(DESIGN_STATUS) },
    page: { type: 'number', optional: true, default: 1 },
    limit: { type: 'number', optional: true, default: 20 },
  }
};

export const GET_DESIGNS_RESPONSE = {
  success: { type: 'boolean' },
  data: {
    designs: { type: 'array', items: 'Design' },
    pagination: {
      currentPage: { type: 'number' },
      totalPages: { type: 'number' },
      totalItems: { type: 'number' },
    }
  }
};

/**
 * GET /api/designs/:designId - Get design by ID
 */
export const GET_DESIGN_BY_ID_REQUEST = {
  params: {
    designId: { type: 'string', required: true }
  }
};

export const GET_DESIGN_BY_ID_RESPONSE = {
  success: { type: 'boolean' },
  data: { type: 'Design' }
};

/**
 * PUT /api/designs/:designId - Update design
 */
export const UPDATE_DESIGN_REQUEST = {
  params: {
    designId: { type: 'string', required: true }
  },
  body: {
    name: { type: 'string', optional: true },
    canvas: { type: 'object', optional: true },
    elements: { type: 'array', optional: true },
    status: { type: 'string', optional: true },
  }
};

export const UPDATE_DESIGN_RESPONSE = {
  success: { type: 'boolean' },
  data: {
    designId: { type: 'string' },
    status: { type: 'string' },
    updatedAt: { type: 'date' },
  }
};

/**
 * DELETE /api/designs/:designId - Delete design
 */
export const DELETE_DESIGN_REQUEST = {
  params: {
    designId: { type: 'string', required: true }
  }
};

export const DELETE_DESIGN_RESPONSE = {
  success: { type: 'boolean' },
  message: { type: 'string' }
};

/**
 * POST /api/designs/:designId/preview - Generate preview
 */
export const GENERATE_PREVIEW_REQUEST = {
  params: {
    designId: { type: 'string', required: true }
  }
};

export const GENERATE_PREVIEW_RESPONSE = {
  success: { type: 'boolean' },
  data: {
    previewUrl: { type: 'string' },
    thumbnailUrl: { type: 'string' },
  }
};

