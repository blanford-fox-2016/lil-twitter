const Auth = {
    authenticateUser: (data) => {
        if (data.status === 'error') console.log('No account:', data)
        Auth.deauthenticateUser()
        console.log('data:', data)
        localStorage.setItem('userId', data._id)
        console.log('token:', localStorage.getItem('userId'))
        window.location = '/'
    },
    deauthenticateUser: () => {
        localStorage.removeItem('userId')
    },
    getToken: () => {
        return localStorage.getItem('userId')
    },
    getUser: () => {
        let token = Auth.getToken()
        if (!token) return {}
        else {
            return jwt_decode(token)
        }
    }
}