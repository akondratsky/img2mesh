export const fuse = (string) => {
  // eslint-disable-next-line
  neutronJavaScriptObject.executeQuery('send', JSON.stringify({
    obj: string
  }));
};
