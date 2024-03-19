export class Conferencia{
    //------------
    Titulo:string;
    Descripcion:string;
    Horario={
        Lugar:'',
        Fecha: '',
        HoraInicio:'',
        HoraFin:'',
        Expositor:
        {
            Semblanza:'',
            Foto:'',
        },
        CupoTotal:0,
        AsistentesRegistrados:[],
    };
    Status:boolean = false;
    //---------------
    constructor(titulo:string,descrip:string){
        this.Titulo = titulo;
        this.Descripcion = descrip;
    }
    //---------------

    
}