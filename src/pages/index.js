import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import Layout from '../components/layout'




const BlogPost = ({node}) => {
  return (
    <li>
      <Link to={node.slug}>{node.title}</Link>
    </li>
  )
}
const IndexPage = ({data}) => (
  <Layout>
    <ul>
      {data.allContentfulBlogPost.edges.map((edge)=> <BlogPost node={edge.node}/>)}
    </ul>
  </Layout>
    )

export default IndexPage

export const pageQuery = graphql `
    query pageQuery {
      allContentfulBlogPost  (filter : {
        node_locale : {eq: "fr-CM"}
      }) {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
`
