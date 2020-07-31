import { ClassType, Field, ObjectType } from 'type-graphql';

/**
 * Class representing a scalar result wrapped in an object.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ScalarResult<TScalar>(
  TScalarClass: ClassType<TScalar>
) {
  @ObjectType('ScalarResult', {
    isAbstract: true,
    description: 'Scalar result',
  })
  @ObjectType(`Scalar${TScalarClass.name}Result`)
  class ScalarResultClass {
    @Field((_type) => TScalarClass)
    value: TScalar;
  }
  return ScalarResultClass;
}

export const ScalarBooleanResult = ScalarResult(Boolean);
export type ScalarBooleanResult = InstanceType<typeof ScalarBooleanResult>;
