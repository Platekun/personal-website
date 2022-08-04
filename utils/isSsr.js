function isSsr() {
  return typeof window === 'undefined';
}

export { isSsr };
