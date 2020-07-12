export function errorMessageFormatter(err: any): string {
  if (typeof err === 'string') {
    return err;
  }

  const status: any = {
    '-1': 'Server not found',
    400: 'Invalid data',
    401: 'Without permission of access',
    403: 'Without permission of access',
    404: 'Not found',
    422: 'Invalid data',
  };

  switch ((err || {}).message) {
    case 'no-internet':
    case 'NETWORK_ERROR':
      return 'Without internet connection';
    case 'api-error':
      if (err.status === -1) {
        return 'Unable to communicate with the server';
      }

      if (err.status === 400) {
        return `Invalid data: ${err.data?.message ? `: ${err.data?.message}` : ''}`;
      }

      return status[err.status] || 'Something went wrong...';
    default:
      return 'Something went wrong...';
  }
}
