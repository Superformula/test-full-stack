import { IsNumber } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DefaultQueryInput {
  @IsNumber()
  @Field()
  limit: number;

  @Field({ nullable: true })
  page?: number;
}
