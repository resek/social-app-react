const axios = {
    get: url => {
        return Promise.resolve({
            data: {
                email: "toni@gmail.com",
                exp: 1539878266,
                iat: 1539874666,
                userId: "5bc069adb94d060015666528",
                username: "Toni"
            }
        })
    },
    create: () => axios,
    defaults: {
        headers: {
            common: {
                "Authorization": "Bearer 1234",
            }     
        },
      },
}

export default axios;