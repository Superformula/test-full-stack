import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class GetLocationInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  address: string;
}
