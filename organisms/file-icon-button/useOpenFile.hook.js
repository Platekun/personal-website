function useOpenFile({ onOpenFile, fileIdAttribute = 'data-file-id' }) {
  const openFileWithMouse = (event) => {
    const fileId = event.currentTarget.getAttribute(fileIdAttribute);

    onOpenFile(fileId);
  };

  const openFileWithKeyboard = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    const fileId = event.currentTarget.getAttribute(fileIdAttribute);

    onOpenFile(fileId);
  };

  return {
    openFileWithMouse,
    openFileWithKeyboard,
  };
}

export { useOpenFile };
