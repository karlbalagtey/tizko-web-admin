import axios from 'axios';

const tizkoApiToken = () => {
    let inMemoryJWT = null;
    let logoutEventName = 'tizko-logout';
    let refreshTimeOutId;

    const timeNow = parseInt(Date.now().valueOf() / 1000);

    const setTokenTimeout = (expires) => {
        const expiresInSeconds = expires - timeNow; // 60 seconds
        const timer = expiresInSeconds * 100; // = 6000  (6 seconds for testing)

        refreshTimeOutId = setTimeout(getRefreshToken, timer);
    };

    const abortRefreshToken = () => {
        if (refreshTimeOutId) {
            clearTimeout(refreshTimeOutId);
        }
    };

    const getRefreshToken = () => {
        const URL = process.env.REACT_APP_API_URL + 'auth/refresh-tokens';

        return axios
            .post(URL, {}, { withCredentials: true })
            .then(({ data }) => {
                const { access, expires } = data;

                access && setToken(access, expires);
                return {
                    expires: expires,
                    now: timeNow,
                };
            });
    };

    const getToken = () => inMemoryJWT;

    const setToken = (token, expires) => {
        inMemoryJWT = token;
        setTokenTimeout(expires);
        return true;
    };

    const clearToken = () => {
        inMemoryJWT = null;
        abortRefreshToken();
        localStorage.setItem(logoutEventName, Date.now());
        return true;
    };

    // This listener allows to disconnect another session started in another tab
    window.addEventListener('storage', (event) => {
        if (event.key === logoutEventName) {
            inMemoryJWT = null;
        }
    });

    return {
        getToken,
        setToken,
        clearToken,
        getRefreshToken,
    };
};

export default tizkoApiToken();
