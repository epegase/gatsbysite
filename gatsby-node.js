/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const Promise = require(`bluebird`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
      const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
      // Query for markdown nodes to use in creating pages.
      resolve(
        graphql(
          `
        {
          allContentfulBlogPost(limit: 1000) {
            edges {
              node {
                slug
              }
            }
          }
        }
      `
        ).then(result => {
          if (result.errors) {
            reject(result.errors)
          }
  
          // Create blog post pages.
          result.data.allContentfulBlogPost.edges.forEach(edge => {
              createPage({
                path: `${edge.node.slug}`, // required
                component: blogPostTemplate,
                context: {
                  // Add optional context data. Data can be used as
                  // arguments to the page GraphQL query.
                  //
                  // The page "path" is always available as a GraphQL
                  // argument.
                  slug : edge.node.slug
                },
              })
          })
  
          return
        })
      )
    })
  }