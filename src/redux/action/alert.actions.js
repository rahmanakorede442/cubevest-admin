import { alertConstants } from '../_constants';
import swal from 'sweetalert'

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    swal({
        icon: "success",
        text: `${message}`,
        timer: 8000,
    }).then(()=>{
        window.location.reload()
    })
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    swal({
        icon: "warning",
        text: `${message}`,
        timer: 8000,
    }).then(()=>{
        window.location.reload()
    })
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}