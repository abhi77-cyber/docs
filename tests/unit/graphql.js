import { describe } from '@jest/globals'
import { readFileSync } from 'fs'
import { allVersions } from '../../lib/all-versions.js'
import {
  getGraphqlSchema,
  getGraphqlChangelog,
  getGraphqlBreakingChanges,
  getPreviews,
} from '../../src/graphql/lib/index.js'

describe('graphql schema', () => {
  const graphqlTypes = JSON.parse(readFileSync('src/graphql/lib/types.json')).map(
    (item) => item.kind
  )
  for (const version in allVersions) {
    for (const type of graphqlTypes) {
      test(`getting the GraphQL ${type} schema works for ${version}`, async () => {
        const schema = getGraphqlSchema(version, type)
        expect(schema).toBeDefined()
      })
    }
  }

  test('getting the graphql changelog works for dotcom', async () => {
    const defaultVersion = allVersions.defaultVersion
    const schema = getGraphqlChangelog(defaultVersion)
    expect(schema).toBeDefined()
  })

  test('getting the graphql breaking changes works for every version', async () => {
    for (const version in allVersions) {
      const schema = getGraphqlBreakingChanges(version)
      expect(schema).toBeDefined()
    }
  })

  test('getting the graphql previews works for every version', async () => {
    for (const version in allVersions) {
      const schema = getPreviews(version)
      expect(schema).toBeDefined()
    }
  })
})
