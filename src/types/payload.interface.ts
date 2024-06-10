export interface IPayload {
  id: number;
  sub: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  iat?: number;
  exp?: number;
}
