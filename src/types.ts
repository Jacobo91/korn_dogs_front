export type User =  {
    _id: string,
    firstname: string,
    lastname: string,
    address: string,
    phone_number: string,
    username: string,
    password: string,
    cedula: string,
    blood_type: string,
    certificado_pension_cesantias: string,
    certificado_procuraduria: string,
    certificado_bancario: string,
    certificado_eps: string,
    image: string,
    certificado_policia: string,
    role: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    contract: string
};

export interface LoggedUSer {
    firstname: string;
    lastname: string;
    cc: string;
    role: string;
    date: string;
    arrival_time: string;
}

export type NewUser = {
    firstname: string,
    lastname: string,
    address: string,
    phone_number: string,
    username: string,
    password: string,
    cedula: string,
    blood_type: string,
    certificado_pension_cesantias: string,
    certificado_eps: string,
    image: string,
    certificado_policia: string,
    role: string,
    certificado_procuraduria: string,
    certificado_bancario: string,
    contract: string
}

export type Product = {
        _id: string,
        quantity: number,
        image: string,
        cost: number,
        supplier?: string,
        name: string,
        size: string,
        type: string,
        price: number
}

export interface Operation {
    items: Product[];
    date: string;
    type: string;
    user: string
}
