import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class GetUsersParamDto{

    @ApiPropertyOptional({
        description:"Get user with specific id",
        example: "12345"
    })
    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    id?: number;
}