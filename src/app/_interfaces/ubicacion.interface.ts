import { Objeto } from "./objeto.interface";

export interface Ubicacion {
    idObjeto               :Objeto
    fecha                  :Date
    descripcion            :String
    pais                   :String
    latitud                :number
    longitud               :number
    fechaInicio            :Date
    fechaFin               :Date
}
