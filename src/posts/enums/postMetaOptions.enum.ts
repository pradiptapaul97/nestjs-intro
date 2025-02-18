import { IsString } from "class-validator";

export class PostMetaOptions {
    @IsString()
    key: string;
  
    @IsString()
    value: string;
}