export interface CreateUserDTO {
  user_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  access_pin: string;
  date_of_birth: string;
  gender: string;
  country: string;
  time_zone: string;
}
