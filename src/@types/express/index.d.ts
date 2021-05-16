/* eslint-disable @typescript-eslint/naming-convention */

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

declare namespace Express {
  export interface Request {
    user: User;
  }
}
