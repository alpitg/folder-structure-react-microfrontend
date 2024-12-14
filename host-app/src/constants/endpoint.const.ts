export const ENDPOINT = {
    BASE_URL: "http://localhost:3000",
    API_BASE_URL: "https://localhost:7270",
    AUTH: {
        API: {
            login: "/api/authentication",
            pages: "/api/pages",
            actions: "/api/actions",
        },
    },
    TENANT: {
        API: {
            FETCH_TENANTS: "/api/tenant",
            FETCH_TENANT: "/api/tenant/{id}",
            ADD_TENANT: "/api/tenant",
            UPDATE_TENANT: "/api/tenant",
            DELETE_TENANT: "/api/tenant/{id}",
        },
    },
    USER: {
        API: {
            FETCH_USERS: "/api/user/getUsers",
            FETCH_USER: "/api/user",
            ADD_USER: "/api/user",
            UPDATE_USER: "/api/user",
            UPDATE_USER_CLAIM: "/api/userClaim",
            DELETE_USER: "/api/user",
        },
    },
    ROLE: {
        API: {
            FETCH_ROLES: "/api/role",
            ADD_ROLE: "/api/role",
            UPDATE_ROLE: "/api/role",
            DELETE_ROLE: "/api/role",
        },
    },
};
