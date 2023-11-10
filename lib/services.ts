import axios from "axios";
import { NewUser } from "types";

export const authorizeUser = async (username: string, password: string) => {
  const options = {
    method: 'GET',
    url: `http://localhost:3000/get-user/${username}`,
    headers: { Authorization: 'Basic YWRtaW46KlZhbGVudGlub18yMDE5Kg==' },
  };

  try {
    const response = await axios.request(options);
    const fetchedUser = response.data;
    console.log(fetchedUser.password, password);
    
    if (fetchedUser.password === password) {
      console.log("Access Granted");
      localStorage.setItem("role", JSON.stringify(fetchedUser.role));
      localStorage.setItem("user", JSON.stringify(`${fetchedUser.firstname} ${fetchedUser.lastname}`));
      localStorage.setItem("isAuth", JSON.stringify(true));
      return true;
    } else {
      console.log("Access Denied");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getUsers = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:3000/users',
    headers: { Authorization: 'Basic YWRtaW46KlZhbGVudGlub18yMDE5Kg==' },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (username: string | undefined) => {
  const options = {
    method: 'GET',
    url: `http://localhost:3000/get-user/${username}`,
    headers: { Authorization: 'Basic YWRtaW46KlZhbGVudGlub18yMDE5Kg==' },
  };

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (newUser: NewUser) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:3000/create-user',
    headers: {Authorization: 'Basic YWRtaW46KlZhbGVudGlub18yMDE5Kg==', 'Content-Type': 'application/json', },
    data: JSON.stringify(newUser)
  };
  
  try {
    const response = await axios.request(options);
    return response.data
  } catch (error) {
    console.log(error);
  }
};

/*

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

*/