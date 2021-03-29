import { ReactElement } from 'react'
import Amplify from 'aws-amplify'

import awsConfig from '../aws-exports'

Amplify.configure({ ...awsConfig })

interface Props {
  children: ReactElement
}

function AmplifyProvider({ children }: Props): ReactElement {
  return children
}

export { AmplifyProvider }
