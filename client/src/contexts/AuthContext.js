import {createContext, useReducer, useEffect} from 'react'
import axios from 'axios'
import {LOCAL_STORAGE_TOKEN_NAME} from  './constant'
import setAuthToken from '../utils/setAuthToken'
import {apiUrl} from './constant'
import {authReducer} from '../reducers/authReducer'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //Check user
    //Neu co token name
    const loadUser = async () =>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get((apiUrl)+'/auth')
            if(response.data.success){
                dispatch({
                    type: 'SET_AUTH', 
                    payload: {isAuthenticated: true, user: response.data.user }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({type: 'SET_AUTH', payload: {isAuthenticated: false, user: null}})
        }
    }

    useEffect(() => loadUser(), [])

    //Login
    const loginUser = async userForm =>{
    try {
        const response = await axios.post((apiUrl)+'/auth/login', userForm)
        if (response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
        
        await loadUser() // Goi lai ham loadUser de co the reWrite lai isAuthenticated

        return response.data

    } catch (error) {

        //Neu nhan loi tu server
        if (error.response.data)
            return error.response.data

        //Neu khong nhan duoc loi tu server 
        else return({success: false, message: error.message})
        
        }
    }

    //Register
    const registerUser = async userForm =>{
        try {
            const response = await axios.post((apiUrl)+'/auth/register', userForm)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            
            await loadUser() // Goi lai ham loadUser de co the reWrite lai isAuthenticated
    
            return response.data
    
        } catch (error) {
    
            //Neu nhan loi tu server
            if (error.response.data)
                return error.response.data
    
            //Neu khong nhan duoc loi tu server 
            else return({success: false, message: error.message})
            
            }
        }

    //Context data
    const AuthContextData = {loginUser, registerUser, authState }

    // Tra ve provider
    return (
        <AuthContext.Provider value = {AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider