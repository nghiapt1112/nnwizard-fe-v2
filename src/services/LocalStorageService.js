const LocalStorageService = (function () {
  let _service;

  function _getService() {
    if (!_service) {
      _service = this;
      return _service
    }
    return _service
  }

  function _setToken(tokenObj) {
    localStorage.setItem('access_token', tokenObj.access_token);
    localStorage.setItem('refresh_token', tokenObj.refresh_token);
    localStorage.setItem('expires_in', tokenObj.expires_in);
  }

  function _getAccessToken() {
    return localStorage.getItem('access_token');
  }

  function _getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  function _getExpiresIn() {
    return localStorage.getItem('expires_in');
  }

  function _clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
  }

  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    getExpiresIn: _getExpiresIn,
    clearToken: _clearToken
  }
})();
export default LocalStorageService;
