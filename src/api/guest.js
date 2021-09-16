import {config} from './config'

const Guest = {
    login: (params: Object) => config.post(params),
}
export default Guest;