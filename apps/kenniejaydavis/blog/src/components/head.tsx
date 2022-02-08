import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import React, { FC } from 'react';

export interface HeadProps {
  description?: string;
  meta?: { name: string; content: string }[];
  title?: string;
  lang?: string;
}

export const Head: FC<HeadProps> = ({
  description,
  lang = 'en',
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const title_ = title ?? site.siteMetadata.title;
  const description_ = description ?? site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title_}
      titleTemplate={title ? `%s | ${site.siteMetadata.title}` : null}
      meta={[
        {
          name: `description`,
          content: description_,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description_,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title_,
        },
        {
          name: `twitter:description`,
          content: description_,
        },
      ].concat(meta)}
    />
  );
};

export default Head;
