import axios from 'axios';
import gravatar from 'gravatar'

const instance = axios.create({
    baseURL: "https://64022ab5302b5d671c34965c.mockapi.io/Users"
})

export const getUsers = async ()=>{
    const result = await instance.get("/");
    const users = result.data
    const usersWithAvatarUrl = users.map(user => {
        const name = user.user; 
        const avatarUrl = generateAvatarUrl(name);
        return { ...user, avatarUrl };
    });

    return usersWithAvatarUrl;
}


const generateAvatarUrl = (name) => {
    const options = {
        s: '80',
        d: 'robohash',
    };
    return gravatar.url(name, options);
};