export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      departure: undefined;
      arrival: {
        /* id do carro que esta sendo utilizado tera que ser passado */
        id: string;
      };
    }
  }
}
