export interface Request {
    id: number;
    name: string;
    author_id: number;
    url: string;
    dimensions: string;
    notes: string;
    material_type: string;
    second_material: string;
    stage: string;
}

export interface Manager {
    id: number;
    name: string;
    email: string;
    password: string;
    org: string;
}

export interface Member {
    id: number;
    name: string;
    email: string;
    password: string;
    org: string;
}