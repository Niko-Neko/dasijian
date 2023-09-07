import requset from '@/utils/request'
import store from '@/store/index'

export const registerAPI = ({ username, password, repassword }) => {

    return requset({
        url: '/api/reg',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
            username,
            password,
            repassword
        }
    })
}

export const loginAPI = ({ username, password }) => {
    return requset({
        url: '/api/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
            username,
            password
        }
    })
}

export const getUserInfoAPI = () => {
    return requset({
        url: '/my/userinfo',
        //method不写默认就是‘get’方式请求
        //因为这里已经设定了请求拦截器所以已经设置好携带token了所以这里不用写
    })
}

export const getMenusAPI = () => {
    return requset({
        url: '/my/menus',
        //因为这里已经设定了请求拦截器所以已经设置好携带token了所以这里不用写
    })
}

export const updateUserInfoAPI = ({ id, username, nickname, email, user_pic }) => {
    return requset({
        url: '/my/userinfo',
        data: {
            id,
            username,
            nickname,
            email,
            user_pic
        }
    })
}

export const updateUserAvatarAPI = (avatar) => {
    return requset({
        url: '/my/update/avatar',
        method: 'PATCH',
        data: {
            avatar
        }
    })
}

export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
    return requset({
        url: '/my/updatepwd',
        method: 'PATCH',
        data: {
            old_pwd,
            new_pwd,
            re_pwd
        }
    })
}

export const getArtCateListAPI = () => {
    return requset({
        url: '/my/cate/list'
    })
}

export const saveArtCateAPI = ({ cate_name, cate_alias }) => {
    return requset({
        url: '/my/cate/add',
        method: 'POST',
        data: {
            cate_name,
            cate_alias
        }
    })
}

export const updataArtCateAPI = ({ id, cate_name, cate_alias }) => {
    return requset({
        url: '/my/cate/info',
        method: 'PUT',
        data: {
            id,
            cate_name,
            cate_alias
        }
    })
}

export const delArtCateAPI = (id) => {
    return requset({
        url: '/my/cate/del',
        method: 'DELETE',
        params: { id }
    })
}

export const uploadArticleAPI = (fd) => {
    return requset({
        url: '/my/article/add',
        method: 'POST',
        data: fd
    })
}

/**
 * 获取文章列表
 * @param {*} param0 {pagenum：当前页码} 
 * @returns 
 */
export const getArtListAPI = ({ pagenum, pagesize, cate_id, state }) => {
    return requset({
        url: '/my/article/list',
        params: {
            pagenum,
            pagesize,
            cate_id,
            state
        }
    })
}

export const getArtDetailAPI=(id)=>{
    return requset({
        url:'/my/article/info',
        params:{
            id
        }
    })
}

export const delArticleAPI=(id)=>{
    return requset({
        url:'/my/article/info',
        method: 'DELETE',
        params:{
            id
        }
    })
}