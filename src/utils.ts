import axios from "axios";
import "./interface"

class Utils {
    static userTelegram = (dataUser: DataUser) => {
        let name = dataUser.firstName;
        if (dataUser.lastName) name += ` ${dataUser.lastName}`;
        name = `<a href="tg://user?id='${dataUser.id}'">${name}</a>`

        return name;
    }

    static getAllCurrentVersion = async () => {
        const { data } = await axios.get("https://kandela.cyclic.app/detail");
        return data.result
    }
}

export default Utils;