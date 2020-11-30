import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class GetUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;
}
