export const transformErrorResponse = (resp: any): string => {
  const code = resp.statusCode || resp.status;
  const status = typeof code === 'string' ? ` [${resp.status}] ` : '';
  if (!resp) {
    return `ERROR:${status} No response received.`;
  }
  if (typeof resp === 'string') {
    return `${resp}${status}`;
  }
  if (resp?.data) {
    if (Array.isArray(resp.data.message)) {
      return status + resp.data.message.join('\n');
    }
    if (typeof resp.data.message === 'string') {
      return status + resp.data.message;
    }
    if (typeof resp.data === 'object') {
      return status + JSON.stringify(resp.data);
    }
    if (typeof resp.data === 'string') {
      return resp.data;
    }
  }
  if (typeof resp === 'object') {
    return status + JSON.stringify(resp);
  }
  return `ERROR:${status} No response received.`;
};
