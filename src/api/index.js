import requset from '@/utils/request'
import store from '@/store/index'

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

export const getUserInfoAPI=() =>{
    return requset({
        url:'/my/userinfo',
        //method不写默认就是‘get’方式请求
        headers:{
        Authorization:store.state.token
        }
    })
}