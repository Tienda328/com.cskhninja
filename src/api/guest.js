import {config} from './config'

const Guest = {
    login: (params: Object) => config.post(params),
    loadcustomer: (params: Object) => config.post(params),
    addcustomer: (params: Object) => config.post(params),
    seachcustomer: (params: Object, message) => config.post(params, message),
    seachmycustomer: (params: Object) => config.post(params),
    loadproduct: (params: Object) => config.post(params),
    loadplan: (params: Object) => config.post(params),
    loadpayment: (params: Object) => config.post(params),
    createkey: (params: Object) => config.post(params),
    editkey: (params: Object,message) => config.post(params, message),
    viewallkey:(params: Object) => config.post(params),
    resetpasswordcustomer: (params: Object, message) => config.post(params, message),
    resetpassword: (params: Object, message) => config.post(params, message),
    removekey: (params: Object, message) => config.post(params, message),
}
export default Guest;