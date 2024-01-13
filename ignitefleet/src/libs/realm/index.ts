import { createRealmContext } from "@realm/react";
import { Historic } from "./schemas/Historic";

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
};

export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
};

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
