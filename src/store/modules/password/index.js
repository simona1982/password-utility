import axios from 'axios'
import bcrypt from 'bcryptjs';
import router from "./../../../router";

const state = {
    allPasswords: [],
    passwordEdit: {},
    edit: false
};

const mutations = {
    GET_ALL_PASSWORDS(state, payload) {
        state.allPasswords = payload;
    },
    CREATE_PASSWORDS(state, payload) {
        state.allPasswords.push(payload)
    },
    SET_EDIT(state, payload) {
        if(payload == 'edit') {
            state.edit = true
        }else {
            state.edit = false
        }
    },
    PASSWORD_EDIT(state, payload) {
        //state.passwordEdit = {};
        state.passwordEdit = payload;
    },
    DELETE_PASSWORD(state, payload) {
        let index = state.allPasswords.findIndex(pass=> pass.id == payload);
        console.log(index);
        console.log(`indice`)
        state.allPasswords.slice(index, 1)
    }
};

const actions = {
    getAllPasswords({ commit }) {
        axios.get("http://localhost:3000/passwords").then(response => {
          console.log(response.data);
          commit("GET_ALL_PASSWORDS", response.data);
        });
    },
    createPassword({ commit }, { postData }) {
        console.log(postData)
        axios.post("http://localhost:3000/passwords", postData).then(response => {
          console.log(response.data);
          commit("CREATE_PASSWORDS", response.data);
        });
    },
    setEdit({ commit }, res) {
        console.log(res)
        commit("SET_EDIT", res);
    },
    passwordEdit({ commit }, item) {
        console.log(item)
        commit("PASSWORD_EDIT", item)
    },
    deletePassword({commit }, id) {
        console.log(id)
        const postData = {
            id: id 
        }
        console.log(postData)
        axios.delete(`http://localhost:3000/passwords/${id}`).then(response => {
            console.log(`Borrado`);
            commit("DELETE_PASSWORD", id)
        });
        
    }
};

const getters = {
    allPasswords: state => state.allPasswords,
    allPasswordsUP:  state => state.allPasswords.sort((a, b) => convertirFecha(a.created_at) - convertirFecha(b.created_at)),
    allPasswordsDOWN:  state => state.allPasswords.sort((a, b) => convertirFecha(b.created_at) - convertirFecha(a.created_at)),
    edit: state => state.edit,
    passwordEdit: state => state.passwordEdit
};

function convertirFecha (fechaString) {
    let fechaSp = fechaString.split("-");
    let anio = new Date().getFullYear();
    if (fechaSp.length == 3) {
        anio = fechaSp[2];
    }
    let mes = fechaSp[1] - 1;
    let dia = fechaSp[0];

    return new Date(anio, mes, dia);
}

const passwordModule = {
  state,
  mutations,
  actions,
  getters
};

export default passwordModule;