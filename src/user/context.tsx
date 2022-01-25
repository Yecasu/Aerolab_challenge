import React from "react";
import { Center, CircularProgress } from "@chakra-ui/react";

import api from "./api";
import {User} from "./types";
import productApi from "~/product/api"
import { Product } from "~/product/types";


export interface Context {
   state: {
     user: User;
   };
   actions: {
       addPoints: (amount: number) => Promise<void>;
       redeem: (product: Product) => Promise<void>
   };
};

const UserContext = React.createContext({} as Context);

const UserProvider:React.FC = ({ children }) => {
    const [user, setUser] = React.useState<User>();
    const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending")

    async function handleRedeem(product:Product) {
      if (!user) return;

      return productApi.redeem(product).then(() => {
        setUser({...user, points: user.points - product.cost})
      })
    }

    async function handleAddpoints(amount: number) {
        if (!user) return;

        return api.points.add(amount).then(() => {
            setUser({...user, points: user.points + amount});
        });
    }

    React.useEffect(()=>{
        api.fetch().then(user => {
            setUser(user);
            setStatus("resolved");
        });
    }, []);

    if (!user || status === "pending") {
        return (
          <Center padding={12}>
            <CircularProgress isIndeterminate color="primary.500" />
          </Center>
        );
    }

    const state = {
      user,
    };
    const actions = {
      addPoints : handleAddpoints,
      redeem: handleRedeem,
    };

    return <UserContext.Provider value={{state, actions}}>{children}</UserContext.Provider>;
};

export { UserContext as default, UserProvider as Provider };

