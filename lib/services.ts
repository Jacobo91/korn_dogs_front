import axios from "axios";
import { NewUser, Product, Operation } from "types";

/* users */

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

/* inventories */

export const createProduct = async (product: Product) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:3000/create-product',
    headers: {Authorization: 'Basic YWRtaW46KlZhbGVudGlub18yMDE5Kg==', 'Content-Type': 'application/json', },
    data: JSON.stringify(product)
  };

  try {
    const response = await axios.request(options);
    return response.data
  } catch (error) {
    console.log(error)
  }
};

export const updateProducts = async (items: Product[]) => {
  const options = {
    method: 'PUT',
    url: 'http://localhost:3000/inventories/updateQuantities',
    headers: {Authorization: 'Basic YWRtaW46KlZhbGVudGlub18yMDE5Kg==', 'Content-Type': 'application/json', },
    data: { items }
  };

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* daily ops */

export const createOperation = async (operation: Operation) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:3000/log-operation',
    headers: {Authorization: 'Basic YWRtaW46KlZhbGVudGlub18yMDE5Kg==', 'Content-Type': 'application/json', },
    data: JSON.stringify(operation)
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const getOperations = async () => {
  const options = {
    method: 'GET',
    url: `http://localhost:3000/get-operations`,
    headers: { Authorization: 'Basic YWRtaW46KlZhbGVudGlub18yMDE5Kg==' },
  };

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    console.log(error);
  }
};

