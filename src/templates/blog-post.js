import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Layout from '../components/layout';



class BlogPost extends Component {
    render() {
        const {
            title,
            idActe,
            nature,
            langue,
            anne,
            catgorie,
            notes,
            prambule,
            dispositif,
            annexes,
            pdf,
            publishDate,
            tags
        }
          = this.props.data.contentfulBlogPost

        return (
            <Layout>
            <div>
                <h1>{title}</h1>
                <div>
                    <p>Réf. : {idActe}</p>
                    <p>TEXTE : {nature}</p>
                    <p>LANGUE : {langue}</p>
                    <p>ANNEE : {anne}</p>
                    <p>CATEGORIE : {catgorie}</p>
                </div>

                <div>
                    {notes.content.map(c => (
                        <div data-nodetype={c.nodeType}>
                             {c.content.map(v => (
                                <div>{v.value}</div>
                            ))}
                        </div>
                         ))}
                </div>

               <div>
                    {prambule.content.map(c => (
                        <div data-nodetype={c.nodeType}>
                             {c.content.map(v => (
                                <div>{v.value}</div>
                            ))}
                        </div>
                         ))}
                </div>

               <div dangerouslySetInnerHTML = {{__html: documentToHtmlString(dispositif)}}/>

               <div>
                    {annexes.content.map(c => (
                        <div data-nodetype={c.nodeType}>
                             {c.content.map(v => (
                                <div>{v.value}</div>
                            ))}
                        </div>
                         ))}
                </div>

                <div>
                    <p>Lien PDF {pdf.file.url}</p>
                    <p>Publié le : {publishDate}</p>
                    <ul>{tags}</ul>
                </div>
            </div>
            </Layout>
        )
    }
}

BlogPost.propTypes = {
    data: PropTypes.object.isRequired
}

export default BlogPost

export const pageQuery = graphql `
    query blogPostQuery($slug: String!) {
        contentfulBlogPost(slug: {eq: $slug}) {
            title
            slug
            idActe
            nature
            langue
            anne
            catgorie
            notes {
                nodeType
                content {
                    nodeType
                    content {
                        value
                    }
                }
            }
            prambule {
                nodeType
                content {
                    nodeType
                    content {
                        value
                    }
                }
            }
            dispositif {
                nodeType
                content {
                    nodeType
                    content {
                        value
                        nodeType
                        marks {
                            type
                        }
                    }
                }
            }
            annexes {
                nodeType
                content {
                    nodeType
                    content {
                        value
                    }
                }
            }
            pdf {
                title
                description
                file {
                  url
                  fileName
                  contentType
                }
            }
            publishDate
            tags
        }
    }
`