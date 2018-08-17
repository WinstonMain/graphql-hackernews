const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
// 1
let idCount = links.length
const resolvers = {
  Query: {
    link: (_, args) => {
      const r = links[0]
      console.log('r', r)
       
      return r// links[args.id]
    }
  },
  Mutation: {
    // 2
    updateLink: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    deleteLink: () => {}
  },
}
// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))