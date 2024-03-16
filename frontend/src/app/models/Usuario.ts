export class Usuario{
    nombre:string;
    sexo:String;
    email:string;
    pass:string;
    confirmPass!:string;
    constructor(name:string, sexo:string, email:string,pass:string){
        this.nombre=name;
        this.sexo=sexo;
        this.email=email;
        this.pass=pass;
    }
}