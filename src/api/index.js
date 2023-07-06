import requset from '@/utils/request'

export const registerAPI = () =>{
    return requset({
        url:'api/reg',
        method:'POST',
        data:{
            username:'lidong',
            password:'111111',
            repassword:'111111'
        }
    })
}