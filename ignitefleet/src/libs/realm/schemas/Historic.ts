import { Realm } from "@realm/react";
import { ObjectSchema } from "realm";
import { CoordsSchemaProps } from "./Coords";

type GenerateProps = {
  user_id: string;
  license_plate: string;
  description: string;
  coords: CoordsSchemaProps[];
};

/* mesmo nome que vai ser usado dentro do banco de dados 
a tipagem tem que ser o mesmo nome do schema
*/
export class Historic extends Realm.Object<Historic> {
  /* metodo que vai ser utilizado no momento quando for usado o schema, no momento de utilizar */

  _id!: string;
  user_id!: string;
  license_plate!: string;
  description!: string;
  coords!: CoordsSchemaProps[];
  status!: string;
  created_at!: Date;
  updated_at!: Date;

  static generate({
    description,
    license_plate,
    user_id,
    coords,
  }: GenerateProps) {
    /* retorna os dados que sao salvos no banco */
    return {
      /* cria um id unico */
      _id: new Realm.BSON.UUID(),
      description,
      coords,
      license_plate,
      user_id,
      status: "departure",
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  /* de fato os campos que vao existir no schema */
  static schema: ObjectSchema = {
    /* nome da coleção */
    name: "Historic",
    /* quem é a chave primaria */
    primaryKey: "_id",

    /* as propriedades realmente definem os dados do banco de dados 
        esses tipos sao do REALM DB
    */
    properties: {
      _id: "uuid",

      user_id: {
        type: "string",
        /* campo que vai ser utilizado como filtro de pesquisas */
        indexed: true,
      },
      license_plate: "string",
      description: "string",
      coords: {
        type: "list",
        objectType: "Coords",
      },
      status: "string",
      created_at: "date",
      updated_at: "date",
    },
  };
}
