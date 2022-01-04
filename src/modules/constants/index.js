/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */


 export const httpConstants = {
    METHOD_TYPE: {
        POST: 'POST',
        PUT: 'PUT',
        GET: 'GET',
        DELETE: 'DELETE',
    },
    CONTENT_TYPE: {
        APPLICATION_JSON: 'application/json',
        MULTIPART_FORM_DATA: 'multipart/form-data',
        APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
        IMAGE_PNG: 'image/png'
    },
    DEVICE_TYPE: {
        WEB: 'web'
    },
    API_END_POINT: {
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
        GET_USERS_LIST: "/get-user-list",
        INVITE_ADMIN_USER: "/invite-admin-user",
        UPDATE_USER: "/update-user",
        GET_USER: "/user",
        GET_USER_INFO: "/user-info",
       
        INVITE_USER: "/invite-user",
        ACCEPT_USER: "/accept-user",
        REJECT_USER: "/reject-user",
        EXPORT_USER: "/export-user",
        SUBSCRIPTION_PLANS: "/subscription-plan",
        FEEDS: "/feeds",
        GEY_USERS_BY_ROLE: "/get-users-by-role",

       
        POST: "/post",
        
    }
};

export const cookiesConstants = {
    USER: "USER",
    SESSION_TOKEN: "SESSION_TOKEN",
    USER_PERMISSION: "USER_PERMISSION",
    AUTH0_ACCESS_TOKEN: "AUTH0_ACCESS_TOKEN",
    USER_DETAIL: "USER_DETAIL",
    USER_SUB: "USER_SUB",
    
    USER_PICTURE: "USER_PICTURE",
    USER_ID: "USER_ID",
    EMAIL_ID: "EMAIL_ID",
    AUTH0_ID_TOKEN: "AUTH0_ID_TOKEN",
    JWT_TOKEN: "JWT_TOKEN",
}

export const eventConstants = {
    HIDE_LOADER: "HIDE_LOADER",
    SHOW_LOADER: "SHOW_LOADER",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
}



export const genericConstants = {
    INCORRECT_USERNAME_PASS: "Incorrect username or password",
    ENTER_REQUIRED_FIELD: "Please enter the required information",
    INVALID_EMAIL: "Invalid email",
    PASSWORD_DID_NOT_MATCH: "Both the passwords did not match",
    PASSWORD_UPDATE_SUCCESS: "Your Password has been updated successfully",
    RESET_PASSWORD_MAIL_SENT: "A reset password mail is sent successfully",
    PASSWORD_UPDATE_FAILED: "Failed to update your password",
    RECAPTCHA_ERROR: "Before you proceed, please complete the captcha"

}

export const statusConstants = {
    PENDING: 'PENDING',
    INACTIVE: 'INACTIVE',
    INVITED: 'INVITED',
    ACTIVE: 'ACTIVE',
    PUBLISHED: 'PUBLISHED',
    REJECTED: 'REJECTED'
}




export const sidebarConstants = {
    USERS: "users",
    
}
export const reduxEvent = {
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT'
}

