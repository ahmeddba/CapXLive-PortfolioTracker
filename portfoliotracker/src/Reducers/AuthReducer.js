export const initialState = {
            user: null,       // To store logged-in user information
            loading: false,   // To indicate if a request is in progress
            error: null,      // To store error messages
        };

  export const authReducer = (state = initialState, {type , payload}) => {
    switch (type) {
      case 'AUTH_REQUEST':
        return { ...state, loading: true, error: null };
      case 'LOGIN_SUCCESS':
        return { ...state, loading: false, error: null,
            user: {
                firstName: payload.firstName,
                lastName: payload.lastName,
            }}
      case 'SIGNUP_SUCCESS':
        return { ...state, loading: false, user: payload, error: null };
      case 'AUTH_FAILURE':
        return { ...state, loading: false, error: payload };
      case 'LOGOUT':
        return { ...state, user: null, error: null };
      default:
        return state;
    }
  };
