import notificationAntd from "antd/es/notification/index";
import { useEffect } from "react";
import { useGlobalReducer } from "../../store/reducers/globalReducer/useGlobalReducer";

export const useNotification = () => {
    const [api, contextHolder] = notificationAntd.useNotification();
    const { notification } = useGlobalReducer();

    useEffect(() => {

        if(notification?.message && notification?.type){
            api[notification?.type]({
                message: `${notification?.message}`,
                //description: notification?.message,
                placement: 'bottomRight',

            });
        }
    }, [notification]);

    return{
        api,
        contextHolder
    }
}