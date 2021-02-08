### Architecture

The frontend was design for simplicity and extensibility in a way we can reuse components. The idea of having common components such as buttons that we can reuse all over the place makes it easy to achieve a consistent UI and less styling work accross different components.

I used the pattern of components and containers, where containers only hold logic that works alongside the data that is being retrieved/modified, containing no styles at all nor HTML, so that it can be taken care by the components themselves.
This components responsibility is that of showing the data being delivered to them, such as the `UserCard.js`, so that we respect SRP (Single Responsibility Principle - SOLID Patterns) and can assemble the puzzle in multiple ways as that piece can fit anywhere.

### Deployment

To deploy, run:
* `yarn build`

And upload the `build/` folder into a configured bucket that will serve `index.html` as the main entry-point. I didn't add a script for that, but it should be easy to do as:
```
yarn build
aws s3 cp build/ s3://{MyBucketNameAndPath} --recursive --acl public-read
```
