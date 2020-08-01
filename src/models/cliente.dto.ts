export interface ClienteDTO{
    id: string;
    nome: string;
    email: string;
    //para colocar o atributo opcional colocamos a "?"
    imageUrl?: string;
}