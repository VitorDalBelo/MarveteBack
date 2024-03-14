import { ComicsService } from './comics.service';
export declare class ComicsController {
    private readonly comicsService;
    constructor(comicsService: ComicsService);
    findAll(): Promise<any>;
}
