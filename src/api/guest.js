import {config} from './config'

const Guest = {
    login: (params: Object) => config.post(params),
    loadcustomer: (params: Object,mess) => config.post(params,mess),
    addcustomer: (params: Object) => config.post(params),
    seachcustomer: (params: Object) => config.post(params),
    loadproduct: (params: Object) => config.post(params),
    loadplan: (params: Object) => config.post(params),
    loadpayment: (params: Object) => config.post(params),
    createkey: (params: Object) => config.post(params),
    viewallkey:(params: Object,mess) => config.post(params,mess),
}
export default Guest;