import { ApiProperty } from "@nestjs/swagger";
import { GetUserDto } from "../../users/dto/get-user.dto";

export  class GetAccessTokenDto {
    @ApiProperty()
    access_token: string;
    @ApiProperty({type: () => GetUserDto})
    user: GetUserDto
}
