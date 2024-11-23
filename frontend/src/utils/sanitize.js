import DOMPurify from "dompurify";

/**
 * Sanitize input to prevent XSS attacks.
 * @param {string} input The input string to sanitize.
 * @returns {string} The sanitized input string.
 */
export const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input);
};

/**
 * Encode HTML output to safely render user-generated content.
 * @param {string} input The HTML content to be encoded.
 * @returns {string} The output encoded to avoid execution of malicious scripts.
 */
export const encodeOutput = (input) => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};
