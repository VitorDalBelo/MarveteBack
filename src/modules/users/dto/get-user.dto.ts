import { ApiProperty } from "@nestjs/swagger";

export  class GetUserDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    photo: string;
    @ApiProperty()
    googleAccont: boolean;
  }