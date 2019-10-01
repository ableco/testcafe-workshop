const getOrganizationUsername = request => {
    const requestUrl = request.url;
    const regex = new RegExp(`${process.env.API_URL}/([a-zA-Z0-9-]*)/`);
    return requestUrl.match(regex)[1];
  };
  
  export { getOrganizationUsername };