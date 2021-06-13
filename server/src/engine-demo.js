/**
 * file: Project Engine File
 * date: 2021-06-09
 * author: Jubi
 * lastModify: Jubi 2021-06-09
 */
module.exports = {
    schemaTag: 'current',
    generateClientInfo: ({ request }) => {
      if (!request || !request.http) return {};
      const clientName = request.http.headers.get('client-name');
      const clientVersion = request.http.headers.get('client-version');
      return { clientName, clientVersion };
    },
  };