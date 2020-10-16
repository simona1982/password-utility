import axios from 'axios'
import bcrypt from 'bcryptjs';
import router from "./../../../router";

const state = {
    accessToken: ''
};

const mutations = {
  LOGIN(state, payload) {
    console.log(payload);
    state.accessToken = payload;
  }
};

const actions = {
  login({ commit }, { postData }) {
    console.log(postData.password)

    const { password } = postData;  
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    console.log(password)
    console.log(passwordHash)

   
    axios.post("http://localhost:3000/login", postData).then(response => {
        console.log(response.data)
        window.localStorage.setItem("authToken", JSON.stringify(response.data));
        commit("LOGIN", response.data.accessToken);
        router.push({ path: "/dashboard" });
    },  error => {
        console.log(error.response);
    });
  }
};

const getters = {
  accessToken: state => state.accessToken
};

const loginModule = {
  state,
  mutations,
  actions,
  getters
};

export default loginModule;