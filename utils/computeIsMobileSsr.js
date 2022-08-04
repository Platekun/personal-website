import computeIsMobile from 'ismobilejs';

export function computeIsMobileSsr(request) {
  return computeIsMobile(request.headers['user-agent']).any;
}
