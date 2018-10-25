import { notification } from 'antd';

export default class Notify {

    static DURATION = 3;

    static success = (params) => {
        notification.success({...params, duration: Notify.DURATION});
    }

    static error = (params) => {
        notification.error({...params, duration: Notify.DURATION});
    }

    static warning = (params) => {
        notification.warning({...params, duration: Notify.DURATION});
    }

}