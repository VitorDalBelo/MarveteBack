import { Controller, Get, ServiceUnavailableException, UseGuards } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BadRequest, InternalServerError, Ok, ServiceUnavailable, Unauthorized } from '../../serverResponses/responses';
import marvel from '../../services/marvel';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("comics")
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}



  @Get()
  @ApiSecurity('JWT')
  @ApiResponse(BadRequest)
  @ApiResponse(ServiceUnavailable)
  @ApiResponse(InternalServerError)
  @ApiResponse(Unauthorized)
  @ApiResponse(Ok)
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const url = `${process.env.MARVEL_URL}/comics?ts=${process.env.MARVEL_TS}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${process.env.MARVEL_HASH}&dateDescriptor=thisMonth`;
    const comics = await marvel.get(url)
    .then(response=>response.data.data.results)
    .catch(()=> {throw new ServiceUnavailableException()})
    return comics;
  }

}
