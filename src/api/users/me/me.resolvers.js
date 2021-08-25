import client from "../../../client";
import { portectedResolver } from "../users.utils";


export default {
  Query: {
    me: portectedResolver((_, __, { loggedInUser }) =>
      client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      })
    ),
  },
};