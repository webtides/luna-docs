# luna-js documentation

The documentation can be found here: [https://docs.moonjs.dev](https://docs.moonjs.dev)


## Deployment

- `npm run build` for building your assets in production
- `aws s3 sync ./.build/public s3://luna-docs-assets --acl public-read --profile <aws-profile>` for uploading your assets to s3
- `serverless deploy aws-profile=<aws-profile>`
- Invalidate cloudfront
