/**
 * CountBadge.jsx
 *
 * Reusable notification count badge (matching bell notification badge style):
 * - Hides completely when count is 0 or invalid/loading
 * - Shows "9+" when count > 9
 * - Circular/pill shape (~18-20px), red background (#dc2626), bold white text
 */

export default function CountBadge({ count, className = '', ...props }) {
  const num = typeof count === 'number' ? count : parseInt(count, 10);

  // Hide badge completely when count is 0, negative, undefined, or NaN
  if (!num || isNaN(num) || num <= 0) {
    return null;
  }

  const display = num > 9 ? '9+' : String(num);

  return (
    <span
      className={`count-badge ${className}`.trim()}
      aria-label={`${num} items needing attention`}
      {...props}
    >
      {display}
    </span>
  );
}
