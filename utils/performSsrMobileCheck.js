import { computeIsMobileSsr } from './computeIsMobileSsr';

function performSsrMobileCheck(context) {
  const { request, response } = context;

  const isMobile = computeIsMobileSsr(request);

  if (!isMobile) {
    response.statusCode = 302;
    response.setHeader('Location', '/');
  }

  return;
}

export { performSsrMobileCheck };
