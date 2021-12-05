import { ref, onValue } from "@firebase/database";
import database from "../firebaseConfig";
import {getStorage, ref as stRef, getDownloadURL} from "@firebase/storage";

export const loadUser = (uid) => {
    const storage = getStorage(database.app);

    return new Promise((resolve, reject) => {
        const userRef = ref(database, `/users/${uid}`);

        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData.avatar) {
                //cargar url de avatar
                const avatarRef = stRef(storage, `/avatars/${userData.avatar}`);
                getDownloadURL(avatarRef)
                .then((url) => {
                    userData.avatar = url;
                    resolve(userData);
                },
                (error) => {
                    resolve(userData);
                }); 
            }else {
                resolve(userData);  
            }
        });
    });
};
