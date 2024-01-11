import { createRealmContext } from "@realm/react";
import { Historic } from "./schemas/Historic";

export const {
  /* prove o contexto do banco de dados para plicação */
  RealmProvider,
  /* inclui um registro com write */
  useRealm,
  /* seleciona um registro especifico */
  useObject,
  useQuery,
} = createRealmContext({
  schema: [Historic],
});
