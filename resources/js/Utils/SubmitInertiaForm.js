import { ToastContent } from '@/Components/Notification/Toast';

/**
 * Reusable helper to submit Inertia forms with shared error handling.
 *
 * @param {Event} event - Form event to prevent default submission.
 * @param {Object} options
 * @param {'post'|'patch'} options.method - HTTP verb to use.
 * @param {string} options.routeName - Named route to hit.
 * @param {any} [options.resource] - Route parameter (e.g., model identifier).
 * @param {Function} options.post - Inertia post helper from useForm.
 * @param {Function} options.patch - Inertia patch helper from useForm.
 */
export default function SubmitInertiaForm(event, { method, routeName, resource, post, patch }) {
  event.preventDefault();

  const config = {
    onError: (errors) => {
      if (errors) {
        ToastContent.error('Oops, something went wrong!');
      }
    }
  };

  const url = method === 'patch'
    ? route(routeName, resource)
    : route(routeName);

  return method === 'post'
    ? post(url, config)
    : patch(url, config);
}
