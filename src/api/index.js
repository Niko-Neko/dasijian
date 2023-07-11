import requset from '@/utils/request'

export const registerAPI = ({username,password,repassword}) =>{

    return requset({
        url:'/api/reg',
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        data:{
            username,
            password,
            repassword
        }
    })
}

export const loginAPI =({username,password})=>{
    return requset({
        url:'/api/login',
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        data:{
            username,
            password
        }
    })
}