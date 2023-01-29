export interface UserList {
    status: boolean;
    name: string;
    lastName: string;
    secondLastName: string;
    phoneNumber: number;
    title?: string;
    id?: string;
    idProfilesStatus?: string;
    select?: boolean;
    notSelect?: boolean;
}

export interface UserListResult {
    data: UserList[];
    pages: number
}

export interface User extends UserList {
    dni: string;
    startDate: string;
    profile: number;
    address: string;
    email?: string;
    password?: string;
}